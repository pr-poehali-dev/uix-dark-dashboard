import { useState } from "react";
import Icon from "@/components/ui/icon";

const periods = ["Март 2026", "Февраль 2026", "Январь 2026"];

export default function Header() {
  const [period, setPeriod] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 flex items-center px-8 gap-4 shrink-0 bg-white/80 backdrop-blur-xl border-b border-[var(--slate-200)]">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[16px] font-bold text-[var(--slate-900)] tracking-tight">
            Дашборд обзвона
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[var(--emerald-soft)] text-[var(--emerald)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--emerald)] pulse-dot" />
            Обновлено
          </span>
        </div>
        <p className="text-[11px] text-[var(--slate-400)] mt-0.5">
          {new Date().toLocaleString("ru-RU", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--slate-100)] w-56">
        <Icon name="Search" size={14} className="text-[var(--slate-400)]" />
        <input
          placeholder="Поиск по дашборду..."
          className="bg-transparent border-none outline-none text-[12px] text-[var(--slate-700)] w-full placeholder:text-[var(--slate-400)]"
        />
        <kbd className="text-[9px] font-mono font-medium text-[var(--slate-400)] bg-white px-1.5 py-0.5 rounded border border-[var(--slate-200)]">⌘K</kbd>
      </div>

      {/* Period picker */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold bg-white border border-[var(--slate-200)] text-[var(--slate-700)] hover:border-[var(--violet)] hover:text-[var(--violet)] transition-all duration-150"
        >
          <Icon name="Calendar" size={14} className="text-[var(--violet)]" />
          {periods[period]}
          <Icon
            name="ChevronDown"
            size={12}
            className="text-[var(--slate-400)] transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl overflow-hidden z-50 animate-scale-in bg-white border border-[var(--slate-200)] shadow-xl shadow-slate-200/50">
              {periods.map((p, i) => (
                <button
                  key={p}
                  onClick={() => { setPeriod(i); setOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-medium text-left transition-colors duration-100 ${
                    i === period
                      ? "bg-[var(--violet-soft)] text-[var(--violet)]"
                      : "text-[var(--slate-600)] hover:bg-[var(--slate-50)]"
                  }`}
                >
                  {i === period && <Icon name="Check" size={12} className="text-[var(--violet)]" />}
                  {i !== period && <span className="w-3" />}
                  {p}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {[
          { icon: "Bell", tip: "Уведомления", badge: true },
          { icon: "Download", tip: "Экспорт", badge: false },
        ].map(({ icon, tip, badge }) => (
          <button
            key={icon}
            title={tip}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[var(--slate-400)] hover:bg-[var(--slate-100)] hover:text-[var(--slate-700)] transition-all duration-150"
          >
            <Icon name={icon} size={16} />
            {badge && (
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--rose)] ring-2 ring-white" />
            )}
          </button>
        ))}
      </div>
    </header>
  );
}
