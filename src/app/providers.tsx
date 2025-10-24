"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ModeToggle } from "@/features/theme-switcher/theme-switcher";
export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ModeToggle />
      {children}
    </NextThemesProvider>
  );
}
