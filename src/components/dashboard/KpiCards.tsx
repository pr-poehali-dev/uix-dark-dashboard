import Icon from "@/components/ui/icon";
import type { Period } from "@/components/Dashboard";

interface KpiCardsProps {
  period: Period;
}

const kpiData: Record<Period, {
  revenue: string; revDiff: number;
  orders: string; ordDiff: number;
  clients: string; cliDiff: number;
  avgCheck: string; avgDiff: number;
}> = {
  "7d":  { revenue: "1 248 500", revDiff: 8.4,  orders: "342",   ordDiff: 12.1,  clients: "89",    cliDiff: 5.3,   avgCheck: "3 650",  avgDiff: -2.1 },
  "30d": { revenue: "5 812 300", revDiff: 14.7, orders: "1 547", ordDiff: 18.3,  clients: "412",   cliDiff: 22.6,  avgCheck: "3 757",  avgDiff: 3.8  },
  "90d": { revenue: "17 340 000",revDiff: 31.2, orders: "4 821", ordDiff: 29.7,  clients: "1 104", cliDiff: 41.3,  avgCheck: "3 595",  avgDiff: 1.2  },
};

const cards = [
  {
    key: "revenue",
    title: "Выручка",
    icon: "DollarSign",
    suffix: " ₽",
    color: "var(--neon-blue)",
    spark: [40, 55, 48, 70, 62, 80, 90, 85, 95],
  },
  {
    key: "orders",
    title: "Заказы",
    icon: "ShoppingCart",
    suffix: "",
    color: "var(--neon-cyan)",
    spark: [30, 45, 38, 60, 55, 72, 68, 80, 78],
  },
  {
    key: "clients",
    title: "Клиенты",
    icon: "Users",
    suffix: "",
    color: "var(--neon-purple)",
    spark: [20, 28, 32, 40, 38, 50, 55, 60, 65],
  },
  {
    key: "avgCheck",
    title: "Средний чек",
    icon: "Receipt",
    suffix: " ₽",
    color: "var(--neon-orange)",
    spark: [60, 58, 62, 55, 60, 65, 58, 62, 63],
  },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 32;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });
  const area = `M${pts[0]} L${pts.join(" L")} L${w},${h} L0,${h} Z`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <defs>
        <linearGradient id={`grad-${color.replace(/[^a-z]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad-${color.replace(/[^a-z]/gi, "")})`} />
      <polyline points={pts.join(" ")} stroke={color} strokeWidth="1.5" fill="none" className="chart-line" />
    </svg>
  );
}

export default function KpiCards({ period }: KpiCardsProps) {
  const data = kpiData[period];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const value = data[card.key as keyof typeof data] as string;
        const diff = data[`${card.key === "revenue" ? "rev" : card.key === "orders" ? "ord" : card.key === "clients" ? "cli" : "avg"}Diff` as keyof typeof data] as number;
        const isPositive = diff > 0;

        return (
          <div
            key={card.key}
            className="glass rounded-2xl p-5 hover-card animate-fade-in"
            style={{ animationDelay: `${i * 80}ms`, borderColor: `rgba(255,255,255,0.055)` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${card.color}20` }}
              >
                <Icon name={card.icon} size={17} style={{ color: card.color }} fallback="Circle" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                isPositive
                  ? "bg-[rgba(74,222,128,0.1)] text-[var(--neon-green)]"
                  : "bg-[rgba(248,113,113,0.1)] text-[#f87171]"
              }`}>
                <Icon name={isPositive ? "TrendingUp" : "TrendingDown"} size={11} />
                {isPositive ? "+" : ""}{diff}%
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-0.5">{card.title}</p>
              <p className="text-2xl font-semibold font-mono-num text-foreground">
                {value}{card.suffix}
              </p>
            </div>

            <Sparkline data={card.spark} color={card.color} />
          </div>
        );
      })}
    </div>
  );
}
