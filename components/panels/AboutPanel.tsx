import Image from "next/image";
import { profile } from "@/data/profile";

export default function AboutPanel() {
  return (
    <div className="p-4 flex flex-col gap-4" style={{ fontFamily: "var(--font-mono)", color: "var(--text)" }}>
      <div className="flex items-center gap-3">
        <div className="win-bevel-in shrink-0" style={{ background: "var(--content-bg-alt)" }}>
          <Image
            src={profile.photoPath}
            alt={profile.name}
            width={64}
            height={64}
            className="block"
            style={{ objectFit: "cover", objectPosition: profile.photoPosition, aspectRatio: "1 / 1" }}
          />
        </div>
        <div>
          <div className="font-bold" style={{ fontFamily: "var(--font-retro)", fontSize: "22px" }}>{profile.name}</div>
          <div className="text-xs" style={{ color: "var(--text-muted)" }}>{profile.role}</div>
        </div>
      </div>

      <table className="win-bevel-in text-xs w-full" style={{ background: "var(--content-bg-alt)" }}>
        <tbody>
          {[
            ["Location", profile.location],
            ["Status", profile.status],
            ["Experience", profile.experience],
            ["Passion", profile.passion],
          ].map(([k, v]) => (
            <tr key={k} style={{ borderBottom: "1px solid var(--border-shadow)" }}>
              <td className="px-2 py-1.5 font-bold" style={{ width: "110px", color: "var(--accent-dark)" }}>{k}</td>
              <td className="px-2 py-1.5">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{profile.about}</p>

      <div>
        <div className="font-bold text-xs mb-1" style={{ color: "var(--accent-dark)" }}>EXPERIENCE</div>
        <div className="flex flex-col gap-2">
          {profile.workExperience.map((job) => (
            <div key={job.role + job.company} className="win-bevel-in p-2 text-xs" style={{ background: "var(--content-bg-alt)" }}>
              <div className="font-bold">{job.role}</div>
              <div style={{ color: "var(--accent-dark)" }}>{job.company}</div>
              <div style={{ color: "var(--text-muted)" }}>
                {job.period}
                {job.location ? ` · ${job.location}` : ""}
              </div>
              <ul className="mt-1 flex flex-col gap-0.5">
                {job.highlights.map((h) => (
                  <li key={h}>▸ {h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="font-bold text-xs mb-1" style={{ color: "var(--accent-dark)" }}>EDUCATION</div>
        <div className="flex flex-col gap-2">
          {profile.education.map((edu) => (
            <div key={edu.school} className="win-bevel-in p-2 text-xs" style={{ background: "var(--content-bg-alt)" }}>
              <div className="font-bold">{edu.school}</div>
              <div style={{ color: "var(--text-muted)" }}>{edu.degree}</div>
              <div style={{ color: "var(--text-muted)" }}>{edu.period}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="font-bold text-xs mb-1" style={{ color: "var(--accent-dark)" }}>CAMPUS ACTIVITIES</div>
        <ul className="win-bevel-in p-2 text-xs flex flex-col gap-0.5" style={{ background: "var(--content-bg-alt)" }}>
          {profile.campusActivities.map((a) => (
            <li key={a}>▸ {a}</li>
          ))}
        </ul>
      </div>

      <div>
        <div className="font-bold text-xs mb-1" style={{ color: "var(--accent-dark)" }}>CERTIFICATIONS</div>
        <div className="win-bevel-in text-xs" style={{ background: "var(--content-bg-alt)" }}>
          {profile.certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center justify-between gap-2 px-2 py-1.5"
              style={{ borderBottom: "1px solid var(--border-shadow)" }}
            >
              <div className="min-w-0">
                <div className="truncate">{cert.name}</div>
                <div style={{ color: "var(--text-muted)" }}>{cert.issuer}</div>
              </div>
              {cert.date && <span className="shrink-0" style={{ color: "var(--text-muted)" }}>{cert.date}</span>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="font-bold text-xs mb-1" style={{ color: "var(--accent-dark)" }}>ACHIEVEMENTS</div>
        <div className="win-bevel-in text-xs" style={{ background: "var(--content-bg-alt)" }}>
          {profile.achievements.map((a) => (
            <div
              key={a.title}
              className="flex items-center justify-between gap-2 px-2 py-1.5"
              style={{ borderBottom: "1px solid var(--border-shadow)" }}
            >
              <div className="min-w-0">
                <div className="truncate">🏆 {a.title}</div>
                <div style={{ color: "var(--text-muted)" }}>{a.issuer}</div>
              </div>
              {a.year && <span className="shrink-0" style={{ color: "var(--text-muted)" }}>{a.year}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
