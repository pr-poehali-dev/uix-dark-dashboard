import { useState } from "react";
import { cities, totals, reasonLabels } from "@/data/callcenter";
import type { CityRow } from "@/data/callcenter";
import Icon from "@/components/ui/icon";

type SortKey = "city" | "total" | "reached" | "percent";

export default function CityTable() {
  const [sortKey, setSortKey] = useState<SortKey>("total");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setDir(sortDir === "desc" ? "asc" : "desc");
    else { setSortKey(key); setDir("desc"); }
  }
  function setDir(d: "asc" | "desc") { setSortDir(d); }

  const sorted = [...cities].sort((a, b) => {
    const av = a[sortKey] as string | number;
    const bv = b[sortKey] as string | number;
    if (typeof av === "string") return sortDir === "asc" ? av.localeCompare(bv as string) : (bv as string).localeCompare(av);
    return sortDir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
  });

  function SortBtn({ k, label }: { k: SortKey; label: string }) {
    const active = sortKey === k;
    return (
      <button
        onClick={() => toggleSort(k)}
        className={`flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
          active ? "text-[var(--neon-blue)]" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {label}
        <Icon name={active && sortDir === "asc" ? "ChevronUp" : "ChevronDown"} size={10} />
      </button>
    );
  }

  function pctColor(pct: number) {
    if (pct >= 45) return "var(--neon-green)";
    if (pct >= 35) return "var(--neon-blue)";
    if (pct >= 30) return "var(--neon-orange)";
    return "var(--neon-pink)";
  }

  function ReasonCell({ row, r }: { row: CityRow; r: typeof reasonLabels[0] }) {
    const v = row[r.key] as number;
    if (!v) return <td key={String(r.key)} className="px-2 py-3 text-center text-[11px] text-muted-foreground/30 font-mono-num">—</td>;
    return (
      <td key={String(r.key)} className="px-2 py-3 text-center">
        <span
          className="inline-block min-w-[20px] text-[11px] font-semibold font-mono-num rounded-md px-1.5 py-0.5"
          style={{ background: `${r.color}20`, color: r.color }}
        >
          {v}
        </span>
      </td>
    );
  }

  return (
    <div className="glass rounded-2xl p-5 animate-fade-in" style={{ animationDelay: "360ms" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Детальная таблица по городам</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Нажмите на город для детализации</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span>Сортировка:</span>
          <SortBtn k="city" label="Город" />
          <SortBtn k="total" label="Всего" />
          <SortBtn k="reached" label="Дозвон" />
          <SortBtn k="percent" label="%" />
        </div>
      </div>

      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[900px] text-xs border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-[hsl(var(--card))] px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground rounded-tl-lg w-36">
                Город
              </th>
              <th className="px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-16">Всего</th>
              {reasonLabels.map((r) => (
                <th
                  key={String(r.key)}
                  className="px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-wider w-10"
                  style={{ color: r.color + "aa" }}
                  title={r.full}
                >
                  {r.key.replace("r", "")}
                </th>
              ))}
              <th className="px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-16">Дозвон</th>
              <th className="px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-14 rounded-tr-lg">%</th>
            </tr>

            <tr>
              <th colSpan={2 + reasonLabels.length + 2} className="px-0 pt-0 pb-1">
                <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />
              </th>
            </tr>
          </thead>

          <tbody>
            {sorted.map((row, idx) => {
              const isExp = expanded === row.city;
              const color = pctColor(row.percent);
              return (
                <>
                  <tr
                    key={row.city}
                    className="cursor-pointer transition-colors duration-150 group"
                    style={{ background: isExp ? "rgba(59,158,255,0.05)" : idx % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}
                    onClick={() => setExpanded(isExp ? null : row.city)}
                  >
                    <td className="sticky left-0 z-10 px-3 py-3 font-medium text-foreground group-hover:text-[var(--neon-blue)] transition-colors"
                      style={{ background: isExp ? "rgba(59,158,255,0.05)" : idx % 2 === 0 ? "hsl(220 18% 10% / 0.9)" : "hsl(220 20% 7% / 0.9)" }}>
                      <div className="flex items-center gap-2">
                        <Icon name={isExp ? "ChevronDown" : "ChevronRight"} size={12} className="text-muted-foreground" />
                        {row.city}
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center font-mono-num font-semibold text-foreground">{row.total}</td>
                    {reasonLabels.map((r) => <ReasonCell key={String(r.key)} row={row} r={r} />)}
                    <td className="px-2 py-3 text-center font-mono-num font-semibold text-foreground">{row.reached}</td>
                    <td className="px-2 py-3 text-center">
                      <span
                        className="inline-block font-mono-num font-bold text-[11px] px-2 py-0.5 rounded-full"
                        style={{ background: `${color}18`, color }}
                      >
                        {row.percent}%
                      </span>
                    </td>
                  </tr>

                  {isExp && (
                    <tr key={`${row.city}-detail`}>
                      <td colSpan={2 + reasonLabels.length + 2} className="px-4 pb-4 pt-1">
                        <div
                          className="rounded-xl p-4 grid grid-cols-4 gap-3"
                          style={{ background: "rgba(59,158,255,0.04)", border: "1px solid rgba(59,158,255,0.1)" }}
                        >
                          {reasonLabels.map((r) => {
                            const v = row[r.key] as number;
                            return (
                              <div key={String(r.key)} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-sm mt-1 shrink-0" style={{ background: r.color }} />
                                <div>
                                  <p className="text-[10px] text-muted-foreground leading-tight">{r.short}</p>
                                  <p className="text-sm font-semibold font-mono-num" style={{ color: v > 0 ? r.color : "hsl(var(--muted-foreground))" }}>
                                    {v || 0}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}

            <tr style={{ background: "rgba(255,255,255,0.03)" }}>
              <td colSpan={2 + reasonLabels.length + 2} className="px-0 py-0">
                <div className="h-px" style={{ background: "rgba(59,158,255,0.2)" }} />
              </td>
            </tr>

            <tr style={{ background: "rgba(59,158,255,0.06)" }}>
              <td className="sticky left-0 px-3 py-3 font-bold text-[var(--neon-blue)]"
                style={{ background: "rgba(59,158,255,0.06)" }}>
                <div className="flex items-center gap-2">
                  <Icon name="Sigma" size={12} />
                  ИТОГО
                </div>
              </td>
              <td className="px-2 py-3 text-center font-mono-num font-bold text-foreground">{totals.total}</td>
              {reasonLabels.map((r) => {
                const v = totals[r.key] as number;
                return (
                  <td key={String(r.key)} className="px-2 py-3 text-center">
                    <span className="font-mono-num font-bold text-[11px]" style={{ color: r.color }}>
                      {v || "—"}
                    </span>
                  </td>
                );
              })}
              <td className="px-2 py-3 text-center font-mono-num font-bold text-[var(--neon-cyan)]">{totals.reached}</td>
              <td className="px-2 py-3 text-center">
                <span className="font-mono-num font-bold text-sm text-[var(--neon-green)]">{totals.percent}%</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wider">Расшифровка колонок</p>
        <div className="flex flex-wrap gap-2">
          {reasonLabels.map((r) => (
            <div key={String(r.key)} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="w-4 h-4 rounded text-center text-[9px] font-bold flex items-center justify-center"
                style={{ background: `${r.color}20`, color: r.color }}>
                {String(r.key).replace("r", "")}
              </span>
              {r.short}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
