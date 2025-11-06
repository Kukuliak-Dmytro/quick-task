import { Metadata } from "next";
import { Locale, NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { FC, ReactNode } from "react";

import { gothic, franklin } from "@/config/fonts";
import "@/config/styles/globals.css";
import { LayoutModule } from "@/app/modules/layout/layout.module";
import { ScanComponent } from "@/pkg/libraries/scan/scan.component";
import { envServer } from "@/config/envs";
import { RestApiProvider } from "@/pkg/libraries/rest-api/provider";
import { UiProvider } from "@/pkg/libraries/ui";
import { routing } from "@/pkg/libraries/locale/routing";
import { MixpanelInitializer } from "@/pkg/integrations/mixpanel";
import { USER_ID_COOKIE } from "@/proxy";

// interface
interface IProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

// generateStaticParams
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// metadata
export const generateMetadata = async (): Promise<Metadata> => {
  const title = "Quick Task";
  const description = "Speedrunned a task in a day";

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    applicationName: title,
  };
};

// component
const RootLayout: FC<Readonly<IProps>> = async (props) => {
  const { children, params } = props;

  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Read user ID from cookies (server-side)
  const cookieStore = await cookies();
  const userId = cookieStore.get(USER_ID_COOKIE)?.value || null;

  // return
  return (
    <html lang={locale} suppressHydrationWarning>
      <ScanComponent isDev={envServer.NODE_ENV !== "production"} />
      <body className={`${gothic.className} ${franklin.className} antialiased`}>
        <MixpanelInitializer userId={userId} />
        <RestApiProvider>
          <UiProvider>
            <NextIntlClientProvider>
              <LayoutModule>{children}</LayoutModule>
            </NextIntlClientProvider>
          </UiProvider>
        </RestApiProvider>
      </body>
    </html>
  );
};

export default RootLayout;
