"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ModeToggle } from "@/app/features/theme-switcher/theme-switcher";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/app/shared/lib/utils";
/**
 * Providers component for application-wide context providers.
 *
 * This component wraps the application with necessary providers including
 * React Query for data fetching, theme management, and development tools.
 * It ensures proper client-side state management and theme switching functionality.
 *
 * @param props - The component props
 * @param props.children - React children to wrap with providers
 * @returns JSX element representing the providers wrapper
 */
export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Create QueryClient instance - use React.useState to ensure it's created once per component instance
  const [queryClient] = React.useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <ModeToggle />
        {children}
      </NextThemesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
