import Icon from "@/components/ui/icon";
import type { ViewTab } from "@/components/Dashboard";

interface SidebarProps {
  activeTab: ViewTab;
  onTab: (t: ViewTab) => void;
}

const nav: { id: ViewTab; icon: string; label: string }[] = [
  { id: "overview", icon: "LayoutDashboard", label: "Обзор" },
  { id: "table",    icon: "Table2",          label: "Таблица" },
  { id: "reasons",  icon: "PieChart",        label: "Причины" },
  { id: "cities",   icon: "MapPin",          label: "Города" },
];

export default function Sidebar({ activeTab, onTab }: SidebarProps) {
  return (
    <aside className="w-56 flex flex-col border-r border-border bg-[hsl(var(--sidebar-background))] shrink-0">
      <div className="h-16 flex items-center px-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[var(--neon-blue)] flex items-center justify-center glow-blue">
            <Icon name="Phone" size={14} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-xs text-foreground leading-tight">Колл-центр</p>
            <p className="text-[10px] text-muted-foreground">Аналитика обзвона</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-2">
          Разделы
        </p>
        {nav.map((item) => (
          <button
            key={item.id}
            onClick={() => onTab(item.id)}
            className={`sidebar-link w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left ${
              activeTab === item.id ? "active" : "text-muted-foreground"
            }`}
          >
            <Icon name={item.icon} size={16} fallback="Circle" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-4 pb-5 border-t border-border pt-4 space-y-2">
        <div className="glass rounded-xl p-3">
          <p className="text-[10px] text-muted-foreground mb-0.5">Всего пациентов</p>
          <p className="text-xl font-semibold font-mono-num text-[var(--neon-blue)]">963</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">11 городов</p>
        </div>
        <div className="glass rounded-xl p-3">
          <p className="text-[10px] text-muted-foreground mb-0.5">Дозвонились</p>
          <p className="text-xl font-semibold font-mono-num text-[var(--neon-cyan)]">346</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">конверсия 35.9%</p>
        </div>
      </div>
    </aside>
  );
}
