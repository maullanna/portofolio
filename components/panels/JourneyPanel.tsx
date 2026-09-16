"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipContentProps } from "recharts";
import { journey, getMonthlyActivity } from "@/data/journey";
import { CHART_UP, CHART_GRID, CHART_TEXT } from "@/lib/chartTheme";

function TickerTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-2 py-1.5" style={{ background: "#1c2030", border: "1px solid var(--chart-grid)", fontFamily: "var(--font-mono)" }}>
      <div style={{ fontSize: "11px", color: "var(--chart-text)" }}>{label}</div>
      <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--chart-up)" }}>{payload[0].value} activities</div>
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

  return (
    <div className="p-4 flex flex-col gap-4" style={{ fontFamily: "var(--font-mono)", color: "var(--text)" }}>
      <div className="win-bevel-in" style={{ background: "var(--chart-bg)" }}>
        {/* Ticker header */}
        <div className="flex items-center justify-between px-3 pt-3 pb-1">
          <div>
            <div style={{ fontSize: "10px", color: "var(--chart-text)", letterSpacing: "0.05em" }}>DEV ACTIVITY / TOTAL</div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#e8e8e8" }}>{totalActivities}</div>
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

        <div style={{ height: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthly} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="journeyFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_UP} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={CHART_UP} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: CHART_TEXT }} axisLine={{ stroke: CHART_GRID }} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: CHART_TEXT }} axisLine={false} tickLine={false} width={24} />
              <Tooltip content={TickerTooltip} cursor={{ stroke: CHART_TEXT, strokeDasharray: "3 3" }} />
              <Area type="monotone" dataKey="count" stroke={CHART_UP} strokeWidth={2} fill="url(#journeyFill)" dot={{ r: 3, fill: CHART_UP, strokeWidth: 0 }} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="win-bevel-in overflow-auto" style={{ background: "var(--content-bg)", maxHeight: 220 }}>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr style={{ background: "var(--chrome-bg)" }}>
              {["Date", "Time", "Activity", "Project", "Status"].map((h) => (
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
