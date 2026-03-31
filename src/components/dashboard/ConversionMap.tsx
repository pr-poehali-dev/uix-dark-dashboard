import { useState } from "react";

const CITIES = [
  { name: "Москва",          conv: 42, calls: 3840, rank: 1 },
  { name: "Санкт-Петербург", conv: 38, calls: 2210, rank: 2 },
  { name: "Новосибирск",     conv: 35, calls: 1450, rank: 3 },
  { name: "Екатеринбург",    conv: 31, calls: 1280, rank: 4 },
  { name: "Казань",          conv: 29, calls: 980,  rank: 5 },
  { name: "Нижний Новгород", conv: 27, calls: 870,  rank: 6 },
  { name: "Краснодар",       conv: 24, calls: 760,  rank: 7 },
  { name: "Самара",          conv: 22, calls: 690,  rank: 8 },
];

function getColor(conv: number) {
  if (conv >= 40) return "var(--green)";
  if (conv >= 32) return "var(--cyan)";
  if (conv >= 26) return "var(--blue)";
  if (conv >= 20) return "var(--amber)";
  return "var(--red)";
}

function getColorDim(conv: number) {
  if (conv >= 40) return "var(--green-dim)";
  if (conv >= 32) return "var(--cyan-dim)";
  if (conv >= 26) return "var(--blue-dim)";
  if (conv >= 20) return "var(--amber-dim)";
  return "var(--red-dim)";
}

export default function ConversionMap() {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...CITIES.map((c) => c.conv));

  return (
    <div className="glass rounded-2xl p-5 h-full animate-rise" style={{ animationDelay: "210ms" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[13px] font-semibold text-foreground">Конверсия по городам</h2>
          <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
            Топ-8 городов по результату
          </p>
        </div>
        <div className="flex items-center gap-3 text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>
          {[["≥40%", "var(--green)"], ["≥32%", "var(--cyan)"], ["≥26%", "var(--blue)"], ["<26%", "var(--amber)"]].map(([label, color]) => (
            <div key={label} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {CITIES.map((city, i) => {
          const color = getColor(city.conv);
          const colorDim = getColorDim(city.conv);
          const pct = (city.conv / max) * 100;
          const isHov = hovered === i;

          return (
            <div
              key={city.name}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-default transition-all duration-150"
              style={{
                background: isHov ? colorDim : "rgba(255,255,255,0.02)",
                border: `1px solid ${isHov ? color + "33" : "rgba(255,255,255,0.04)"}`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Rank */}
              <span
                className="w-5 text-center text-[11px] font-semibold font-mono-num flex-shrink-0"
                style={{ color: i < 3 ? color : "hsl(var(--muted-foreground))" }}
              >
                {city.rank}
              </span>

              {/* Name */}
              <span
                className="text-[12.5px] font-medium w-36 flex-shrink-0 truncate transition-colors duration-150"
                style={{ color: isHov ? "hsl(var(--foreground))" : "hsl(var(--sidebar-foreground))" }}
              >
                {city.name}
              </span>

              {/* Bar */}
              <div className="flex-1 relative h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div
                  className="h-full rounded-full bar-fill"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${color}bb, ${color})`,
                    boxShadow: isHov ? `0 0 8px ${color}66` : "none",
                  }}
                />
              </div>

              {/* Calls */}
              <span className="w-16 text-right text-[10px] flex-shrink-0" style={{ color: "hsl(var(--muted-foreground))" }}>
                {city.calls.toLocaleString("ru")}
              </span>

              {/* Percent */}
              <span
                className="w-10 text-right text-[13px] font-semibold font-mono-num flex-shrink-0"
                style={{ color }}
              >
                {city.conv}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
