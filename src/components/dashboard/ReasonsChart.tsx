import { useState } from "react";

const DATA = [
  { label: "Согласился",    value: 38, color: "var(--emerald)", soft: "var(--emerald-soft)" },
  { label: "Перезвон",      value: 22, color: "var(--violet)",  soft: "var(--violet-soft)"  },
  { label: "Не интересует", value: 18, color: "var(--rose)",    soft: "var(--rose-soft)"    },
  { label: "Занято / н/о",  value: 13, color: "var(--amber)",   soft: "var(--amber-soft)"   },
  { label: "Другое",        value: 9,  color: "var(--sky)",     soft: "var(--sky-soft)"     },
];

const CX = 90, CY = 90, R_OUT = 74, R_IN = 48;

function DonutSlice({
  start, end, color, isHovered, onHover, onLeave,
}: {
  start: number; end: number; color: string;
  isHovered: boolean; onHover: () => void; onLeave: () => void;
}) {
  const gap = 0.035;
  const s = start + gap, e = end - gap;
  const ro = isHovered ? R_OUT + 4 : R_OUT;

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
      opacity={isHovered ? 1 : 0.75}
      style={{
        transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
        cursor: "pointer",
        filter: isHovered ? `drop-shadow(0 4px 12px ${color})` : "none",
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
    <div className="card-base p-5 h-full animate-rise" style={{ animationDelay: "260ms" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[14px] font-bold text-[var(--slate-900)]">Причины результата</h2>
          <p className="text-[11px] text-[var(--slate-400)] mt-0.5">Распределение по итогам</p>
        </div>
        <span className="text-[11px] font-semibold px-3 py-1 rounded-lg bg-[var(--slate-100)] text-[var(--slate-500)]">
          {total}%
        </span>
      </div>

      <div className="flex items-center gap-5">
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
            <circle cx={CX} cy={CY} r={R_IN - 3} fill="white" />
            {activeItem ? (
              <>
                <text x={CX} y={CY - 6} textAnchor="middle" fontSize="20" fontWeight="800" fill={activeItem.color} fontFamily="JetBrains Mono">
                  {activeItem.value}%
                </text>
                <text x={CX} y={CY + 12} textAnchor="middle" fontSize="9" fontWeight="500" fill="var(--slate-400)" fontFamily="Inter">
                  {activeItem.label.length > 12 ? activeItem.label.slice(0, 12) + "…" : activeItem.label}
                </text>
              </>
            ) : (
              <>
                <text x={CX} y={CY - 4} textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--slate-900)" fontFamily="JetBrains Mono">
                  {total}
                </text>
                <text x={CX} y={CY + 13} textAnchor="middle" fontSize="9" fontWeight="500" fill="var(--slate-400)" fontFamily="Inter">
                  всего %
                </text>
              </>
            )}
          </svg>
        </div>

        <div className="flex-1 space-y-1 min-w-0">
          {DATA.map((d, i) => (
            <div
              key={d.label}
              className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2 transition-all duration-150"
              style={{ background: hovered === i ? d.soft : "transparent" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="w-3 h-3 rounded flex-shrink-0"
                style={{ background: d.color, borderRadius: 4 }}
              />
              <span
                className="text-[12px] font-medium flex-1 truncate"
                style={{ color: hovered === i ? "var(--slate-900)" : "var(--slate-500)" }}
              >
                {d.label}
              </span>
              <span className="text-[13px] font-bold font-mono-num flex-shrink-0" style={{ color: d.color }}>
                {d.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
