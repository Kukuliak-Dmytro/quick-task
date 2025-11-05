"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/app/features/theme-switcher/theme-switcher";
import { cn } from "@/app/shared/utils/utils";

// component
export const HeaderComponent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  return (
    <header className="border-b">
      <nav
        className={cn(
          "container mx-auto px-4 py-4 flex items-center justify-between",
        )}>
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/posts" className="hover:underline">
            Posts
          </Link>
        </div>
        {mounted && <ModeToggle />}
      </nav>
    </header>
  );
};
