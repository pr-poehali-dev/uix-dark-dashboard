import Icon from "@/components/ui/icon";

export default function Header() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 shrink-0 bg-[hsl(var(--background))]">
      <div>
        <h1 className="text-base font-semibold text-foreground">Аналитика колл-центра</h1>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)] pulse-dot inline-block" />
          Обзвон пациентов · {dateStr}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(74,222,128,0.08)] border border-[rgba(74,222,128,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-green)] pulse-dot" />
          <span className="text-xs text-[var(--neon-green)] font-medium">Данные актуальны</span>
        </div>

        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-[rgba(59,158,255,0.3)] transition-all">
          <Icon name="Download" size={15} />
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-[rgba(59,158,255,0.3)] transition-all">
          <Icon name="RefreshCw" size={15} />
        </button>
      </div>
    </header>
  );
}
