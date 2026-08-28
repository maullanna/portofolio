"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WindowState } from "@/types";
import { projects } from "@/data/projects";
import Window from "./Window";
import Taskbar from "./Taskbar";
import Sidebar, { desktopIcons } from "./Sidebar";
import BootWatermark from "./BootWatermark";
import { FolderIcon } from "@/lib/pixel-icons";
import { SIDEBAR_WIDTH, TASKBAR_HEIGHT, DESKTOP_TOP_MARGIN } from "@/lib/layout";
import { useIsMobile } from "@/lib/useIsMobile";
import HeroPanel from "../panels/HeroPanel";
import ProjectsPanel from "../panels/ProjectsPanel";
import ProjectDetailPanel from "../panels/ProjectDetailPanel";
import AboutPanel from "../panels/AboutPanel";
import SkillsPanel from "../panels/SkillsPanel";
import JourneyPanel from "../panels/JourneyPanel";
import ContactPanel from "../panels/ContactPanel";

const initialWindows: WindowState[] = [
  {
    id: "hero",
    title: "Welcome  Mr.Yusuf",
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 100, y: 60 },
    size: { width: 520, height: 320 },
  },
  {
    id: "projects",
    title: "Projects",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 9,
    position: { x: 620, y: 90 },
    size: { width: 540, height: 420 },
  },
  {
    id: "project-detail",
    title: "Project Details",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 15,
    position: { x: 160, y: 70 },
    size: { width: 600, height: 480 },
  },
  {
    id: "about",
    title: "About Me",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 8,
    position: { x: 140, y: 400 },
    size: { width: 460, height: 380 },
  },
  {
    id: "skills",
    title: "Skills",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 7,
    position: { x: 640, y: 400 },
    size: { width: 440, height: 400 },
  },
  {
    id: "journey",
    title: "Journey Log",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 6,
    position: { x: 180, y: 130 },
    size: { width: 560, height: 420 },
  },
  {
    id: "contact",
    title: "Contact",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 700, y: 160 },
    size: { width: 380, height: 320 },
  },
];

export default function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>(initialWindows);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const maxZRef = useRef(20);
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarWidth = isMobile ? 0 : SIDEBAR_WIDTH;

  const bumpZ = () => {
    maxZRef.current += 1;
    return maxZRef.current;
  };

  const focusWindow = useCallback((id: string) => {
    const z = bumpZ();
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: z } : w)));
  }, []);

  const openWindow = useCallback((id: string) => {
    const z = bumpZ();
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: z } : w)));
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    const z = bumpZ();
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized, zIndex: z } : w)));
  }, []);

  const openProjectDetail = useCallback(
    (projectId: string) => {
      setSelectedProjectId(projectId);
      openWindow("project-detail");
    },
    [openWindow],
  );

  const heroMovedRef = useRef(false);

  useEffect(() => {
    const centerHero = () => {
      if (heroMovedRef.current) return;
      const heroBase = initialWindows.find((w) => w.id === "hero")!.size;
      const currentSidebarWidth = window.innerWidth < 768 ? 0 : SIDEBAR_WIDTH;
      const x = currentSidebarWidth + Math.max(24, (window.innerWidth - currentSidebarWidth - heroBase.width) / 2);
      const y = Math.max(DESKTOP_TOP_MARGIN, (window.innerHeight - TASKBAR_HEIGHT - heroBase.height) / 2);
      setWindows((prev) => prev.map((w) => (w.id === "hero" ? { ...w, position: { x, y } } : w)));
    };
    centerHero();
    window.addEventListener("resize", centerHero);
    return () => window.removeEventListener("resize", centerHero);
  }, []);

  const handleDragStart = useCallback((id: string) => {
    if (id === "hero") heroMovedRef.current = true;
  }, []);

  const desktopAreaRef = useRef<HTMLDivElement>(null);

  const getPanel = (id: string) => {
    switch (id) {
      case "hero":
        return <HeroPanel onOpenProjects={() => openWindow("projects")} onOpenJourney={() => openWindow("journey")} />;
      case "projects":
        return <ProjectsPanel onOpenProject={openProjectDetail} onOpenJourney={() => openWindow("journey")} onOpenAbout={() => openWindow("about")} onOpenHero={() => openWindow("hero")} />;
      case "project-detail": {
        const project = projects.find((p) => p.id === selectedProjectId) ?? projects[0];
        return <ProjectDetailPanel project={project} />;
      }
      case "about":
        return <AboutPanel />;
      case "skills":
        return <SkillsPanel />;
      case "journey":
        return <JourneyPanel />;
      case "contact":
        return <ContactPanel />;
      default:
        return null;
    }
  };

  const getTitle = (win: WindowState) => {
    if (win.id === "project-detail") {
      const project = projects.find((p) => p.id === selectedProjectId);
      return project ? `Project Details — ${project.name}` : win.title;
    }
    return win.title;
  };

  const getIcon = (id: string) => {
    if (id === "project-detail") return FolderIcon;
    return desktopIcons.find((i) => i.id === id)?.Icon;
  };

  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = now
    ? now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "--:--:--";

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "var(--desktop-bg)" }}>
      <Sidebar
        onOpenWindow={openWindow}
        isMobile={isMobile}
        open={!isMobile || sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <BootWatermark sidebarWidth={sidebarWidth} />

      {/* Drag boundary — windows can never be dragged outside this area */}
      <div ref={desktopAreaRef} className="absolute pointer-events-none" style={{ left: sidebarWidth, top: DESKTOP_TOP_MARGIN, right: 0, bottom: TASKBAR_HEIGHT }} />

      {/* Windows */}
      <AnimatePresence>
        {windows.map((win) => (
          <Window
            key={win.id}
            window={{ ...win, title: getTitle(win) }}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={toggleMaximize}
            onFocus={focusWindow}
            onDragStart={handleDragStart}
            constraintsRef={desktopAreaRef}
            Icon={getIcon(win.id)}
            sidebarWidth={sidebarWidth}
            isMobile={isMobile}
          >
            {getPanel(win.id)}
          </Window>
        ))}
      </AnimatePresence>

      <Taskbar
        windows={windows}
        onWindowClick={openWindow}
        time={timeStr}
        getIcon={getIcon}
        sidebarWidth={sidebarWidth}
        isMobile={isMobile}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />
    </div>
  );
}
