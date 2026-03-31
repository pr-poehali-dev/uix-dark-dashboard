import { useState } from "react";
import Icon from "@/components/ui/icon";

const products = [
  { rank: 1,  name: "iPhone 15 Pro",       category: "Электроника", sales: 142, revenue: "14 090 000", trend: 22.4, color: "var(--neon-blue)" },
  { rank: 2,  name: "AirPods Pro 2",        category: "Электроника", sales: 98,  revenue: "2 156 000",  trend: 15.1, color: "var(--neon-blue)" },
  { rank: 3,  name: "Nike Air Max",         category: "Спорт",       sales: 87,  revenue: "869 300",   trend: -4.2, color: "var(--neon-orange)" },
  { rank: 4,  name: "Куртка зимняя Zara",   category: "Одежда",      sales: 74,  revenue: "591 000",   trend: 8.7,  color: "var(--neon-purple)" },
  { rank: 5,  name: "MacBook Air M3",       category: "Электроника", sales: 55,  revenue: "8 800 000",  trend: 31.0, color: "var(--neon-blue)" },
  { rank: 6,  name: "Набор специй Spice",   category: "Продукты",    sales: 213, revenue: "106 500",   trend: 5.2,  color: "var(--neon-cyan)" },
  { rank: 7,  name: "Гантели 20 кг",        category: "Спорт",       sales: 48,  revenue: "192 000",   trend: -1.8, color: "var(--neon-orange)" },
];

type SortKey = "sales" | "revenue";

export default function TopTable() {
  const [sort, setSort] = useState<SortKey>("revenue");

  const sorted = [...products].sort((a, b) => {
    if (sort === "revenue") {
      return parseInt(b.revenue.replace(/\s/g, "")) - parseInt(a.revenue.replace(/\s/g, ""));
    }
    return b.sales - a.sales;
  });

  return (
    <div className="glass rounded-2xl p-5 animate-fade-in" style={{ animationDelay: "360ms" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Топ товары</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Лидеры продаж</p>
        </div>
        <div className="flex items-center gap-1 bg-[hsl(var(--muted))] rounded-lg p-0.5">
          <button
            onClick={() => setSort("revenue")}
            className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${
              sort === "revenue" ? "bg-[var(--neon-blue)] text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Выручка
          </button>
          <button
            onClick={() => setSort("sales")}
            className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${
              sort === "sales" ? "bg-[var(--neon-blue)] text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Продажи
          </button>
        </div>
      </div>

      <div className="space-y-1">
        {sorted.map((p, i) => {
          const isPos = p.trend > 0;
          return (
            <div
              key={p.rank}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-colors group"
            >
              <span
                className="w-5 text-center text-xs font-mono-num font-semibold shrink-0"
                style={{ color: i < 3 ? p.color : "hsl(var(--muted-foreground))" }}
              >
                {i + 1}
              </span>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate group-hover:text-white transition-colors">
                  {p.name}
                </p>
                <p className="text-[10px] text-muted-foreground">{p.category}</p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-xs font-mono-num font-medium text-foreground">
                  {sort === "revenue" ? `${p.revenue} ₽` : `${p.sales} шт`}
                </p>
                <p className={`text-[10px] font-medium ${isPos ? "text-[var(--neon-green)]" : "text-[#f87171]"}`}>
                  {isPos ? "+" : ""}{p.trend}%
                </p>
              </div>

              {i < 3 && (
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        <p className="text-[10px] text-muted-foreground">Показано {sorted.length} из 247 товаров</p>
        <button className="flex items-center gap-1 text-[10px] text-[var(--neon-blue)] hover:text-blue-400 transition-colors">
          Все товары
          <Icon name="ChevronRight" size={12} />
        </button>
      </div>
    </div>
  );
}
