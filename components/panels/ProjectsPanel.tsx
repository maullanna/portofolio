"use client";

import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { projectIcons } from "@/lib/pixel-icons";

interface ProjectsPanelProps {
  onOpenProject: (id: string) => void;
  onOpenJourney: () => void;
  onOpenAbout: () => void;
  onOpenHero: () => void;
}

type SortKey = "newest" | "oldest" | "name";

function parseDate(date?: string): number {
  if (!date) return 0;
  const parsed = new Date(date.replace(/(\d{2}) (\w{3}) (\d{4})/, "$2 $1, $3"));
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

export default function ProjectsPanel({ onOpenProject, onOpenJourney, onOpenAbout, onOpenHero }: ProjectsPanelProps) {
  const [sortBy, setSortBy] = useState<SortKey>("newest");

  const sorted = useMemo(() => {
    const list = [...projects];
    if (sortBy === "name") return list.sort((a, b) => a.name.localeCompare(b.name));
    return list.sort((a, b) =>
      sortBy === "newest" ? parseDate(b.startDate) - parseDate(a.startDate) : parseDate(a.startDate) - parseDate(b.startDate)
    );
  }, [sortBy]);

  return (
    <div style={{ fontFamily: "var(--font-mono)", color: "var(--text)" }}>
      {/* Quick nav */}
      <div
        className="flex gap-4 px-4 py-1.5 text-xs"
        style={{ borderBottom: "1px solid var(--border-shadow)", background: "var(--content-bg-alt)" }}
      >
        <span className="font-bold" style={{ color: "var(--accent-dark)" }}>Projects</span>
        <button onClick={onOpenJourney} className="cursor-pointer hover:underline" style={{ color: "var(--text-muted)" }}>
          Journey
        </button>
        <button onClick={onOpenAbout} className="cursor-pointer hover:underline" style={{ color: "var(--text-muted)" }}>
          About
        </button>
      </div>

      {/* Explorer toolbar */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: "1px solid var(--border-shadow)", background: "var(--chrome-bg)" }}>
        <button onClick={onOpenHero} className="win-bevel-out px-2 py-1 text-xs cursor-pointer" style={{ background: "var(--chrome-bg)" }}>
          ‹ Back
        </button>
        <div className="flex-1" />
        <label className="flex items-center gap-1.5 text-xs shrink-0">
          <span style={{ color: "var(--text-muted)" }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="win-bevel-in px-1 py-1 text-xs cursor-pointer"
            style={{ background: "var(--content-bg)", color: "var(--text)" }}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      {/* Project grid */}
      <div className="p-4">
        <h2 style={{ fontSize: "18px", fontWeight: 700 }}>All Projects</h2>
        <p className="mb-3" style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          A collection of applications and systems I&apos;ve built.
        </p>

        <div className="projects-grid grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
          {sorted.map((project) => {
            const Icon = projectIcons[project.iconKey];
            return (
              <div
                key={project.id}
                className="win-bevel-out p-3 flex flex-col gap-2"
                style={{ background: "var(--content-bg)" }}
              >
                <div className="flex items-start justify-between gap-2">
                  <Icon size={32} />
                  <span
                    className="shrink-0 font-bold px-1.5 py-0.5"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.03em",
                      background: project.status === "completed" ? "var(--success)" : "var(--warning)",
                      color: "white",
                    }}
                  >
                    {project.status === "completed" ? "DONE" : "WIP"}
                  </span>
                </div>

                <div className="font-bold" style={{ fontSize: "15px" }}>{project.name}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{project.description}</div>

                <div className="flex flex-wrap gap-1 mt-auto">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="win-bevel-in px-1.5 py-0.5" style={{ fontSize: "10px", background: "var(--content-bg-alt)" }}>
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onOpenProject(project.id)}
                  className="win-bevel-out px-2 py-1.5 text-xs cursor-pointer flex items-center justify-center gap-1"
                  style={{ background: "var(--chrome-bg)" }}
                >
                  View Details ›
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1 text-xs win-bevel-in" style={{ background: "var(--chrome-bg)", color: "var(--text-muted)" }}>
        <span>{projects.length} project(s)</span>
        <span>Status: Ready</span>
      </div>
    </div>
  );
}
