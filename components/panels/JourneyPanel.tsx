"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipContentProps } from "recharts";
import { journey, getMonthlyActivity, MonthlyActivity } from "@/data/journey";
import { projects } from "@/data/projects";
import { Methodology } from "@/types";
import { CHART_GRID, CHART_TEXT, METHOD_COLOR } from "@/lib/chartTheme";
import { METHOD_META, MethodBadge, PhaseStrip, projectSpan, spanLabel } from "./Methodology";

const METHODS: Methodology[] = ["waterfall", "agile", "hybrid"];

function TickerTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload as MonthlyActivity;
  return (
    <div className="px-2 py-1.5" style={{ background: "#1c2030", border: "1px solid var(--chart-grid)", fontFamily: "var(--font-mono)" }}>
      <div style={{ fontSize: "11px", color: "var(--chart-text)" }}>{label}</div>
      <div style={{ fontSize: "13px", fontWeight: 700, color: "#e8e8e8" }}>{row.count} activities</div>
      {METHODS.filter((m) => row[m]).map((m) => (
        <div key={m} style={{ fontSize: "11px", color: METHOD_COLOR[m] }}>
          {METHOD_META[m].label}: {row[m]}
        </div>
      ))}
    </div>
  );
}

export default function JourneyPanel() {
  const monthly = getMonthlyActivity();
  const rows = [...journey].reverse();

  const totalActivities = journey.length;
  const last = monthly[monthly.length - 1]?.count ?? 0;
  const prev = monthly[monthly.length - 2]?.count ?? last;
  const delta = last - prev;
  const deltaPct = prev === 0 ? 100 : Math.round((delta / prev) * 100);
  const isUp = delta >= 0;

  // Newest first; projects without a timeline yet sit at the bottom
  const timeline = projects
    .filter((p) => p.methodology)
    .sort((a, b) => (projectSpan(b)?.start ?? -Infinity) - (projectSpan(a)?.start ?? -Infinity));

  return (
    <div className="p-4 flex flex-col gap-4" style={{ fontFamily: "var(--font-mono)", color: "var(--text)", fontSize: "clamp(12px, 1cqw, 14px)" }}>
      <div className="win-bevel-in" style={{ background: "var(--chart-bg)" }}>
        {/* Ticker header */}
        <div className="flex items-center justify-between px-3 pt-3 pb-1">
          <div>
            <div style={{ fontSize: "10px", color: "var(--chart-text)", letterSpacing: "0.05em" }}>DEV ACTIVITY / TOTAL</div>
            <div style={{ fontSize: "clamp(22px, 2.6cqw, 36px)", fontWeight: 700, color: "#e8e8e8" }}>{totalActivities}</div>
          </div>
          <div
            className="px-2 py-1"
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: isUp ? "var(--chart-up)" : "var(--chart-down)",
              background: isUp ? "rgba(38, 166, 154, 0.12)" : "rgba(239, 83, 80, 0.12)",
            }}
          >
            {isUp ? "▲" : "▼"} {Math.abs(delta)} ({isUp ? "+" : ""}
            {deltaPct}%)
          </div>
        </div>

        {/* Legend: one series per delivery methodology */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 px-3 pb-1" style={{ fontSize: "11px", color: "var(--chart-text)" }}>
          {METHODS.map((m) => (
            <span key={m} className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" style={{ width: 10, height: 3, background: METHOD_COLOR[m] }} />
              {METHOD_META[m].label} ({timeline.filter((p) => p.methodology === m).length})
            </span>
          ))}
        </div>

        {/* Chart grows with the window so a maximized log isn't half empty */}
        <div style={{ height: "clamp(140px, 24cqw, 360px)" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthly} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
              <defs>
                {METHODS.map((m) => (
                  <linearGradient key={m} id={`journeyFill-${m}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={METHOD_COLOR[m]} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={METHOD_COLOR[m]} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: CHART_TEXT }} axisLine={{ stroke: CHART_GRID }} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: CHART_TEXT }} axisLine={false} tickLine={false} width={24} />
              <Tooltip content={TickerTooltip} cursor={{ stroke: CHART_TEXT, strokeDasharray: "3 3" }} />
              {METHODS.map((m) => (
                <Area
                  key={m}
                  type="monotone"
                  dataKey={m}
                  stroke={METHOD_COLOR[m]}
                  strokeWidth={2}
                  fill={`url(#journeyFill-${m})`}
                  dot={false}
                  activeDot={{ r: 3, fill: METHOD_COLOR[m], strokeWidth: 0 }}
                  isAnimationActive={false}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Per-project delivery strips */}
      <div className="win-bevel-in" style={{ background: "var(--content-bg)" }}>
        <div className="flex items-center justify-between px-3 py-2" style={{ background: "var(--chrome-bg)", borderBottom: "1px solid var(--border-shadow)" }}>
          <span className="font-bold">Delivery timeline</span>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{timeline.length} projects</span>
        </div>
        {timeline.map((p, i) => {
          const first = p.milestones[0];
          const lastMs = p.milestones[p.milestones.length - 1];
          return (
            <div
              key={p.id}
              className="grid grid-cols-1 @2xl:grid-cols-[minmax(180px,30%)_1fr] gap-x-5 gap-y-2 px-3 py-3 items-center"
              style={{ borderTop: i ? "1px dashed var(--hairline)" : "none" }}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold truncate">{p.name}</span>
                  <MethodBadge method={p.methodology!} />
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  {first ? `${first.date} → ${lastMs.status === "in-progress" ? "now" : lastMs.date}` : p.status === "in-development" ? "In development" : "No timeline yet"}
                  {spanLabel(p) && ` | ${spanLabel(p)}`}
                </div>
                {p.methodologyNote && <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.35 }}>{p.methodologyNote}</div>}
              </div>
              <div className="pr-2">
                <PhaseStrip project={p} height={36} delay={i * 0.08} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="win-bevel-in overflow-auto" style={{ background: "var(--content-bg)", maxHeight: "clamp(220px, 30cqw, 560px)" }}>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: "var(--chrome-bg)" }}>
              {["Date", "Time", "Activity", "Project", "Method", "Status"].map((h) => (
                <th key={h} className="text-left px-2 py-1 font-bold" style={{ borderBottom: "1px solid var(--border-shadow)" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((entry, i) => (
              <tr key={`${entry.date}-${entry.activity}-${i}`} style={{ background: i % 2 === 0 ? "var(--content-bg)" : "var(--content-bg-alt)" }}>
                <td className="px-2 py-1">{entry.date}</td>
                <td className="px-2 py-1">{entry.time}</td>
                <td className="px-2 py-1">{entry.activity}</td>
                <td className="px-2 py-1">{entry.project}</td>
                <td className="px-2 py-1">{entry.methodology ? METHOD_META[entry.methodology].label : "-"}</td>
                <td className="px-2 py-1">
                  <span style={{ color: entry.status === "done" ? "var(--chart-up)" : "var(--warning)" }}>
                    {entry.status === "done" ? "● Done" : "○ In progress"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
