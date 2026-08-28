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
      { id: "laravel", label: "Laravel" },
      { id: "codeigniter", label: "CodeIgniter" },
      { id: "node", label: "Node.js" },
      { id: "python", label: "Python" },
      { id: "rest", label: "REST API" },
    ],
  },
  {
    id: "frontend",
    label: "FRONTEND",
    icon: "/icon/category_frontend.svg",
    skills: [
      { id: "react", label: "React.js" },
      { id: "ts", label: "TypeScript" },
      { id: "vue", label: "Vue.js" },
      { id: "js", label: "JavaScript" },
      { id: "html", label: "HTML" },
      { id: "css", label: "CSS" },
    ],
  },
  {
    id: "database",
    label: "DATABASE",
    icon: "/icon/category_database.svg",
    skills: [
      { id: "mysql", label: "MySQL" },
      { id: "postgres", label: "PostgreSQL" },
      { id: "sqlite", label: "SQLite" },
      { id: "mongo", label: "MongoDB" },
    ],
  },
  {
    id: "tools",
    label: "TOOLS & DEVOPS",
    icon: "/icon/category_tools_devops.svg",
    skills: [
      { id: "git", label: "Git" },
      { id: "github", label: "GitHub" },
      { id: "docker", label: "Docker" },
      { id: "postman", label: "Postman" },
      { id: "linux", label: "Linux" },
      { id: "cyber", label: "CyberPanel" },
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
  python: 70,
  rest: 75,
  react: 72,
  ts: 68,
  vue: 82,
  js: 70,
  html: 72,
  css: 85,
  mysql: 90,
  postgres: 75,
  sqlite: 60,
  mongo: 55,
  git: 90,
  github: 72,
  docker: 78,
  postman: 72,
  linux: 72,
  cyber: 70,
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
                const pct = PERCENT[s.id] ?? 0;
                return (
                  <div key={s.id} className="skill-row" role="listitem" tabIndex={0} onMouseEnter={(e) => showTip(`${s.label}`, e)} onMouseLeave={hideTip} onFocus={(e) => showTip(`${s.label}`, e)} onBlur={hideTip}>
                    <div className="skill-meta">
                      <span className="skill-dot" aria-hidden="true" />
                      <span className="skill-name">{s.label}</span>
                    </div>

                    <div className="skill-percent">
                      <div className="percent-rail" aria-hidden="true">
                        <div className="percent-fill" style={{ width: `${pct}%` }} />
                      </div>

                      <div className="percent-label">{pct}%</div>
                    </div>
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
