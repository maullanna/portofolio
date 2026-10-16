"use client";

import { useEffect, useRef } from "react";

// Pen nib — a solid teal square that glides after the pointer
const SQUARE = 14; // px
const SQUARE_COLOR = "#00a896";
const FOLLOW_RATE = 22; // higher = tighter follow (per second, frame-rate independent)

// Ink line left behind by the nib
const INK_LIFETIME_MS = 420; // how long a point of the line survives
const INK_WIDTH = 1; // constant, like a fine pen
const INK_RGB = "0,168,150"; // #00a896 brand teal
const FADE_PORTION = 0.35; // only the oldest part of the line fades out
const SPLINE_STEPS = 6; // sub-segments between samples (smooth curves)

type InkPoint = { x: number; y: number; t: number };

/** Catmull-Rom interpolation between p1 and p2 (p0/p3 are neighbours). */
function catmullRom(p0: InkPoint, p1: InkPoint, p2: InkPoint, p3: InkPoint, s: number) {
  const s2 = s * s;
  const s3 = s2 * s;
  const f = (a: number, b: number, c: number, d: number) =>
    0.5 * (2 * b + (-a + c) * s + (2 * a - 5 * b + 4 * c - d) * s2 + (-a + 3 * b - 3 * c + d) * s3);
  return { x: f(p0.x, p1.x, p2.x, p3.x), y: f(p0.y, p1.y, p2.y, p3.y), t: p1.t + (p2.t - p1.t) * s };
}

/**
 * Cursor companion drawn on one canvas above everything: a teal square
 * "nib" eases after the pointer and draws a pen line behind it. The line
 * retracts and vanishes once the cursor stops, leaving no mark.
 */
export default function PixelCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Touch devices have no hover — skip the effect entirely
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const target = { x: 0, y: 0 };
    const nib = { x: 0, y: 0 };
    let visible = false;
    let started = false;
    const stroke: InkPoint[] = [];
    let frame = 0;
    let last = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawInk = (now: number) => {
      if (stroke.length < 2) return;

      // Dense, smooth polyline: Catmull-Rom through the samples, ending at the nib.
      // Ends are padded so the curve passes through the first and last sample.
      const pts = [stroke[0], ...stroke, { x: nib.x, y: nib.y, t: now }];
      pts.push(pts[pts.length - 1]);
      const dense: InkPoint[] = [];
      for (let i = 1; i < pts.length - 2; i++) {
        for (let s = 0; s < SPLINE_STEPS; s++) dense.push(catmullRom(pts[i - 1], pts[i], pts[i + 1], pts[i + 2], s / SPLINE_STEPS));
      }
      dense.push(pts[pts.length - 2]);

      ctx.lineWidth = INK_WIDTH;
      ctx.lineJoin = "round";

      // Oldest part fades out: short butt-capped pieces so opacities don't stack at joins
      const fadeSpan = INK_LIFETIME_MS * FADE_PORTION;
      const fadeCutoff = now - INK_LIFETIME_MS + fadeSpan;
      let split = 0;
      ctx.lineCap = "butt";
      while (split < dense.length - 1 && dense[split].t < fadeCutoff) {
        const a = dense[split];
        const b = dense[split + 1];
        const alpha = Math.max(0, 1 - (fadeCutoff - a.t) / fadeSpan);
        ctx.strokeStyle = `rgba(${INK_RGB},${(0.9 * alpha).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        split++;
      }

      // Fresh part: one continuous path at full ink, so there are no seams
      if (split >= dense.length - 1) return;
      ctx.lineCap = "round";
      ctx.strokeStyle = `rgba(${INK_RGB},0.9)`;
      ctx.beginPath();
      ctx.moveTo(dense[split].x, dense[split].y);
      for (let j = split + 1; j < dense.length; j++) ctx.lineTo(dense[j].x, dense[j].y);
      ctx.stroke();
    };

    const draw = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;

      // Exponential ease toward the pointer — same feel at 60Hz or 144Hz
      const k = 1 - Math.exp(-FOLLOW_RATE * dt);
      nib.x += (target.x - nib.x) * k;
      nib.y += (target.y - nib.y) * k;

      const moving = Math.hypot(target.x - nib.x, target.y - nib.y) > 0.3;
      if (moving) stroke.push({ x: nib.x, y: nib.y, t: now });
      // The tail retracts: drop samples older than the lifetime
      while (stroke.length && now - stroke[0].t > INK_LIFETIME_MS) stroke.shift();

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      drawInk(now);

      if (visible) {
        ctx.fillStyle = SQUARE_COLOR;
        ctx.fillRect(nib.x - SQUARE / 2, nib.y - SQUARE / 2, SQUARE, SQUARE);
      }

      if (moving || stroke.length) frame = requestAnimationFrame(draw);
      else {
        frame = 0;
        last = 0;
      }
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!started) {
        // First move: place the nib under the pointer instead of flying in from 0,0
        nib.x = target.x;
        nib.y = target.y;
        started = true;
      }
      visible = true;
      wake();
    };

    const onLeave = () => {
      visible = false;
      wake();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ width: "100vw", height: "100vh", zIndex: 2147483646 }}
      aria-hidden="true"
    />
  );
}
