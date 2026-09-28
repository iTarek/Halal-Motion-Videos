import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Card, ease, Headline, Icon, Kicker, prog, rgba, SceneFrame, useLayout, useTheme } from "../../../../engine";
import { COPY } from "../copy";
import { SCENES } from "../timeline";

const T = COPY.feature;
/** When each point lands (local frames) — the soundtrack ticks on these. */
export const POINTS = { start: 34, step: 16 };

/** Headline + a card of benefits that check in one by one. Stacked in 9:16, side by side in 16:9. */
export const Feature: React.FC = () => {
  const f = useCurrentFrame();
  const { p } = useLayout();
  const { colors, fonts } = useTheme();
  const cardIn = prog(f, 14, 22, ease.out);

  const head = (
    <div style={{ display: "flex", flexDirection: "column", gap: p(24, 22) }}>
      <Kicker at={2} num={T.num} text={T.kicker} size={p(32, 30)} />
      <Headline lines={[{ words: T.h1 }, { words: T.h2, accent: true }]} size={p(110, 100)} start={6} />
    </div>
  );

  const card = (
    <Card
      style={{
        width: p(900, 760),
        padding: p("40px 44px", "38px 42px"),
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: p(30, 26),
        opacity: cardIn,
        transform: `translateY(${(1 - cardIn) * 80}px)`,
      }}
    >
      {T.points.map((point, i) => {
        const at = POINTS.start + POINTS.step * i;
        const t = prog(f, at, 16, ease.out);
        const check = prog(f, at + 4, 10, ease.back);
        return (
          <div
            key={point}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              opacity: t,
              transform: `translateY(${(1 - t) * 24}px)`,
              fontFamily: fonts.ui,
              fontSize: p(46, 42),
              fontWeight: 600,
              color: colors.text,
            }}
          >
            <span
              style={{
                width: p(58, 54),
                height: p(58, 54),
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                background: colors.positive,
                transform: `scale(${check})`,
                boxShadow: `0 0 30px ${rgba(colors.positive, 0.45)}`,
                flex: "none",
              }}
            >
              <Icon name="check" size={p(34, 32)} color={colors.bg} stroke={3.2} />
            </span>
            {point}
          </div>
        );
      })}
    </Card>
  );

  return (
    <SceneFrame dur={SCENES.feature.dur} exit="drop">
      {p(
        <AbsoluteFill style={{ padding: "300px 90px", gap: 90 }}>
          {head}
          {card}
        </AbsoluteFill>,
        <AbsoluteFill style={{ padding: "0 110px", flexDirection: "row", alignItems: "center", gap: 80 }}>
          <div style={{ flex: 1 }}>{head}</div>
          {card}
        </AbsoluteFill>,
      )}
    </SceneFrame>
  );
};
