import { useState } from "react";
import Icon from "@/components/ui/icon";

const periods = ["Март 2026", "Февраль 2026", "Январь 2026"];

export default function Header() {
  const [period, setPeriod] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <header
      className="h-[72px] flex items-center px-8 gap-4 shrink-0"
      style={{
        background: "rgba(11,17,55,0.85)",
        borderBottom: "1px solid #56577a33",
        backdropFilter: "blur(21px)",
        WebkitBackdropFilter: "blur(21px)",
      }}
    >
      {/* Title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5">
          <h1 className="text-[16px] font-bold text-white tracking-tight">
            Дашборд обзвона
          </h1>
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
            style={{ background: "rgba(1,181,116,0.15)", color: "#01b574", border: "1px solid rgba(1,181,116,0.25)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "#01b574" }} />
            Live
          </span>
        </div>
        <p className="text-[11px] mt-0.5" style={{ color: "#a0aec0" }}>
          Данные обновлены: {new Date().toLocaleString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      {/* Period picker */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all duration-150"
          style={{
            background: "linear-gradient(127.09deg, rgba(67,24,255,0.3) 19.41%, rgba(0,117,255,0.2) 76.65%)",
            border: "1px solid rgba(0,117,255,0.3)",
            color: "#fff",
          }}
        >
          <Icon name="Calendar" size={13} style={{ color: "#0075ff" }} />
          {periods[period]}
          <Icon
            name="ChevronDown"
            size={12}
            className="transition-transform duration-150"
            style={{
              color: "#a0aec0",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>
        {open && (
          <div
            className="absolute right-0 top-full mt-2 w-44 rounded-2xl overflow-hidden z-50 animate-scale-in"
            style={{
              background: "linear-gradient(159.02deg, #0f1535 14.25%, #111c44 86.14%)",
              border: "1px solid #56577a55",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          >
            {periods.map((p, i) => (
              <button
                key={p}
                onClick={() => { setPeriod(i); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-medium text-left transition-colors duration-100"
                style={{
                  color: i === period ? "#0075ff" : "#a0aec0",
                  background: i === period ? "rgba(0,117,255,0.12)" : "transparent",
                }}
                onMouseEnter={e => { if (i !== period) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={e => { if (i !== period) e.currentTarget.style.background = "transparent"; }}
              >
                {i === period
                  ? <Icon name="Check" size={12} style={{ color: "#0075ff" }} />
                  : <span className="w-3 inline-block" />}
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {[
          { icon: "Download", tip: "Экспорт" },
          { icon: "RefreshCw", tip: "Обновить" },
          { icon: "SlidersHorizontal", tip: "Настройки" },
        ].map(({ icon, tip }) => (
          <button
            key={icon}
            title={tip}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150"
            style={{ color: "#a0aec0", background: "transparent" }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#a0aec0";
            }}
          >
            <Icon name={icon} size={15} />
          </button>
        ))}
      </div>
    </header>
  );
}
