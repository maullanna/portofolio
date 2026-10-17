"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STEPS = [
  "Initialize core system",
  "Mount /projects",
  "Load skills.db",
  "Sync journey log",
  "Run diagnostics",
  "Start execution",
];

const BOOT_MS = 2200;
const SEEN_KEY = "yusuf-os-booted";

function alreadyBooted() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Full-screen boot screen shown on load. Counts to 100%, ticks off the
 * steps, then lifts away like a curtain. Shown in full once per session;
 * click or any key skips it.
 */
export default function BootSequence() {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let frame = 0;
    if (reduceMotion || alreadyBooted()) {
      // Skip straight to the curtain lift
      frame = requestAnimationFrame(() => setProgress(100));
      return () => cancelAnimationFrame(frame);
    }

    const start = performance.now();
    const tick = (now: number) => {
      // Ease-out so the counter slows near the end, like a real loader
      const t = Math.min(1, (now - start) / BOOT_MS);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  useEffect(() => {
    if (progress < 100 || !visible) return;
    const id = setTimeout(() => setVisible(false), 350);
    return () => clearTimeout(id);
  }, [progress, visible]);

  useEffect(() => {
    if (visible) return;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const skip = () => setProgress(100);
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [visible]);

  const stepsDone = Math.floor((progress / 100) * STEPS.length);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          className="fixed inset-0 flex flex-col justify-between p-6 sm:p-10 cursor-pointer select-none"
          style={{ background: "var(--title-bg)", color: "#ffffff", zIndex: 100000 }}
          initial={false}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => setProgress(100)}
          role="status"
          aria-label={`Loading portfolio, ${progress}%`}
        >
          <div className="flex items-start justify-between gap-6">
            <div className="bp-label" style={{ color: "rgba(255,255,255,0.7)" }}>
              [Boot] Yusuf.OS  Build 2026
            </div>
            <div className="bp-label hidden sm:block" style={{ color: "rgba(255,255,255,0.5)" }}>
              Click or press any key to skip
            </div>
          </div>

          <div className="w-full max-w-xl">
            {STEPS.map((step, i) => {
              const done = i < stepsDone;
              const active = i === stepsDone && progress < 100;
              return (
                <div key={step} className="boot-step bp-label" style={{ fontSize: 12, opacity: done || active ? 1 : 0.35 }}>
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>{String(i + 1).padStart(3, "0")}</span>
                  <span>{step}</span>
                  <span style={{ color: done ? "var(--accent)" : "#ffffff" }}>{done ? "[ OK ]" : active ? "[ .. ]" : ""}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="flex-1 max-w-xl">
              <div className="h-1.5 w-full" style={{ background: "rgba(255,255,255,0.15)" }}>
                <div className="h-full" style={{ width: `${progress}%`, background: "var(--accent)" }} />
              </div>
            </div>
            <div
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(64px, 14vw, 160px)", lineHeight: 0.8, letterSpacing: "-0.04em" }}
            >
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
