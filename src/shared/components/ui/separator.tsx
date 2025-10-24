"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/shared/utils/utils";

/**
 * Separator component for visual content separation.
 *
 * This component provides a visual separator between content sections with
 * support for horizontal and vertical orientations and accessibility features.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes
 * @param props.orientation - Separator orientation (horizontal or vertical)
 * @param props.decorative - Whether the separator is decorative
 * @returns JSX element representing the separator
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        `bg-border shrink-0 data-[orientation=horizontal]:h-px
        data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full
        data-[orientation=vertical]:w-px`,
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
