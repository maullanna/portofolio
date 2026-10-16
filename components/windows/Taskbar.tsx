"use client";

import { WindowState } from "@/types";
import { TASKBAR_HEIGHT } from "@/lib/layout";
import { StartFlagIcon, SpeakerIcon, type PixelIconProps } from "@/lib/pixel-icons";

interface TaskbarProps {
  windows: WindowState[];
  activeId: string | null;
  onWindowClick: (id: string) => void;
  time: string;
  date: string;
  getIcon: (id: string) => ((props: PixelIconProps) => React.ReactElement) | undefined;
  getIndex: (id: string) => number | undefined;
  isMobile: boolean;
  onStart: () => void;
}

export default function Taskbar({ windows, activeId, onWindowClick, time, date, getIcon, getIndex, isMobile, onStart }: TaskbarProps) {
  const buttonMaxWidth = isMobile ? 96 : 180;

  return (
    <div
      className="fixed bottom-0 right-0 flex items-stretch z-50"
      style={{
        left: 0,
        background: "var(--chrome-bg)",
        height: TASKBAR_HEIGHT,
        borderTop: "1px solid var(--line)",
        color: "var(--text)",
      }}
    >
      <button
        onClick={onStart}
        className="flex items-center gap-2 px-3 shrink-0 cursor-pointer transition-colors hover:bg-[var(--title-bg)] hover:text-white"
        style={{ borderRight: "1px solid var(--line)", fontFamily: "var(--font-mono)" }}
        aria-label={isMobile ? "Open menu" : "Start"}
      >
        <StartFlagIcon size={isMobile ? 18 : 20} />
        <span className="bp-label" style={{ fontSize: 11, fontWeight: 700 }}>Start</span>
      </button>

      <div className="flex items-center gap-1.5 px-2 min-w-0 flex-1 overflow-x-auto">
        {windows
          .filter((w) => w.isOpen)
          .map((win) => {
            const Icon = getIcon(win.id);
            const idx = getIndex(win.id);
            const active = win.id === activeId;
            return (
              <button
                key={win.id}
                onClick={() => onWindowClick(win.id)}
                className="chrome-btn shrink-0 px-2 py-1"
                style={{
                  maxWidth: buttonMaxWidth,
                  background: active ? "var(--title-bg)" : win.isMinimized ? "transparent" : "var(--content-bg)",
                  color: active ? "#ffffff" : "var(--text)",
                  borderStyle: win.isMinimized ? "dashed" : "solid",
                  boxShadow: active ? "none" : "var(--shadow-hard-sm)",
                }}
                title={win.isMinimized ? `Restore ${win.title}` : active ? `Minimize ${win.title}` : win.title}
              >
                {idx !== undefined && <span className="bp-label opacity-60" style={{ fontSize: 9 }}>{String(idx).padStart(2, "0")}</span>}
                {Icon && <Icon size={14} />}
                <span className="bp-label truncate" style={{ fontSize: 10 }}>{win.title}</span>
              </button>
            );
          })}
      </div>

      {/* System tray */}
      <div className="flex items-center gap-2 shrink-0 px-3" style={{ borderLeft: "1px solid var(--line)", background: "var(--chrome-bg-alt)" }}>
        <SpeakerIcon size={isMobile ? 14 : 16} />
        <div className="flex flex-col items-end leading-none gap-0.5">
          <span className="bp-label" style={{ fontSize: 11, fontWeight: 700, color: "var(--text)" }}>{time}</span>
          {!isMobile && <span className="bp-label" style={{ fontSize: 9, color: "var(--text-muted)" }}>{date}</span>}
        </div>
      </div>
    </div>
  );
}
