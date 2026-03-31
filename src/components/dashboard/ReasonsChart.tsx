import { useState } from "react";

const DATA = [
  { label: "Согласился",     value: 38, color: "var(--green)",  colorDim: "var(--green-dim)" },
  { label: "Перезвон",       value: 22, color: "var(--blue)",   colorDim: "var(--blue-dim)"  },
  { label: "Не интересует",  value: 18, color: "var(--red)",    colorDim: "var(--red-dim)"   },
  { label: "Занято / н/о",   value: 13, color: "var(--amber)",  colorDim: "var(--amber-dim)" },
  { label: "Другое",         value: 9,  color: "var(--purple)", colorDim: "var(--purple-dim)"},
];

const CX = 90, CY = 90, R_OUT = 74, R_IN = 44;

function toPath(startAngle: number, endAngle: number, rx: number, ry: number) {
  const s = { x: CX + rx * Math.cos(startAngle), y: CY + ry * Math.sin(startAngle) };
  const e = { x: CX + rx * Math.cos(endAngle),   y: CY + ry * Math.sin(endAngle)   };
  const large = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${s.x} ${s.y} A ${rx} ${ry} 0 ${large} 1 ${e.x} ${e.y}`;
}

function DonutSlice({
  start, end, color, isHovered, onHover, onLeave,
}: {
  start: number; end: number; color: string;
  isHovered: boolean; onHover: () => void; onLeave: () => void;
}) {
  const gap = 0.025;
  const s = start + gap, e = end - gap;
  const ro = isHovered ? R_OUT + 5 : R_OUT;

  const p1 = { x: CX + ro * Math.cos(s),   y: CY + ro * Math.sin(s) };
  const p2 = { x: CX + ro * Math.cos(e),   y: CY + ro * Math.sin(e) };
  const p3 = { x: CX + R_IN * Math.cos(e), y: CY + R_IN * Math.sin(e) };
  const p4 = { x: CX + R_IN * Math.cos(s), y: CY + R_IN * Math.sin(s) };
  const large = e - s > Math.PI ? 1 : 0;

  const d = `M ${p1.x} ${p1.y} A ${ro} ${ro} 0 ${large} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${R_IN} ${R_IN} 0 ${large} 0 ${p4.x} ${p4.y} Z`;

  return (
    <path
      d={d}
      fill={color}
      opacity={isHovered ? 1 : 0.82}
      style={{ transition: "all 0.2s ease", cursor: "pointer", filter: isHovered ? `drop-shadow(0 0 8px ${color})` : "none" }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    />
  );
}

export default function ReasonsChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const total = DATA.reduce((s, d) => s + d.value, 0);

  let angle = -Math.PI / 2;
  const slices = DATA.map((d) => {
    const sweep = (d.value / total) * 2 * Math.PI;
    const s = angle;
    angle += sweep;
    return { ...d, start: s, end: angle };
  });

  const activeItem = hovered !== null ? DATA[hovered] : null;

  return (
    <div className="glass rounded-2xl p-5 h-full animate-rise" style={{ animationDelay: "140ms" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[13px] font-semibold text-foreground">Причины результата</h2>
          <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
            Распределение по итогам
          </p>
        </div>
        <span
          className="text-[11px] font-medium px-2.5 py-1 rounded-lg"
          style={{ background: "rgba(255,255,255,0.04)", color: "hsl(var(--muted-foreground))" }}
        >
          {total} звонков
        </span>
      </div>

      <div className="flex items-center gap-5">
        {/* Donut */}
        <div className="flex-shrink-0">
          <svg width={180} height={180} viewBox="0 0 180 180">
            <defs>
              <filter id="donut-shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.3" />
              </filter>
            </defs>
            {slices.map((sl, i) => (
              <DonutSlice
                key={sl.label}
                start={sl.start}
                end={sl.end}
                color={sl.color}
                isHovered={hovered === i}
                onHover={() => setHovered(i)}
                onLeave={() => setHovered(null)}
              />
            ))}

            {/* Center */}
            <circle cx={CX} cy={CY} r={R_IN - 2} fill="hsl(var(--card))" />
            {activeItem ? (
              <>
                <text x={CX} y={CY - 8} textAnchor="middle" fontSize="18" fontWeight="700" fill={activeItem.color} fontFamily="JetBrains Mono">
                  {activeItem.value}%
                </text>
                <text x={CX} y={CY + 10} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)">
                  {activeItem.label.length > 10 ? activeItem.label.slice(0, 10) + "…" : activeItem.label}
                </text>
              </>
            ) : (
              <>
                <text x={CX} y={CY - 6} textAnchor="middle" fontSize="20" fontWeight="700" fill="white" fontFamily="JetBrains Mono">
                  {total}
                </text>
                <text x={CX} y={CY + 11} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.35)">
                  всего
                </text>
              </>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2.5 min-w-0">
          {DATA.map((d, i) => (
            <div
              key={d.label}
              className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2 py-1.5 transition-all duration-150"
              style={{
                background: hovered === i ? d.colorDim : "transparent",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: d.color, boxShadow: hovered === i ? `0 0 6px ${d.color}` : "none" }}
              />
              <span
                className="text-[12px] flex-1 truncate"
                style={{ color: hovered === i ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
              >
                {d.label}
              </span>
              <span
                className="text-[13px] font-semibold font-mono-num flex-shrink-0"
                style={{ color: d.color }}
              >
                {d.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
