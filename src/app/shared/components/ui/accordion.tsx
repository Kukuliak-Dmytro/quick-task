"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/app/shared/utils/utils";

/**
 * Accordion root component.
 *
 * This component provides the root container for accordion functionality
 * using Radix UI primitives with proper accessibility features.
 *
 * @param props - The component props
 * @returns JSX element representing the accordion root
 */
function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

/**
 * Accordion item component.
 *
 * This component provides individual accordion items with proper
 * styling and border management for visual separation.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes
 * @returns JSX element representing the accordion item
 */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

/**
 * Accordion trigger component.
 *
 * This component provides the clickable trigger element for accordion items
 * with proper styling, hover states, and chevron icon indication.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes
 * @param props.children - Content to display in the trigger
 * @returns JSX element representing the accordion trigger
 */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          `focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1
          items-start justify-between gap-4 rounded-md py-4 text-left text-sm
          font-medium transition-all outline-none hover:underline
          focus-visible:ring-[3px] disabled:pointer-events-none
          disabled:opacity-50 [&[data-state=open]>svg]:rotate-180`,
          className,
        )}
        {...props}>
        {children}
        <ChevronDownIcon
          className="text-muted-foreground pointer-events-none size-4 shrink-0
            translate-y-0.5 transition-transform duration-200"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/**
 * Accordion content component.
 *
 * This component provides the collapsible content container for accordion items
 * with proper animations and styling for expand/collapse states.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes
 * @param props.children - Content to display in the accordion content
 * @returns JSX element representing the accordion content
 */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up
        data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}>
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
