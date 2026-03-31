import { useState } from "react";
import { totals, reasonLabels } from "@/data/callcenter";

const reasons = reasonLabels
  .map((r) => ({ ...r, count: totals[r.key] as number }))
  .sort((a, b) => b.count - a.count);

const total = reasons.reduce((s, r) => s + r.count, 0);

function DonutChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const cx = 90;
  const cy = 90;
  const R = 68;
  const r = 42;
  const gap = 1.5;

  let cumAngle = -90;

  const slices = reasons.map((item, i) => {
    const pct = item.count / total;
    const angleDeg = pct * 360;
    const startAngle = cumAngle;
    const endAngle = cumAngle + angleDeg - gap;
    cumAngle += angleDeg;

    const toRad = (d: number) => (d * Math.PI) / 180;
    const x1 = cx + R * Math.cos(toRad(startAngle));
    const y1 = cy + R * Math.sin(toRad(startAngle));
    const x2 = cx + R * Math.cos(toRad(endAngle));
    const y2 = cy + R * Math.sin(toRad(endAngle));
    const x3 = cx + r * Math.cos(toRad(endAngle));
    const y3 = cy + r * Math.sin(toRad(endAngle));
    const x4 = cx + r * Math.cos(toRad(startAngle));
    const y4 = cy + r * Math.sin(toRad(startAngle));
    const largeArc = angleDeg - gap > 180 ? 1 : 0;

    const midAngle = startAngle + (angleDeg - gap) / 2;
    const labelR = (R + r) / 2;
    const lx = cx + labelR * Math.cos(toRad(midAngle));
    const ly = cy + labelR * Math.sin(toRad(midAngle));

    const d = [
      `M ${x1} ${y1}`,
      `A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${r} ${r} 0 ${largeArc} 0 ${x4} ${y4}`,
      "Z",
    ].join(" ");

    return { ...item, d, lx, ly, pct, i };
  });

  const hov = hovered !== null ? slices[hovered] : null;

  return (
    <div className="relative flex-shrink-0">
      <svg width="180" height="180" onMouseLeave={() => setHovered(null)}>
        {slices.map((s) => (
          <path
            key={String(s.key)}
            d={s.d}
            fill={s.color}
            opacity={hovered === null || hovered === s.i ? 1 : 0.35}
            style={{ cursor: "pointer", transition: "opacity 0.15s" }}
            onMouseEnter={() => setHovered(s.i)}
          />
        ))}
        {slices.map((s) => {
          const pctVal = Math.round(s.pct * 100);
          if (pctVal < 4) return null;
          return (
            <text
              key={String(s.key) + "label"}
              x={s.lx}
              y={s.ly}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize="9"
              fontWeight="700"
              style={{ pointerEvents: "none" }}
            >
              {pctVal}%
            </text>
          );
        })}
        {hov ? (
          <>
            <text x={cx} y={cy - 8} textAnchor="middle" fill="white" fontSize="18" fontWeight="700">
              {hov.count}
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle" fill={hov.color} fontSize="8">
              {hov.short}
            </text>
          </>
        ) : (
          <>
            <text x={cx} y={cy - 8} textAnchor="middle" fill="white" fontSize="18" fontWeight="700">
              {total}
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">
              всего
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

export default function ReasonsChart() {
  return (
    <div className="glass rounded-2xl p-5 animate-fade-in" style={{ animationDelay: "180ms" }}>
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-foreground">Причины отказов и статусов</h2>
        <p className="text-[11px] text-muted-foreground mt-0.5">Распределение по всем городам</p>
      </div>

      <div className="flex gap-6 items-start">
        <DonutChart />

        <div className="flex-1 grid grid-cols-2 gap-x-5 gap-y-1.5 self-center">
          {reasons.map((r) => {
            const pct = ((r.count / total) * 100).toFixed(1);
            return (
              <div key={String(r.key)} className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{ background: r.color }}
                />
                <span className="text-[11px] text-muted-foreground truncate flex-1 min-w-0">
                  {r.short}
                </span>
                <span
                  className="text-[11px] font-semibold font-mono-num shrink-0"
                  style={{ color: r.color }}
                >
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
