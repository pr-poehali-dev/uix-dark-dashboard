import { useState } from "react";

const categories = [
  {
    name: "Электроника",
    revenue: "2 210 400",
    orders: 612,
    growth: 18.4,
    color: "var(--neon-blue)",
    bars: [55, 62, 48, 70, 78, 82, 90, 85, 95, 88, 93, 100],
  },
  {
    name: "Одежда",
    revenue: "1 394 700",
    orders: 389,
    growth: 11.2,
    color: "var(--neon-purple)",
    bars: [40, 45, 50, 42, 55, 60, 52, 65, 58, 70, 62, 75],
  },
  {
    name: "Продукты питания",
    revenue: "1 046 200",
    orders: 1024,
    growth: 6.8,
    color: "var(--neon-cyan)",
    bars: [70, 68, 72, 65, 75, 70, 78, 73, 80, 76, 82, 85],
  },
  {
    name: "Спорт и отдых",
    revenue: "697 500",
    orders: 201,
    growth: -3.1,
    color: "var(--neon-orange)",
    bars: [60, 55, 58, 62, 50, 54, 48, 52, 45, 50, 47, 52],
  },
  {
    name: "Прочее",
    revenue: "465 000",
    orders: 132,
    growth: 2.4,
    color: "var(--neon-pink)",
    bars: [30, 32, 35, 28, 38, 33, 40, 36, 42, 38, 45, 41],
  },
];

function MiniBarChart({ bars, color }: { bars: number[]; color: string }) {
  const max = Math.max(...bars);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {bars.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all duration-700"
          style={{
            height: `${(v / max) * 100}%`,
            background: color,
            opacity: 0.6 + (i / bars.length) * 0.4,
          }}
        />
      ))}
    </div>
  );
}

export default function CategoryStats() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="glass rounded-2xl p-5 animate-fade-in" style={{ animationDelay: "320ms" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Статистика по категориям</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Выручка и динамика продаж</p>
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((cat, i) => {
          const isPos = cat.growth > 0;
          const isSel = selected === i;
          return (
            <div
              key={i}
              className="rounded-xl p-3 cursor-pointer transition-all duration-200"
              style={{
                background: isSel ? `${cat.color}08` : "transparent",
                border: `1px solid ${isSel ? `${cat.color}30` : "rgba(255,255,255,0.04)"}`,
              }}
              onClick={() => setSelected(isSel ? null : i)}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-1 h-8 rounded-full shrink-0"
                  style={{ background: cat.color }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground truncate">{cat.name}</span>
                    <div className={`flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ml-2 ${
                      isPos
                        ? "bg-[rgba(74,222,128,0.1)] text-[var(--neon-green)]"
                        : "bg-[rgba(248,113,113,0.1)] text-[#f87171]"
                    }`}>
                      {isPos ? "↑" : "↓"} {Math.abs(cat.growth)}%
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs font-semibold font-mono-num text-foreground">{cat.revenue} ₽</p>
                      <p className="text-[10px] text-muted-foreground">{cat.orders} заказов</p>
                    </div>
                    <div className="flex-1">
                      <MiniBarChart bars={cat.bars} color={cat.color} />
                    </div>
                  </div>
                </div>
              </div>

              {isSel && (
                <div className="mt-3 pt-3 border-t grid grid-cols-3 gap-3" style={{ borderColor: `${cat.color}20` }}>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Конверсия</p>
                    <p className="text-sm font-semibold font-mono-num" style={{ color: cat.color }}>3.8%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Возврат</p>
                    <p className="text-sm font-semibold font-mono-num text-foreground">1.2%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Ср. чек</p>
                    <p className="text-sm font-semibold font-mono-num text-foreground">3 610 ₽</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
