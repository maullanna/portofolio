import Image from "next/image";
import { profile } from "@/data/profile";
import { FolderIcon, CalendarIcon } from "@/lib/pixel-icons";

interface HeroPanelProps {
  onOpenProjects: () => void;
  onOpenJourney: () => void;
}

export default function HeroPanel({ onOpenProjects, onOpenJourney }: HeroPanelProps) {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <div className="hero-panel p-6 flex gap-6" style={{ color: "var(--text)", fontFamily: "var(--font-mono)", minHeight: "100%" }}>
      {/* Left column — photo + spec sheet */}
      <div className="hero-panel-photo flex flex-col shrink-0" style={{ width: "clamp(170px, 34cqw, 260px)", border: "1px solid var(--ink)" }}>
        <div className="relative overflow-hidden" style={{ background: "var(--content-bg-alt)", borderBottom: "1px solid var(--ink)" }}>
          <Image
            src={profile.photoPath}
            alt={profile.name}
            width={260}
            height={260}
            priority
            className="block w-full h-auto"
            style={{ objectFit: "cover", aspectRatio: "1 / 1" }}
          />
          <span className="bp-label absolute top-1.5 left-1.5 px-1" style={{ background: "var(--title-bg)", color: "#ffffff", fontSize: 9 }}>
            IMG_001.PNG
          </span>
        </div>

        <dl>
          {[
            ["Status", <span key="s" style={{ color: "var(--success)" }}>● {profile.status}</span>],
            ["Exp.", profile.experience],
            ["Based", "Karawang, ID"],
          ].map(([k, v], i, arr) => (
            <div
              key={k as string}
              className="grid gap-2 px-2.5 py-1.5"
              style={{ gridTemplateColumns: "54px 1fr", borderBottom: i < arr.length - 1 ? "1px dashed var(--hairline)" : "none" }}
            >
              <dt className="bp-label" style={{ color: "var(--text-muted)", fontSize: 9 }}>{k}</dt>
              <dd className="bp-label" style={{ fontSize: 9 }}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Right column */}
      <div className="hero-panel-info flex flex-col justify-center min-w-0">
        <div className="bp-label" style={{ color: "var(--accent-dark)" }}>[01] Hello, I&apos;m</div>
        <h1
          className="mt-2"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(34px, 8.5cqw, 64px)",
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
          }}
        >
          {first}
          <br />
          {rest.join(" ")}
          <span style={{ color: "var(--accent)" }}>.</span>
        </h1>

        <p className="bp-label mt-3" style={{ fontSize: "clamp(10px, 2.2cqw, 12px)", color: "var(--title-bg)" }}>
          {profile.role}
        </p>
        <p className="mt-3" style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)", fontSize: "clamp(14px, 3cqw, 18px)", lineHeight: 1.35 }}>
          {profile.tagline}
        </p>

        <div className="grid mt-5" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", borderTop: "1px solid var(--ink)", borderBottom: "1px solid var(--ink)" }}>
          {profile.stats.slice(0, 3).map((stat, i) => (
            <div key={stat.label} className="py-2 px-2" style={{ borderLeft: i ? "1px solid var(--hairline)" : "none" }}>
              <div className="bp-label" style={{ color: "var(--text-muted)", fontSize: 8 }}>[{String.fromCharCode(65 + i)}]</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(16px, 3.6cqw, 24px)", lineHeight: 1.1 }}>{stat.value}</div>
              <div className="bp-label truncate" style={{ color: "var(--text-muted)", fontSize: 8 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-5">
          <button
            onClick={onOpenProjects}
            className="chrome-btn px-4 py-2.5"
            style={{ background: "var(--accent)", color: "#ffffff", boxShadow: "var(--shadow-hard-sm)" }}
          >
            <FolderIcon size={16} />
            <span className="bp-label" style={{ fontSize: 11, fontWeight: 700 }}>View Projects →</span>
          </button>
          <button onClick={onOpenJourney} className="chrome-btn px-4 py-2.5" style={{ background: "var(--content-bg)" }}>
            <CalendarIcon size={16} />
            <span className="bp-label" style={{ fontSize: 11, fontWeight: 700 }}>Explore Journey</span>
          </button>
        </div>
      </div>
    </div>
  );
}
