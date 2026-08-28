"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipContentProps } from "recharts";
import { Project } from "@/types";
import {
  projectIcons,
  DocumentIcon,
  StarIcon,
  GlobeIcon,
  FloppyDiskIcon,
  ComputerIcon,
  CubeIcon,
  DatabaseIcon,
  ServerIcon,
  ActivityIcon,
  LinkIcon,
  type PixelIconProps,
} from "@/lib/pixel-icons";

interface ProjectDetailPanelProps {
  project: Project;
}

const TABS = ["Overview", "Journey", "Features", "Tech Stack", "Screenshots"] as const;
type Tab = (typeof TABS)[number];

const TECH_GROUPS: { key: keyof Project["techStack"]; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "tools", label: "Tools" },
];

function shortDate(date: string) {
  return date.replace(/ \d{4}$/, "");
}

function parseDate(date: string): number {
  const parsed = new Date(date.replace(/(\d{2}) (\w{3}) (\d{4})/, "$2 $1, $3"));
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

function daySpan(start?: string, end?: string): string | null {
  if (!start || !end) return null;
  const days = Math.round((parseDate(end) - parseDate(start)) / 86_400_000);
  return days >= 0 ? `${days} days` : null;
}

function JourneyTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload as { label: string; time: string; activity: string };
  return (
    <div className="win-bevel-out px-2 py-1.5 text-xs" style={{ background: "var(--content-bg)", fontFamily: "var(--font-mono)" }}>
      <div className="font-bold">{point.label}</div>
      <div style={{ color: "var(--text-muted)" }}>{point.time}</div>
      <div>{point.activity}</div>
    </div>
  );
}

function ArchNode({ Icon, label, value }: { Icon: (p: PixelIconProps) => React.JSX.Element; label: string; value: string }) {
  return (
    <div className="win-bevel-out flex flex-col items-center gap-1 px-3 py-2 text-center" style={{ background: "var(--content-bg)", minWidth: 108 }}>
      <Icon size={22} />
      <div style={{ fontSize: "11px", fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{value}</div>
    </div>
  );
}

export default function ProjectDetailPanel({ project }: ProjectDetailPanelProps) {
  const [tab, setTab] = useState<Tab>("Overview");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const techGroups = TECH_GROUPS.filter((g) => project.techStack[g.key]?.length);
  const Icon = projectIcons[project.iconKey];
  const duration = daySpan(project.startDate, project.endDate) ?? project.duration;

  const stats = [
    { label: "Features", value: project.features.length },
    { label: "Technologies", value: project.tech.length },
    { label: "Highlights", value: project.impact.length },
  ];

  const activityData = project.milestones.map((m, i) => ({
    label: shortDate(m.date),
    time: m.time,
    activity: m.activity,
    progress: i + 1,
  }));

  const recentActivity = [...project.milestones].reverse().slice(0, 5);

  const arch = {
    frontend: project.techStack.frontend?.[0],
    backend: project.techStack.backend?.[0],
    database: project.techStack.database?.[0],
    server: project.techStack.tools?.find((t) => /vps|cloud|panel|server|linux/i.test(t)) ?? project.techStack.tools?.[0],
  };
  const hasArchitecture = Boolean(arch.frontend || arch.backend || arch.database);

  return (
    <div style={{ fontFamily: "var(--font-mono)", color: "var(--text)" }}>
      {/* Persistent header — always visible, above the tabs */}
      <div className="p-4 flex items-start justify-between gap-4 flex-wrap" style={{ borderBottom: "1px solid var(--border-shadow)", background: "var(--content-bg)" }}>
        <div className="flex items-start gap-3 min-w-0">
          <Icon size={56} className="shrink-0" />
          <div className="min-w-0">
            <h2 style={{ fontSize: "clamp(20px, 4.8cqw, 28px)", fontWeight: 700 }}>{project.name}</h2>
            <p style={{ fontSize: "clamp(12px, 2.6cqw, 14px)", color: "var(--text-muted)" }}>{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.tech.slice(0, 4).map((t) => (
                <span key={t} className="win-bevel-out px-2 py-1" style={{ fontSize: "12px", background: "var(--chrome-bg)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="win-bevel-in shrink-0 flex flex-col gap-1.5 p-3" style={{ background: "var(--content-bg-alt)", fontSize: "13px", minWidth: 200 }}>
          <div className="flex items-center justify-between gap-4">
            <span style={{ color: "var(--text-muted)" }}>Status</span>
            <span
              className="win-bevel-out px-1.5"
              style={{ color: project.status === "completed" ? "var(--success)" : "var(--warning)", fontWeight: 700, background: "var(--content-bg)", fontSize: "11px" }}
            >
              {project.status === "completed" ? "DONE" : "WIP"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span style={{ color: "var(--text-muted)" }}>Started</span>
            <span>{project.startDate ?? "—"}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span style={{ color: "var(--text-muted)" }}>Released</span>
            <span>{project.endDate ?? "Ongoing"}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span style={{ color: "var(--text-muted)" }}>Duration</span>
            <span>{duration ?? "—"}</span>
          </div>
        </div>
      </div>

      {/* Seamless folder-style tab strip */}
      <div className="flex items-end px-2 pt-2 overflow-x-auto" style={{ background: "var(--chrome-bg)", borderBottom: "1px solid var(--border-shadow)" }}>
        {TABS.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="cursor-pointer win-bevel-out shrink-0"
              style={{
                padding: "9px 16px",
                fontSize: "clamp(12px, 2.4cqw, 14px)",
                fontWeight: active ? 700 : 400,
                color: active ? "var(--accent-dark)" : "var(--text)",
                background: active ? "var(--content-bg)" : "var(--chrome-bg)",
                borderBottomColor: active ? "var(--content-bg)" : "var(--border-shadow)",
                position: "relative",
                top: active ? 1 : 0,
                zIndex: active ? 2 : 1,
                marginRight: 2,
              }}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="p-5" style={{ background: "var(--content-bg)" }}>
        {tab === "Overview" && (
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <DocumentIcon size={18} />
                <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--success)" }}>OVERVIEW</span>
              </div>
              <p style={{ fontSize: "clamp(12px, 2.6cqw, 14px)", color: "var(--text-muted)", lineHeight: 1.6 }}>{project.longDescription}</p>
            </div>

            <div className="responsive-grid grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div className="win-bevel-in p-3" style={{ background: "var(--content-bg-alt)" }}>
                <div className="mb-1.5" style={{ fontSize: "12px", fontWeight: 700, color: "var(--warning)" }}>⚠ PROBLEM</div>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>{project.problem}</p>
              </div>
              <div className="win-bevel-in p-3" style={{ background: "var(--content-bg-alt)" }}>
                <div className="mb-1.5" style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-dark)" }}>🔧 SOLUTION</div>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>{project.solution}</p>
              </div>
              <div className="win-bevel-in p-3" style={{ background: "var(--content-bg-alt)" }}>
                <div className="mb-1.5 flex items-center gap-1.5" style={{ fontSize: "12px", fontWeight: 700, color: "var(--success)" }}>
                  <ActivityIcon size={14} /> RESULT &amp; IMPACT
                </div>
                <ul className="flex flex-col gap-1">
                  {project.impact.map((line) => (
                    <li key={line} className="flex items-start gap-1.5" style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                      <span className="shrink-0" style={{ color: "var(--success)" }}>▸</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {stats.map((s) => (
                <div key={s.label} className="win-bevel-in flex items-center gap-2 px-3 py-2" style={{ background: "var(--content-bg-alt)" }}>
                  <StarIcon size={16} />
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--accent-dark)" }}>{s.value}+</div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Journey" && (
          project.milestones.length === 0 ? (
            <div className="win-bevel-in p-6 text-center text-sm" style={{ background: "var(--content-bg-alt)", color: "var(--text-muted)" }}>
              No detailed timeline available yet.
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div>
                <div style={{ fontSize: "clamp(15px, 3cqw, 18px)", fontWeight: 700 }}>PROJECT JOURNEY</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Development activity over time</div>
              </div>

              <div className="win-bevel-in p-3" style={{ background: "var(--content-bg-alt)", height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData} margin={{ top: 8, right: 16, left: -12, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-shadow)" />
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} label={{ value: "Activity", angle: -90, position: "insideLeft", fontSize: 12 }} />
                    <Tooltip content={JourneyTooltip} />
                    <Line type="monotone" dataKey="progress" stroke="var(--accent)" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="responsive-grid grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
                <div className="win-bevel-in text-center py-3" style={{ background: "var(--content-bg-alt)" }}>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--accent-dark)" }}>{project.milestones.length}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Milestones</div>
                </div>
                <div className="win-bevel-in text-center py-3" style={{ background: "var(--content-bg-alt)" }}>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--accent-dark)" }}>{duration ?? "—"}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Duration</div>
                </div>
              </div>

              <div>
                <div className="mb-2" style={{ fontSize: "14px", fontWeight: 700 }}>MILESTONE</div>
                <div className="overflow-x-auto pb-2">
                  <div className="flex items-start" style={{ width: "max-content" }}>
                    {project.milestones.map((m, i) => (
                      <div key={`${m.date}-${m.activity}`} className="flex items-start">
                        <div className="flex flex-col items-center text-center" style={{ width: 130 }}>
                          <span
                            className="win-bevel-out rounded-full"
                            style={{ width: 14, height: 14, background: m.status === "done" ? "var(--success)" : "var(--warning)" }}
                          />
                          <div className="mt-2 font-bold" style={{ fontSize: "13px" }}>{m.activity}</div>
                          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{shortDate(m.date)}</div>
                        </div>
                        {i < project.milestones.length - 1 && (
                          <div className="mt-[6px]" style={{ width: 32, height: 2, background: "var(--border-shadow)" }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {tab === "Features" && (
          <div>
            <div className="mb-4" style={{ fontSize: "14px", fontWeight: 700 }}>FEATURES</div>
            <div className="responsive-grid grid gap-x-8 gap-y-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", maxWidth: 640 }}>
              {project.features.map((f) => (
                <div key={f} className="flex items-start gap-2" style={{ fontSize: "14px" }}>
                  <span className="shrink-0" style={{ color: "var(--success)" }}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Tech Stack" && (
          <div className="flex flex-col gap-6">
            <div className="responsive-grid grid gap-x-8 gap-y-6" style={{ gridTemplateColumns: hasArchitecture ? "repeat(auto-fit, minmax(280px, 1fr))" : "1fr" }}>
              <div>
                <div className="mb-3" style={{ fontSize: "14px", fontWeight: 700 }}>TECHNOLOGY STACK</div>
                <div className="responsive-grid grid gap-x-6 gap-y-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
                  {techGroups.map(({ key, label }) => (
                    <div key={key}>
                      <div className="mb-2" style={{ fontSize: "13px", fontWeight: 700, color: "var(--accent-dark)" }}>
                        {label}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack[key]!.map((t) => (
                          <span key={t} className="win-bevel-out px-2.5 py-1.5" style={{ fontSize: "13px", background: "var(--chrome-bg)" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {hasArchitecture && (
                <div>
                  <div className="mb-3" style={{ fontSize: "14px", fontWeight: 700 }}>ARCHITECTURE OVERVIEW</div>
                  <div className="win-bevel-in p-4 flex flex-col items-center gap-3" style={{ background: "var(--content-bg-alt)" }}>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      {arch.frontend && <ArchNode Icon={ComputerIcon} label="Frontend" value={arch.frontend} />}
                      {arch.frontend && (arch.backend || arch.database) && <span style={{ color: "var(--text-muted)" }}>↔</span>}
                      {arch.backend && <ArchNode Icon={CubeIcon} label="Backend API" value={arch.backend} />}
                      {arch.backend && arch.database && <span style={{ color: "var(--text-muted)" }}>↔</span>}
                      {arch.database && <ArchNode Icon={DatabaseIcon} label="Database" value={arch.database} />}
                    </div>
                    {arch.server && (
                      <>
                        <span style={{ color: "var(--text-muted)" }}>↕</span>
                        <ArchNode Icon={ServerIcon} label="Server" value={arch.server} />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="responsive-grid grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div className="win-bevel-in p-3" style={{ background: "var(--content-bg-alt)" }}>
                <div className="mb-2 flex items-center gap-1.5" style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-dark)" }}>
                  <StarIcon size={14} /> PROJECT HIGHLIGHTS
                </div>
                <ul className="flex flex-col gap-2">
                  {project.impact.slice(0, 4).map((line) => (
                    <li key={line} className="flex items-start gap-1.5" style={{ fontSize: "12px" }}>
                      <span className="shrink-0" style={{ color: "var(--success)" }}>▸</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="win-bevel-in p-3" style={{ background: "var(--content-bg-alt)" }}>
                <div className="mb-2" style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-dark)" }}>KEY STATISTICS</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Features", value: project.features.length },
                    { label: "Technologies", value: project.tech.length },
                    { label: "Milestones", value: project.milestones.length },
                    { label: "Duration", value: duration ?? "—" },
                  ].map((s) => (
                    <div key={s.label} className="win-bevel-in text-center py-2" style={{ background: "var(--content-bg)" }}>
                      <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--accent-dark)" }}>{s.value}</div>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="win-bevel-in p-3" style={{ background: "var(--content-bg-alt)" }}>
                <div className="mb-2 flex items-center gap-1.5" style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-dark)" }}>
                  <ActivityIcon size={14} /> RECENT ACTIVITY
                </div>
                {recentActivity.length === 0 ? (
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>No activity logged yet.</div>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {recentActivity.map((m) => (
                      <li key={`${m.date}-${m.activity}`} style={{ fontSize: "12px" }}>
                        <div className="flex items-center gap-1.5">
                          <span style={{ color: m.status === "done" ? "var(--success)" : "var(--warning)" }}>●</span>
                          <span style={{ color: "var(--text-muted)" }}>
                            {shortDate(m.date)}
                            {m.time !== "—" ? ` · ${m.time}` : ""}
                          </span>
                        </div>
                        <div style={{ marginLeft: 14 }}>{m.activity}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {(project.url || project.github) && (
                <div className="win-bevel-in p-3" style={{ background: "var(--content-bg-alt)" }}>
                  <div className="mb-2 flex items-center gap-1.5" style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent-dark)" }}>
                    <LinkIcon size={14} /> QUICK LINKS
                  </div>
                  <div className="flex flex-col gap-2">
                    {project.url && (
                      <a
                        href={`https://${project.url.replace(/^https?:\/\//, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="win-bevel-out win-pressable px-2 py-1.5 flex items-center gap-2"
                        style={{ fontSize: "12px", background: "var(--chrome-bg)", color: "var(--text)" }}
                      >
                        <GlobeIcon size={14} /> Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="win-bevel-out win-pressable px-2 py-1.5 flex items-center gap-2"
                        style={{ fontSize: "12px", background: "var(--chrome-bg)", color: "var(--text)" }}
                      >
                        <FloppyDiskIcon size={14} /> View Repository
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "Screenshots" && (
          project.screenshots?.length ? (
            <div className="responsive-grid grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))" }}>
              {project.screenshots.map((src) => (
                <button
                  key={src}
                  onClick={() => setLightbox(src)}
                  className="win-bevel-in overflow-hidden cursor-zoom-in"
                  style={{ background: "var(--content-bg-alt)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${project.name} screenshot`} className="w-full h-auto block" />
                </button>
              ))}
            </div>
          ) : (
            <div className="win-bevel-in p-6 text-center text-sm" style={{ background: "var(--content-bg-alt)", color: "var(--text-muted)" }}>
              No screenshots yet.
            </div>
          )
        )}
      </div>

      {/* Persistent bottom action bar */}
      {(project.url || project.github) && (
        <div className="flex items-center gap-3 px-4 py-3" style={{ borderTop: "1px solid var(--border-shadow)", background: "var(--chrome-bg)" }}>
          {project.url && (
            <a
              href={`https://${project.url.replace(/^https?:\/\//, "")}`}
              target="_blank"
              rel="noreferrer"
              className="win-bevel-out win-pressable px-4 py-2 flex items-center gap-2"
              style={{ background: "var(--chrome-bg)", color: "var(--text)", fontSize: "13px" }}
            >
              <GlobeIcon size={16} /> Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="win-bevel-out win-pressable px-4 py-2 flex items-center gap-2"
              style={{ background: "var(--chrome-bg)", color: "var(--text)", fontSize: "13px" }}
            >
              <FloppyDiskIcon size={16} /> Open Repository
            </a>
          )}
        </div>
      )}

      {lightbox && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 flex items-center justify-center p-8 cursor-zoom-out"
          style={{ background: "rgba(0,0,0,0.75)", zIndex: 99999 }}
          onClick={() => setLightbox(null)}
        >
          <div className="win-bevel-out flex flex-col" style={{ background: "var(--chrome-bg)", maxWidth: "90vw", maxHeight: "90vh" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-2 py-1" style={{ background: "var(--title-bg)" }}>
              <span className="text-white text-xs font-bold">{project.name}</span>
              <button onClick={() => setLightbox(null)} className="win-bevel-out win-btn" title="Close">
                ✕
              </button>
            </div>
            <div className="overflow-auto p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lightbox} alt={`${project.name} screenshot enlarged`} style={{ maxWidth: "100%", maxHeight: "80vh", display: "block" }} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
