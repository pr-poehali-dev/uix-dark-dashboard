import Icon from "@/components/ui/icon";
import { cities, totals } from "@/data/callcenter";

const maxConvCity = [...cities].sort((a, b) => b.percent - a.percent)[0];
const mainLoss = totals.r4 + totals.r5;
const returned = totals.r10;

const cards = [
  {
    title: "Всего обзвонено",
    value: totals.total.toLocaleString("ru"),
    sub: "11 городов",
    icon: "PhoneCall",
    color: "var(--neon-blue)",
    badge: null,
  },
  {
    title: "Дозвонились",
    value: totals.reached.toLocaleString("ru"),
    sub: `из ${totals.total} пациентов`,
    icon: "PhoneIncoming",
    color: "var(--neon-cyan)",
    badge: { label: `${totals.percent}%`, positive: true },
  },
  {
    title: "Лучшая конверсия",
    value: `${maxConvCity.percent}%`,
    sub: maxConvCity.city,
    icon: "TrendingUp",
    color: "var(--neon-green)",
    badge: { label: `${maxConvCity.reached} чел`, positive: true },
  },
  {
    title: "Возражение «Дорого»",
    value: mainLoss.toLocaleString("ru"),
    sub: `${totals.r4} дорого + ${totals.r5} подумают`,
    icon: "AlertCircle",
    color: "var(--neon-pink)",
    badge: { label: `${((mainLoss / totals.total) * 100).toFixed(1)}%`, positive: false },
  },
  {
    title: "Вернули пациентов",
    value: returned.toString(),
    sub: "рекомендуют лечение у нас",
    icon: "UserCheck",
    color: "var(--neon-purple)",
    badge: { label: `${((returned / totals.total) * 100).toFixed(1)}%`, positive: true },
  },
];

export default function KpiCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="glass rounded-2xl p-4 hover-card animate-fade-in"
          style={{ animationDelay: `${i * 70}ms` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${card.color}18` }}
            >
              <Icon name={card.icon} size={17} style={{ color: card.color }} fallback="Circle" />
            </div>
            {card.badge && (
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                card.badge.positive
                  ? "bg-[rgba(74,222,128,0.1)] text-[var(--neon-green)]"
                  : "bg-[rgba(244,114,182,0.12)] text-[var(--neon-pink)]"
              }`}>
                {card.badge.label}
              </span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground mb-0.5">{card.title}</p>
          <p className="text-2xl font-semibold font-mono-num text-foreground leading-tight">
            {card.value}
          </p>
          <p className="text-[10px] text-muted-foreground mt-1 truncate">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
