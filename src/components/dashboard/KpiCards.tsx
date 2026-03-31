const CARDS = [
  {
    label: "Всего обзвонов",
    value: "12 847",
    sub: "за март 2026",
    delta: "+8.3%",
    dir: "up",
    icon: "📞",
    accent: "var(--blue)",
    accentDim: "var(--blue-dim)",
    sparkData: [40, 55, 48, 62, 58, 72, 68, 80, 76, 88, 84, 95],
  },
  {
    label: "Дозвонились",
    value: "9 204",
    sub: "71.7% от базы",
    delta: "+4.1%",
    dir: "up",
    icon: "✅",
    accent: "var(--green)",
    accentDim: "var(--green-dim)",
    sparkData: [30, 42, 38, 52, 47, 60, 55, 68, 64, 72, 70, 78],
  },
  {
    label: "Конверсия",
    value: "35.9%",
    sub: "выполнение плана",
    delta: "−14.1%",
    dir: "down",
    icon: "📊",
    accent: "var(--red)",
    accentDim: "var(--red-dim)",
    sparkData: [70, 65, 60, 58, 55, 52, 48, 45, 42, 40, 38, 36],
  },
  {
    label: "Ср. время звонка",
    value: "3:42",
    sub: "мин:сек",
    delta: "+0:18",
    dir: "up",
    icon: "⏱",
    accent: "var(--purple)",
    accentDim: "var(--purple-dim)",
    sparkData: [55, 58, 54, 60, 62, 58, 64, 60, 66, 62, 68, 65],
  },
];

const W = 120;
const H = 40;
const PAD = 4;

function Spark({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = (W - PAD * 2) / (data.length - 1);
  const toX = (i: number) => PAD + i * step;
  const toY = (v: number) => PAD + (H - PAD * 2) * (1 - (v - min) / range);
  const pts = data.map((v, i) => [toX(i), toY(v)] as [number, number]);

  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const cpx = (x1 + x2) / 2;
    d += ` C ${cpx} ${y1} ${cpx} ${y2} ${x2} ${y2}`;
  }

  const area = d + ` L ${pts[pts.length - 1][0]} ${H + 2} L ${pts[0][0]} ${H + 2} Z`;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      <defs>
        <linearGradient id={`sg-${color.replace(/[^a-z]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sg-${color.replace(/[^a-z]/gi, "")})`} />
      <path d={d} stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="chart-line" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.5" fill={color} />
    </svg>
  );
}

export default function KpiCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {CARDS.map((c, i) => (
        <div
          key={c.label}
          className="glass glass-hover rounded-2xl p-5 animate-rise cursor-default"
          style={{ animationDelay: `${i * 70}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p
                className="text-[11px] font-medium uppercase tracking-[0.08em]"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {c.label}
              </p>
              <p
                className="text-[11px] mt-0.5"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {c.sub}
              </p>
            </div>
            <span
              className="text-[18px] w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: c.accentDim }}
            >
              {c.icon}
            </span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p
                className="text-[28px] font-bold font-mono-num leading-none tracking-tight"
                style={{ color: c.accent }}
              >
                {c.value}
              </p>
              <span
                className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  c.dir === "up" ? "badge-up" : "badge-down"
                }`}
              >
                {c.dir === "up" ? "↑" : "↓"} {c.delta} к прошлому
              </span>
            </div>
            <div className="opacity-80">
              <Spark data={c.sparkData} color={c.accent} />
            </div>
          </div>

          {/* bottom accent line */}
          <div
            className="absolute bottom-0 left-5 right-5 h-[1px] rounded-full opacity-40"
            style={{ background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }}
          />
        </div>
      ))}
    </div>
  );
}
