import Image from "next/image";
import { profile } from "@/data/profile";
import { FolderIcon, CalendarIcon } from "@/lib/pixel-icons";

interface HeroPanelProps {
  onOpenProjects: () => void;
  onOpenJourney: () => void;
}

export default function HeroPanel({ onOpenProjects, onOpenJourney }: HeroPanelProps) {
  return (
    <div className="hero-panel p-8 flex gap-8" style={{ color: "var(--text)", fontFamily: "var(--font-mono)", minHeight: "100%" }}>
      {/* Left column */}
      <div className="hero-panel-photo flex flex-col gap-4 shrink-0" style={{ width: "clamp(170px, 38cqw, 280px)" }}>
        <div className="win-bevel-in overflow-hidden" style={{ background: "var(--content-bg-alt)" }}>
          <Image
            src={profile.photoPath}
            alt={profile.name}
            width={220}
            height={220}
            priority
            className="block w-full h-auto"
            style={{ objectFit: "cover", aspectRatio: "1 / 1" }}
          />
        </div>

        <div className="win-bevel-in p-3" style={{ background: "var(--content-bg-alt)", fontSize: "clamp(11px, 2.8cqw, 15px)" }}>
          <div className="font-bold mb-1.5" style={{ color: "var(--accent-dark)" }}>
            SYSTEM INFO
          </div>
          <div className="flex justify-between py-1 gap-2">
            <span style={{ color: "var(--text-muted)" }}>Status:</span>
            <span className="text-right" style={{ color: "var(--success)" }}>● {profile.status}</span>
          </div>
          <div className="flex justify-between py-1">
            <span style={{ color: "var(--text-muted)" }}>Role:</span>
            <span className="text-right">{profile.role}</span>
          </div>
          <div className="flex justify-between py-1 gap-2">
            <span style={{ color: "var(--text-muted)" }}>Location:</span>
            <span className="text-right">{profile.location}</span>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="hero-panel-info flex flex-col justify-center min-w-0">
        <h2 style={{ color: "var(--accent-dark)", fontSize: "clamp(19px, 5cqw, 30px)" }}>Hello, I&apos;m</h2>
        <h1 style={{ fontSize: "clamp(34px, 9.5cqw, 62px)", fontFamily: "var(--font-retro)", lineHeight: 1 }}>{profile.name}</h1>
        <p className="mt-2" style={{ color: "var(--text-muted)", fontSize: "clamp(14px, 3.4cqw, 19px)" }}>
          {profile.role}
        </p>
        <p className="mt-3" style={{ color: "var(--text-muted)", fontSize: "clamp(12px, 2.8cqw, 16px)" }}>
          {profile.tagline}
        </p>

        <div className="flex gap-6 mt-5">
          {profile.stats.slice(0, 3).map((stat) => (
            <div key={stat.label}>
              <div className="font-bold" style={{ color: "var(--accent-dark)", fontSize: "clamp(16px, 3.8cqw, 22px)" }}>{stat.value}</div>
              <div style={{ color: "var(--text-muted)", fontSize: "clamp(10px, 2.2cqw, 13px)" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onOpenProjects}
            className="win-bevel-out px-4 py-2.5 text-sm cursor-pointer flex items-center gap-2"
            style={{ background: "var(--accent)", color: "white" }}
          >
            <FolderIcon size={16} /> View Projects
          </button>
          <button
            onClick={onOpenJourney}
            className="win-bevel-out px-4 py-2.5 text-sm cursor-pointer flex items-center gap-2"
            style={{ background: "var(--chrome-bg)", color: "var(--text)" }}
          >
            <CalendarIcon size={16} /> Explore Journey
          </button>
        </div>
      </div>
    </div>
  );
}
