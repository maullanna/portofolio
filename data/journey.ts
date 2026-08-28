import { projects } from "./projects";
import { JourneyEntry } from "@/types";

function parseDate(date: string): Date {
  return new Date(date.replace(/(\d{2}) (\w{3}) (\d{4})/, "$2 $1, $3"));
}

export const journey: JourneyEntry[] = projects
  .flatMap((project) =>
    project.milestones.map((m) => ({
      date: m.date,
      time: m.time,
      activity: m.activity,
      project: project.name,
      status: m.status,
    }))
  )
  .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());

export function getMonthlyActivity(): { month: string; count: number }[] {
  const counts = new Map<string, number>();

  journey.forEach((entry) => {
    const d = parseDate(entry.date);
    const key = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([month, count]) => ({ month, count, sortKey: parseDate(`01 ${month}`) }))
    .sort((a, b) => a.sortKey.getTime() - b.sortKey.getTime())
    .map(({ month, count }) => ({ month, count }));
}
