import { projects } from "./projects";
import { JourneyEntry, Methodology } from "@/types";

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
      methodology: project.methodology,
    }))
  )
  .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());

export type MonthlyActivity = { month: string; count: number } & Record<Methodology, number>;

/** Milestones per month, split by the delivery methodology of the project they belong to */
export function getMonthlyActivity(): MonthlyActivity[] {
  const months = new Map<string, MonthlyActivity>();

  journey.forEach((entry) => {
    const d = parseDate(entry.date);
    const key = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    const row = months.get(key) ?? { month: key, count: 0, waterfall: 0, agile: 0, hybrid: 0 };
    row.count += 1;
    if (entry.methodology) row[entry.methodology] += 1;
    months.set(key, row);
  });

  return Array.from(months.values()).sort((a, b) => parseDate(`01 ${a.month}`).getTime() - parseDate(`01 ${b.month}`).getTime());
}
