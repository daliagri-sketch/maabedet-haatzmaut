/**
 * Root layout.
 * Hebrew RTL. Locked design tokens.
 */

import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "מעבדת העצמאות",
  description: "כרטיס שגרה",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <main className="app-main">{children}</main>
      </body>
    </html>
  );
}
