import { useState } from "react";

const segments = [
  { label: "Электроника",  value: 38, color: "var(--neon-blue)" },
  { label: "Одежда",       value: 24, color: "var(--neon-purple)" },
  { label: "Продукты",     value: 18, color: "var(--neon-cyan)" },
  { label: "Спорт",        value: 12, color: "var(--neon-orange)" },
  { label: "Прочее",       value: 8,  color: "var(--neon-pink)" },
];

function polarToXY(angle: number, r: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) };
}

function describeArc(start: number, end: number, r: number, ri: number) {
  const s = polarToXY(start, r);
  const e = polarToXY(end, r);
  const si = polarToXY(start, ri);
  const ei = polarToXY(end, ri);
  const large = end - start > 180 ? 1 : 0;
  return [
    `M ${s.x} ${s.y}`,
    `A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`,
    `L ${ei.x} ${ei.y}`,
    `A ${ri} ${ri} 0 ${large} 0 ${si.x} ${si.y}`,
    "Z",
  ].join(" ");
}

export default function DonutChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const total = segments.reduce((a, s) => a + s.value, 0);

  let cumulative = 0;
  const arcs = segments.map((seg, i) => {
    const start = (cumulative / total) * 360;
    cumulative += seg.value;
    const end = (cumulative / total) * 360;
    return { ...seg, start, end, i };
  });

  const active = hovered !== null ? segments[hovered] : null;

  return (
    <div className="glass rounded-2xl p-5 h-full animate-fade-in" style={{ animationDelay: "280ms" }}>
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-foreground">По категориям</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Доля в выручке</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative w-44 h-44">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-0">
            {arcs.map((arc) => (
              <path
                key={arc.i}
                d={describeArc(arc.start, arc.end, 44, 30)}
                fill={arc.color}
                opacity={hovered === null || hovered === arc.i ? 1 : 0.35}
                onMouseEnter={() => setHovered(arc.i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  cursor: "pointer",
                  transform: hovered === arc.i ? "scale(1.04)" : "scale(1)",
                  transformOrigin: "50px 50px",
                  transition: "all 0.2s ease",
                  filter: hovered === arc.i ? `drop-shadow(0 0 4px ${arc.color})` : "none",
                }}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {active ? (
              <>
                <p className="text-xl font-semibold font-mono-num" style={{ color: active.color }}>
                  {active.value}%
                </p>
                <p className="text-[10px] text-muted-foreground text-center leading-tight mt-0.5 max-w-[60px]">
                  {active.label}
                </p>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold text-foreground font-mono-num">{total}%</p>
                <p className="text-[10px] text-muted-foreground">Всего</p>
              </>
            )}
          </div>
        </div>

        <div className="w-full space-y-2">
          {segments.map((seg, i) => (
            <div
              key={i}
              className="flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ background: seg.color, opacity: hovered === null || hovered === i ? 1 : 0.4 }}
              />
              <span className={`text-xs flex-1 transition-colors ${hovered === i ? "text-foreground" : "text-muted-foreground"}`}>
                {seg.label}
              </span>
              <span className="text-xs font-mono-num font-medium" style={{ color: hovered === i ? seg.color : undefined }}>
                {seg.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
