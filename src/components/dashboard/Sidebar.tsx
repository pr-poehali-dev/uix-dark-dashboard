import Icon from "@/components/ui/icon";
import type { ViewTab } from "@/components/Dashboard";

interface SidebarProps {
  activeTab: ViewTab;
  onTab: (t: ViewTab) => void;
}

const nav: { id: ViewTab; icon: string; label: string }[] = [
  { id: "overview", icon: "LayoutDashboard", label: "Дашборд" },
  { id: "table",    icon: "Table2",          label: "Таблица"  },
  { id: "reasons",  icon: "PieChart",        label: "Причины"  },
  { id: "cities",   icon: "MapPin",          label: "Города"   },
];

export default function Sidebar({ activeTab, onTab }: SidebarProps) {
  return (
    <aside
      className="w-[260px] flex flex-col shrink-0 relative"
      style={{
        background: "linear-gradient(159.02deg, #0f1535 14.25%, #111c44 56.45%, #080d1e 86.14%)",
        borderRight: "1px solid #56577a33",
      }}
    >
      {/* Logo */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 glow-brand"
            style={{ background: "linear-gradient(127.09deg, #4318ff 19.41%, #0075ff 76.65%)" }}
          >
            <Icon name="PhoneCall" size={18} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-[15px] text-white tracking-tight leading-tight">
              CallDesk
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "#a0aec0" }}>
              Аналитика
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 mb-5 h-px" style={{ background: "linear-gradient(90deg, transparent, #56577a66, transparent)" }} />

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 mb-3" style={{ color: "#56577a" }}>
          Меню
        </p>
        {nav.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTab(item.id)}
              className={`vui-nav-link w-full flex items-center gap-3.5 px-3 py-3 text-left ${isActive ? "active" : ""}`}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  background: isActive
                    ? "linear-gradient(127.09deg, #4318ff 19.41%, #0075ff 76.65%)"
                    : "rgba(255,255,255,0.05)",
                  boxShadow: isActive ? "0 4px 14px rgba(0,117,255,0.35)" : "none",
                }}
              >
                <Icon
                  name={item.icon}
                  size={15}
                  fallback="Circle"
                  style={{ color: isActive ? "#fff" : "#a0aec0" }}
                />
              </div>
              <span
                className="text-[13px] font-semibold"
                style={{ color: isActive ? "#fff" : "#a0aec0" }}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "#0075ff", boxShadow: "0 0 8px #0075ff" }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom card */}
      <div className="px-4 pb-6 mt-4">
        {/* Divider */}
        <div className="mx-2 mb-5 h-px" style={{ background: "linear-gradient(90deg, transparent, #56577a66, transparent)" }} />

        {/* System status */}
        <div
          className="rounded-2xl p-4 mb-4"
          style={{
            background: "linear-gradient(127.09deg, rgba(67,24,255,0.2) 19.41%, rgba(0,117,255,0.1) 76.65%)",
            border: "1px solid #56577a44",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-semibold text-white">Система</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: "#01b574" }} />
              <span className="text-[11px] font-medium" style={{ color: "#01b574" }}>Online</span>
            </div>
          </div>
          <div className="flex gap-2.5">
            {[
              { label: "Активных", value: "3", color: "#01b574" },
              { label: "Ошибок",   value: "0", color: "#e31a1a" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex-1 rounded-xl px-2 py-2 text-center"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <p className="text-[17px] font-bold font-mono-num" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[9px] mt-0.5 font-medium" style={{ color: "#a0aec0" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 px-1">
          <div
            className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold text-white"
            style={{ background: "linear-gradient(127.09deg, #4318ff 19.41%, #0075ff 76.65%)" }}
          >
            АМ
          </div>
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold text-white leading-tight">Андрей М.</p>
            <p className="text-[10px] leading-tight" style={{ color: "#a0aec0" }}>Руководитель</p>
          </div>
          <button
            className="ml-auto p-1.5 rounded-lg transition-all duration-150"
            style={{ color: "#a0aec0" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#a0aec0")}
          >
            <Icon name="LogOut" size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
}
