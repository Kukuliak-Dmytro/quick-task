import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-start py-16 px-8 bg-white dark:bg-black">
        <div className="w-full max-w-4xl space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Color Palette Showcase
            </h1>
            <p className="text-muted-foreground">
              All available colors in your design system
            </p>
          </div>

          {/* Primary Colors */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Primary Colors
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-medium">
                    Primary
                  </span>
                </div>
                <Button variant="default" className="w-full">
                  Primary Button
                </Button>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="text-secondary-foreground font-medium">
                    Secondary
                  </span>
                </div>
                <Button variant="secondary" className="w-full">
                  Secondary Button
                </Button>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-medium">
                    Accent
                  </span>
                </div>
                <Button variant="outline" className="w-full">
                  Accent Button
                </Button>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground font-medium">
                    Muted
                  </span>
                </div>
                <Button variant="ghost" className="w-full">
                  Muted Button
                </Button>
              </div>
            </div>
          </section>

          {/* Background Colors */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Background Colors
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-background border border-border flex items-center justify-center">
                  <span className="text-foreground font-medium">
                    Background
                  </span>
                </div>
                <Button variant="link" className="w-full">
                  Link Button
                </Button>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-card border border-border flex items-center justify-center">
                  <span className="text-card-foreground font-medium">Card</span>
                </div>
                <Button variant="destructive" className="w-full">
                  Destructive
                </Button>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-popover border border-border flex items-center justify-center">
                  <span className="text-popover-foreground font-medium">
                    Popover
                  </span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Small Button
                </Button>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-input border border-border flex items-center justify-center">
                  <span className="text-foreground font-medium">Input</span>
                </div>
                <Button variant="outline" size="lg" className="w-full">
                  Large Button
                </Button>
              </div>
            </div>
          </section>

          {/* Chart Colors */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Chart Colors
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-chart-1 flex items-center justify-center">
                  <span className="text-white font-medium">Chart 1</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-chart-1 border-chart-1"
                >
                  Chart 1
                </Button>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-chart-2 flex items-center justify-center">
                  <span className="text-white font-medium">Chart 2</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-chart-2 border-chart-2"
                >
                  Chart 2
                </Button>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-chart-3 flex items-center justify-center">
                  <span className="text-white font-medium">Chart 3</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-chart-3 border-chart-3"
                >
                  Chart 3
                </Button>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-chart-4 flex items-center justify-center">
                  <span className="text-white font-medium">Chart 4</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-chart-4 border-chart-4"
                >
                  Chart 4
                </Button>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-chart-5 flex items-center justify-center">
                  <span className="text-white font-medium">Chart 5</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-chart-5 border-chart-5"
                >
                  Chart 5
                </Button>
              </div>
            </div>
          </section>

          {/* Sidebar Colors */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Sidebar Colors
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-sidebar flex items-center justify-center">
                  <span className="text-sidebar-foreground font-medium">
                    Sidebar
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-sidebar-foreground border-sidebar-border"
                >
                  Sidebar
                </Button>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-sidebar-primary flex items-center justify-center">
                  <span className="text-sidebar-primary-foreground font-medium">
                    Sidebar Primary
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-sidebar-primary border-sidebar-primary"
                >
                  Primary
                </Button>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-sidebar-accent flex items-center justify-center">
                  <span className="text-sidebar-accent-foreground font-medium">
                    Sidebar Accent
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-sidebar-accent-foreground border-sidebar-accent"
                >
                  Accent
                </Button>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-lg bg-sidebar-border border border-border flex items-center justify-center">
                  <span className="text-sidebar-foreground font-medium">
                    Sidebar Border
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-sidebar-foreground border-sidebar-border"
                >
                  Border
                </Button>
              </div>
            </div>
          </section>

          {/* Button Variants Showcase */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              All Button Variants
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </section>

          {/* Button Sizes Showcase */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Button Sizes
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🎨</Button>
              <Button size="icon-sm">⚙️</Button>
              <Button size="icon-lg">🚀</Button>
            </div>
          </section>

          {/* Color Test Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Color Test
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="h-16 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-medium">
                  Primary
                </span>
              </div>
              <div className="h-16 rounded-lg bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-medium">
                  Secondary
                </span>
              </div>
              <div className="h-16 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-medium">
                  Accent
                </span>
              </div>
              <div className="h-16 rounded-lg bg-muted flex items-center justify-center">
                <span className="text-muted-foreground font-medium">Muted</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
