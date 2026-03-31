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
  if (conv >= 40) return "#01b574";
  if (conv >= 32) return "#0075ff";
  if (conv >= 26) return "#4299e1";
  if (conv >= 20) return "#f6ad55";
  return "#e31a1a";
}

export default function ConversionMap() {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...CITIES.map((c) => c.conv));

  return (
    <div className="vui-card rounded-2xl p-5 h-full animate-rise" style={{ animationDelay: "210ms" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[14px] font-bold text-white">Конверсия по городам</h2>
          <p className="text-[11px] mt-0.5" style={{ color: "#a0aec0" }}>
            Топ-8 городов по результату
          </p>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-semibold" style={{ color: "#a0aec0" }}>
          {[["≥40%", "#01b574"], ["≥32%", "#0075ff"], ["≥26%", "#4299e1"], ["<26%", "#f6ad55"]].map(([label, color]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: color as string }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {CITIES.map((city, i) => {
          const color = getColor(city.conv);
          const pct = (city.conv / max) * 100;
          const isHov = hovered === i;

          return (
            <div
              key={city.name}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-default transition-all duration-150"
              style={{
                background: isHov ? `${color}18` : "rgba(255,255,255,0.02)",
                border: `1px solid ${isHov ? color + "40" : "rgba(86,87,122,0.2)"}`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className="w-5 text-center text-[11px] font-bold font-mono-num flex-shrink-0"
                style={{ color: i < 3 ? color : "#56577a" }}
              >
                {city.rank}
              </span>

              <span
                className="text-[12.5px] font-semibold w-36 flex-shrink-0 truncate transition-colors duration-150"
                style={{ color: isHov ? "#fff" : "#a0aec0" }}
              >
                {city.name}
              </span>

              <div className="flex-1 relative h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div
                  className="h-full rounded-full bar-fill"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${color}88, ${color})`,
                    boxShadow: isHov ? `0 0 10px ${color}66` : "none",
                  }}
                />
              </div>

              <span className="w-16 text-right text-[10px] font-medium flex-shrink-0" style={{ color: "#56577a" }}>
                {city.calls.toLocaleString("ru")}
              </span>

              <span
                className="w-10 text-right text-[13px] font-bold font-mono-num flex-shrink-0"
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
