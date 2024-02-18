import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

import db from "@/db";
import { workspaces } from "@/db/schema/workspaces";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "%s | Notion clone",
  description: "Notion clone application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const data = await db.select().from(workspaces);

  // console.log(data);
  return (
    <html lang="en">
      <body className={`bg-background ${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
