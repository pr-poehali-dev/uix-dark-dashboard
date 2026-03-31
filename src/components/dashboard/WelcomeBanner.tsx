import Icon from "@/components/ui/icon";

export default function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl gradient-hero p-6 animate-rise">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/3 blur-2xl" />
      <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full bg-white/5 translate-y-1/2 blur-xl" />
      <div className="absolute top-4 right-8 w-16 h-16 rounded-2xl bg-white/10 rotate-12 animate-float" />
      <div className="absolute bottom-3 right-32 w-10 h-10 rounded-xl bg-white/10 -rotate-6 animate-float" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-white/70 text-[12px] font-medium mb-1">Добро пожаловать</p>
          <h2 className="text-white text-[22px] font-bold tracking-tight">
            Андрей, вот сводка за март
          </h2>
          <p className="text-white/60 text-[13px] mt-1.5 max-w-md">
            Обзвонено 12 847 контактов. Конверсия снизилась на 14% — рекомендую проверить скрипт для Казани.
          </p>
          <div className="flex gap-3 mt-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[var(--violet)] text-[12px] font-bold hover:bg-white/90 transition-all shadow-lg shadow-black/10">
              <Icon name="BarChart3" size={14} />
              Смотреть отчёт
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 text-white text-[12px] font-semibold hover:bg-white/25 transition-all border border-white/20">
              <Icon name="Download" size={14} />
              Экспорт
            </button>
          </div>
        </div>

        {/* Right side stats */}
        <div className="hidden xl:flex gap-3">
          {[
            { label: "Обзвонов", value: "12.8K", icon: "Phone" },
            { label: "Дозвон", value: "71.7%", icon: "CheckCircle" },
            { label: "Конверсия", value: "35.9%", icon: "TrendingUp" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-4 text-center min-w-[110px]"
            >
              <div className="w-8 h-8 rounded-lg bg-white/15 mx-auto mb-2 flex items-center justify-center">
                <Icon name={s.icon} size={15} className="text-white" fallback="Activity" />
              </div>
              <p className="text-white font-bold text-[18px] font-mono-num leading-none">{s.value}</p>
              <p className="text-white/50 text-[10px] font-medium mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
