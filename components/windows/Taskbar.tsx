"use client";

import { WindowState } from "@/types";
import { TASKBAR_HEIGHT } from "@/lib/layout";
import { StartFlagIcon, SpeakerIcon, type PixelIconProps } from "@/lib/pixel-icons";

interface TaskbarProps {
  windows: WindowState[];
  onWindowClick: (id: string) => void;
  time: string;
  getIcon: (id: string) => ((props: PixelIconProps) => React.ReactElement) | undefined;
  sidebarWidth: number;
  isMobile: boolean;
  onToggleSidebar: () => void;
}

export default function Taskbar({ windows, onWindowClick, time, getIcon, sidebarWidth, isMobile, onToggleSidebar }: TaskbarProps) {
  const startIconSize = isMobile ? 20 : 47;
  const windowIconSize = isMobile ? 14 : 27;
  const traySpeakerSize = isMobile ? 14 : 20;
  const buttonTextClass = isMobile ? "text-[10px]" : "text-xs";
  const buttonMaxWidth = isMobile ? "90px" : "140px";

  return (
    <div
      className="fixed bottom-0 right-0 flex items-center justify-between px-2 gap-2 z-50 win-bevel-out"
      style={{
        left: sidebarWidth,
        background: "var(--chrome-bg)",
        height: TASKBAR_HEIGHT,
        borderLeft: "none",
        color: "var(--text)",
      }}
    >
      {/* Start + Window buttons */}
      <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
        {isMobile && (
          <button
            onClick={onToggleSidebar}
            className="win-bevel-out px-2 py-1 text-sm font-bold flex items-center justify-center shrink-0"
            style={{ background: "var(--chrome-bg)", fontFamily: "var(--font-mono)", minWidth: 32 }}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
        )}

        <button
          className={`win-bevel-out px-2 py-1 ${buttonTextClass} font-bold flex items-center gap-1.5 shrink-0`}
          style={{ background: "var(--chrome-bg)", fontFamily: "var(--font-mono)" }}
        >
          <StartFlagIcon size={startIconSize} />
          Start
        </button>

        <div className="w-px h-6 mx-1 shrink-0" style={{ background: "var(--border-shadow)" }} />

        <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
          {windows
            .filter((w) => w.isOpen)
            .map((win) => {
              const Icon = getIcon(win.id);
              return (
                <button
                  key={win.id}
                  onClick={() => onWindowClick(win.id)}
                  className={
                    win.isMinimized
                      ? `win-bevel-in px-3 py-1 ${buttonTextClass} shrink-0 flex items-center gap-1.5`
                      : `win-bevel-out px-3 py-1 ${buttonTextClass} shrink-0 flex items-center gap-1.5`
                  }
                  style={{
                    background: "var(--chrome-bg)",
                    fontFamily: "var(--font-mono)",
                    maxWidth: buttonMaxWidth,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {Icon && <Icon size={windowIconSize} />}
                  <span className="overflow-hidden text-ellipsis">{win.title}</span>
                </button>
              );
            })}
        </div>
      </div>

      {/* System tray */}
      <div className="win-bevel-in flex items-center gap-2 shrink-0 px-2 py-1" style={{ background: "var(--chrome-bg-alt)" }}>
        <SpeakerIcon size={traySpeakerSize} />
        <span className={buttonTextClass} style={{ fontFamily: "var(--font-mono)" }}>
          {time}
        </span>
      </div>
    </div>
  );
}
