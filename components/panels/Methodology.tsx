"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Methodology, Milestone, Project } from "@/types";

export const METHOD_META: Record<Methodology, { label: string; blurb: string; swatch: string }> = {
  waterfall: { label: "Waterfall", blurb: "Sequential phases, each one finished before the next", swatch: "var(--ink)" },
  agile: { label: "Agile", blurb: "Short iterations with feedback after every cycle", swatch: "var(--accent)" },
  hybrid: { label: "Hybrid", blurb: "Planned up front, then built in iterations", swatch: "linear-gradient(90deg, var(--ink) 50%, var(--accent) 50%)" },
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Milestone dates come as "04 Jun 2025" or just "Oct 2025" */
export function parseMilestoneDate(date: string): number | null {
  const m = date.match(/^(?:(\d{1,2}) )?(\w{3}) (\d{4})$/);
  if (!m) return null;
  const month = MONTHS.indexOf(m[2]);
  return month < 0 ? null : Date.UTC(Number(m[3]), month, m[1] ? Number(m[1]) : 1);
}

const isOngoing = (p: Project) => p.milestones[p.milestones.length - 1]?.status === "in-progress";

export function projectSpan(p: Project): { start: number; end: number } | null {
  const times = p.milestones.map((m) => parseMilestoneDate(m.date)).filter((t): t is number => t !== null);
  if (!times.length) return null;
  const end = isOngoing(p) ? Math.max(times[times.length - 1], Date.now()) : times[times.length - 1];
  return { start: times[0], end };
}

export function spanLabel(p: Project): string | null {
  const span = projectSpan(p);
  if (!span) return null;
  const days = Math.round((span.end - span.start) / 86_400_000);
  const length = days > 60 ? `~${Math.round(days / 30)} months` : `${days} days`;
  return isOngoing(p) ? `${length}, ongoing` : length;
}

export function MethodBadge({ method }: { method: Methodology }) {
  return (
    <span className="bp-label inline-flex items-center gap-1.5 px-1.5 py-0.5" style={{ border: "1px solid var(--ink)", fontSize: 10, background: "var(--content-bg)" }}>
      <span aria-hidden="true" style={{ width: 8, height: 8, background: METHOD_META[method].swatch }} />
      {METHOD_META[method].label}
    </span>
  );
}

type Segment = { milestone: Milestone; left: number; width: number; kind: "phase" | "sprint"; open: boolean };

const PLANNING = /require|design|plan|concept/i;

/**
 * How many of the project's leading phases (milestone i to i+1) ran waterfall-style.
 * Waterfall: all of them. Agile: none. Hybrid: the leading planning/design phases, at least one.
 */
export function plannedPhaseCount(p: Project): number {
  const phases = Math.max(p.milestones.length - 1, 0);
  // Includes the open-ended last phase of a project still in progress
  if (p.methodology === "waterfall") return p.milestones.length;
  if (p.methodology !== "hybrid") return 0;
  let planned = 0;
  while (planned < phases - 1 && PLANNING.test(p.milestones[planned].activity)) planned++;
  return Math.max(planned, 1);
}

function buildSegments(p: Project): Segment[] {
  const ms = p.milestones;
  const times = ms.map((m) => parseMilestoneDate(m.date) ?? 0);
  const ongoing = isOngoing(p);
  const ends = ms.map((_, i) => (i < ms.length - 1 ? times[i + 1] : ongoing ? Math.max(times[i], Date.now()) : times[i]));
  // The last milestone of a finished project is the go-live point, not a phase
  const count = ongoing ? ms.length : ms.length - 1;
  const total = Math.max(1, ends[count - 1] - times[0]);
  // Same-day milestones still get a visible sliver
  const weights = Array.from({ length: count }, (_, i) => Math.max(ends[i] - times[i], total * 0.05));
  const sum = weights.reduce((a, b) => a + b, 0);

  const planned = plannedPhaseCount(p);

  let cursor = 0;
  return weights.map((w, i) => {
    const seg: Segment = {
      milestone: ms[i],
      left: (cursor / sum) * 100,
      width: (w / sum) * 100,
      kind: i < planned ? "phase" : "sprint",
      open: ongoing && i === count - 1,
    };
    cursor += w;
    return seg;
  });
}

/**
 * One project's lifetime as a strip. Waterfall phases cascade down a step per
 * phase; Agile milestones become separated sprint blocks; Hybrid starts as a
 * cascade and switches to sprints. Widths follow the real milestone dates.
 */
export function PhaseStrip({ project, height: minHeight = 40, delay = 0 }: { project: Project; height?: number; delay?: number }) {
  const reduce = useReducedMotion();

  if (project.milestones.length < 2) {
    return (
      <div className="bp-label flex items-center justify-center" style={{ height: minHeight, border: "1px dashed var(--line)", color: "var(--text-muted)", fontSize: 10 }}>
        Timeline coming soon
      </div>
    );
  }

  const segments = buildSegments(project);
  const phases = segments.filter((s) => s.kind === "phase");
  // Each waterfall step needs a readable thickness, so long cascades grow taller
  const height = Math.max(minHeight, phases.length * 10);
  const lane = height / Math.max(phases.length, 1);
  const sprintH = Math.round(height * 0.45);
  const sprintTop = phases.length && phases.length < segments.length ? height - sprintH : (height - sprintH) / 2;
  const last = project.milestones[project.milestones.length - 1];

  return (
    <div className="relative" style={{ height, borderBottom: "1px solid var(--hairline)" }}>
      {segments.map((s, i) => {
        const phaseIdx = phases.indexOf(s);
        const isPhase = s.kind === "phase";
        const top = isPhase ? phaseIdx * lane : sprintTop;
        const h = isPhase ? Math.min(Math.max(lane - 2, 3), 12) : sprintH;
        const fill = isPhase ? "var(--ink)" : i % 2 ? "var(--accent-dark)" : "var(--accent)";
        return (
          <div key={`${s.milestone.date}-${i}`}>
            {/* Waterfall hand-off: a drop line from one phase into the next */}
            {isPhase && phaseIdx > 0 && (
              <span className="absolute" style={{ left: `${s.left}%`, top: top - lane / 2, height: lane / 2 + 1, width: 1, background: "var(--ink)" }} />
            )}
            <motion.div
              title={`${s.milestone.activity} | ${s.milestone.date}`}
              className="absolute"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, delay: delay + i * 0.07, ease: [0.76, 0, 0.24, 1] }}
              style={{
                left: `${s.left}%`,
                width: `calc(${s.width}% - ${isPhase ? 0 : 3}px)`,
                top,
                height: h,
                transformOrigin: "left",
                background: s.open ? `repeating-linear-gradient(135deg, ${fill} 0 4px, transparent 4px 7px)` : fill,
                outline: s.open ? `1px solid ${fill}` : undefined,
              }}
            />
          </div>
        );
      })}
      {/* Go-live marker */}
      {last.status === "done" && (
        <motion.span
          title={`${last.activity} | ${last.date}`}
          className="absolute"
          initial={reduce ? false : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: delay + segments.length * 0.07 + 0.3 }}
          style={{ right: -5, top: height / 2 - 5, width: 10, height: 10, background: "var(--content-bg)", border: "2px solid var(--ink)", rotate: 45 }}
        />
      )}
    </div>
  );
}

/** Horizontal milestone stepper whose connecting line draws itself up to the latest finished step */
export function MilestoneStepper({ milestones }: { milestones: Milestone[] }) {
  const reduce = useReducedMotion();
  const STEP = 136;
  const NODE = 14;
  const lastDone = milestones.map((m) => m.status).lastIndexOf("done");
  const trackLen = STEP * (milestones.length - 1);
  const doneLen = STEP * Math.max(lastDone, 0);

  return (
    <div className="overflow-x-auto pb-2">
      <div className="relative" style={{ width: STEP * milestones.length }}>
        {/* Track, finished line, and the dashed stretch still in progress */}
        <div className="absolute" style={{ left: STEP / 2, top: NODE / 2, width: trackLen, height: 1, background: "var(--line)" }} />
        {lastDone < milestones.length - 1 && (
          <div
            className="absolute"
            style={{ left: STEP / 2 + doneLen, top: NODE / 2 - 1, width: trackLen - doneLen, height: 2, background: "repeating-linear-gradient(90deg, var(--warning) 0 5px, transparent 5px 9px)" }}
          />
        )}
        <motion.div
          className="absolute"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4 + milestones.length * 0.12, ease: [0.76, 0, 0.24, 1] }}
          style={{ left: STEP / 2, top: NODE / 2 - 1, width: doneLen, height: 2, background: "var(--accent)", transformOrigin: "left" }}
        />

        <div className="relative flex items-start">
          {milestones.map((m, i) => {
            const done = m.status === "done";
            return (
              <div key={`${m.date}-${m.activity}`} className="flex flex-col items-center text-center px-2" style={{ width: STEP }}>
                <motion.span
                  initial={reduce ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.25, delay: (i / Math.max(milestones.length - 1, 1)) * (0.4 + milestones.length * 0.12) }}
                  className="relative block"
                  style={{ width: NODE, height: NODE, background: done ? "var(--accent)" : "var(--content-bg)", border: `2px solid ${done ? "var(--accent)" : "var(--warning)"}` }}
                >
                  {!done && !reduce && (
                    <motion.span
                      className="absolute inset-0"
                      style={{ background: "var(--warning)" }}
                      animate={{ opacity: [0.15, 0.8, 0.15] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                  )}
                </motion.span>
                <div className="mt-2 font-bold" style={{ fontSize: 12, lineHeight: 1.3 }}>{m.activity}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{m.date}</div>
                {!done && <div className="bp-label mt-0.5" style={{ fontSize: 9, color: "var(--warning)" }}>In progress</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
