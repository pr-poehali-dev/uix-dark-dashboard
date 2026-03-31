const months = [
  { label: "Январь", value: 76 },
  { label: "Февраль", value: 82 },
  { label: "Март", value: 35.9 },
];

const W = 560;
const H = 200;
const PAD = { top: 20, right: 20, bottom: 36, left: 44 };
const chartW = W - PAD.left - PAD.right;
const chartH = H - PAD.top - PAD.bottom;

const maxVal = 100;
const gridLines = [0, 25, 50, 75, 100];

function toX(i: number) {
  return PAD.left + (i / (months.length - 1)) * chartW;
}
function toY(v: number) {
  return PAD.top + chartH - (v / maxVal) * chartH;
}

const pts = months.map((m, i) => ({ x: toX(i), y: toY(m.value), ...m }));

function buildCurve(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  const tension = 0.35;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

const linePath = buildCurve(pts);

const areaPath =
  linePath +
  ` L ${pts[pts.length - 1].x} ${PAD.top + chartH}` +
  ` L ${pts[0].x} ${PAD.top + chartH} Z`;

export default function MonthlyChart() {
  return (
    <div className="glass rounded-2xl p-5 animate-fade-in" style={{ animationDelay: "320ms" }}>
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-foreground">% выполнения по месяцам</h2>
        <p className="text-[11px] text-muted-foreground mt-0.5">Динамика процента выполнения плана</p>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 200 }}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.02" />
            </linearGradient>
            <filter id="lineglow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {gridLines.map((g) => (
            <g key={g}>
              <line
                x1={PAD.left}
                y1={toY(g)}
                x2={PAD.left + chartW}
                y2={toY(g)}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
              <text
                x={PAD.left - 6}
                y={toY(g)}
                textAnchor="end"
                dominantBaseline="central"
                fill="rgba(255,255,255,0.25)"
                fontSize="10"
              >
                {g}%
              </text>
            </g>
          ))}

          <path d={areaPath} fill="url(#areaGrad)" />

          <path
            d={linePath}
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#lineglow)"
            className="chart-line"
          />

          {pts.map((p) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r="5" fill="#1e1b2e" stroke="#a78bfa" strokeWidth="2" />
              <text
                x={p.x}
                y={PAD.top + chartH + 18}
                textAnchor="middle"
                fill="rgba(255,255,255,0.35)"
                fontSize="11"
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
