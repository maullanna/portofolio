"use client";

import Image from "next/image";
import { TASKBAR_HEIGHT, DESKTOP_TOP_MARGIN } from "@/lib/layout";

interface BootWatermarkProps {
  sidebarWidth: number;
}

export default function BootWatermark({ sidebarWidth }: BootWatermarkProps) {
  return (
    <div
      className="absolute flex flex-col items-center justify-center gap-4 pointer-events-none select-none px-4"
      style={{ left: sidebarWidth, right: 0, top: DESKTOP_TOP_MARGIN, bottom: TASKBAR_HEIGHT, zIndex: 1 }}
    >
      <Image
        src="/icon/Windows_98.png"
        alt="Windows 98"
        width={140}
        height={140}
        style={{ imageRendering: "pixelated", width: "clamp(80px, 24vw, 140px)", height: "auto" }}
      />
      <span
        style={{
          color: "#ffffff",
          fontFamily: "var(--font-mono)",
          fontSize: "16px",
          textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
        }}
      >
        Starting Windows 98...
      </span>
      <div className="boot-progress-rail win-bevel-in">
        <div className="boot-progress-fill" />
      </div>
    </div>
  );
}
