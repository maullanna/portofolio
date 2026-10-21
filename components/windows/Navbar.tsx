"use client";

import Image from "next/image";
import { NAVBAR_HEIGHT, navbarHeight } from "@/lib/layout";
import { ComputerIcon, FolderIcon, PersonIcon, ToolboxIcon, CalendarIcon, EnvelopeIcon, StartFlagIcon, type PixelIconProps } from "@/lib/pixel-icons";

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
];

/** Index shown as [01], [02]… on nav items, window title bars and taskbar buttons. */
export function windowIndex(id: string): number | undefined {
  const i = desktopIcons.findIndex((d) => d.id === id);
  return i === -1 ? undefined : i + 1;
}

const CELL = 12;

// Deterministic 0..1 noise per cell (identical on server and client)
const jitter = (row: number, col: number) => ((row * 73 + col * 151) % 97) / 97;

/**
 * Squares that fade in behind the content on hover, sweeping left → right
 * one column at a time, with per-cell jitter so the edge looks dithered.
 */
function PixelFill({ cols, rows }: { cols: number; rows: number }) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const delay = c * 0.018 + jitter(r, c) * 0.07;
      cells.push(<span key={`${r}-${c}`} style={{ "--d": `${delay.toFixed(3)}s` } as React.CSSProperties} />);
    }
  }
  return (
    <span className="px-grid" style={{ gridTemplateColumns: `repeat(${cols}, ${CELL}px)` }} aria-hidden="true">
      {cells}
    </span>
  );
}

const navRows = Math.ceil(NAVBAR_HEIGHT / CELL);

interface NavbarProps {
  onOpenWindow: (id: string) => void;
  isMobile: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  openIds: string[];
}

export default function Navbar({ onOpenWindow, isMobile, menuOpen, onToggleMenu, onCloseMenu, openIds }: NavbarProps) {
  const items = desktopIcons.filter((d) => d.id !== "contact");
  const contact = desktopIcons.find((d) => d.id === "contact")!;

  const open = (id: string) => {
    onOpenWindow(id);
    onCloseMenu();
  };

  const num = (id: string) => String(windowIndex(id)).padStart(2, "0");
  const height = navbarHeight(isMobile);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 flex items-stretch"
        style={{ height, background: "var(--chrome-bg)", borderBottom: "1px solid var(--line)", zIndex: 9999 }}
        aria-label="Main"
      >
        {/* Brand — fills the remaining width, like Heron's logo cell */}
        <button
          onClick={() => open("hero")}
          className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-8 cursor-pointer"
          style={{ color: "var(--ink)", flex: "1 0 auto" }}
          aria-label="Open My Portfolio"
        >
          <StartFlagIcon size={isMobile ? 22 : 32} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: isMobile ? 22 : 32, letterSpacing: "-0.03em" }}>BroYusuf</span>
        </button>

        {!isMobile &&
          items.map(({ id, label }) => (
            <button key={id} onClick={() => open(id)} className="nav-cell nav-link px-hover shrink-0" aria-label={`Open ${label}`}>
              <PixelFill cols={16} rows={navRows} />
              <span className="px-label bp-label" style={{ fontSize: 16 }}>{label}</span>
              <span className="px-label nav-corner" aria-hidden="true">⌟</span>
              {openIds.includes(id) && <span className="nav-open-dot" title="Open" />}
            </button>
          ))}

        {isMobile ? (
          <button onClick={onToggleMenu} className="nav-cell px-hover shrink-0 items-center justify-center gap-2 px-4" style={{ minWidth: 96 }} aria-expanded={menuOpen} aria-label="Menu">
            <PixelFill cols={10} rows={navRows} />
            <span className="px-label bp-label" style={{ fontSize: 13, fontWeight: 700 }}>{menuOpen ? "Close" : "Menu"}</span>
            <span className="px-label" aria-hidden="true" style={{ fontSize: 14 }}>{menuOpen ? "✕" : "☰"}</span>
          </button>
        ) : (
          <button onClick={() => open(contact.id)} className="nav-cell nav-link nav-cta px-hover shrink-0" aria-label="Open Contact">
            <PixelFill cols={16} rows={navRows} />
            <span className="px-label bp-label" style={{ fontSize: 16 }}>Contact me</span>
            <span className="px-label nav-corner" aria-hidden="true">→</span>
            {openIds.includes(contact.id) && <span className="nav-open-dot" title="Open" />}
          </button>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <>
          <div className="fixed inset-0" style={{ top: height, background: "rgba(40,40,40,0.3)", zIndex: 9997 }} onClick={onCloseMenu} />
          <div
            className="fixed left-0 right-0 flex flex-col"
            style={{ top: height, background: "var(--chrome-bg)", borderBottom: "1px solid var(--line)", zIndex: 9998 }}
          >
            {desktopIcons.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => open(id)}
                className="nav-cell px-hover items-center gap-3 px-5 py-4"
                style={{ borderLeft: "none", borderBottom: "1px solid var(--line)" }}
              >
                <PixelFill cols={64} rows={5} />
                <span className="px-label bp-label opacity-60" style={{ fontSize: 13 }}>{num(id)}</span>
                <Image src={icon} alt="" width={26} height={26} style={{ imageRendering: "pixelated" }} />
                <span className="px-label bp-label" style={{ fontSize: 16, fontWeight: 700 }}>{label}</span>
                {openIds.includes(id) && <span className="nav-open-dot" style={{ top: "50%", marginTop: -3, bottom: "auto", left: "auto", right: 20 }} title="Open" />}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}
