import { useState } from "react";
import Icon from "@/components/ui/icon";

const periods = ["Март 2026", "Февраль 2026", "Январь 2026"];

export default function Header() {
  const [period, setPeriod] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <header
      className="h-[60px] flex items-center px-6 gap-4 shrink-0"
      style={{
        borderBottom: "1px solid hsl(var(--border))",
        background: "hsl(var(--background))",
      }}
    >
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5">
          <h1 className="text-[15px] font-semibold text-foreground tracking-tight">
            Дашборд обзвона
          </h1>
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={{ background: "var(--green-dim)", color: "var(--green)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "var(--green)" }} />
            Live
          </span>
        </div>
        <p className="text-[11px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
          Данные обновлены: {new Date().toLocaleString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      {/* Period picker */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12px] font-medium transition-all duration-150"
          style={{
            background: "hsl(var(--secondary))",
            border: "1px solid hsl(var(--border))",
            color: "hsl(var(--foreground))",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(79,143,255,0.3)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "hsl(var(--border))")}
        >
          <Icon name="Calendar" size={13} style={{ color: "var(--blue)" }} />
          {periods[period]}
          <Icon
            name="ChevronDown"
            size={12}
            className="transition-transform duration-150"
            style={{
              color: "hsl(var(--muted-foreground))",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>
        {open && (
          <div
            className="absolute right-0 top-full mt-1.5 w-44 rounded-xl overflow-hidden z-50 animate-scale-in"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            }}
          >
            {periods.map((p, i) => (
              <button
                key={p}
                onClick={() => { setPeriod(i); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-left transition-colors duration-100"
                style={{
                  color: i === period ? "var(--blue)" : "hsl(var(--foreground))",
                  background: i === period ? "var(--blue-dim)" : "transparent",
                }}
                onMouseEnter={e => { if (i !== period) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={e => { if (i !== period) e.currentTarget.style.background = "transparent"; }}
              >
                {i === period && (
                  <Icon name="Check" size={12} style={{ color: "var(--blue)" }} />
                )}
                {i !== period && <span className="w-3" />}
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        {[
          { icon: "Download", tip: "Экспорт" },
          { icon: "RefreshCw", tip: "Обновить" },
          { icon: "SlidersHorizontal", tip: "Настройки" },
        ].map(({ icon, tip }) => (
          <button
            key={icon}
            title={tip}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
            style={{ color: "hsl(var(--muted-foreground))" }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "hsl(var(--foreground))";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "hsl(var(--muted-foreground))";
            }}
          >
            <Icon name={icon} size={15} />
          </button>
        ))}
      </div>
    </header>
  );
}
