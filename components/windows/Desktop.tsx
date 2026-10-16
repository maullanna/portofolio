"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WindowState } from "@/types";
import { projects } from "@/data/projects";
import Window from "./Window";
import Taskbar from "./Taskbar";
import Navbar, { desktopIcons, windowIndex } from "./Navbar";
import PixelCursor from "./PixelCursor";
import BootSequence from "./BootSequence";
import { FolderIcon } from "@/lib/pixel-icons";
import { TASKBAR_HEIGHT, DESKTOP_TOP_MARGIN } from "@/lib/layout";
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
    title: "Welcome",
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 100, y: 60 },
    size: { width: 820, height: 460 },
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
  const [menuOpen, setMenuOpen] = useState(false);

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

  const visibleWindows = windows.filter((w) => w.isOpen && !w.isMinimized);
  const activeId = visibleWindows.length
    ? visibleWindows.reduce((top, w) => (w.zIndex > top.zIndex ? w : top)).id
    : null;

  // Win98 taskbar behaviour: clicking the focused window's button minimizes it
  const handleTaskbarClick = (id: string) => {
    if (id === activeId) minimizeWindow(id);
    else openWindow(id);
  };

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
      // Mirror Window's clamp() sizing so the hero is centred on its real rendered size
      const width = Math.min(heroBase.width * 1.6, Math.max(heroBase.width * 0.85, window.innerWidth * 0.4));
      const height = Math.min(heroBase.height * 1.6, Math.max(heroBase.height * 0.85, window.innerHeight * 0.34)) + 60;
      const x = Math.max(12, (window.innerWidth - width) / 2);
      const y = Math.max(DESKTOP_TOP_MARGIN + 12, DESKTOP_TOP_MARGIN + (window.innerHeight - DESKTOP_TOP_MARGIN - TASKBAR_HEIGHT - height) / 2);
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

  // Project details lives "inside" Projects, so it shares its number
  const getIndex = (id: string) => windowIndex(id === "project-detail" ? "projects" : id);

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

  const dateStr = now
    ? now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "";

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "var(--desktop-bg)" }}>
      <BootSequence />

      <Navbar
        onOpenWindow={openWindow}
        isMobile={isMobile}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        onCloseMenu={() => setMenuOpen(false)}
        openIds={windows.filter((w) => w.isOpen).map((w) => w.id)}
      />

      <PixelCursor />

      {/* Drag boundary — windows can never be dragged outside this area */}
      <div ref={desktopAreaRef} className="absolute pointer-events-none" style={{ left: 0, top: DESKTOP_TOP_MARGIN, right: 0, bottom: TASKBAR_HEIGHT }} />

      {/* Windows — only visible ones are children, so AnimatePresence can play the closing curtain */}
      <AnimatePresence>
        {visibleWindows.map((win) => (
          <Window
            isActive={win.id === activeId}
            index={getIndex(win.id)}
            key={win.id}
            window={{ ...win, title: getTitle(win) }}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={toggleMaximize}
            onFocus={focusWindow}
            onDragStart={handleDragStart}
            constraintsRef={desktopAreaRef}
            Icon={getIcon(win.id)}
            isMobile={isMobile}
          >
            {getPanel(win.id)}
          </Window>
        ))}
      </AnimatePresence>

      <Taskbar
        windows={windows}
        activeId={activeId}
        onWindowClick={handleTaskbarClick}
        time={timeStr}
        date={dateStr}
        getIcon={getIcon}
        getIndex={getIndex}
        isMobile={isMobile}
        onStart={() => (isMobile ? setMenuOpen((v) => !v) : openWindow("hero"))}
      />
    </div>
  );
}
