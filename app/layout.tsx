import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yusuf Maulana — Backend & Fullstack Developer",
  description: "Windows 98/XP styled developer portfolio of Yusuf Maulana.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
