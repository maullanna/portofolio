"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { EnvelopeIcon, DocumentIcon } from "@/lib/pixel-icons";
import { GithubIcon, LinkedinIcon } from "@/lib/icons";
import { profile } from "@/data/profile";

interface ContactPanelProps {
  onOpenCV: () => void;
}

const rowStyle = {
  background: "var(--content-bg-alt)",
  color: "var(--text)",
  fontSize: "clamp(12px, 1.1cqw, 15px)",
  padding: "clamp(8px, 1cqw, 14px) clamp(8px, 1cqw, 14px)",
};

export default function ContactPanel({ onOpenCV }: ContactPanelProps) {
  const [sent, setSent] = useState(false);

  const whatsapp = `62${profile.phone.replace(/^0/, "")}`;

  const links = [
    { label: profile.email, href: `mailto:${profile.email}`, Icon: EnvelopeIcon },
    { label: profile.phone, href: `https://wa.me/${whatsapp}`, Icon: Phone },
    { label: profile.linkedin, href: `https://${profile.linkedin}`, Icon: LinkedinIcon },
    { label: profile.github, href: `https://${profile.github}`, Icon: GithubIcon },
  ];

  return (
    // Stacks in a normal-size window; becomes a two-column layout when the window is wide
    <div className="flex items-center min-h-full" style={{ fontFamily: "var(--font-mono)", color: "var(--text)", padding: "clamp(16px, 4cqw, 64px)" }}>
      <div className="w-full mx-auto grid gap-6 @3xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] @3xl:gap-12 @3xl:items-center" style={{ maxWidth: 1200 }}>
        <div className="flex flex-col gap-3">
          <div className="bp-label" style={{ color: "var(--accent-dark)", fontSize: "clamp(10px, 1cqw, 13px)" }}>
            [06] Contact
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px, 5cqw, 64px)", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
            Let&apos;s work together!
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "clamp(12px, 1.3cqw, 17px)", lineHeight: 1.5 }}>
            Reach me through any of the channels below, or read my CV first.
          </p>
          <button
            onClick={() => setSent(true)}
            disabled={sent}
            className="win-bevel-out px-3 py-2 self-start cursor-pointer mt-1"
            style={{ background: sent ? "var(--chrome-bg)" : "var(--accent)", color: sent ? "var(--text)" : "white", fontSize: "clamp(12px, 1.1cqw, 15px)" }}
          >
            {sent ? "Message sent ✓" : "Send Message"}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {links.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="win-bevel-in flex items-center gap-2" style={rowStyle}>
              <Icon size={18} className="shrink-0" />
              <span className="truncate">{label}</span>
            </a>
          ))}

          <button onClick={onOpenCV} className="win-bevel-in flex items-center gap-2 text-left cursor-pointer mt-2" style={rowStyle}>
            <DocumentIcon size={18} className="shrink-0" />
            Preview my CV (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}
