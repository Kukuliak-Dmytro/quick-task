import * as React from "react";

import { cn } from "@/shared/utils/utils";

/**
 * Input component for form text inputs.
 *
 * This component provides a styled input element with proper focus states,
 * validation styling, and accessibility features for form inputs.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes
 * @param props.type - Input type (text, email, password, etc.)
 * @returns JSX element representing the input
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        `file:text-foreground placeholder:text-muted-foreground
        selection:bg-primary selection:text-primary-foreground dark:bg-input/30
        border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3
        py-1 text-base shadow-xs transition-[color,box-shadow] outline-none
        file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm
        file:font-medium disabled:pointer-events-none
        disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
        `focus-visible:border-ring focus-visible:ring-ring/50
        focus-visible:ring-[3px]`,
        `aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
        aria-invalid:border-destructive`,
        className,
      )}
      {...props}
    />
  );
}

export { Input };
