import Icon from "@/components/ui/icon";

const CARDS = [
  {
    label: "Всего обзвонов",
    value: "12 847",
    delta: "+8.3%",
    dir: "up",
    iconName: "Phone",
    iconBg: "bg-[var(--violet-soft)]",
    iconColor: "text-[var(--violet)]",
    sparkData: [40, 55, 48, 62, 58, 72, 68, 80, 76, 88, 84, 95],
    sparkColor: "var(--violet)",
  },
  {
    label: "Дозвонились",
    value: "9 204",
    delta: "+4.1%",
    dir: "up",
    iconName: "CheckCircle",
    iconBg: "bg-[var(--emerald-soft)]",
    iconColor: "text-[var(--emerald)]",
    sparkData: [30, 42, 38, 52, 47, 60, 55, 68, 64, 72, 70, 78],
    sparkColor: "var(--emerald)",
  },
  {
    label: "Конверсия",
    value: "35.9%",
    delta: "−14.1%",
    dir: "down",
    iconName: "TrendingDown",
    iconBg: "bg-[var(--rose-soft)]",
    iconColor: "text-[var(--rose)]",
    sparkData: [70, 65, 60, 58, 55, 52, 48, 45, 42, 40, 38, 36],
    sparkColor: "var(--rose)",
  },
  {
    label: "Ср. время звонка",
    value: "3:42",
    delta: "+0:18",
    dir: "up",
    iconName: "Clock",
    iconBg: "bg-[var(--sky-soft)]",
    iconColor: "text-[var(--sky)]",
    sparkData: [55, 58, 54, 60, 62, 58, 64, 60, 66, 62, 68, 65],
    sparkColor: "var(--sky)",
  },
];

const W = 100, H = 32, PAD = 2;

function Spark({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = (W - PAD * 2) / (data.length - 1);
  const pts = data.map((v, i) => [PAD + i * step, PAD + (H - PAD * 2) * (1 - (v - min) / range)] as [number, number]);

  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const cpx = (pts[i][0] + pts[i + 1][0]) / 2;
    d += ` C ${cpx} ${pts[i][1]} ${cpx} ${pts[i + 1][1]} ${pts[i + 1][0]} ${pts[i + 1][1]}`;
  }
  const area = d + ` L ${pts[pts.length - 1][0]} ${H} L ${pts[0][0]} ${H} Z`;
  const id = `sp-${color.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" className="opacity-60">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" className="chart-line" />
    </svg>
  );
}

export default function KpiCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {CARDS.map((c, i) => (
        <div
          key={c.label}
          className="card-base card-lift p-5 cursor-default animate-rise"
          style={{ animationDelay: `${i * 60 + 100}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl ${c.iconBg} ${c.iconColor} flex items-center justify-center`}>
              <Icon name={c.iconName} size={18} fallback="Activity" />
            </div>
            <Spark data={c.sparkData} color={c.sparkColor} />
          </div>

          <p className="text-[24px] font-extrabold font-mono-num text-[var(--slate-900)] leading-none tracking-tight">
            {c.value}
          </p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[12px] font-medium text-[var(--slate-500)]">{c.label}</p>
            <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] font-bold ${
              c.dir === "up" ? "badge-up" : "badge-down"
            }`}>
              <Icon name={c.dir === "up" ? "TrendingUp" : "TrendingDown"} size={10} />
              {c.delta}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
