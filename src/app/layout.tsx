import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

import db from "@/db";
import { workspaces } from "@/db/schema/workspaces";
import { Toaster } from "@/components/ui/sonner";
import AppStateProvider from "@/lib/providers/state-provider";

const dm_Sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion clone - Cypress",
  description: "Notion clone cypress application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const data = await db.select().from(workspaces);

  // console.log(data);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-background ${dm_Sans.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <AppStateProvider>{children}</AppStateProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
