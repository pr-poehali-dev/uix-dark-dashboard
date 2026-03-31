import Icon from "@/components/ui/icon";
import type { Period } from "@/components/Dashboard";

interface HeaderProps {
  period: Period;
  onPeriod: (p: Period) => void;
}

const periods: { value: Period; label: string }[] = [
  { value: "7d", label: "7 дней" },
  { value: "30d", label: "30 дней" },
  { value: "90d", label: "90 дней" },
];

export default function Header({ period, onPeriod }: HeaderProps) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 shrink-0 bg-[hsl(var(--background))]">
      <div>
        <h1 className="text-base font-semibold text-foreground">Аналитический дашборд</h1>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)] pulse-dot inline-block" />
          Данные обновлены · {dateStr}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-[hsl(var(--muted))] rounded-lg p-1">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => onPeriod(p.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                period === p.value
                  ? "bg-[var(--neon-blue)] text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-[rgba(59,158,255,0.3)] transition-all">
          <Icon name="Download" size={15} />
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-[rgba(59,158,255,0.3)] transition-all relative">
          <Icon name="Bell" size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--neon-blue)]" />
        </button>
      </div>
    </header>
  );
}
