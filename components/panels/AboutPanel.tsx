import Image from "next/image";
import { profile } from "@/data/profile";

const sectionTitle = { color: "var(--accent-dark)", fontSize: "0.9em" };
const card = { background: "var(--content-bg-alt)" };

function Section({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <div className="font-bold mb-1" style={sectionTitle}>{title}</div>
      {children}
    </div>
  );
}

export default function AboutPanel() {
  return (
    // Font scales with the window width; on a wide window the content splits
    // into two columns so lines stay a readable length.
    <div
      className="p-4 @4xl:p-8"
      style={{ fontFamily: "var(--font-mono)", color: "var(--text)", fontSize: "clamp(12px, 1.05cqw, 15px)" }}
    >
      <div className="mx-auto flex flex-col gap-4 @4xl:grid @4xl:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] @4xl:gap-8" style={{ maxWidth: 1400 }}>
        <div className="contents @4xl:flex @4xl:flex-col @4xl:gap-4">
          <div className="order-1 @4xl:order-none flex items-center gap-3">
            <div className="win-bevel-in shrink-0" style={{ ...card, width: "clamp(64px, 7cqw, 112px)" }}>
              <Image
                src={profile.photoPath}
                alt={profile.name}
                width={112}
                height={112}
                className="block w-full h-auto"
                style={{ objectFit: "cover", objectPosition: profile.photoPosition, aspectRatio: "1 / 1" }}
              />
            </div>
            <div>
              <div className="font-bold" style={{ fontFamily: "var(--font-retro)", fontSize: "clamp(22px, 2.6cqw, 40px)", lineHeight: 1.1 }}>{profile.name}</div>
              <div style={{ color: "var(--text-muted)" }}>{profile.role}</div>
            </div>
          </div>

          <table className="order-2 @4xl:order-none win-bevel-in w-full" style={card}>
            <tbody>
              {[
                ["Location", profile.location],
                ["Status", profile.status],
                ["Experience", profile.experience],
                ["Passion", profile.passion],
              ].map(([k, v]) => (
                <tr key={k} style={{ borderBottom: "1px solid var(--border-shadow)" }}>
                  <td className="px-2 py-1.5 font-bold" style={{ width: "9em", color: "var(--accent-dark)" }}>{k}</td>
                  <td className="px-2 py-1.5">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="order-3 @4xl:order-none" style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>{profile.about}</p>

          <Section title="EDUCATION" className="order-5 @4xl:order-none">
            <div className="flex flex-col gap-2">
              {profile.education.map((edu) => (
                <div key={edu.school} className="win-bevel-in p-2" style={card}>
                  <div className="font-bold">{edu.school}</div>
                  <div style={{ color: "var(--text-muted)" }}>{edu.degree}</div>
                  <div style={{ color: "var(--text-muted)" }}>{edu.period}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="CAMPUS ACTIVITIES" className="order-6 @4xl:order-none">
            <ul className="win-bevel-in p-2 flex flex-col gap-0.5" style={card}>
              {profile.campusActivities.map((a) => (
                <li key={a}>▸ {a}</li>
              ))}
            </ul>
          </Section>

          <Section title="ACHIEVEMENTS" className="order-8 @4xl:order-none">
            <div className="win-bevel-in" style={card}>
              {profile.achievements.map((a) => (
                <div key={a.title} className="flex items-center justify-between gap-2 px-2 py-1.5" style={{ borderBottom: "1px solid var(--border-shadow)" }}>
                  <div className="min-w-0">
                    <div className="truncate">🏆 {a.title}</div>
                    <div style={{ color: "var(--text-muted)" }}>{a.issuer}</div>
                  </div>
                  {a.year && <span className="shrink-0" style={{ color: "var(--text-muted)" }}>{a.year}</span>}
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div className="contents @4xl:flex @4xl:flex-col @4xl:gap-4">
          <Section title="EXPERIENCE" className="order-4 @4xl:order-none">
            <div className="flex flex-col gap-2">
              {profile.workExperience.map((job) => (
                <div key={job.role + job.company} className="win-bevel-in p-2" style={card}>
                  <div className="font-bold">{job.role}</div>
                  <div style={{ color: "var(--accent-dark)" }}>{job.company}</div>
                  <div style={{ color: "var(--text-muted)" }}>
                    {job.period}
                    {job.location ? ` · ${job.location}` : ""}
                  </div>
                  {job.highlights.length > 0 && (
                    <ul className="mt-1 flex flex-col gap-0.5">
                      {job.highlights.map((h) => (
                        <li key={h}>▸ {h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Section>

          <Section title="CERTIFICATIONS" className="order-7 @4xl:order-none">
            <div className="win-bevel-in" style={card}>
              {profile.certifications.map((cert) => (
                <div key={cert.name} className="flex items-center justify-between gap-2 px-2 py-1.5" style={{ borderBottom: "1px solid var(--border-shadow)" }}>
                  <div className="min-w-0">
                    <div className="truncate">{cert.name}</div>
                    <div style={{ color: "var(--text-muted)" }}>{cert.issuer}</div>
                  </div>
                  {cert.date && <span className="shrink-0" style={{ color: "var(--text-muted)" }}>{cert.date}</span>}
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
