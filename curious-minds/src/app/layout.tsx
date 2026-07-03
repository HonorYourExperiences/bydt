import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BYDT Curious Minds",
  description:
    "Turn a child's curiosity into real-world missions, with receipts. Pilot — Hudson Valley.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
