import { useState } from "react";

const DATA = [
  { label: "Согласился",    value: 38, color: "#01b574",  colorDim: "rgba(1,181,116,0.15)"   },
  { label: "Перезвон",      value: 22, color: "#0075ff",  colorDim: "rgba(0,117,255,0.15)"   },
  { label: "Не интересует", value: 18, color: "#e31a1a",  colorDim: "rgba(227,26,26,0.15)"   },
  { label: "Занято / н/о",  value: 13, color: "#f6ad55",  colorDim: "rgba(246,173,85,0.15)"  },
  { label: "Другое",        value: 9,  color: "#9f7aea",  colorDim: "rgba(159,122,234,0.15)" },
];

const CX = 90, CY = 90, R_OUT = 74, R_IN = 44;

function DonutSlice({
  start, end, color, isHovered, onHover, onLeave,
}: {
  start: number; end: number; color: string;
  isHovered: boolean; onHover: () => void; onLeave: () => void;
}) {
  const gap = 0.025;
  const s = start + gap, e = end - gap;
  const ro = isHovered ? R_OUT + 6 : R_OUT;

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
      opacity={isHovered ? 1 : 0.8}
      style={{
        transition: "all 0.22s cubic-bezier(0.34,1.61,0.7,1.3)",
        cursor: "pointer",
        filter: isHovered ? `drop-shadow(0 0 10px ${color})` : "none",
      }}
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
    <div className="vui-card rounded-2xl p-5 h-full animate-rise" style={{ animationDelay: "140ms" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[14px] font-bold text-white">Причины результата</h2>
          <p className="text-[11px] mt-0.5" style={{ color: "#a0aec0" }}>
            Распределение по итогам
          </p>
        </div>
        <span
          className="text-[11px] font-semibold px-3 py-1 rounded-xl"
          style={{
            background: "rgba(0,117,255,0.12)",
            border: "1px solid rgba(0,117,255,0.2)",
            color: "#0075ff",
          }}
        >
          {total} звонков
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Donut */}
        <div className="flex-shrink-0">
          <svg width={180} height={180} viewBox="0 0 180 180">
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
            <circle cx={CX} cy={CY} r={R_IN - 2} fill="rgba(10,14,35,0.95)" />
            {activeItem ? (
              <>
                <text x={CX} y={CY - 8} textAnchor="middle" fontSize="19" fontWeight="700" fill={activeItem.color} fontFamily="JetBrains Mono">
                  {activeItem.value}%
                </text>
                <text x={CX} y={CY + 10} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.45)" fontFamily="Plus Jakarta Sans">
                  {activeItem.label.length > 10 ? activeItem.label.slice(0, 10) + "…" : activeItem.label}
                </text>
              </>
            ) : (
              <>
                <text x={CX} y={CY - 6} textAnchor="middle" fontSize="22" fontWeight="700" fill="white" fontFamily="JetBrains Mono">
                  {total}
                </text>
                <text x={CX} y={CY + 12} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.35)" fontFamily="Plus Jakarta Sans">
                  всего
                </text>
              </>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-1.5 min-w-0">
          {DATA.map((d, i) => (
            <div
              key={d.label}
              className="flex items-center gap-2.5 cursor-pointer rounded-xl px-2.5 py-2 transition-all duration-150"
              style={{
                background: hovered === i ? d.colorDim : "transparent",
                border: `1px solid ${hovered === i ? d.color + "33" : "transparent"}`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: d.color, boxShadow: hovered === i ? `0 0 8px ${d.color}` : "none" }}
              />
              <span
                className="text-[12px] font-medium flex-1 truncate"
                style={{ color: hovered === i ? "#fff" : "#a0aec0" }}
              >
                {d.label}
              </span>
              <span
                className="text-[13px] font-bold font-mono-num flex-shrink-0"
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
