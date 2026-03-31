import { useState } from "react";

const MONTHS = [
  { label: "Янв", short: "Январь",   plan: 80, fact: 76,   calls: 11200 },
  { label: "Фев", short: "Февраль",  plan: 80, fact: 82,   calls: 12100 },
  { label: "Мар", short: "Март",     plan: 80, fact: 35.9, calls: 12847 },
];

const W = 600, H = 200;
const PL = 52, PR = 24, PT = 20, PB = 44;
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
    const cp1x = p1.x + (p2.x - p0.x) * t;
    const cp1y = p1.y + (p2.y - p0.y) * t;
    const cp2x = p2.x - (p3.x - p1.x) * t;
    const cp2y = p2.y - (p3.y - p1.y) * t;
    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
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
    <div className="glass rounded-2xl p-5 animate-rise" style={{ animationDelay: "280ms" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[13px] font-semibold text-foreground">Выполнение плана по месяцам</h2>
          <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
            Факт vs план, %
          </p>
        </div>
        <div className="flex items-center gap-4">
          {[
            { label: "Факт", color: "var(--purple)" },
            { label: "План", color: "rgba(255,255,255,0.2)" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-5 h-[2px] rounded-full" style={{ background: l.color }} />
              <span className="text-[11px]" style={{ color: "hsl(var(--muted-foreground))" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 200 }}>
          <defs>
            <linearGradient id="factGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--purple)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--purple)" stopOpacity="0.0" />
            </linearGradient>
            <filter id="purpleGlow">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Grid */}
          {GRIDS.map((g) => (
            <g key={g}>
              <line
                x1={PL} y1={toY(g)} x2={PL + CW} y2={toY(g)}
                stroke="rgba(255,255,255,0.05)" strokeWidth="1"
                strokeDasharray={g === 0 ? "none" : "4 4"}
              />
              <text
                x={PL - 8} y={toY(g)}
                textAnchor="end" dominantBaseline="central"
                fill="rgba(255,255,255,0.22)" fontSize="10"
                fontFamily="JetBrains Mono"
              >
                {g}%
              </text>
            </g>
          ))}

          {/* Plan line */}
          <path
            d={planLine}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />

          {/* Fact area */}
          <path d={factArea} fill="url(#factGrad)" />

          {/* Fact line */}
          <path
            d={factLine}
            fill="none"
            stroke="var(--purple)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#purpleGlow)"
            className="chart-line"
          />

          {/* Points */}
          {factPts.map((p, i) => {
            const m = MONTHS[i];
            const isHov = hovered === i;
            return (
              <g key={m.label}>
                {/* Hover zone */}
                <rect
                  x={p.x - 30} y={PT - 10} width={60} height={CH + 20}
                  fill="transparent"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "crosshair" }}
                />

                {/* Vertical line on hover */}
                {isHov && (
                  <line
                    x1={p.x} y1={PT} x2={p.x} y2={PT + CH}
                    stroke="rgba(155,135,255,0.25)" strokeWidth="1" strokeDasharray="3 3"
                  />
                )}

                {/* Dot */}
                <circle
                  cx={p.x} cy={p.y} r={isHov ? 6 : 4}
                  fill={isHov ? "var(--purple)" : "hsl(var(--card))"}
                  stroke="var(--purple)"
                  strokeWidth="2"
                  style={{ transition: "all 0.15s ease", filter: isHov ? "drop-shadow(0 0 6px var(--purple))" : "none" }}
                />

                {/* Tooltip */}
                {isHov && (
                  <g>
                    <rect
                      x={p.x - 52} y={p.y - 52} width={104} height={44}
                      rx="8"
                      fill="hsl(228, 22%, 10%)"
                      stroke="rgba(155,135,255,0.3)"
                      strokeWidth="1"
                    />
                    <text x={p.x} y={p.y - 33} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)" fontFamily="Inter">
                      {m.short}
                    </text>
                    <text x={p.x} y={p.y - 17} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--purple)" fontFamily="JetBrains Mono">
                      {m.fact}%
                    </text>
                  </g>
                )}

                {/* X label */}
                <text
                  x={p.x} y={PT + CH + 18}
                  textAnchor="middle"
                  fill={isHov ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)"}
                  fontSize="11"
                  fontFamily="Inter"
                  style={{ transition: "fill 0.15s" }}
                >
                  {m.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
