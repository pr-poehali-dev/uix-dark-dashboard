export interface CityRow {
  city: string;
  total: number;          // кол-во пациентов всего обзвон
  r0: number;             // 0 — не смогли помочь / нет жалоб
  r1: number;             // 1 — негатив
  r2: number;             // 2 — не понравился врач
  r3: number;             // 3 — плохой сервис
  r4: number;             // 4 — дорого
  r5: number;             // 5 — дорого но подумаю
  r6: number;             // 6 — решат/решили проблему в другой клинике
  r7: number;             // 7 — записи/перезаписи
  r8: number;             // 8 — всё устраивает, будут проходить лечение позже (отложили лечение)
  r9: number;             // 9 — всё устраивает, не проблему, рекомендуют лечение в другой клинике
  r10: number;            // 10 — вернули пациента/nt, рекомендуют лечение у нас
  reached: number;        // кол-во кому дозвонились
  percent: number;        // %
}

export const cities: CityRow[] = [
  { city: "Краснодар",       total: 36,  r0: 1,  r1: 1,  r2: 2,  r3: 0,  r4: 2,  r5: 3,  r6: 1,  r7: 1,  r8: 0,  r9: 0,  r10: 0, reached: 11, percent: 30.6 },
  { city: "Самара",          total: 54,  r0: 0,  r1: 1,  r2: 0,  r3: 0,  r4: 8,  r5: 7,  r6: 1,  r7: 0,  r8: 2,  r9: 0,  r10: 1, reached: 20, percent: 37.0 },
  { city: "Ростов",          total: 84,  r0: 3,  r1: 3,  r2: 0,  r3: 1,  r4: 10, r5: 10, r6: 2,  r7: 0,  r8: 2,  r9: 1,  r10: 0, reached: 33, percent: 39.3 },
  { city: "Нижний Новгород", total: 117, r0: 2,  r1: 5,  r2: 2,  r3: 0,  r4: 15, r5: 7,  r6: 3,  r7: 1,  r8: 3,  r9: 2,  r10: 0, reached: 40, percent: 34.2 },
  { city: "Пермь",           total: 65,  r0: 0,  r1: 1,  r2: 0,  r3: 0,  r4: 5,  r5: 6,  r6: 3,  r7: 2,  r8: 4,  r9: 0,  r10: 1, reached: 22, percent: 33.8 },
  { city: "Кемерово",        total: 130, r0: 3,  r1: 3,  r2: 4,  r3: 0,  r4: 22, r5: 7,  r6: 2,  r7: 0,  r8: 4,  r9: 2,  r10: 3, reached: 50, percent: 38.5 },
  { city: "Новокузнецк",     total: 151, r0: 1,  r1: 4,  r2: 2,  r3: 0,  r4: 25, r5: 15, r6: 6,  r7: 0,  r8: 4,  r9: 1,  r10: 0, reached: 58, percent: 38.4 },
  { city: "Барнаул",         total: 105, r0: 1,  r1: 4,  r2: 1,  r3: 0,  r4: 14, r5: 3,  r6: 3,  r7: 0,  r8: 2,  r9: 2,  r10: 0, reached: 30, percent: 28.6 },
  { city: "Калининград",     total: 133, r0: 0,  r1: 4,  r2: 0,  r3: 1,  r4: 20, r5: 6,  r6: 1,  r7: 1,  r8: 4,  r9: 1,  r10: 2, reached: 40, percent: 30.1 },
  { city: "Красноярск",      total: 64,  r0: 2,  r1: 1,  r2: 1,  r3: 1,  r4: 15, r5: 6,  r6: 2,  r7: 0,  r8: 4,  r9: 0,  r10: 0, reached: 32, percent: 50.0 },
  { city: "Омск",            total: 24,  r0: 0,  r1: 3,  r2: 0,  r3: 0,  r4: 2,  r5: 4,  r6: 0,  r7: 1,  r8: 0,  r9: 0,  r10: 0, reached: 10, percent: 41.7 },
];

export const totals: CityRow = {
  city: "ИТОГО",
  total: 963,
  r0: 13, r1: 30, r2: 12, r3: 3,
  r4: 138, r5: 74, r6: 24, r7: 7,
  r8: 29, r9: 9, r10: 7,
  reached: 346,
  percent: 35.9,
};

export const reasonLabels: { key: keyof CityRow; short: string; full: string; color: string }[] = [
  { key: "r0",  short: "Нет жалоб",      full: "Не смогли помочь / нет жалоб",                                         color: "#94a3b8" },
  { key: "r1",  short: "Негатив",         full: "Негатив",                                                               color: "#f87171" },
  { key: "r2",  short: "Врач",            full: "Не понравился врач",                                                    color: "#fb923c" },
  { key: "r3",  short: "Сервис",          full: "Плохой сервис",                                                         color: "#fbbf24" },
  { key: "r4",  short: "Дорого",          full: "Дорого",                                                                color: "#f472b6" },
  { key: "r5",  short: "Подумаю",         full: "Дорого, но подумаю",                                                    color: "#a78bfa" },
  { key: "r6",  short: "Другая клиника",  full: "Решат/решили проблему в другой клинике",                               color: "#60a5fa" },
  { key: "r7",  short: "Запись",          full: "Записи / перезаписи",                                                   color: "#34d399" },
  { key: "r8",  short: "Позже",           full: "Всё устраивает, будут проходить лечение позже (отложили)",             color: "#00d4b4" },
  { key: "r9",  short: "Другой",          full: "Всё устраивает, не проблему, рекомендуют другую клинику",              color: "#818cf8" },
  { key: "r10", short: "Вернули",         full: "Вернули пациента / рекомендуют лечение у нас",                         color: "#4ade80" },
];
