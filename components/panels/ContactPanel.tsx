"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { EnvelopeIcon, DocumentIcon } from "@/lib/pixel-icons";
import { GithubIcon, LinkedinIcon } from "@/lib/icons";
import { profile } from "@/data/profile";

export default function ContactPanel() {
  const [sent, setSent] = useState(false);

  const whatsapp = `62${profile.phone.replace(/^0/, "")}`;

  const links = [
    { label: profile.email, href: `mailto:${profile.email}`, Icon: EnvelopeIcon },
    { label: profile.phone, href: `https://wa.me/${whatsapp}`, Icon: Phone },
    { label: profile.linkedin, href: `https://${profile.linkedin}`, Icon: LinkedinIcon },
    { label: profile.github, href: `https://${profile.github}`, Icon: GithubIcon },
  ];

  return (
    <div className="p-4 flex flex-col gap-4" style={{ fontFamily: "var(--font-mono)", color: "var(--text)" }}>
      <h2 style={{ fontFamily: "var(--font-retro)", fontSize: "24px" }}>Let&apos;s work together!</h2>

      <div className="flex flex-col gap-2">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="win-bevel-in flex items-center gap-2 px-2 py-2 text-xs"
            style={{ background: "var(--content-bg-alt)", color: "var(--text)" }}
          >
            <Icon size={16} className="shrink-0" />
            {label}
          </a>
        ))}
      </div>

      <a
        href={profile.cvPath}
        download
        className="win-bevel-in flex items-center gap-2 px-2 py-2 text-xs"
        style={{ background: "var(--content-bg-alt)", color: "var(--text)" }}
      >
        <DocumentIcon size={16} className="shrink-0" />
        Download my CV (PDF)
      </a>

      <button
        onClick={() => setSent(true)}
        disabled={sent}
        className="win-bevel-out px-3 py-2 text-xs self-start cursor-pointer"
        style={{ background: sent ? "var(--chrome-bg)" : "var(--accent)", color: sent ? "var(--text)" : "white" }}
      >
        {sent ? "Message sent ✓" : "Send Message"}
      </button>
    </div>
  );
}
