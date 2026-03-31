import { useState } from "react";
import Icon from "@/components/ui/icon";

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
  if (conv >= 40) return { color: "var(--emerald)", soft: "var(--emerald-soft)", label: "Отлично" };
  if (conv >= 32) return { color: "var(--violet)",  soft: "var(--violet-soft)",  label: "Хорошо" };
  if (conv >= 26) return { color: "var(--sky)",     soft: "var(--sky-soft)",     label: "Средне" };
  return              { color: "var(--amber)",   soft: "var(--amber-soft)",   label: "Низко" };
}

export default function ConversionMap() {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...CITIES.map((c) => c.conv));

  return (
    <div className="card-base p-5 h-full animate-rise" style={{ animationDelay: "320ms" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[14px] font-bold text-[var(--slate-900)]">Конверсия по городам</h2>
          <p className="text-[11px] text-[var(--slate-400)] mt-0.5">Топ-8 городов по результату</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-semibold text-[var(--slate-400)]">
          {[
            ["≥40%", "var(--emerald)"],
            ["≥32%", "var(--violet)"],
            ["≥26%", "var(--sky)"],
            ["<26%", "var(--amber)"]
          ].map(([label, color]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded" style={{ background: color, borderRadius: 3 }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        {CITIES.map((city, i) => {
          const { color, soft } = getColor(city.conv);
          const pct = (city.conv / max) * 100;
          const isHov = hovered === i;

          return (
            <div
              key={city.name}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-default transition-all duration-200"
              style={{ background: isHov ? soft : "transparent" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{ background: i < 3 ? soft : "var(--slate-100)", color: i < 3 ? color : "var(--slate-400)" }}
              >
                {city.rank}
              </div>

              <span
                className="text-[12.5px] font-semibold w-36 flex-shrink-0 truncate transition-colors duration-150"
                style={{ color: isHov ? "var(--slate-900)" : "var(--slate-600)" }}
              >
                {city.name}
              </span>

              <div className="flex-1 relative h-2 rounded-full overflow-hidden bg-[var(--slate-100)]">
                <div
                  className="h-full rounded-full bar-fill"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${color}99, ${color})`,
                  }}
                />
              </div>

              <span className="w-14 text-right text-[10px] font-medium text-[var(--slate-400)] flex-shrink-0">
                {city.calls.toLocaleString("ru")} 
                <Icon name="Phone" size={9} className="inline ml-0.5 opacity-50" />
              </span>

              <span
                className="w-12 text-right text-[13px] font-bold font-mono-num flex-shrink-0"
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
