"use client";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ModeToggle } from "@/app/features/theme-switcher/theme-switcher";
import { LocaleSwitcher } from "@/app/features/locale-switcher/locale-switcher.component";
import { cn } from "@/app/shared/utils/utils";
import { signOut } from "@/app/modules/auth/auth.service";
import { Button } from "@/app/shared/components/ui/button";
import { Link, useRouter } from "@/pkg/libraries/locale";

// component
export const HeaderComponent = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  const handleLogout = async () => {
    try {
      // Call better-auth sign out endpoint
      await signOut();
      // Redirect to login page with current locale
      router.push("/login", { locale });
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <header className="border-b">
      <nav
        className={cn(
          "container mx-auto px-4 py-4 flex items-center justify-between",
        )}>
        <div className="flex items-center gap-6">
          <Link href="/" locale={locale} className="hover:underline">
            {t("header_link_home")}
          </Link>
          <Link href="/posts" locale={locale} className="hover:underline">
            {t("header_link_posts")}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {mounted && <ModeToggle />}
          <LocaleSwitcher />
          <Button variant="outline" onClick={handleLogout}>
            {t("header_logout")}
          </Button>
        </div>
      </nav>
    </header>
  );
};
