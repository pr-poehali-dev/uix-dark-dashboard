const CARDS = [
  {
    label: "Всего обзвонов",
    value: "12 847",
    sub: "+8.3% за март",
    dir: "up",
    iconName: "PhoneCall",
    iconClass: "vui-icon-box",
    sparkData: [40, 55, 48, 62, 58, 72, 68, 80, 76, 88, 84, 95],
    accentColor: "#0075ff",
  },
  {
    label: "Дозвонились",
    value: "9 204",
    sub: "+4.1% к прошлому",
    dir: "up",
    iconName: "CheckCircle",
    iconClass: "vui-icon-box-green",
    sparkData: [30, 42, 38, 52, 47, 60, 55, 68, 64, 72, 70, 78],
    accentColor: "#01b574",
  },
  {
    label: "Конверсия",
    value: "35.9%",
    sub: "−14.1% от плана",
    dir: "down",
    iconName: "TrendingDown",
    iconClass: "vui-icon-box-red",
    sparkData: [70, 65, 60, 58, 55, 52, 48, 45, 42, 40, 38, 36],
    accentColor: "#e31a1a",
  },
  {
    label: "Ср. время звонка",
    value: "3:42",
    sub: "+0:18 к прошлому",
    dir: "up",
    iconName: "Clock",
    iconClass: "vui-icon-box-purple",
    sparkData: [55, 58, 54, 60, 62, 58, 64, 60, 66, 62, 68, 65],
    accentColor: "#4318ff",
  },
];

const W = 110;
const H = 36;
const PAD = 3;

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
  const id = `sg-${color.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={d} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chart-line" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3" fill={color} />
    </svg>
  );
}

import Icon from "@/components/ui/icon";

export default function KpiCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
      {CARDS.map((c, i) => (
        <div
          key={c.label}
          className="vui-card vui-card-hover rounded-2xl p-5 cursor-default animate-rise"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          {/* Top row: icon + spark */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-11 h-11 ${c.iconClass} flex-shrink-0`}>
              <Icon name={c.iconName} size={20} className="text-white" fallback="Activity" />
            </div>
            <div className="opacity-90">
              <Spark data={c.sparkData} color={c.accentColor} />
            </div>
          </div>

          {/* Value */}
          <p
            className="text-[26px] font-bold font-mono-num leading-none tracking-tight mb-1"
            style={{ color: "#fff" }}
          >
            {c.value}
          </p>

          {/* Label */}
          <p className="text-[12px] font-semibold mb-2" style={{ color: "#a0aec0" }}>
            {c.label}
          </p>

          {/* Delta */}
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
              c.dir === "up" ? "badge-up" : "badge-down"
            }`}
          >
            {c.dir === "up" ? "↑" : "↓"} {c.sub}
          </span>
        </div>
      ))}
    </div>
  );
}
