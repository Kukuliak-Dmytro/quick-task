import { Metadata } from "next";
import { Locale, NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";

import { gothic, franklin } from "@/config/fonts";
import "@/config/styles/globals.css";
import { LayoutModule } from "@/app/modules/layout/layout.module";
import { ScanComponent } from "@/pkg/libraries/scan/scan.component";
import { envServer } from "@/config/envs";
import { RestApiProvider } from "@/pkg/libraries/rest-api/provider";
import { UiProvider } from "@/pkg/libraries/ui";
import { routing } from "@/pkg/libraries/locale/routing";
import { IntegrationsProvider } from "@/pkg/integrations/integrations.provider";

//interface
interface IProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

//function
/**
 * Generates static params for all locales.
 */
export const generateStaticParams = () => {
  //return
  return routing.locales.map((locale) => ({ locale }));
};

//function
/**
 * Generates metadata for the root layout.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const title = "Quick Task";
  const description = "Speedrunned a task in a day";

  //return
  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    applicationName: title,
  };
};

//component
/**
 * RootLayout component.
 */
export const RootLayout: FC<Readonly<IProps>> = async (props) => {
  const { children, params } = props;

  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  //return
  return (
    <html lang={locale} suppressHydrationWarning>
      <ScanComponent isDev={envServer.NODE_ENV !== "production"} />
      <body className={`${gothic.className} ${franklin.className} antialiased`}>
        <IntegrationsProvider />
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
