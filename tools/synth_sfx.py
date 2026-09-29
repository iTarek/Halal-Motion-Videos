"""Sound design by code: whooshes, hits, ticks, UI clicks, chimes, beds — no samples, no music library.

Two uses:

  npm run sfx
      Rebuilds the shared kit in public/_shared/sfx/ (usable by every brand).

  npm run sfx -- <brand> [--only=a,b] [--force] [--look]
      Designs the BRAND's signature sounds (logo sting, UI taps, house whoosh…) from
      src/brands/<brand>/brand/sfx.json into public/<brand>/brand/sfx/ — every video of the brand can use them.

  npm run sfx -- <brand> <video> [--only=a,b] [--force] [--look]
      Designs this video's own sounds from src/brands/<brand>/<video>/sfx.json
      into public/<brand>/<video>/sfx/<id>.wav. Unchanged sounds are skipped. Add --look for spectrogram images.

sfx.json:
  { "sounds": [
      { "id": "whoosh-in",  "type": "whoosh", "dur": 0.9, "from": 300, "to": 4200, "attack": 0.62 },
      { "id": "logo-hit",   "type": "hit",    "from": 70,  "to": 34,   "dur": 1.4 },
      { "id": "tap",        "type": "click",  "freq": 2400 },
      { "id": "bed",        "type": "bed",    "dur": 62 }
  ] }

Types and their params (all optional except id/type; "peak" 0–1 and "seed" work on every type):
  whoosh   dur, from, to (Hz sweep), attack (s to the loudest point), q (narrowness), pan (0–1 stereo sweep)
  riser    like whoosh, long and rising — dur 1.8, from 120, to 2400 (builds into a cut)
  swish    like whoosh, short and bright — dur 0.45, from 900, to 6000
  reverse  noise swell that stops dead (reverse cymbal) — dur, from, to
  hit      sub-bass thump — from, to (Hz pitch drop), dur, decay, click (true/false)
  impact   big hit: sub thump + noise burst — from, to, dur, body (0–1 noise amount)
  tick     tiny tonal tick — freq, dur
  click    UI tap — freq (brightness), dur
  pop      bubbly pop — from, to (Hz), dur
  chime    soft bell (tonal: use sparingly) — freq, dur, bright (0–1)
  shimmer  airy rising sparkle — dur, from, to
  glitch   digital stutter — dur, bursts, crush (bit depth, 3–10)
  bed      quiet noise bed under a whole film — dur (s), low, high (Hz band), wobble (s period)
  layer    stack any sounds: "layers": [ { <any sound spec>, "at": 0.12, "gain": 0.6 }, ... ]
  custom   your own synthesis: "fn": "name", "params": {...} → calls name(p, kit) in the video's sfx_custom.py

Effects — "fx": [ ... ] on any sound (or any layer), applied in order:
  {"lowpass": 2000} {"highpass": 150} {"bandpass": [300, 3000]}   filters (Hz)
  {"pitch": 1.5}          play faster/higher (0.5 = an octave down, longer)
  {"reverse": true}       play backwards
  {"echo": {"delay": 0.18, "feedback": 0.4, "mix": 0.35}}
  {"reverb": {"size": 1.2, "mix": 0.3}}                          size = tail seconds
  {"drive": 2.5}          warm saturation      {"crush": 6}   bit-crush (3–12 bits)
  {"tremolo": {"rate": 14, "depth": 0.6}}                         amplitude flutter (Hz)
  {"pan": -0.5}           -1 left … 1 right    {"gain": 0.7}
  {"fade": [0.02, 0.4]}   fade in / out (s)    {"trim": [0.1, 1.2]}  keep this window (s)

Custom synthesis — sfx_custom.py next to the sfx.json (plain Python, numpy/scipy):
  def heartbeat(p, kit):
      t = kit.time(p.get("dur", 1.2))                 # seconds array
      thump = kit.np.sin(2 * kit.np.pi * 55 * t) * kit.np.exp(-t * 9)
      return thump + kit.delay(thump, 0.28) * 0.7       # mono or stereo float array
  kit has: np, SR, rng (seeded), time(dur), pink(n), sweep_filter, env, butter, sosfilt, delay(x, s), fx(x, [...]),
  and every built-in maker (make_whoosh, make_hit, make_impact, make_tick, make_click, make_pop, make_chime,
  make_shimmer, make_reverse, make_glitch, make_bed).

Feedback (you can't listen, so look):
  every generated sound prints length, peak/RMS level, brightness (spectral centroid), attack and tail.
  --look also writes a spectrogram image per sound to .director/tmp/<brand>-<video or brand>/sfx-<id>.png
  (top strip = loudness over time; below = frequencies, log scale, faint lines at 100 Hz, 1 kHz, 10 kHz).
"""
import hashlib
import importlib.util
import json
import struct
import sys
import types
import zlib
from pathlib import Path

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, fftconvolve, resample, sosfilt, spectrogram

SR = 48000
ROOT = Path(__file__).resolve().parent.parent
SHARED = ROOT / "public" / "_shared" / "sfx"
rng = np.random.default_rng(7)


def save(path, x, peak=0.9):
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    stereo = np.stack([x, x], axis=1) if x.ndim == 1 else x
    wavfile.write(path, SR, (stereo * 32767).astype(np.int16))


def pink(n, r=None):
    white = (r or rng).standard_normal(n)
    f = np.fft.rfftfreq(n)
    f[0] = f[1]
    return np.fft.irfft(np.fft.rfft(white) / np.sqrt(f), n)


def sweep_filter(x, f0, f1, q=2.0, block=256):
    """Band-pass whose centre glides f0 -> f1 (exponential), processed in blocks."""
    y = np.zeros_like(x)
    n = len(x)
    zi = None
    for i in range(0, n, block):
        t = i / n
        fc = f0 * (f1 / f0) ** t
        lo, hi = fc / (1 + 1 / q), min(fc * (1 + 1 / q), SR / 2 - 100)
        sos = butter(2, [lo, hi], btype="band", fs=SR, output="sos")
        if zi is None or zi.shape[0] != sos.shape[0]:
            zi = np.zeros((sos.shape[0], 2))
        y[i:i + block], zi = sosfilt(sos, x[i:i + block], zi=zi)
    return y


def env(n, attack, release, shape=2.0):
    a = max(1, int(attack * SR))
    e = np.ones(n)
    e[:a] = np.linspace(0, 1, a) ** shape
    r = max(1, int(release * SR))
    e[-r:] *= np.linspace(1, 0, r) ** shape
    return e


# ---------- sound makers (each returns mono or stereo float audio)

def make_whoosh(dur, f0, f1, attack, q=1.6, pan=0.5, r=None):
    n = int(dur * SR)
    x = sweep_filter(pink(n, r), f0, f1, q=q)
    p = np.linspace(-pan, pan, n)
    x = x * env(n, attack, max(0.01, dur - attack), 1.6)
    return np.stack([x * (1 - p) / 1.5, x * (1 + p) / 1.5], axis=1)


def make_hit(f_start=70, f_end=34, dur=1.4, click=True, decay=3.2, r=None):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = f_end + (f_start - f_end) * np.exp(-t * 9)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * decay)
    if click:
        c = pink(n, r) * np.exp(-t * 90)
        c = sosfilt(butter(2, 2500, btype="low", fs=SR, output="sos"), c)
        x = x + 0.25 * c / (np.max(np.abs(c)) + 1e-9)
    return x * env(n, 0.002, 0.3)


def make_impact(f_start=80, f_end=30, dur=2.0, body=0.6, r=None):
    n = int(dur * SR)
    t = np.arange(n) / SR
    thump = make_hit(f_start, f_end, dur, click=True, decay=2.4, r=r)
    burst = sosfilt(butter(2, 1800, btype="low", fs=SR, output="sos"), pink(n, r)) * np.exp(-t * 7)
    burst = burst / (np.max(np.abs(burst)) + 1e-9)
    return thump + body * burst * env(n, 0.001, 0.4)


def make_tick(freq=3200, dur=0.07, r=None):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = np.sin(2 * np.pi * freq * t) * np.exp(-t * 110)
    x += 0.4 * pink(n, r) * np.exp(-t * 200)
    return sosfilt(butter(2, 900, btype="high", fs=SR, output="sos"), x)


def make_click(freq=2400, dur=0.035, r=None):
    n = int(dur * SR)
    t = np.arange(n) / SR
    noise = sosfilt(butter(2, [freq * 0.6, min(freq * 2.2, SR / 2 - 100)], btype="band", fs=SR, output="sos"), pink(n, r))
    body = np.sin(2 * np.pi * (freq / 4) * t) * 0.5
    return (noise / (np.max(np.abs(noise)) + 1e-9) + body) * np.exp(-t * 180)


def make_pop(f_start=900, f_end=280, dur=0.15, r=None):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = f_end + (f_start - f_end) * np.exp(-t * 60)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 28) * env(n, 0.001, 0.02)


def make_chime(freq=880, dur=2.0, bright=0.5, r=None):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = np.zeros(n)
    for ratio, amp, dec in [(1, 1, 2.2), (2.76, 0.45 * bright + 0.1, 3.5), (5.4, 0.3 * bright, 5.5), (8.93, 0.15 * bright, 8)]:
        x += amp * np.sin(2 * np.pi * freq * ratio * t) * np.exp(-t * dec)
    return x * env(n, 0.003, 0.2)


def make_shimmer(dur=1.6, f0=1800, f1=9000, r=None):
    n = int(dur * SR)
    x = sweep_filter(pink(n, r), f0, f1, q=3.0)
    # fade in over 9/16 of the sound, out over 7/16 (0.9 s / 0.7 s at the kit's 1.6 s)
    return x * env(n, round(dur * 0.5625, 6), round(dur * 0.4375, 6), 1.4)


def make_reverse(dur=1.2, f0=2000, f1=8000, r=None):
    n = int(dur * SR)
    x = sweep_filter(pink(n, r), f0, f1, q=1.2)
    e = np.linspace(0, 1, n) ** 3.5
    e[-int(0.01 * SR):] *= np.linspace(1, 0, int(0.01 * SR))
    return x * e


def make_glitch(dur=0.4, bursts=7, crush=5, r=None):
    r = r or rng
    n = int(dur * SR)
    x = np.zeros(n)
    for _ in range(int(bursts)):
        start = r.integers(0, max(1, n - 2000))
        length = r.integers(300, 2400)
        fc = r.uniform(600, 7000)
        seg = sosfilt(butter(2, [fc * 0.7, min(fc * 1.4, SR / 2 - 100)], btype="band", fs=SR, output="sos"), r.standard_normal(length))
        x[start:start + length] += seg[: n - start] * r.uniform(0.4, 1)
    levels = 2 ** max(2, min(12, int(crush)))
    x = np.round(x / (np.max(np.abs(x)) + 1e-9) * levels) / levels
    hold = 6  # sample-and-hold for a digital edge
    x = np.repeat(x[::hold], hold)[:n]
    return x * env(n, 0.002, 0.03)


def make_bed(dur=31, low=120, high=900, wobble=7.3, r=None):
    n = int(dur * SR)
    x = sosfilt(butter(2, [low, high], btype="band", fs=SR, output="sos"), pink(n, r))
    t = np.arange(n) / SR
    x *= 0.75 + 0.25 * np.sin(2 * np.pi * t / wobble)
    return x * env(n, 1.5, 2.0, 1.0)


def g(spec, key, default):
    v = spec.get(key, default)
    return type(default)(v) if isinstance(default, (int, float)) and not isinstance(default, bool) else v


# ---------- effects

def stereo(x):
    return np.stack([x, x], axis=1) if x.ndim == 1 else x


def filt(x, kind, f):
    nyq = SR / 2 - 100
    if kind == "band":
        wn = [max(20, f[0]), min(f[1], nyq)]
    else:
        wn = min(max(20, f), nyq)
    return sosfilt(butter(2, wn, btype=kind, fs=SR, output="sos"), x, axis=0)


def delay(x, seconds):
    d = int(seconds * SR)
    return np.concatenate([np.zeros((d,) + x.shape[1:]), x])[: len(x) + d]


def mix_at(base, add, at_sample, gain=1.0):
    base, add = stereo(base), stereo(add) * gain
    end = at_sample + len(add)
    if end > len(base):
        base = np.concatenate([base, np.zeros((end - len(base), 2))])
    base[at_sample:end] += add
    return base


def apply_fx(x, chain, r):
    for step in chain or []:
        if not isinstance(step, dict) or len(step) != 1:
            raise ValueError(f"each fx step is one {{name: value}}, got {step}")
        (name, v), = step.items()
        if name == "lowpass":
            x = filt(x, "low", float(v))
        elif name == "highpass":
            x = filt(x, "high", float(v))
        elif name == "bandpass":
            x = filt(x, "band", [float(v[0]), float(v[1])])
        elif name == "pitch":
            x = resample(x, max(16, int(len(x) / float(v))), axis=0)
        elif name == "reverse":
            x = x[::-1].copy() if v else x
        elif name == "echo":
            d, fb, mix = float(v.get("delay", 0.18)), float(v.get("feedback", 0.4)), float(v.get("mix", 0.35))
            wet, tap, gain = np.zeros((0, 2)), stereo(x), 1.0
            for n in range(1, 8):
                gain *= fb if n > 1 else 1.0
                if gain < 0.02:
                    break
                wet = mix_at(wet, tap, int(d * n * SR), gain)
            x = mix_at(stereo(x), wet, 0, mix)
        elif name == "reverb":
            size, mix = float(v.get("size", 1.2)), float(v.get("mix", 0.3))
            n = int(size * SR)
            t = np.arange(n) / SR
            decay = np.exp(-t * 6.9 / size)
            ir = np.stack([r.standard_normal(n) * decay, r.standard_normal(n) * decay], axis=1)
            ir = filt(ir, "low", 7000) / np.sqrt(np.sum(ir ** 2) / 2 + 1e-9)
            dry = stereo(x)
            wet = np.stack([fftconvolve(dry[:, c], ir[:, c]) for c in range(2)], axis=1)
            wet *= (np.max(np.abs(dry)) + 1e-9) / (np.max(np.abs(wet)) + 1e-9)
            x = mix_at(dry * (1 - mix), wet, 0, mix)
        elif name == "drive":
            x = np.tanh(x * float(v)) / np.tanh(float(v))
        elif name == "crush":
            levels = 2 ** max(2, min(12, int(v)))
            x = np.round(x / (np.max(np.abs(x)) + 1e-9) * levels) / levels
        elif name == "tremolo":
            t = np.arange(len(x)) / SR
            m = 1 - float(v.get("depth", 0.6)) * (0.5 + 0.5 * np.sin(2 * np.pi * float(v.get("rate", 12)) * t))
            x = x * (m[:, None] if x.ndim == 2 else m)
        elif name == "pan":
            p = max(-1.0, min(1.0, float(v)))
            s2 = stereo(x)
            x = np.stack([s2[:, 0] * (1 - max(0, p)), s2[:, 1] * (1 + min(0, p))], axis=1)
        elif name == "gain":
            x = x * float(v)
        elif name == "fade":
            a, b = (float(v[0]), float(v[1])) if isinstance(v, list) else (0.0, float(v))
            e = env(len(x), max(a, 1 / SR), max(b, 1 / SR), 1.0)
            x = x * (e[:, None] if x.ndim == 2 else e)
        elif name == "trim":
            x = x[int(float(v[0]) * SR): int(float(v[1]) * SR)]
        else:
            raise ValueError(f'unknown fx "{name}"')
    return x


# ---------- custom synthesis (the video's own sfx_custom.py)

_custom = {}


def custom_module(path):
    if path not in _custom:
        if not path.exists():
            raise ValueError(f"type custom needs {path.relative_to(ROOT)}")
        spec = importlib.util.spec_from_file_location(f"sfx_custom_{abs(hash(str(path)))}", path)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        _custom[path] = mod
    return _custom[path]


def kit_for(r):
    k = types.SimpleNamespace(np=np, SR=SR, rng=r, butter=butter, sosfilt=sosfilt, env=env, sweep_filter=sweep_filter, delay=delay)
    k.time = lambda dur: np.arange(int(dur * SR)) / SR
    k.pink = lambda n: pink(n, r)
    k.fx = lambda x, chain: apply_fx(x, chain, r)
    for name, fn in globals().items():
        if name.startswith("make_"):
            setattr(k, name, fn)
    return k


# ---------- one sfx.json entry → audio

BUILTIN_PEAK = {"whoosh": 0.8, "riser": 0.8, "swish": 0.8, "hit": 0.95, "impact": 0.95, "tick": 0.6, "click": 0.6, "pop": 0.7,
                "chime": 0.6, "shimmer": 0.5, "reverse": 0.7, "glitch": 0.6, "bed": 0.35, "layer": 0.9, "custom": 0.85}


def synth(spec, r, custom_path):
    t = spec.get("type")
    if t in ("whoosh", "riser", "swish"):
        d = {"whoosh": (0.9, 300, 4200, 0.62, 1.6), "riser": (1.8, 120, 2400, 1.55, 1.2), "swish": (0.45, 900, 6000, 0.3, 2.4)}[t]
        dur = g(spec, "dur", d[0])
        attack = min(g(spec, "attack", d[3] * dur / d[0]), dur * 0.97)
        x = make_whoosh(dur, g(spec, "from", d[1]), g(spec, "to", d[2]), attack, g(spec, "q", d[4]), g(spec, "pan", 0.5), r)
    elif t == "hit":
        x = make_hit(g(spec, "from", 70), g(spec, "to", 34), g(spec, "dur", 1.4), bool(spec.get("click", True)), g(spec, "decay", 3.2), r)
    elif t == "impact":
        x = make_impact(g(spec, "from", 80), g(spec, "to", 30), g(spec, "dur", 2.0), g(spec, "body", 0.6), r)
    elif t == "tick":
        x = make_tick(g(spec, "freq", 3200), g(spec, "dur", 0.07), r)
    elif t == "click":
        x = make_click(g(spec, "freq", 2400), g(spec, "dur", 0.035), r)
    elif t == "pop":
        x = make_pop(g(spec, "from", 900), g(spec, "to", 280), g(spec, "dur", 0.15), r)
    elif t == "chime":
        x = make_chime(g(spec, "freq", 880), g(spec, "dur", 2.0), g(spec, "bright", 0.5), r)
    elif t == "shimmer":
        x = make_shimmer(g(spec, "dur", 1.6), g(spec, "from", 1800), g(spec, "to", 9000), r)
    elif t == "reverse":
        x = make_reverse(g(spec, "dur", 1.2), g(spec, "from", 2000), g(spec, "to", 8000), r)
    elif t == "glitch":
        x = make_glitch(g(spec, "dur", 0.4), g(spec, "bursts", 7), g(spec, "crush", 5), r)
    elif t == "bed":
        x = make_bed(g(spec, "dur", 31.0), g(spec, "low", 120), g(spec, "high", 900), g(spec, "wobble", 7.3), r)
    elif t == "layer":
        layers = spec.get("layers") or []
        if not layers:
            raise ValueError("a layer sound needs a non-empty \"layers\" list")
        x = np.zeros((1, 2))
        for i, child in enumerate(layers):
            cr = np.random.default_rng(child.get("seed", r.integers(0, 2**32)))
            c = synth(child, cr, custom_path)
            c = c / (np.max(np.abs(c)) + 1e-9) * BUILTIN_PEAK.get(child.get("type"), 0.8)
            x = mix_at(x, c, int(float(child.get("at", 0)) * SR), float(child.get("gain", 1.0)))
    elif t == "custom":
        mod = custom_module(custom_path)
        fn = getattr(mod, str(spec.get("fn", "")), None)
        if not callable(fn):
            raise ValueError(f'sfx_custom.py has no function "{spec.get("fn")}"')
        x = np.asarray(fn(dict(spec.get("params", {})), kit_for(r)), dtype=float)
        if x.ndim not in (1, 2) or len(x) < 16 or not np.isfinite(x).all():
            raise ValueError(f'{spec.get("fn")}() must return a finite mono or stereo array')
    else:
        raise ValueError(f'unknown type "{t}"')
    return apply_fx(x, spec.get("fx"), r)


def design(spec, custom_path=None):
    """One sfx.json entry → (audio, peak)."""
    seed = spec.get("seed", int(hashlib.sha1(spec["id"].encode()).hexdigest()[:8], 16))
    r = np.random.default_rng(seed)
    return synth(spec, r, custom_path), BUILTIN_PEAK.get(spec.get("type"), 0.8)


# ---------- feedback: numbers + a picture (Claude can't listen)

def analyse(x):
    m = stereo(x).mean(axis=1)
    peak = np.max(np.abs(m)) + 1e-12
    rms = np.sqrt(np.mean(m ** 2)) + 1e-12
    spec_ = np.abs(np.fft.rfft(m * np.hanning(len(m))))
    freqs = np.fft.rfftfreq(len(m), 1 / SR)
    centroid = float(np.sum(freqs * spec_) / (np.sum(spec_) + 1e-12))
    hop = max(1, int(0.005 * SR))
    envl = np.array([np.max(np.abs(m[i:i + hop])) for i in range(0, len(m), hop)])
    top = int(np.argmax(envl))
    attack = int(np.argmax(envl >= 0.9 * envl[top])) * hop / SR
    below = np.where(envl[top:] < envl[top] * 0.01)[0]
    tail = (below[0] if len(below) else len(envl) - top) * hop / SR
    return f"{len(m) / SR:.2f}s · peak {20 * np.log10(peak):.1f} dBFS · rms {20 * np.log10(rms):.1f} dBFS · brightness {centroid:,.0f} Hz · attack {attack * 1000:.0f} ms · tail {tail:.2f}s"


def write_png(path, rgb):
    h, w, _ = rgb.shape
    raw = b"".join(b"\x00" + rgb[y].astype(np.uint8).tobytes() for y in range(h))
    chunk = lambda t, d: struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xFFFFFFFF)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)) + chunk(b"IDAT", zlib.compress(raw, 6)) + chunk(b"IEND", b""))


def look(x, path, width=640, height=240, strip=56):
    m = stereo(x).mean(axis=1)
    f, _, S = spectrogram(m, fs=SR, nperseg=1024, noverlap=768, mode="magnitude")
    db = 20 * np.log10(S + 1e-9)
    db = np.clip((db - (db.max() - 80)) / 80, 0, 1)
    rows = np.geomspace(20, 20000, height)[::-1]
    idx = np.clip(np.searchsorted(f, rows), 0, len(f) - 1)
    cols = np.linspace(0, db.shape[1] - 1, width).astype(int) if db.shape[1] else np.zeros(width, int)
    img = db[idx][:, cols]
    stops = np.array([[10, 8, 7], [60, 25, 70], [200, 80, 40], [240, 180, 90], [255, 250, 235]], float)
    pos = img * (len(stops) - 1)
    lo = np.floor(pos).astype(int).clip(0, len(stops) - 2)
    frac = (pos - lo)[..., None]
    rgb = stops[lo] * (1 - frac) + stops[lo + 1] * frac
    for hz in (100, 1000, 10000):
        y = int(np.argmin(np.abs(rows - hz)))
        rgb[y] = rgb[y] * 0.6 + np.array([90, 90, 90]) * 0.4
    envl = np.array([np.max(np.abs(m[int(i * len(m) / width): int((i + 1) * len(m) / width) + 1])) for i in range(width)])
    envl = envl / (envl.max() + 1e-9)
    top = np.full((strip, width, 3), 18.0)
    for xpix, v in enumerate(envl):
        hgt = int(v * (strip - 6))
        top[strip - 3 - hgt: strip - 3, xpix] = [224, 168, 96]
    write_png(path, np.concatenate([top, np.full((2, width, 3), 60.0), rgb]).clip(0, 255))


# ---------- peaks: where each sound is loudest, so cues can land that moment on a cut

def peak_seconds(x):
    m = np.abs(stereo(x)).mean(axis=1)
    win = max(1, int(0.005 * SR))  # 5 ms smoothing so a single spike doesn't win
    smooth = np.convolve(m, np.ones(win) / win, mode="same")
    return round(float(np.argmax(smooth)) / SR, 3)


def wav_audio(path):
    _, data = wavfile.read(path)
    return data.astype(float) / 32767


def write_gen(path, const, entries, note):
    """entries: {id: (src, seconds, peak)} → a typed TS table the video imports."""
    lines = [f'  "{k}": {{ src: "{src}", seconds: {sec}, peak: {pk} }},' for k, (src, sec, pk) in entries.items()]
    path.write_text(
        f"// Generated by `npm run sfx` — don't edit. {note}\n"
        "// peak = seconds from the start of the file to its loudest moment: pass it as a cue's `peak`\n"
        "// and the cue's `at` becomes the frame where that loudest moment lands.\n"
        f"export const {const} = {{\n" + "\n".join(lines) + "\n} as const;\n"
    )


# ---------- shared kit (unchanged recipes: rebuilds public/_shared/sfx exactly as before)

def shared_kit():
    SHARED.mkdir(parents=True, exist_ok=True)
    save(SHARED / "whoosh-up.wav", make_whoosh(0.9, 300, 4200, 0.62), 0.8)
    save(SHARED / "whoosh-down.wav", make_whoosh(0.8, 3800, 260, 0.12), 0.8)
    save(SHARED / "swish.wav", make_whoosh(0.45, 900, 6000, 0.3, q=2.4), 0.8)
    save(SHARED / "riser.wav", make_whoosh(1.8, 120, 2400, 1.55, q=1.2), 0.8)
    save(SHARED / "sub-hit.wav", make_hit(), 0.95)
    save(SHARED / "sub-soft.wav", make_hit(58, 36, 1.0, click=False), 0.95)
    save(SHARED / "tick.wav", make_tick(), 0.6)
    save(SHARED / "tick-low.wav", make_tick(freq=1900), 0.6)
    save(SHARED / "air-bed.wav", make_bed(), 0.35)
    save(SHARED / "shimmer.wav", make_shimmer(), 0.5)
    shared_peaks()
    print("wrote", sorted(p.name for p in SHARED.glob("*.wav")))


def shared_peaks():
    entries = {}
    for f in sorted(SHARED.glob("*.wav")):
        a = wav_audio(f)
        entries[f.stem] = (f"sfx/{f.name}", round(len(a) / SR, 3), peak_seconds(a))
    write_gen(ROOT / "src" / "engine" / "sfx.gen.ts", "SHARED_SFX", entries, 'Use with shared(SHARED_SFX["whoosh-up"].src).')


# ---------- per-video sounds

def video_sounds(brand, video, only=None, force=False, want_look=False):
    """video="" → the brand's own kit (src/brands/<brand>/brand/sfx.json → public/<brand>/brand/sfx/)."""
    name_ok = lambda s: s and s[0].isalpha() and all(c.isalnum() or c == "-" for c in s) and s == s.lower()
    if not name_ok(brand) or (video and not name_ok(video)):
        sys.exit("Usage: npm run sfx -- <brand> [<video>] [--only=a,b] [--force] [--look]")
    video = video or "brand"
    if not (ROOT / "src" / "brands" / brand / video).is_dir():
        sys.exit(f"No folder src/brands/{brand}/{video}")
    src = ROOT / "src" / "brands" / brand / video
    spec_file = src / "sfx.json"
    custom_path = src / "sfx_custom.py"
    if not spec_file.exists():
        sys.exit(f"Write src/brands/{brand}/{video}/sfx.json first (see the top of tools/synth_sfx.py).")
    try:
        sounds = json.loads(spec_file.read_text())["sounds"]
    except Exception as e:
        sys.exit(f"sfx.json isn't valid: {e}")
    out = ROOT / "public" / brand / video / "sfx"
    out.mkdir(parents=True, exist_ok=True)
    looks = ROOT / ".director" / "tmp" / f"{brand}-{video}"
    cache_file = out / ".cache.json"
    cache = json.loads(cache_file.read_text()) if cache_file.exists() else {}
    custom_hash = hashlib.sha1(custom_path.read_bytes()).hexdigest() if custom_path.exists() else ""
    for spec in sounds:
        sid = str(spec.get("id", ""))
        if not sid or not all(c.isalnum() or c in "-_" for c in sid):
            sys.exit(f'Sound id "{sid}" must be letters, digits, - or _.')
        uses_custom = "custom" in json.dumps(spec)
        h = hashlib.sha1((json.dumps(spec, sort_keys=True) + (custom_hash if uses_custom else "")).encode()).hexdigest()
        path = out / f"{sid}.wav"
        if only and sid not in only:
            continue
        if path.exists() and not force and not only and cache.get(sid) == h:
            print(f"= {sid} (unchanged)")
            if want_look:
                _, data = wavfile.read(path)
                look(data.astype(float) / 32767, looks / f"sfx-{sid}.png")
            continue
        try:
            audio, peak = design(spec, custom_path)
        except Exception as e:
            sys.exit(f"{sid}: {type(e).__name__}: {e}")
        audio = audio / (np.max(np.abs(audio)) + 1e-9) * float(spec.get("peak", peak))
        save(path, audio, float(spec.get("peak", peak)))
        cache[sid] = h
        print(f"+ {sid}: {spec['type']} · {analyse(audio)}")
        if want_look:
            look(audio, looks / f"sfx-{sid}.png")
    cache_file.write_text(json.dumps(cache, indent=2))
    # peaks table next to sfx.json, for every sound in the recipe
    entries = {}
    for spec in sounds:
        sid = str(spec["id"])
        f = out / f"{sid}.wav"
        if f.exists():
            a = wav_audio(f)
            entries[sid] = (f"sfx/{sid}.wav", round(len(a) / SR, 3), peak_seconds(a))
    use = "brandAsset" if video == "brand" else "asset"
    write_gen(src / "sfx.gen.ts", "SFX", entries, f'Use with {use}(SFX["<id>"].src).')
    print(f"\nPeaks: src/brands/{brand}/{video}/sfx.gen.ts")
    if want_look:
        print(f"\nSpectrograms: .director/tmp/{brand}-{video}/sfx-<id>.png — Read them to check shape and brightness.")


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = dict((a[2:].split("=", 1) + [True])[:2] for a in sys.argv[1:] if a.startswith("--"))
    if not args and flags.get("peaks"):
        shared_peaks()
        print("wrote src/engine/sfx.gen.ts")
    elif not args:
        shared_kit()
    else:
        only = set(str(flags["only"]).split(",")) if isinstance(flags.get("only"), str) else None
        video_sounds(args[0], args[1] if len(args) > 1 else "", only, bool(flags.get("force")), bool(flags.get("look")))
