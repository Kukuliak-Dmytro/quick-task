import type { Metadata } from "next";
import { gothic, franklin } from "@/config/fonts";
import "@/config/styles/globals.css";
import { LayoutModule } from "@/app/modules/layout/layout.module";
import { ScanComponent } from "@/pkg/libraries/scan/scan.component";
import { envServer } from "@/config/envs";
import { RestApiProvider } from "@/pkg/libraries/rest-api/provider";
import { UiProvider } from "@/pkg/libraries/ui";
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
      <ScanComponent isDev={envServer.NODE_ENV !== "production"} />
      <body className={`${gothic.className} ${franklin.className} antialiased`}>
        <RestApiProvider>
          <UiProvider>
            <LayoutModule>{children}</LayoutModule>
          </UiProvider>
        </RestApiProvider>
      </body>
    </html>
  );
}
