import { Libre_Franklin } from "next/font/google";

/** Libre Franklin font configuration */
export const franklin = Libre_Franklin({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});
