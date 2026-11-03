"use client";
import React, { useCallback, useRef, useState } from "react";

type Skill = { id: string; label: string; hint?: string };
type Category = { id: string; label: string; icon: string; skills: Skill[] };

const CATEGORIES: Category[] = [
  {
    id: "backend",
    label: "BACKEND",
    icon: "/icon/category_backend.svg",
    skills: [
      { id: "php", label: "PHP" },
      { id: "laravel", label: "Laravel 12" },
      { id: "codeigniter", label: "CodeIgniter" },
      { id: "node", label: "Node.js" },
      { id: "rest", label: "REST API" },
      { id: "soap", label: "SOAP/XML" },
      { id: "integration", label: "Service Integration" },
    ],
  },
  {
    id: "database",
    label: "DATABASE",
    icon: "/icon/category_database.svg",
    skills: [
      { id: "mysql", label: "MySQL" },
      { id: "postgres", label: "PostgreSQL" },
      { id: "schema", label: "Schema Design" },
      { id: "transactions", label: "Transactions" },
      { id: "query-opt", label: "Query Optimization" },
    ],
  },
  {
    id: "frontend",
    label: "FRONTEND",
    icon: "/icon/category_frontend.svg",
    skills: [
      { id: "ts", label: "TypeScript" },
      { id: "vue", label: "Vue.js" },
      { id: "react", label: "React.js" },
      { id: "next", label: "Next.js" },
      { id: "tailwind", label: "Tailwind CSS" },
    ],
  },
  {
    // id stays "tools" so the summary's Tools count keeps working
    id: "tools",
    label: "DEVOPS",
    icon: "/icon/category_tools_devops.svg",
    skills: [
      { id: "linux-vps", label: "Linux VPS" },
      { id: "nginx", label: "Nginx" },
      { id: "gha", label: "GitHub Actions (CI/CD)" },
      { id: "git", label: "Git" },
    ],
  },
  {
    id: "data-ai",
    label: "DATA & AI",
    icon: "/icon/other_data_analytics.svg",
    skills: [
      { id: "python", label: "Python" },
      { id: "opencv", label: "OpenCV" },
      { id: "ml", label: "Machine Learning (Classification)" },
    ],
  },
];

const OTHER = [
  { id: "system", label: "System Design", icon: "/icon/other_system_design.svg" },
  { id: "auth", label: "Authentication", icon: "/icon/other_authentication.svg" },
  { id: "rest", label: "RESTful API", icon: "/icon/other_restful_api.svg" },
  { id: "data", label: "Data Analytics", icon: "/icon/other_data_analytics.svg" },
  { id: "team", label: "Team Collaboration", icon: "/icon/other_team_collaboration.svg" },
  { id: "solve", label: "Problem Solving", icon: "/icon/other_problem_solving.svg" },
];

const HEADER_ICON = "/icon/desktop_skills.svg";

/*
  Sample percentages map. Adjust values as you want.
  Keys match skill id's above.
*/
const PERCENT: Record<string, number> = {
  php: 90,
  laravel: 90,
  codeigniter: 82,
  node: 78,
  rest: 75,
  mysql: 90,
  postgres: 75,
  ts: 68,
  vue: 82,
  react: 72,
  tailwind: 85,
  nginx: 75,
  gha: 72,
  git: 90,
  python: 70,
  // [ISI: persentase] soap, integration, schema, transactions, query-opt, next, linux-vps, opencv, ml
};

export default function SkillsPanel() {
  const [tooltip, setTooltip] = useState<{ text: string; left: number; top: number } | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  const showTip = useCallback((text: string, e: React.MouseEvent | React.FocusEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    setTooltip({ text, left: Math.round(rect.left + rect.width / 2), top: Math.round(rect.top - 10) });
  }, []);

  const hideTip = useCallback(() => setTooltip(null), []);

  const totalTechnologies = CATEGORIES.reduce((s, c) => s + c.skills.length, 0);
  const toolCount = CATEGORIES.find((c) => c.id === "tools")?.skills.length ?? 0;

  return (
    <section className="skills-panel-root" ref={containerRef}>
      <header className="skills-panel-head layout-with-summary">
        <div className="skills-head-left">
          <img src={HEADER_ICON} alt="Skills" className="skills-header-icon pixel-art" />
          <div>
            <h2 className="skills-title">MY SKILLS</h2>
            <p className="skills-sub">Technologies and tools I use to build web applications and backend systems.</p>
          </div>
        </div>

        <aside className="skills-summary" aria-label="Summary">
          <div className="summary-title">SUMMARY</div>
          <dl className="summary-list">
            <div>
              <dt>Technologies</dt>
              <dd>{totalTechnologies}+</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>{toolCount}+</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Backend & Fullstack</dd>
            </div>
            <div>
              <dt>Learning</dt>
              <dd>AI · DevOps · System Design</dd>
            </div>
          </dl>
        </aside>
      </header>

      <div className="skills-grid" aria-label="Skill categories">
        {CATEGORIES.map((cat) => (
          <article key={cat.id} className="skills-category" id={cat.id}>
            <div className="skills-category-head">
              <img src={cat.icon} alt={`${cat.label} icon`} className="cat-icon pixel-art" />
              <span className="cat-title">{cat.label}</span>
            </div>

            <div className="skills-vertical-list" role="list">
              {cat.skills.map((s) => {
                // Skills without a stated percentage show no bar rather than a made-up number
                const pct = PERCENT[s.id];
                return (
                  <div key={s.id} className="skill-row" role="listitem" tabIndex={0} onMouseEnter={(e) => showTip(`${s.label}`, e)} onMouseLeave={hideTip} onFocus={(e) => showTip(`${s.label}`, e)} onBlur={hideTip}>
                    <div className="skill-meta">
                      <span className="skill-dot" aria-hidden="true" />
                      <span className="skill-name">{s.label}</span>
                    </div>

                    {pct !== undefined && (
                      <div className="skill-percent">
                        <div className="percent-rail" aria-hidden="true">
                          <div className="percent-fill" style={{ width: `${pct}%` }} />
                        </div>

                        <div className="percent-label">{pct}%</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <div className="skills-other-and-focus">
        <div className="skills-other">
          <div className="other-heading">OTHER</div>
          <div className="other-list">
            {OTHER.map((t) => (
              <span key={t.id} className="other-tag">
                <img src={t.icon} alt={`${t.label} icon`} className="other-icon pixel-art" />
                {t.label}
              </span>
            ))}
          </div>
        </div>

        <div className="current-focus">
          <div className="focus-title">CURRENT FOCUS</div>
          <div className="focus-body">Improving my skills in System Design, DevOps, and Artificial Intelligence to build scalable and intelligent systems.</div>
        </div>
      </div>

      {tooltip && (
        <div className="skills-tooltip" role="tooltip" style={{ left: tooltip.left, top: tooltip.top }}>
          {tooltip.text}
        </div>
      )}
    </section>
  );
}
