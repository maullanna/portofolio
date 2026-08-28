"use client";

import Image from "next/image";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_MOBILE, DESKTOP_TOP_MARGIN } from "@/lib/layout";
import { ComputerIcon, FolderIcon, PersonIcon, ToolboxIcon, CalendarIcon, EnvelopeIcon, TrashBinIcon, type PixelIconProps } from "@/lib/pixel-icons";

export interface DesktopIcon {
  id: string;
  label: string;
  icon: string;
  Icon: (props: PixelIconProps) => React.ReactElement;
}

export const desktopIcons: DesktopIcon[] = [
  { id: "hero", label: "My Portfolio", icon: "/icon/desktop_my_portfolio.svg", Icon: ComputerIcon },
  { id: "projects", label: "Projects", icon: "/icon/desktop_projects.svg", Icon: FolderIcon },
  { id: "about", label: "About Me", icon: "/icon/desktop_about_me.svg", Icon: PersonIcon },
  { id: "skills", label: "Skills", icon: "/icon/desktop_skills.svg", Icon: ToolboxIcon },
  { id: "journey", label: "Journey Log", icon: "/icon/desktop_journey_log.svg", Icon: CalendarIcon },
  { id: "contact", label: "Contact", icon: "/icon/desktop_contact.svg", Icon: EnvelopeIcon },
  { id: "recycle-bin", label: "Recycle Bin", icon: "/icon/desktop_recycle_bin-removebg-preview.png", Icon: TrashBinIcon },
];

interface SidebarProps {
  onOpenWindow: (id: string) => void;
  isMobile: boolean;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ onOpenWindow, isMobile, open, onClose }: SidebarProps) {
  const width = isMobile ? SIDEBAR_WIDTH_MOBILE : SIDEBAR_WIDTH;

  return (
    <>
      {isMobile && open && (
        <div className="fixed inset-0" style={{ background: "rgba(0,0,0,0.4)", zIndex: 9998 }} onClick={onClose} />
      )}
      <div
        className="fixed left-0 top-0 h-full flex flex-col items-center gap-3 pb-6"
        style={{
          width,
          paddingTop: isMobile ? 16 : DESKTOP_TOP_MARGIN + 24,
          background: "var(--chrome-bg)",
          border: "none",
          zIndex: 9999,
          transform: isMobile && !open ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.2s ease",
        }}
      >
        {isMobile && (
          <button
            onClick={onClose}
            className="win-bevel-out win-btn self-end mr-2 mb-2"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        )}

        {desktopIcons.map(({ id, label, icon }) => (
          <button
            key={id}
            onDoubleClick={() => {
              if (id === "recycle-bin") return;
              onOpenWindow(id);
              if (isMobile) onClose();
            }}
            onClick={() => {
              if (!isMobile || id === "recycle-bin") return;
              onOpenWindow(id);
              onClose();
            }}
            className="flex flex-col items-center gap-1 px-1 py-2 cursor-pointer w-20"
            style={{ background: "transparent", border: "none" }}
          >
            <Image src={icon} alt={label} width={48} height={48} style={{ imageRendering: "pixelated" }} />
            <span
              className="text-center leading-tight"
              style={{
                color: "#ffffff",
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
