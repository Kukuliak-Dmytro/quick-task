import { Special_Gothic } from "next/font/google";

/** Gothic A1 font configuration */
export const gothic = Special_Gothic({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});
