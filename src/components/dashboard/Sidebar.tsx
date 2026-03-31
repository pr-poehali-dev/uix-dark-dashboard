import Icon from "@/components/ui/icon";
import type { ViewTab } from "@/components/Dashboard";

interface SidebarProps {
  activeTab: ViewTab;
  onTab: (t: ViewTab) => void;
}

const nav: { id: ViewTab; icon: string; label: string; desc: string }[] = [
  { id: "overview", icon: "LayoutDashboard", label: "Обзор",    desc: "Главная панель" },
  { id: "table",    icon: "Table2",          label: "Таблица",  desc: "Все обзвоны" },
  { id: "reasons",  icon: "PieChart",        label: "Причины",  desc: "Аналитика" },
  { id: "cities",   icon: "MapPin",          label: "Города",   desc: "География" },
];

const stats = [
  { label: "Активных", value: "3", color: "var(--green)" },
  { label: "Ошибок",   value: "0", color: "var(--red)" },
];

export default function Sidebar({ activeTab, onTab }: SidebarProps) {
  return (
    <aside
      className="w-[220px] flex flex-col shrink-0"
      style={{
        background: "hsl(var(--sidebar-background))",
        borderRight: "1px solid hsl(var(--sidebar-border))",
      }}
    >
      {/* Logo */}
      <div
        className="h-[60px] flex items-center px-5"
        style={{ borderBottom: "1px solid hsl(var(--sidebar-border))" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center glow-blue flex-shrink-0"
            style={{ background: "linear-gradient(135deg, var(--blue) 0%, #2563eb 100%)" }}
          >
            <Icon name="PhoneCall" size={15} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-[13px] text-foreground leading-tight tracking-tight">
              CallDesk
            </p>
            <p className="text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>
              Аналитика
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-4 pb-2 space-y-0.5">
        <p
          className="text-[9px] font-semibold uppercase tracking-[0.12em] px-3 mb-2.5"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Навигация
        </p>
        {nav.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTab(item.id)}
              className={`sidebar-link w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left ${
                isActive ? "active" : ""
              }`}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  background: isActive ? "var(--blue-dim)" : "rgba(255,255,255,0.04)",
                  color: isActive ? "var(--blue)" : "hsl(var(--muted-foreground))",
                }}
              >
                <Icon name={item.icon} size={14} fallback="Circle" />
              </div>
              <div className="min-w-0">
                <p
                  className="text-[12.5px] font-medium leading-tight"
                  style={{ color: isActive ? "var(--blue)" : "hsl(var(--sidebar-foreground))" }}
                >
                  {item.label}
                </p>
                <p className="text-[10px] leading-tight mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {item.desc}
                </p>
              </div>
              {isActive && (
                <div
                  className="w-1 h-1 rounded-full ml-auto flex-shrink-0"
                  style={{ background: "var(--blue)", boxShadow: "0 0 6px var(--blue)" }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Status block */}
      <div className="px-4 pb-5" style={{ borderTop: "1px solid hsl(var(--sidebar-border))", paddingTop: "14px" }}>
        <div
          className="rounded-xl p-3 space-y-2.5"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium" style={{ color: "hsl(var(--foreground))" }}>
              Система
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "var(--green)" }} />
              <span className="text-[10px]" style={{ color: "var(--green)" }}>Online</span>
            </div>
          </div>
          <div className="flex gap-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex-1 rounded-lg px-2 py-1.5 text-center"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <p className="text-[15px] font-semibold font-mono-num" style={{ color: s.color }}>
                  {s.value}
                </p>
                <p className="text-[9px] mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5 mt-3 px-1">
          <div
            className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--purple) 0%, var(--blue) 100%)" }}
          >
            <span className="text-[11px] font-semibold text-white">АМ</span>
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-foreground leading-tight">Андрей М.</p>
            <p className="text-[10px] leading-tight" style={{ color: "hsl(var(--muted-foreground))" }}>
              Руководитель
            </p>
          </div>
          <button
            className="ml-auto p-1.5 rounded-lg transition-colors duration-150"
            style={{ color: "hsl(var(--muted-foreground))" }}
            onMouseEnter={e => (e.currentTarget.style.color = "hsl(var(--foreground))")}
            onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--muted-foreground))")}
          >
            <Icon name="LogOut" size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
}
