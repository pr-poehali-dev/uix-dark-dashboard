import { useState } from "react";
import type { Period } from "@/components/Dashboard";

interface RevenueChartProps {
  period: Period;
}

const data7: number[] = [420, 380, 510, 470, 560, 620, 580];
const data30: number[] = [310,340,290,380,410,360,440,480,420,500,530,470,550,510,490,560,610,580,630,590,650,700,660,720,680,740,710,760,730,800];
const data90: number[] = Array.from({ length: 90 }, (_, i) =>
  Math.round(300 + i * 5 + Math.sin(i * 0.3) * 80 + Math.random() * 60)
);

const labels7 = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const getLabels30 = () => Array.from({ length: 30 }, (_, i) => i % 5 === 0 ? `${i + 1}` : "");
const getLabels90 = () => Array.from({ length: 90 }, (_, i) => i % 15 === 0 ? `${i + 1}` : "");

export default function RevenueChart({ period }: RevenueChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const raw = period === "7d" ? data7 : period === "30d" ? data30 : data90;
  const labels = period === "7d" ? labels7 : period === "30d" ? getLabels30() : getLabels90();

  const W = 620;
  const H = 180;
  const padL = 40;
  const padR = 12;
  const padT = 16;
  const padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const max = Math.max(...raw);
  const min = Math.min(...raw);
  const range = max - min || 1;

  const pts = raw.map((v, i) => ({
    x: padL + (i / (raw.length - 1)) * chartW,
    y: padT + (1 - (v - min) / range) * chartH,
    v,
  }));

  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${pts[pts.length - 1].x},${H - padB} L${pts[0].x},${H - padB} Z`;

  const gridLines = 4;

  const displayLabels = labels.map((l, i) => {
    const x = padL + (i / (labels.length - 1)) * chartW;
    return { x, label: l };
  }).filter(l => l.label);

  return (
    <div className="glass rounded-2xl p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Динамика выручки</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Тренд за выбранный период</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded bg-[var(--neon-blue)] inline-block" />
            Выручка
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden" style={{ height: H }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="w-full h-full"
          onMouseLeave={() => setHovered(null)}
        >
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--neon-blue)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--neon-blue)" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {Array.from({ length: gridLines }).map((_, i) => {
            const y = padT + (i / (gridLines - 1)) * chartH;
            const val = Math.round(max - (i / (gridLines - 1)) * range);
            return (
              <g key={i}>
                <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <text x={padL - 6} y={y + 4} textAnchor="end" fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="IBM Plex Mono">
                  {(val / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}

          {displayLabels.map(({ x, label }, i) => (
            <text key={i} x={x} y={H - 6} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="IBM Plex Sans">
              {label}
            </text>
          ))}

          <path d={areaPath} fill="url(#revGrad)" />

          <path
            d={linePath}
            stroke="var(--neon-blue)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
            className="chart-line"
          />

          {pts.map((p, i) => (
            <rect
              key={i}
              x={p.x - (chartW / raw.length / 2)}
              y={padT}
              width={chartW / raw.length}
              height={chartH}
              fill="transparent"
              onMouseEnter={() => setHovered(i)}
            />
          ))}

          {hovered !== null && (
            <>
              <line
                x1={pts[hovered].x}
                y1={padT}
                x2={pts[hovered].x}
                y2={H - padB}
                stroke="rgba(59,158,255,0.3)"
                strokeWidth="1"
                strokeDasharray="4,3"
              />
              <circle
                cx={pts[hovered].x}
                cy={pts[hovered].y}
                r="4"
                fill="var(--neon-blue)"
                stroke="hsl(var(--background))"
                strokeWidth="2"
              />
              <rect
                x={Math.min(pts[hovered].x - 30, W - padR - 70)}
                y={pts[hovered].y - 26}
                width="68"
                height="20"
                rx="4"
                fill="hsl(var(--card))"
                stroke="rgba(59,158,255,0.3)"
                strokeWidth="1"
              />
              <text
                x={Math.min(pts[hovered].x - 30, W - padR - 70) + 34}
                y={pts[hovered].y - 12}
                textAnchor="middle"
                fontSize="10"
                fill="var(--neon-blue)"
                fontFamily="IBM Plex Mono"
                fontWeight="500"
              >
                {pts[hovered].v.toLocaleString("ru")} ₽
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
