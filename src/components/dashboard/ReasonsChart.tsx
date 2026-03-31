import { useState } from "react";
import { totals, reasonLabels } from "@/data/callcenter";

export default function ReasonsChart() {
  const [hovered, setHovered] = useState<number | null>(null);

  const reasons = reasonLabels.map((r) => ({
    ...r,
    count: totals[r.key] as number,
  })).sort((a, b) => b.count - a.count);

  const maxVal = Math.max(...reasons.map((r) => r.count));

  return (
    <div className="glass rounded-2xl p-5 animate-fade-in" style={{ animationDelay: "180ms" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Причины отказов и статусов</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Распределение по всем городам</p>
        </div>
        <div className="text-xs text-muted-foreground glass px-3 py-1.5 rounded-lg">
          Итого: <span className="text-foreground font-medium font-mono-num">{totals.total}</span> пациентов
        </div>
      </div>

      <div className="space-y-2.5">
        {reasons.map((r, i) => {
          const pct = maxVal > 0 ? (r.count / maxVal) * 100 : 0;
          const totalPct = ((r.count / totals.total) * 100).toFixed(1);
          const isH = hovered === i;
          return (
            <div
              key={String(r.key)}
              className="group cursor-default"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-center gap-3 mb-1">
                <div className="w-2 h-2 rounded-sm shrink-0" style={{ background: r.color }} />
                <span
                  className="text-xs flex-1 transition-colors duration-150"
                  style={{ color: isH ? r.color : undefined }}
                >
                  {isH ? r.full : r.short}
                </span>
                <span
                  className="text-xs font-mono-num font-semibold shrink-0 transition-colors"
                  style={{ color: isH ? r.color : "hsl(var(--foreground))" }}
                >
                  {r.count}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono-num w-9 text-right shrink-0">
                  {totalPct}%
                </span>
              </div>
              <div className="h-5 rounded-md overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div
                  className="h-full rounded-md transition-all duration-700 relative"
                  style={{
                    width: `${pct}%`,
                    background: isH
                      ? r.color
                      : `linear-gradient(90deg, ${r.color}99, ${r.color}55)`,
                    boxShadow: isH ? `0 0 12px ${r.color}60` : "none",
                  }}
                >
                  {r.count > 5 && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono-num text-white/70">
                      {r.count}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-border grid grid-cols-3 gap-3">
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-[10px] text-muted-foreground mb-0.5">Ценовые</p>
          <p className="text-lg font-semibold font-mono-num text-[var(--neon-pink)]">
            {totals.r4 + totals.r5}
          </p>
          <p className="text-[10px] text-muted-foreground">р4 + р5</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-[10px] text-muted-foreground mb-0.5">Конкуренты</p>
          <p className="text-lg font-semibold font-mono-num text-[var(--neon-blue)]">
            {totals.r6}
          </p>
          <p className="text-[10px] text-muted-foreground">другая клиника</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-[10px] text-muted-foreground mb-0.5">Лояльные</p>
          <p className="text-lg font-semibold font-mono-num text-[var(--neon-green)]">
            {totals.r8 + totals.r9 + totals.r10}
          </p>
          <p className="text-[10px] text-muted-foreground">р8 + р9 + р10</p>
        </div>
      </div>
    </div>
  );
}
