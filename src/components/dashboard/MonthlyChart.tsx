import { useState } from "react";

const MONTHS = [
  { label: "Янв", short: "Январь",  plan: 80, fact: 76,   calls: 11200 },
  { label: "Фев", short: "Февраль", plan: 80, fact: 82,   calls: 12100 },
  { label: "Мар", short: "Март",    plan: 80, fact: 35.9, calls: 12847 },
];

const W = 600, H = 220;
const PL = 52, PR = 24, PT = 24, PB = 44;
const CW = W - PL - PR;
const CH = H - PT - PB;
const MAX = 100;
const GRIDS = [0, 25, 50, 75, 100];

const toX = (i: number, total: number) => PL + (i / (total - 1)) * CW;
const toY = (v: number) => PT + CH - (v / MAX) * CH;

function buildSmooth(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    const t = 0.3;
    d += ` C ${p1.x + (p2.x - p0.x) * t} ${p1.y + (p2.y - p0.y) * t} ${p2.x - (p3.x - p1.x) * t} ${p2.y - (p3.y - p1.y) * t} ${p2.x} ${p2.y}`;
  }
  return d;
}

export default function MonthlyChart() {
  const [hovered, setHovered] = useState<number | null>(null);

  const factPts = MONTHS.map((m, i) => ({ x: toX(i, MONTHS.length), y: toY(m.fact) }));
  const planPts = MONTHS.map((m, i) => ({ x: toX(i, MONTHS.length), y: toY(m.plan) }));
  const factLine = buildSmooth(factPts);
  const planLine = buildSmooth(planPts);
  const factArea = factLine + ` L ${factPts[factPts.length - 1].x} ${PT + CH} L ${factPts[0].x} ${PT + CH} Z`;

  return (
    <div className="card-base p-5 animate-rise" style={{ animationDelay: "380ms" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[14px] font-bold text-[var(--slate-900)]">Выполнение плана</h2>
          <p className="text-[11px] text-[var(--slate-400)] mt-0.5">Факт vs план, % конверсии по месяцам</p>
        </div>
        <div className="flex items-center gap-5">
          {[
            { label: "Факт", color: "var(--violet)" },
            { label: "План", color: "var(--slate-300)" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <div className="w-5 h-[3px] rounded-full" style={{ background: l.color }} />
              <span className="text-[11px] font-medium text-[var(--slate-500)]">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 220 }}>
        <defs>
          <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {GRIDS.map((g) => (
          <g key={g}>
            <line x1={PL} y1={toY(g)} x2={PL + CW} y2={toY(g)} stroke="var(--slate-200)" strokeWidth="1" strokeDasharray="4 4" />
            <text x={PL - 8} y={toY(g)} textAnchor="end" dominantBaseline="central" fill="var(--slate-400)" fontSize="10" fontFamily="JetBrains Mono">
              {g}%
            </text>
          </g>
        ))}

        <path d={planLine} fill="none" stroke="var(--slate-300)" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" />
        <path d={factArea} fill="url(#fg)" />
        <path d={factLine} fill="none" stroke="var(--violet)" strokeWidth="3" strokeLinecap="round" className="chart-line" />

        {factPts.map((p, i) => {
          const m = MONTHS[i];
          const isHov = hovered === i;
          return (
            <g key={m.label}>
              <rect
                x={p.x - 35} y={PT - 10} width={70} height={CH + 20}
                fill="transparent"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "crosshair" }}
              />
              {isHov && (
                <line x1={p.x} y1={PT} x2={p.x} y2={PT + CH} stroke="var(--violet)" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 3" />
              )}
              <circle
                cx={p.x} cy={p.y} r={isHov ? 7 : 5}
                fill={isHov ? "var(--violet)" : "white"}
                stroke="var(--violet)"
                strokeWidth="2.5"
                style={{ transition: "all 0.2s ease" }}
              />
              {isHov && (
                <g>
                  <rect x={p.x - 52} y={p.y - 54} width={104} height={44} rx="12" fill="white" stroke="var(--slate-200)" strokeWidth="1" filter="url(#shadow)" />
                  <text x={p.x} y={p.y - 35} textAnchor="middle" fontSize="10" fontWeight="500" fill="var(--slate-400)" fontFamily="Inter">
                    {m.short}
                  </text>
                  <text x={p.x} y={p.y - 17} textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--violet)" fontFamily="JetBrains Mono">
                    {m.fact}%
                  </text>
                </g>
              )}
              <text
                x={p.x} y={PT + CH + 20}
                textAnchor="middle"
                fill={isHov ? "var(--slate-700)" : "var(--slate-400)"}
                fontSize="11" fontFamily="Inter"
                fontWeight={isHov ? "600" : "400"}
                style={{ transition: "fill 0.15s" }}
              >
                {m.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
