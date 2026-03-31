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
  if (v >= 40) return "var(--green)";
  if (v >= 32) return "var(--cyan)";
  if (v >= 26) return "var(--blue)";
  return "var(--amber)";
}

function StatusBadge({ conv, plan }: { conv: number; plan: number }) {
  const ok = conv >= plan;
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
      style={{
        background: ok ? "var(--green-dim)" : "var(--red-dim)",
        color: ok ? "var(--green)" : "var(--red)",
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
    { key: "city",    label: "Город",    align: "text-left" },
    { key: "calls",   label: "Звонков",  align: "text-right" },
    { key: "reached", label: "Дозвон",   align: "text-right" },
    { key: "conv",    label: "Конверсия",align: "text-right" },
  ];

  return (
    <div className="glass rounded-2xl p-5 animate-rise" style={{ animationDelay: "350ms" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[13px] font-semibold text-foreground">Детализация по городам</h2>
          <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
            {filtered.length} из {ROWS.length} городов
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Icon name="Search" size={13} style={{ color: "hsl(var(--muted-foreground))" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск города…"
              className="bg-transparent border-none outline-none text-[12px] w-32"
              style={{ color: "hsl(var(--foreground))" }}
            />
          </div>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-medium transition-all duration-150"
            style={{
              background: "var(--blue-dim)",
              border: "1px solid rgba(79,143,255,0.2)",
              color: "var(--blue)",
            }}
          >
            <Icon name="Download" size={12} />
            Экспорт
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
        {/* Head */}
        <div
          className="grid text-[10px] font-semibold uppercase tracking-[0.08em] px-4 py-3"
          style={{
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1.5fr",
            background: "rgba(255,255,255,0.03)",
            color: "hsl(var(--muted-foreground))",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {cols.map((c) => (
            <button
              key={c.key}
              onClick={() => toggle(c.key)}
              className={`flex items-center gap-1 transition-colors duration-150 ${c.align === "text-right" ? "justify-end" : "justify-start"}`}
              style={{ color: sort === c.key ? "var(--blue)" : "hsl(var(--muted-foreground))" }}
            >
              {c.label}
              {sort === c.key && (
                <Icon name={asc ? "ChevronUp" : "ChevronDown"} size={10} />
              )}
            </button>
          ))}
          <div className="text-right">Менеджер</div>
          <div className="text-right">Статус</div>
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
                background: isHov ? "rgba(255,255,255,0.03)" : "transparent",
                borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* City */}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{ background: color + "22", color }}
                >
                  {i + 1}
                </div>
                <span
                  className="text-[12.5px] font-medium"
                  style={{ color: isHov ? "hsl(var(--foreground))" : "hsl(var(--sidebar-foreground))" }}
                >
                  {row.city}
                </span>
              </div>

              {/* Calls */}
              <div className="text-right text-[12px] font-mono-num" style={{ color: "hsl(var(--foreground))" }}>
                {row.calls.toLocaleString("ru")}
              </div>

              {/* Reached */}
              <div className="text-right">
                <span className="text-[12px] font-mono-num" style={{ color: "hsl(var(--foreground))" }}>
                  {row.reached.toLocaleString("ru")}
                </span>
                <span className="text-[10px] ml-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                  ({Math.round(row.reached / row.calls * 100)}%)
                </span>
              </div>

              {/* Conv */}
              <div className="text-right">
                <span className="text-[13px] font-semibold font-mono-num" style={{ color }}>
                  {row.conv}%
                </span>
              </div>

              {/* Manager */}
              <div className="text-right text-[11px]" style={{ color: "hsl(var(--muted-foreground))" }}>
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
          <div className="py-10 text-center text-[13px]" style={{ color: "hsl(var(--muted-foreground))" }}>
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
}
