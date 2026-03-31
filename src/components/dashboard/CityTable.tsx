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
  if (v >= 40) return "var(--emerald)";
  if (v >= 32) return "var(--violet)";
  if (v >= 26) return "var(--sky)";
  return "var(--amber)";
}

function StatusBadge({ conv, plan }: { conv: number; plan: number }) {
  const ok = conv >= plan;
  const diff = (conv - plan).toFixed(1);
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold"
      style={{
        background: ok ? "var(--emerald-soft)" : "var(--rose-soft)",
        color: ok ? "var(--emerald)" : "var(--rose)",
      }}
    >
      <Icon name={ok ? "TrendingUp" : "TrendingDown"} size={10} />
      {ok ? "+" : ""}{diff}%
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
    <div className="card-base p-5 animate-rise" style={{ animationDelay: "440ms" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[14px] font-bold text-[var(--slate-900)]">Детализация по городам</h2>
          <p className="text-[11px] text-[var(--slate-400)] mt-0.5">
            {filtered.length} из {ROWS.length} городов
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--slate-100)]">
            <Icon name="Search" size={13} className="text-[var(--slate-400)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск города…"
              className="bg-transparent border-none outline-none text-[12px] w-32 font-medium text-[var(--slate-700)] placeholder:text-[var(--slate-400)]"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-bold gradient-hero text-white shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300 transition-all">
            <Icon name="Download" size={12} />
            Экспорт
          </button>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-[var(--slate-200)]">
        {/* Head */}
        <div
          className="grid text-[10px] font-bold uppercase tracking-[0.1em] px-4 py-3 bg-[var(--slate-50)] border-b border-[var(--slate-200)]"
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1.2fr 1.2fr" }}
        >
          {cols.map((c) => (
            <button
              key={c.key}
              onClick={() => toggle(c.key)}
              className={`flex items-center gap-1 transition-colors duration-150 ${
                c.align === "text-right" ? "justify-end" : "justify-start"
              } ${sort === c.key ? "text-[var(--violet)]" : "text-[var(--slate-400)]"}`}
            >
              {c.label}
              {sort === c.key && <Icon name={asc ? "ChevronUp" : "ChevronDown"} size={10} />}
            </button>
          ))}
          <div className="text-right text-[var(--slate-400)]">Менеджер</div>
          <div className="text-right text-[var(--slate-400)]">Статус</div>
        </div>

        {/* Rows */}
        {filtered.map((row, i) => {
          const color = convColor(row.conv);
          const isHov = hovered === i;
          return (
            <div
              key={row.city}
              className="grid items-center px-4 py-3.5 transition-all duration-100"
              style={{
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1.2fr 1.2fr",
                background: isHov ? "var(--slate-50)" : "white",
                borderBottom: i < filtered.length - 1 ? "1px solid var(--slate-100)" : "none",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{
                    background: i < 3 ? `${color}18` : "var(--slate-100)",
                    color: i < 3 ? color : "var(--slate-400)",
                  }}
                >
                  {i + 1}
                </div>
                <span
                  className="text-[12.5px] font-semibold transition-colors duration-150"
                  style={{ color: isHov ? "var(--slate-900)" : "var(--slate-600)" }}
                >
                  {row.city}
                </span>
              </div>

              <div className="text-right text-[12px] font-mono-num font-medium text-[var(--slate-700)]">
                {row.calls.toLocaleString("ru")}
              </div>

              <div className="text-right">
                <span className="text-[12px] font-mono-num font-medium text-[var(--slate-700)]">
                  {row.reached.toLocaleString("ru")}
                </span>
                <span className="text-[10px] ml-1 text-[var(--slate-400)]">
                  ({Math.round(row.reached / row.calls * 100)}%)
                </span>
              </div>

              <div className="text-right">
                <span className="text-[13px] font-bold font-mono-num" style={{ color }}>
                  {row.conv}%
                </span>
              </div>

              <div className="text-right text-[11px] font-medium text-[var(--slate-500)]">
                {row.manager}
              </div>

              <div className="text-right">
                <StatusBadge conv={row.conv} plan={row.plan} />
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-[13px] font-medium text-[var(--slate-400)]">
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
}
