"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { journey, getMonthlyActivity } from "@/data/journey";

export default function JourneyPanel() {
  const monthly = getMonthlyActivity();
  const rows = [...journey].reverse();

  return (
    <div className="p-4 flex flex-col gap-4" style={{ fontFamily: "var(--font-mono)", color: "var(--text)" }}>
      <div className="win-bevel-in p-2" style={{ background: "var(--content-bg-alt)", height: 140 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthly} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-shadow)" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ fontFamily: "var(--font-mono)", fontSize: 11 }} />
            <Bar dataKey="count" fill="var(--accent)" />
          </BarChart>
        </ResponsiveContainer>
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
                  <span style={{ color: entry.status === "done" ? "var(--success)" : "var(--warning)" }}>
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
