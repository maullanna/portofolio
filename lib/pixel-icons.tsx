/**
 * Original 16x16 pixel-grid icon set, hand-authored for this project.
 * Not extracted from any Windows system file / icon pack — safe to ship.
 */
import type { ReactNode } from "react";
import type { ProjectIconKey } from "@/types";

export interface PixelIconProps {
  size?: number;
  className?: string;
}

const svgProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 16 16",
  shapeRendering: "crispEdges" as const,
  style: { imageRendering: "pixelated" as const },
});

export function ComputerIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <rect x="1" y="1" width="14" height="9" fill="#C0C0C0" />
      <rect x="1" y="1" width="14" height="9" fill="none" stroke="#808080" strokeWidth="1" />
      <rect x="2.5" y="2.5" width="11" height="6" fill="#000080" />
      <rect x="6" y="10" width="4" height="1.5" fill="#808080" />
      <rect x="4" y="11.5" width="8" height="1.5" fill="#C0C0C0" stroke="#808080" strokeWidth="0.5" />
    </svg>
  );
}

export function FolderIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <rect x="1" y="4" width="6" height="2" fill="#E6B800" />
      <rect x="1" y="5" width="14" height="9" fill="#FFD700" stroke="#806600" strokeWidth="0.5" />
    </svg>
  );
}

export function PersonIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <rect x="2" y="1" width="12" height="14" fill="#FFFFFF" stroke="#808080" strokeWidth="1" />
      <circle cx="8" cy="6" r="2.4" fill="#000080" />
      <path d="M3.5 13.5c0-2.8 2-4.5 4.5-4.5s4.5 1.7 4.5 4.5" fill="#00A896" />
    </svg>
  );
}

export function ToolboxIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <rect x="2" y="7" width="12" height="7" fill="#C0C0C0" stroke="#808080" strokeWidth="1" />
      <rect x="2" y="7" width="12" height="2" fill="#00A896" />
      <path d="M6 5.5C6 4 7 3 8 3s2 1 2 2.5V7H6V5.5Z" fill="none" stroke="#808080" strokeWidth="1" />
      <rect x="7" y="9.5" width="2" height="2" fill="#808080" />
    </svg>
  );
}

export function CalendarIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <rect x="1.5" y="2.5" width="13" height="12" fill="#FFFFFF" stroke="#808080" strokeWidth="1" />
      <rect x="1.5" y="2.5" width="13" height="3" fill="#000080" />
      <rect x="4" y="1" width="1.5" height="3" fill="#808080" />
      <rect x="10.5" y="1" width="1.5" height="3" fill="#808080" />
      <rect x="4" y="8" width="2" height="2" fill="#00A896" />
      <rect x="7" y="8" width="2" height="2" fill="#C0C0C0" />
      <rect x="10" y="8" width="2" height="2" fill="#C0C0C0" />
      <rect x="4" y="11" width="2" height="2" fill="#C0C0C0" />
      <rect x="7" y="11" width="2" height="2" fill="#C0C0C0" />
    </svg>
  );
}

export function EnvelopeIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <rect x="1" y="3" width="14" height="10" fill="#FFFFFF" stroke="#808080" strokeWidth="1" />
      <path d="M1 3.5 8 9 15 3.5" fill="none" stroke="#000080" strokeWidth="1.2" />
    </svg>
  );
}

export function TrashBinIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <rect x="3" y="2" width="10" height="1.5" fill="#808080" />
      <rect x="6" y="0.5" width="4" height="1.5" fill="#808080" />
      <path d="M4 4h8l-1 10.5H5L4 4Z" fill="#C0C0C0" stroke="#808080" strokeWidth="1" />
      <rect x="6.5" y="5.5" width="1" height="7" fill="#808080" />
      <rect x="8.5" y="5.5" width="1" height="7" fill="#808080" />
    </svg>
  );
}

export function SpeakerIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M2 6h3l4-3v10l-4-3H2V6Z" fill="currentColor" />
      <path d="M10.5 5.5c1.2 1 1.2 4 0 5" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M12.3 4c2 1.7 2 6.3 0 8" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function NetworkIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <rect x="1" y="2" width="6" height="5" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <rect x="9" y="2" width="6" height="5" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <rect x="5" y="9" width="6" height="5" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4 7v2h8V7" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function folderBase(inner: ReactNode) {
  return (
    <>
      <rect x="1" y="4" width="6" height="2" fill="#E6B800" />
      <rect x="1" y="5" width="14" height="9" fill="#FFD700" stroke="#806600" strokeWidth="0.5" />
      {inner}
    </>
  );
}

export function ShieldFolderIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      {folderBase(<path d="M8 6.5 11.5 8v2c0 1.6-1.5 2.7-3.5 3.3-2-0.6-3.5-1.7-3.5-3.3V8L8 6.5Z" fill="#000080" />)}
    </svg>
  );
}

export function IdCardFolderIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      {folderBase(
        <>
          <rect x="4.5" y="7" width="7" height="5.5" fill="#FFFFFF" stroke="#808080" strokeWidth="0.6" />
          <circle cx="6.6" cy="9.2" r="1" fill="#000080" />
          <rect x="8.2" y="8.6" width="2.4" height="0.7" fill="#808080" />
          <rect x="8.2" y="9.8" width="2.4" height="0.7" fill="#808080" />
        </>,
      )}
    </svg>
  );
}

export function ChartFolderIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      {folderBase(
        <>
          <rect x="5" y="10.5" width="1.4" height="2.5" fill="#000080" />
          <rect x="7.2" y="8.5" width="1.4" height="4.5" fill="#00A896" />
          <rect x="9.4" y="9.7" width="1.4" height="3.3" fill="#000080" />
        </>,
      )}
    </svg>
  );
}

export function BankFolderIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      {folderBase(
        <>
          <path d="M5 8.5 8 7l3 1.5Z" fill="#000080" />
          <rect x="5" y="9" width="6" height="3.5" fill="#FFFFFF" stroke="#808080" strokeWidth="0.5" />
          <rect x="5.5" y="9.5" width="0.8" height="2.5" fill="#808080" />
          <rect x="7.6" y="9.5" width="0.8" height="2.5" fill="#808080" />
          <rect x="9.7" y="9.5" width="0.8" height="2.5" fill="#808080" />
        </>,
      )}
    </svg>
  );
}

export function CameraFolderIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      {folderBase(
        <>
          <rect x="4.5" y="8.5" width="7" height="4" fill="#111111" />
          <circle cx="8" cy="10.5" r="1.4" fill="#00A896" />
          <rect x="9.5" y="7.7" width="1.6" height="1" fill="#111111" />
        </>,
      )}
    </svg>
  );
}

export function ReceiptFolderIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      {folderBase(
        <>
          <rect x="5.5" y="7" width="5" height="6" fill="#FFFFFF" stroke="#808080" strokeWidth="0.5" />
          <rect x="6.3" y="8.2" width="3.4" height="0.6" fill="#808080" />
          <rect x="6.3" y="9.4" width="3.4" height="0.6" fill="#808080" />
          <rect x="6.3" y="10.6" width="2" height="0.6" fill="#00A896" />
        </>,
      )}
    </svg>
  );
}

export function DropletFolderIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      {folderBase(<path d="M8 7c1.4 1.8 2.2 3 2.2 4.1a2.2 2.2 0 1 1-4.4 0C5.8 10 6.6 8.8 8 7Z" fill="#000080" />)}
    </svg>
  );
}

export function BookFolderIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      {folderBase(
        <>
          <rect x="5" y="7.5" width="6" height="5" fill="#FFFFFF" stroke="#808080" strokeWidth="0.5" />
          <rect x="7.7" y="7.5" width="0.6" height="5" fill="#808080" />
          <rect x="5.6" y="8.4" width="1.6" height="0.5" fill="#00A896" />
          <rect x="8.8" y="8.4" width="1.6" height="0.5" fill="#00A896" />
        </>,
      )}
    </svg>
  );
}

export function StartFlagIcon({ size = 16, className }: PixelIconProps) {
  return <img src="/icon/Windows_98.png" width={size} height={size} className={className} alt="Windows 98" style={{ imageRendering: "pixelated" }} />;
}

export function DocumentIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M3 1h7l3 3v11H3Z" fill="#FFFFFF" stroke="#808080" strokeWidth="1" />
      <path d="M10 1v3h3Z" fill="#C0C0C0" />
      <rect x="5" y="7" width="6" height="1" fill="#00A896" />
      <rect x="5" y="9.5" width="6" height="1" fill="#808080" />
      <rect x="5" y="12" width="4" height="1" fill="#808080" />
    </svg>
  );
}

export function StarIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M8 1.5 9.8 6H14l-3.4 2.7L11.8 13 8 10.4 4.2 13l1.2-4.3L2 6h4.2Z" fill="#00A896" stroke="#00695c" strokeWidth="0.6" />
    </svg>
  );
}

export function GlobeIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <circle cx="8" cy="8" r="6.5" fill="#FFFFFF" stroke="#111111" strokeWidth="1" />
      <ellipse cx="8" cy="8" rx="2.6" ry="6.5" fill="none" stroke="#111111" strokeWidth="0.8" />
      <line x1="1.5" y1="8" x2="14.5" y2="8" stroke="#111111" strokeWidth="0.8" />
      <line x1="2.4" y1="5" x2="13.6" y2="5" stroke="#111111" strokeWidth="0.6" />
      <line x1="2.4" y1="11" x2="13.6" y2="11" stroke="#111111" strokeWidth="0.6" />
    </svg>
  );
}

export function FloppyDiskIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M2 2h9l3 3v9H2Z" fill="#111111" stroke="#000000" strokeWidth="0.5" />
      <rect x="4" y="2" width="6" height="4" fill="#C0C0C0" />
      <rect x="4" y="9" width="8" height="5" fill="#FFFFFF" />
    </svg>
  );
}

export function DatabaseIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <ellipse cx="8" cy="3.2" rx="6" ry="2.2" fill="#00A896" stroke="#00695c" strokeWidth="0.6" />
      <path d="M2 3.2v9.6c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V3.2" fill="#FFFFFF" stroke="#00695c" strokeWidth="0.6" />
      <path d="M2 7.5c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2" fill="none" stroke="#00695c" strokeWidth="0.6" />
      <path d="M2 11c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2" fill="none" stroke="#00695c" strokeWidth="0.6" />
    </svg>
  );
}

export function ServerIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <rect x="2" y="1.5" width="12" height="4.5" fill="#C0C0C0" stroke="#808080" strokeWidth="0.8" />
      <rect x="2" y="6.5" width="12" height="4.5" fill="#C0C0C0" stroke="#808080" strokeWidth="0.8" />
      <rect x="2" y="11.5" width="12" height="3" fill="#C0C0C0" stroke="#808080" strokeWidth="0.8" />
      <circle cx="4" cy="3.7" r="0.8" fill="#008000" />
      <circle cx="4" cy="8.7" r="0.8" fill="#00A896" />
      <circle cx="4" cy="13" r="0.8" fill="#000080" />
    </svg>
  );
}

export function CubeIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M8 1 14 4.2v7.6L8 15 2 11.8V4.2Z" fill="#00A896" stroke="#00695c" strokeWidth="0.6" />
      <path d="M2 4.2 8 7.4 14 4.2" fill="none" stroke="#00695c" strokeWidth="0.6" />
      <path d="M8 7.4V15" fill="none" stroke="#00695c" strokeWidth="0.6" />
    </svg>
  );
}

export function ActivityIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <path d="M1 8h3l1.5-5 3 10 2-7 1.5 2H15" fill="none" stroke="#00A896" strokeWidth="1.2" />
    </svg>
  );
}

export function LinkIcon({ size = 16, className }: PixelIconProps) {
  return (
    <svg {...svgProps(size)} className={className}>
      <rect x="1.5" y="5" width="6" height="6" fill="none" stroke="#111111" strokeWidth="1.2" transform="rotate(-20 4.5 8)" />
      <rect x="8.5" y="5" width="6" height="6" fill="none" stroke="#111111" strokeWidth="1.2" transform="rotate(-20 11.5 8)" />
    </svg>
  );
}

export const projectIcons: Record<ProjectIconKey, (props: PixelIconProps) => React.JSX.Element> = {
  shield: ShieldFolderIcon,
  idcard: IdCardFolderIcon,
  chart: ChartFolderIcon,
  bank: BankFolderIcon,
  camera: CameraFolderIcon,
  receipt: ReceiptFolderIcon,
  droplet: DropletFolderIcon,
  book: BookFolderIcon,
};
