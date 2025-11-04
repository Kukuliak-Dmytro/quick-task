import type { Metadata } from "next";
import { gothic, franklin } from "@/config/fonts";
import "@/config/styles/globals.css";
import { Providers } from "@/app/(app)/providers";
import { ScanComponent } from "@/pkg/libraries/scan/scan.component";
import { envServer } from "@/config/envs";

/** Application metadata configuration */
export const metadata: Metadata = {
  title: "Quick Task",
  description: "Speedrunned a task in a day",
};

/**
 * Root layout component for the application.
 *
 * This component provides the base HTML structure for all pages, including
 * font configuration, global styles, and provider setup for theme and query management.
 *
 * @param props - The component props
 * @param props.children - React children to render within the layout
 * @returns JSX element representing the root layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${gothic.className} ${franklin.className} antialiased`}>
        <ScanComponent isDev={envServer.NODE_ENV !== "production"} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
