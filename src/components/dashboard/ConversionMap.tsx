import { useState } from "react";
import { cities } from "@/data/callcenter";

const sorted = [...cities].sort((a, b) => b.percent - a.percent);

export default function ConversionMap() {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...cities.map((c) => c.percent));
  const min = Math.min(...cities.map((c) => c.percent));

  function getColor(pct: number) {
    const ratio = (pct - min) / (max - min);
    if (ratio > 0.66) return "var(--neon-green)";
    if (ratio > 0.33) return "var(--neon-blue)";
    return "var(--neon-orange)";
  }

  return (
    <div className="glass rounded-2xl p-5 animate-fade-in h-full" style={{ animationDelay: "240ms" }}>
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-foreground">Конверсия по городам</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Рейтинг дозвонов</p>
      </div>

      <div className="space-y-2">
        {sorted.map((city, i) => {
          const color = getColor(city.percent);
          const isH = hovered === i;
          const barW = ((city.percent - min) / (max - min)) * 70 + 30;
          return (
            <div
              key={city.city}
              className="flex items-center gap-3 p-2 rounded-xl cursor-default transition-all duration-150"
              style={{ background: isH ? `${color}0a` : "transparent", border: `1px solid ${isH ? `${color}20` : "transparent"}` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                style={{
                  background: i < 3 ? `${color}25` : "rgba(255,255,255,0.05)",
                  color: i < 3 ? color : "hsl(var(--muted-foreground))",
                }}
              >
                {i + 1}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground truncate">{city.city}</span>
                  <span
                    className="text-xs font-semibold font-mono-num ml-2 shrink-0"
                    style={{ color }}
                  >
                    {city.percent}%
                  </span>
                </div>
                <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${barW}%`,
                      background: color,
                      boxShadow: isH ? `0 0 8px ${color}80` : "none",
                    }}
                  />
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[9px] text-muted-foreground">{city.reached} дозвонов</span>
                  <span className="text-[9px] text-muted-foreground">{city.total} всего</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="w-2 h-2 rounded-sm bg-[var(--neon-green)]" /> Высокая
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="w-2 h-2 rounded-sm bg-[var(--neon-blue)]" /> Средняя
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="w-2 h-2 rounded-sm bg-[var(--neon-orange)]" /> Низкая
        </div>
      </div>
    </div>
  );
}
