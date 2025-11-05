"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/app/features/theme-switcher/theme-switcher";
import { cn } from "@/app/shared/utils/utils";
import { signOut } from "@/app/modules/auth/auth.service";
import { Button } from "@/app/shared/components/ui/button";

// component
export const HeaderComponent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/login";
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
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/posts" className="hover:underline">
            Posts
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {mounted && <ModeToggle />}
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
};
