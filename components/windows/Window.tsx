"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";
import { WindowState } from "@/types";
import { NAVBAR_HEIGHT, TASKBAR_HEIGHT } from "@/lib/layout";
import type { PixelIconProps } from "@/lib/pixel-icons";

interface WindowProps {
  window: WindowState;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onDragStart?: (id: string) => void;
  constraintsRef: RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  Icon?: (props: PixelIconProps) => React.ReactElement;
  isMobile: boolean;
  isActive: boolean;
  index?: number;
}

const curtain = {
  initial: { clipPath: "inset(0 0 100% 0)", opacity: 1 },
  animate: { clipPath: "inset(0 0 0% 0)", opacity: 1 },
  exit: { clipPath: "inset(0 0 100% 0)", opacity: 1 },
};

function windowPath(title: string) {
  return `C:\\YUSUF\\${title.split("—")[0].trim().toUpperCase().replace(/\s+/g, "_")}`;
}

export default function Window({ window: win, onClose, onMinimize, onMaximize, onFocus, onDragStart, constraintsRef, children, Icon, isMobile, isActive, index }: WindowProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);

  const isVisible = win.isOpen && !win.isMinimized;

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize?.[0];
      setDims({ w: Math.round(box?.inlineSize ?? el.offsetWidth), h: Math.round(box?.blockSize ?? el.offsetHeight) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isVisible, win.isMaximized, isMobile]);

  if (!isVisible) return null;

  const isFullScreen = win.isMaximized || isMobile;

  const frameStyle = isFullScreen
    ? {
        position: "fixed" as const,
        left: 0,
        top: NAVBAR_HEIGHT,
        width: "100vw",
        height: `calc(100vh - ${NAVBAR_HEIGHT + TASKBAR_HEIGHT}px)`,
        zIndex: win.zIndex,
        background: "var(--content-bg)",
        boxShadow: "none",
      }
    : {
        position: "fixed" as const,
        left: win.position.x,
        top: win.position.y,
        width: `clamp(${Math.round(win.size.width * 0.85)}px, 40vw, ${Math.round(win.size.width * 1.6)}px)`,
        maxWidth: "calc(100vw - 24px)",
        zIndex: win.zIndex,
        minHeight: `clamp(${Math.round(win.size.height * 0.85)}px, 34vh, ${Math.round(win.size.height * 1.6)}px)`,
        background: "var(--content-bg)",
      };

  const label = index !== undefined ? `[${String(index).padStart(2, "0")}]` : "[--]";

  return (
    <motion.div
      ref={frameRef}
      key={isFullScreen ? "maximized" : "normal"}
      drag={!isFullScreen}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      onDragStart={() => onDragStart?.(win.id)}
      initial={curtain.initial}
      animate={curtain.animate}
      exit={curtain.exit}
      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      onMouseDown={() => onFocus(win.id)}
      style={frameStyle}
      className="win-frame flex flex-col overflow-hidden"
      role="dialog"
      aria-label={win.title}
    >
      {/* Title bar — navy when focused, grey when in the background (Win98 behaviour) */}
      <div
        className="flex items-center justify-between gap-2 pl-2 pr-1.5 py-1.5 cursor-move select-none"
        style={{ background: isActive ? "var(--title-bg)" : "var(--content--surface)", transition: "background 0.2s" }}
        onDoubleClick={() => !isMobile && onMaximize(win.id)}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="bp-label shrink-0" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</span>
          {Icon && (
            <span className="shrink-0">
              <Icon size={14} />
            </span>
          )}
          <span className="bp-label truncate" style={{ color: "#ffffff", fontSize: 11, fontWeight: 700 }}>
            {win.title}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0" onPointerDown={(e) => e.stopPropagation()}>
          <button onClick={() => onMinimize(win.id)} className="win-ctrl" title="Minimize" aria-label="Minimize">
            _
          </button>
          {!isMobile && (
            <button onClick={() => onMaximize(win.id)} className="win-ctrl" title={win.isMaximized ? "Restore" : "Maximize"} aria-label={win.isMaximized ? "Restore" : "Maximize"}>
              {win.isMaximized ? "❐" : "□"}
            </button>
          )}
          <button onClick={() => onClose(win.id)} className="win-ctrl" title="Close" aria-label="Close">
            ✕
          </button>
        </div>
      </div>

      {/* Path + live dimensions, like a drawing sheet header */}
      <div
        className="flex items-center justify-between gap-3 px-2.5 py-1 bp-label"
        style={{ background: "var(--chrome-bg)", borderBottom: "1px solid var(--ink)", color: "var(--text-muted)" }}
      >
        <span className="truncate">{windowPath(win.title)}</span>
        <span className="shrink-0">{dims ? `W ${dims.w} × H ${dims.h}` : ""}</span>
      </div>

      {/* Window body */}
      <div
        className="flex-1 min-h-0 overflow-auto win-content-cq"
        style={{
          background: "var(--content-bg)",
          color: "var(--text)",
          maxHeight: isFullScreen ? "none" : "70vh",
        }}
      >
        {children}
      </div>

      {/* Status bar */}
      <div
        className="px-2.5 py-1 flex justify-between bp-label"
        style={{ background: "var(--chrome-bg)", borderTop: "1px solid var(--ink)", color: "var(--text-muted)" }}
      >
        <span>Ready</span>
        <span style={{ color: "var(--success)" }}>● Online</span>
      </div>
    </motion.div>
  );
}
