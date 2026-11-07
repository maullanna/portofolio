// Recharts renders these as raw SVG attributes, which don't reliably resolve
// CSS custom properties — use literal hex values here instead of var(--chart-*).
export const CHART_BG = "#131722";
export const CHART_UP = "#26a69a";
export const CHART_DOWN = "#ef5350";
export const CHART_GRID = "#232734";
export const CHART_TEXT = "#787b86";

// One series colour per delivery methodology, picked to read on the dark chart background
export const METHOD_COLOR = {
  waterfall: "#d1d4dc",
  agile: CHART_UP,
  hybrid: "#e0a64b",
} as const;
