import Icon from "@/components/ui/icon";
import type { ViewTab } from "@/components/Dashboard";

interface SidebarProps {
  activeTab: ViewTab;
  onTab: (t: ViewTab) => void;
}

const nav: { id: ViewTab; icon: string; label: string }[] = [
  { id: "overview", icon: "LayoutDashboard", label: "Обзор"   },
  { id: "table",    icon: "Table2",          label: "Таблица"  },
  { id: "reasons",  icon: "PieChart",        label: "Причины"  },
  { id: "cities",   icon: "MapPin",          label: "Города"   },
];

const quickLinks = [
  { icon: "FileText",   label: "Отчёты" },
  { icon: "Settings",   label: "Настройки" },
  { icon: "HelpCircle", label: "Помощь" },
];

export default function Sidebar({ activeTab, onTab }: SidebarProps) {
  return (
    <aside className="w-[240px] flex flex-col shrink-0 bg-white border-r border-[var(--slate-200)]">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[var(--slate-100)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-lg shadow-violet-200">
            <Icon name="PhoneCall" size={17} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-[14px] text-[var(--slate-900)] tracking-tight leading-none">
              CallDesk
            </p>
            <p className="text-[11px] text-[var(--slate-400)] mt-0.5">Аналитика v2</p>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 pt-5 space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--slate-400)] px-3 mb-2">
          Навигация
        </p>
        {nav.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                isActive
                  ? "bg-[var(--violet-soft)] text-[var(--violet)]"
                  : "text-[var(--slate-500)] hover:bg-[var(--slate-100)] hover:text-[var(--slate-700)]"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? "gradient-hero shadow-md shadow-violet-200 text-white"
                    : "bg-[var(--slate-100)] text-[var(--slate-400)] group-hover:bg-[var(--slate-200)] group-hover:text-[var(--slate-600)]"
                }`}
              >
                <Icon name={item.icon} size={15} fallback="Circle" />
              </div>
              <span className={`text-[13px] font-semibold ${isActive ? "text-[var(--violet)]" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-5 rounded-full gradient-hero" />
              )}
            </button>
          );
        })}

        {/* Quick links */}
        <div className="pt-4 mt-4 border-t border-[var(--slate-100)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--slate-400)] px-3 mb-2">
            Быстрый доступ
          </p>
          {quickLinks.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-[var(--slate-500)] hover:bg-[var(--slate-100)] hover:text-[var(--slate-700)] transition-all duration-150"
            >
              <Icon name={item.icon} size={15} fallback="Circle" />
              <span className="text-[12.5px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom — user */}
      <div className="p-3 border-t border-[var(--slate-100)]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--slate-50)] transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-[11px] font-bold text-white shadow-md shadow-violet-200 flex-shrink-0">
            АМ
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-semibold text-[var(--slate-800)] leading-tight truncate">Андрей М.</p>
            <p className="text-[10px] text-[var(--slate-400)] leading-tight">Руководитель</p>
          </div>
          <Icon name="ChevronsUpDown" size={14} className="text-[var(--slate-400)]" />
        </div>
      </div>
    </aside>
  );
}
