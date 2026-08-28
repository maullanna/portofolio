export interface TechStack {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  tools?: string[];
}

export type ProjectIconKey =
  | "shield"
  | "idcard"
  | "chart"
  | "bank"
  | "camera"
  | "receipt"
  | "droplet"
  | "book";

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  tech: string[];
  techStack: TechStack;
  features: string[];
  iconKey: ProjectIconKey;
  status: "completed" | "in-development";
  url?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  impact: string[];
  milestones: Milestone[];
  screenshots?: string[];
}

export interface Milestone {
  date: string;
  time: string;
  activity: string;
  status: "done" | "in-progress";
}

export interface JourneyEntry {
  date: string;
  time: string;
  activity: string;
  project: string;
  status: "done" | "in-progress";
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
}

export interface Achievement {
  title: string;
  issuer: string;
  year?: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  status: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  photoPath: string;
  experience: string;
  passion: string;
  about: string;
  education: { school: string; degree: string; period: string }[];
  campusActivities: string[];
  workExperience: WorkExperience[];
  certifications: Certification[];
  achievements: Achievement[];
  stats: { label: string; value: string }[];
}

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface Skill {
  name: string;
  percentage: number;
  category: "backend" | "frontend" | "database" | "devops";
}
