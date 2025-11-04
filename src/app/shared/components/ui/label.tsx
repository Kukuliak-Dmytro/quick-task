"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/app/shared/utils/utils";

/**
 * Label component for form field labels.
 *
 * This component provides accessible labels for form fields with proper
 * styling and accessibility features using Radix UI primitives.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes
 * @returns JSX element representing the label
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        `flex items-center gap-2 text-sm leading-none font-medium select-none
        group-data-[disabled=true]:pointer-events-none
        group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed
        peer-disabled:opacity-50`,
        className,
      )}
      {...props}
    />
  );
}

export { Label };
