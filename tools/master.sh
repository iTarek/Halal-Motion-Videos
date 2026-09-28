#!/bin/sh
# Masters the soundtrack of a rendered film in place: two-pass EBU R128
# loudnorm to -16 LUFS integrated, -1.5 dBTP true peak. The video stream is
# copied untouched. Called by tools/render.mjs.  Usage: sh tools/master.sh <file.mp4>
set -e
IN="$1"
TMP="${IN%.mp4}.mastering.mp4"
TARGET="I=-16:TP=-1.5:LRA=11"

STATS=$(ffmpeg -hide_banner -nostats -i "$IN" -af "loudnorm=$TARGET:print_format=json" -f null - 2>&1 | sed -n '/^{/,/^}/p')
get() { echo "$STATS" | sed -n "s/.*\"$1\" : \"\([^\"]*\)\".*/\1/p"; }

ffmpeg -hide_banner -loglevel error -y -i "$IN" -c:v copy \
  -af "loudnorm=$TARGET:measured_I=$(get input_i):measured_TP=$(get input_tp):measured_LRA=$(get input_lra):measured_thresh=$(get input_thresh):offset=$(get target_offset):linear=true,aresample=48000" \
  -c:a aac -b:a 320k -movflags +faststart "$TMP"
mv "$TMP" "$IN"
echo "mastered $IN"
