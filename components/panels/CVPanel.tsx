"use client";

import { profile } from "@/data/profile";
import { DocumentIcon } from "@/lib/pixel-icons";
import { useIsMobile } from "@/lib/useIsMobile";

const fileName = decodeURIComponent(profile.cvPath.split("/").pop() ?? "CV.pdf");

/**
 * Read-before-download CV viewer. Desktop browsers render the PDF inline;
 * most mobile browsers can't show a PDF inside a page, so phones get a
 * card that opens the browser's own viewer instead.
 */
export default function CVPanel() {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "var(--font-mono)", color: "var(--text)" }}>
      {/* Toolbar */}
      <div
        className="flex items-center justify-between gap-3 flex-wrap px-3 py-2"
        style={{ background: "var(--chrome-bg)", borderBottom: "1px solid var(--line)" }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <DocumentIcon size={18} className="shrink-0" />
          <span className="bp-label truncate" style={{ fontSize: 11 }}>{fileName}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a href={profile.cvPath} target="_blank" rel="noreferrer" className="chrome-btn px-3 py-1.5" style={{ background: "var(--content-bg)" }}>
            <span className="bp-label" style={{ fontSize: 10, fontWeight: 700 }}>Open in new tab ↗</span>
          </a>
          <a
            href={profile.cvPath}
            download
            className="chrome-btn px-3 py-1.5"
            style={{ background: "var(--accent)", color: "#ffffff", boxShadow: "var(--shadow-hard-sm)" }}
          >
            <span className="bp-label" style={{ fontSize: 10, fontWeight: 700 }}>Download ↓</span>
          </a>
        </div>
      </div>

      {isMobile ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <DocumentIcon size={56} />
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22 }}>{profile.name} — CV</div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", maxWidth: 320 }}>
            Your browser can&apos;t show the PDF inside this window. Open it in a new tab to read it, or download it directly.
          </p>
          <a href={profile.cvPath} target="_blank" rel="noreferrer" className="chrome-btn px-4 py-2.5" style={{ background: "var(--content-bg)" }}>
            <span className="bp-label" style={{ fontSize: 11, fontWeight: 700 }}>Read CV ↗</span>
          </a>
        </div>
      ) : (
        <iframe
          src={`${profile.cvPath}#view=FitH&navpanes=0`}
          title={`${profile.name} CV preview`}
          className="block w-full flex-1"
          style={{ minHeight: "min(62vh, 760px)", border: "none", background: "var(--content-bg-alt)" }}
        />
      )}
    </div>
  );
}
