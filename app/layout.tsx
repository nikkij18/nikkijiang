import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nikki Jiang",
  description: "Georgetown designer and data storyteller working at the intersection of global health and design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-neutral-900">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
