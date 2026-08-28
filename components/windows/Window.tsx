"use client";

import { motion } from "framer-motion";
import type { RefObject } from "react";
import { WindowState } from "@/types";
import { TASKBAR_HEIGHT } from "@/lib/layout";
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
  sidebarWidth: number;
  isMobile: boolean;
}

export default function Window({ window: win, onClose, onMinimize, onMaximize, onFocus, onDragStart, constraintsRef, children, Icon, sidebarWidth, isMobile }: WindowProps) {
  if (!win.isOpen || win.isMinimized) return null;

  const isFullScreen = win.isMaximized || isMobile;

  const frameStyle = isFullScreen
    ? {
        position: "fixed" as const,
        left: sidebarWidth,
        top: 0,
        width: `calc(100vw - ${sidebarWidth}px)`,
        height: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
        zIndex: win.zIndex,
        background: "var(--content-bg)",
      }
    : {
        position: "fixed" as const,
        left: win.position.x,
        top: win.position.y,
        width: `clamp(${Math.round(win.size.width * 0.85)}px, 40vw, ${Math.round(win.size.width * 1.6)}px)`,
        zIndex: win.zIndex,
        minHeight: `clamp(${Math.round(win.size.height * 0.85)}px, 34vh, ${Math.round(win.size.height * 1.6)}px)`,
        background: "var(--content-bg)",
      };

  return (
    <motion.div
      key={isFullScreen ? "maximized" : "normal"}
      drag={!isFullScreen}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      onDragStart={() => onDragStart?.(win.id)}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.12 }}
      onMouseDown={() => onFocus(win.id)}
      style={frameStyle}
      className="win-bevel-out flex flex-col overflow-hidden"
    >
      {/* Title Bar — locked Windows navy */}
      <div
        className="flex items-center justify-between px-2 py-1 cursor-move select-none"
        style={{ background: "var(--title-bg)" }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          {Icon && (
            <span className="shrink-0" style={{ color: "#ffffff" }}>
              <Icon size={14} />
            </span>
          )}
          <span
            className="text-white text-xs font-bold truncate"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {win.title}
          </span>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <button onClick={() => onMinimize(win.id)} className="win-bevel-out win-btn" title="Minimize">
            _
          </button>
          {!isMobile && (
            <button onClick={() => onMaximize(win.id)} className="win-bevel-out win-btn" title={win.isMaximized ? "Restore" : "Maximize"}>
              □
            </button>
          )}
          <button onClick={() => onClose(win.id)} className="win-bevel-out win-btn" title="Close">
            ✕
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div
        className="flex gap-3 px-2 py-1 text-xs"
        style={{ background: "var(--chrome-bg)", borderBottom: "1px solid var(--border-shadow)", color: "var(--text)" }}
      >
        {["File", "Edit", "View", "Help"].map((menu) => (
          <span key={menu} className="cursor-pointer hover:underline">
            {menu}
          </span>
        ))}
      </div>

      {/* Window Body */}
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

      {/* Status Bar */}
      <div
        className="px-3 py-1 text-xs flex justify-between win-bevel-in"
        style={{
          background: "var(--chrome-bg)",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span>Ready</span>
        <span style={{ color: "var(--success)" }}>● Online</span>
      </div>
    </motion.div>
  );
}
