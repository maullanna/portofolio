import { Skill } from "@/types";

export const skills: Skill[] = [
  // Backend & Frameworks
  { name: "PHP 8.2", percentage: 90, category: "backend" },
  { name: "Laravel 12", percentage: 90, category: "backend" },
  { name: "CodeIgniter 3", percentage: 82, category: "backend" },
  { name: "Node.js", percentage: 78, category: "backend" },
  { name: "Python", percentage: 70, category: "backend" },
  { name: "Livewire 3.6", percentage: 72, category: "backend" },
  { name: "Go", percentage: 35, category: "backend" },

  // Frontend & Build Tools
  { name: "Vue.js", percentage: 82, category: "frontend" },
  { name: "React.js", percentage: 72, category: "frontend" },
  { name: "TypeScript", percentage: 68, category: "frontend" },
  { name: "Tailwind CSS", percentage: 85, category: "frontend" },
  { name: "Alpine.js", percentage: 70, category: "frontend" },
  { name: "Vite", percentage: 72, category: "frontend" },
  { name: "UI/UX Design", percentage: 70, category: "frontend" },

  // Database
  { name: "MySQL", percentage: 88, category: "database" },
  { name: "PostgreSQL", percentage: 75, category: "database" },
  { name: "SQLite", percentage: 70, category: "database" },
  { name: "Firebase", percentage: 65, category: "database" },

  // Infrastructure & DevOps
  { name: "Git & GitHub", percentage: 88, category: "devops" },
  { name: "GitHub Actions (CI/CD)", percentage: 72, category: "devops" },
  { name: "Cloud VPS", percentage: 82, category: "devops" },
  { name: "Linux / Ubuntu", percentage: 80, category: "devops" },
  { name: "Nginx", percentage: 75, category: "devops" },
  { name: "CyberPanel", percentage: 78, category: "devops" },
  { name: "Docker", percentage: 55, category: "devops" },
  { name: "Hostinger", percentage: 75, category: "devops" },
  { name: "Alibaba Cloud (OSS)", percentage: 65, category: "devops" },
];

export const skillCategories: { key: Skill["category"]; label: string }[] = [
  { key: "backend", label: "Backend" },
  { key: "frontend", label: "Frontend" },
  { key: "database", label: "Database" },
  { key: "devops", label: "DevOps" },
];
