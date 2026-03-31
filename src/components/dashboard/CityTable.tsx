import { useState } from "react";
import Icon from "@/components/ui/icon";

const ROWS = [
  { city: "Москва",           calls: 3840, reached: 2880, conv: 42.1, plan: 40, manager: "Смирнов А." },
  { city: "Санкт-Петербург",  calls: 2210, reached: 1680, conv: 38.4, plan: 40, manager: "Козлова М." },
  { city: "Новосибирск",      calls: 1450, reached: 1030, conv: 35.2, plan: 40, manager: "Петров В." },
  { city: "Екатеринбург",     calls: 1280, reached:  890, conv: 31.0, plan: 40, manager: "Иванов С." },
  { city: "Казань",           calls:  980, reached:  660, conv: 29.3, plan: 40, manager: "Николаев Р." },
  { city: "Нижний Новгород",  calls:  870, reached:  570, conv: 27.1, plan: 40, manager: "Фёдорова Т." },
  { city: "Краснодар",        calls:  760, reached:  480, conv: 24.0, plan: 40, manager: "Морозов Д." },
  { city: "Самара",           calls:  690, reached:  420, conv: 22.5, plan: 40, manager: "Белова К." },
];

type SortKey = "city" | "calls" | "reached" | "conv";

function convColor(v: number) {
  if (v >= 40) return "#01b574";
  if (v >= 32) return "#0075ff";
  if (v >= 26) return "#4299e1";
  return "#f6ad55";
}

function StatusBadge({ conv, plan }: { conv: number; plan: number }) {
  const ok = conv >= plan;
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold"
      style={{
        background: ok ? "rgba(1,181,116,0.15)" : "rgba(227,26,26,0.15)",
        color: ok ? "#01b574" : "#e31a1a",
        border: `1px solid ${ok ? "rgba(1,181,116,0.25)" : "rgba(227,26,26,0.25)"}`,
      }}
    >
      {ok ? "▲" : "▼"} {ok ? "+" : ""}{(conv - plan).toFixed(1)}%
    </span>
  );
}

export default function CityTable() {
  const [sort, setSort] = useState<SortKey>("conv");
  const [asc, setAsc] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const toggle = (key: SortKey) => {
    if (sort === key) setAsc(!asc);
    else { setSort(key); setAsc(false); }
  };

  const filtered = ROWS
    .filter((r) => r.city.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const v = sort === "city"
        ? a.city.localeCompare(b.city, "ru")
        : (a[sort] as number) - (b[sort] as number);
      return asc ? v : -v;
    });

  const cols: { key: SortKey; label: string; align: string }[] = [
    { key: "city",    label: "Город",     align: "text-left" },
    { key: "calls",   label: "Звонков",   align: "text-right" },
    { key: "reached", label: "Дозвон",    align: "text-right" },
    { key: "conv",    label: "Конверсия", align: "text-right" },
  ];

  return (
    <div className="vui-card rounded-2xl p-5 animate-rise" style={{ animationDelay: "350ms" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[14px] font-bold text-white">Детализация по городам</h2>
          <p className="text-[11px] mt-0.5" style={{ color: "#a0aec0" }}>
            {filtered.length} из {ROWS.length} городов
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid #56577a44",
            }}
          >
            <Icon name="Search" size={13} style={{ color: "#a0aec0" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск города…"
              className="bg-transparent border-none outline-none text-[12px] w-32 font-medium"
              style={{ color: "#fff" }}
            />
          </div>
          <button
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-bold transition-all duration-150"
            style={{
              background: "linear-gradient(127.09deg, rgba(67,24,255,0.35) 19.41%, rgba(0,117,255,0.2) 76.65%)",
              border: "1px solid rgba(0,117,255,0.3)",
              color: "#fff",
            }}
          >
            <Icon name="Download" size={12} />
            Экспорт
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #56577a33" }}>
        {/* Head */}
        <div
          className="grid text-[10px] font-bold uppercase tracking-[0.1em] px-4 py-3"
          style={{
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1.5fr",
            background: "rgba(255,255,255,0.03)",
            borderBottom: "1px solid #56577a33",
          }}
        >
          {cols.map((c) => (
            <button
              key={c.key}
              onClick={() => toggle(c.key)}
              className={`flex items-center gap-1 transition-colors duration-150 ${c.align === "text-right" ? "justify-end" : "justify-start"}`}
              style={{ color: sort === c.key ? "#0075ff" : "#56577a" }}
            >
              {c.label}
              {sort === c.key && (
                <Icon name={asc ? "ChevronUp" : "ChevronDown"} size={10} />
              )}
            </button>
          ))}
          <div className="text-right text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "#56577a" }}>Менеджер</div>
          <div className="text-right text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "#56577a" }}>Статус</div>
        </div>

        {/* Rows */}
        {filtered.map((row, i) => {
          const color = convColor(row.conv);
          const isHov = hovered === i;
          return (
            <div
              key={row.city}
              className="grid items-center px-4 py-3 transition-all duration-100"
              style={{
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1.5fr",
                background: isHov ? "rgba(0,117,255,0.06)" : "transparent",
                borderBottom: i < filtered.length - 1 ? "1px solid #56577a22" : "none",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* City */}
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                  style={{ background: `${color}22`, color }}
                >
                  {i + 1}
                </div>
                <span
                  className="text-[12.5px] font-semibold transition-colors duration-150"
                  style={{ color: isHov ? "#fff" : "#a0aec0" }}
                >
                  {row.city}
                </span>
              </div>

              {/* Calls */}
              <div className="text-right text-[12px] font-mono-num font-medium" style={{ color: "#fff" }}>
                {row.calls.toLocaleString("ru")}
              </div>

              {/* Reached */}
              <div className="text-right">
                <span className="text-[12px] font-mono-num font-medium" style={{ color: "#fff" }}>
                  {row.reached.toLocaleString("ru")}
                </span>
                <span className="text-[10px] ml-1" style={{ color: "#56577a" }}>
                  ({Math.round(row.reached / row.calls * 100)}%)
                </span>
              </div>

              {/* Conv */}
              <div className="text-right">
                <span className="text-[13px] font-bold font-mono-num" style={{ color }}>
                  {row.conv}%
                </span>
              </div>

              {/* Manager */}
              <div className="text-right text-[11px] font-medium" style={{ color: "#a0aec0" }}>
                {row.manager}
              </div>

              {/* Status */}
              <div className="text-right">
                <StatusBadge conv={row.conv} plan={row.plan} />
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-[13px] font-medium" style={{ color: "#56577a" }}>
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
}
