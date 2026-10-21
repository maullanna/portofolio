import Image from "next/image";
import { profile } from "@/data/profile";
import { FolderIcon, CalendarIcon } from "@/lib/pixel-icons";

interface HeroPanelProps {
  onOpenProjects: () => void;
  onOpenJourney: () => void;
}

// Everything is sized in cqw (% of the window's width) with a floor and a
// ceiling, so the panel looks the same in a normal window and grows to fill
// a maximized one instead of leaving half of it empty.
const specText = { fontSize: "clamp(9px, 1.1cqw, 13px)" };
const statLabel = { color: "var(--text-muted)", fontSize: "clamp(8px, 1cqw, 12px)" };
const buttonPad = { padding: "clamp(10px, 1.4cqw, 16px) clamp(16px, 2.2cqw, 28px)" };
const buttonText = { fontSize: "clamp(11px, 1.5cqw, 15px)", fontWeight: 700 };
const blockGap = { marginTop: "clamp(20px, 2.8cqw, 36px)" };

export default function HeroPanel({ onOpenProjects, onOpenJourney }: HeroPanelProps) {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <div
      className="hero-panel flex justify-center"
      style={{ color: "var(--text)", fontFamily: "var(--font-mono)", minHeight: "100%", padding: "clamp(24px, 3.4cqw, 64px)", gap: "clamp(24px, 3.4cqw, 56px)" }}
    >
      {/* Left column — photo + spec sheet */}
      <div className="hero-panel-photo flex flex-col shrink-0" style={{ width: "clamp(170px, 34cqw, 420px)", border: "1px solid var(--ink)" }}>
        <div className="relative overflow-hidden" style={{ background: "var(--content-bg-alt)", borderBottom: "1px solid var(--ink)" }}>
          <Image
            src={profile.photoPath}
            alt={profile.name}
            width={480}
            height={480}
            priority
            className="block w-full h-auto"
            style={{ objectFit: "cover", objectPosition: profile.photoPosition, aspectRatio: "1 / 1" }}
          />
          <span className="bp-label absolute top-1.5 left-1.5 px-1" style={{ background: "var(--title-bg)", color: "#ffffff", ...specText }}>
            IMG_Yusuf.PNG
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
              className="grid gap-2"
              style={{
                gridTemplateColumns: "clamp(54px, 6cqw, 84px) 1fr",
                padding: "clamp(6px, 0.9cqw, 12px) clamp(10px, 1.2cqw, 16px)",
                borderBottom: i < arr.length - 1 ? "1px dashed var(--hairline)" : "none",
              }}
            >
              <dt className="bp-label" style={{ color: "var(--text-muted)", ...specText }}>{k}</dt>
              <dd className="bp-label" style={specText}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Right column */}
      <div className="hero-panel-info flex flex-col justify-center min-w-0">
        <div className="bp-label" style={{ color: "var(--accent-dark)", fontSize: "clamp(10px, 1.3cqw, 15px)" }}>[01] Hello, I&apos;m</div>
        <h1
          className="hero-name mt-2"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(34px, 8.5cqw, 128px)",
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
          }}
        >
          {first}
          {/* Two lines on desktop; on mobile the break is hidden so the space keeps it one line */}
          <br className="hero-name-break" /> {rest.join(" ")}
          <span style={{ color: "var(--accent)" }}>.</span>
        </h1>

        <p className="bp-label" style={{ marginTop: "clamp(12px, 1.6cqw, 22px)", fontSize: "clamp(10px, 1.7cqw, 18px)", color: "var(--title-bg)" }}>
          {profile.role}
        </p>
        <p style={{ marginTop: "clamp(12px, 1.4cqw, 18px)", fontFamily: "var(--font-display)", color: "var(--text-muted)", fontSize: "clamp(14px, 2.6cqw, 30px)", lineHeight: 1.35 }}>
          {profile.tagline}
        </p>

        <div className="grid" style={{ ...blockGap, gridTemplateColumns: "repeat(3, minmax(0, 1fr))", borderTop: "1px solid var(--ink)", borderBottom: "1px solid var(--ink)" }}>
          {profile.stats.slice(0, 3).map((stat, i) => (
            <div key={stat.label} style={{ padding: "clamp(8px, 1.2cqw, 16px)", borderLeft: i ? "1px solid var(--hairline)" : "none" }}>
              <div className="bp-label" style={statLabel}>[{String.fromCharCode(65 + i)}]</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(16px, 3.4cqw, 44px)", lineHeight: 1.1 }}>{stat.value}</div>
              <div className="bp-label truncate" style={statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="hero-actions flex flex-wrap gap-3" style={blockGap}>
          <button
            onClick={onOpenProjects}
            className="chrome-btn"
            style={{ ...buttonPad, background: "var(--accent)", color: "#ffffff", boxShadow: "var(--shadow-hard-sm)" }}
          >
            <FolderIcon size={16} />
            <span className="bp-label" style={buttonText}>View Projects →</span>
          </button>
          <button onClick={onOpenJourney} className="chrome-btn" style={{ ...buttonPad, background: "var(--content-bg)" }}>
            <CalendarIcon size={16} />
            <span className="bp-label" style={buttonText}>Explore Journey</span>
          </button>
        </div>
      </div>
    </div>
  );
}
