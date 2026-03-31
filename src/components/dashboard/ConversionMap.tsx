import { cities } from "@/data/callcenter";

const sorted = [...cities].sort((a, b) => b.percent - a.percent);
const max = Math.max(...cities.map((c) => c.percent));

export default function ConversionMap() {
  return (
    <div className="glass rounded-2xl p-5 animate-fade-in h-full" style={{ animationDelay: "240ms" }}>
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-foreground">Конверсия по городам</h2>
        <p className="text-[11px] text-muted-foreground mt-0.5">% дозвонов от обзвона</p>
      </div>

      <div className="space-y-2.5">
        {sorted.map((city, i) => {
          const barW = (city.percent / max) * 100;
          return (
            <div key={city.city} className="flex items-center gap-3 group">
              <span className="text-[11px] text-muted-foreground w-24 shrink-0 text-right truncate">
                {city.city}
              </span>
              <div className="flex-1 h-5 relative">
                <div
                  className="h-5 rounded-full transition-all duration-700 bar-fill"
                  style={{
                    width: `${barW}%`,
                    background: "linear-gradient(90deg, #fb923c, #f97316)",
                    boxShadow: "0 0 8px rgba(249,115,22,0.35)",
                  }}
                />
              </div>
              <span
                className="text-xs font-semibold font-mono-num shrink-0 w-10 text-right"
                style={{ color: "#f97316" }}
              >
                {city.percent}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
