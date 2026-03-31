import Icon from "@/components/ui/icon";

interface SidebarProps {
  activeSection: string;
  onSection: (s: string) => void;
}

const nav = [
  { id: "overview", icon: "LayoutDashboard", label: "Обзор" },
  { id: "revenue", icon: "TrendingUp", label: "Выручка" },
  { id: "categories", icon: "PieChart", label: "Категории" },
  { id: "products", icon: "Package", label: "Товары" },
  { id: "clients", icon: "Users", label: "Клиенты" },
];

const bottom = [
  { id: "reports", icon: "FileText", label: "Отчёты" },
  { id: "settings", icon: "Settings", label: "Настройки" },
];

export default function Sidebar({ activeSection, onSection }: SidebarProps) {
  return (
    <aside className="w-56 flex flex-col border-r border-border bg-[hsl(var(--sidebar-background))] shrink-0">
      <div className="h-16 flex items-center px-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[var(--neon-blue)] flex items-center justify-center glow-blue">
            <Icon name="BarChart3" size={15} className="text-white" />
          </div>
          <span className="font-semibold text-sm tracking-wide text-foreground">Analytics</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-2">
          Главное
        </p>
        {nav.map((item) => (
          <button
            key={item.id}
            onClick={() => onSection(item.id)}
            className={`sidebar-link w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left ${
              activeSection === item.id ? "active" : "text-muted-foreground"
            }`}
          >
            <Icon name={item.icon} size={16} fallback="Circle" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-3 pb-4 space-y-0.5 border-t border-border pt-3">
        {bottom.map((item) => (
          <button
            key={item.id}
            onClick={() => onSection(item.id)}
            className={`sidebar-link w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left ${
              activeSection === item.id ? "active" : "text-muted-foreground"
            }`}
          >
            <Icon name={item.icon} size={16} fallback="Circle" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="px-4 pb-4">
        <div className="glass rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--neon-purple)] flex items-center justify-center text-xs font-bold text-white shrink-0">
            АИ
          </div>
          <div>
            <p className="text-xs font-medium text-foreground">Алексей И.</p>
            <p className="text-[10px] text-muted-foreground">Администратор</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
