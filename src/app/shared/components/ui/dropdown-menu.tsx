"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "@/app/shared/utils/utils";

/**
 * DropdownMenu root component.
 *
 * This component provides the root container for dropdown menu functionality
 * using Radix UI primitives with proper accessibility features.
 *
 * @param props - The component props
 * @returns JSX element representing the dropdown menu root
 */
function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

/**
 * DropdownMenu portal component.
 *
 * This component provides a portal for rendering dropdown menu content
 * outside the normal DOM hierarchy for proper z-index management.
 *
 * @param props - The component props
 * @returns JSX element representing the dropdown menu portal
 */
function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

/**
 * DropdownMenu trigger component.
 *
 * This component provides the trigger element that opens the dropdown menu
 * when clicked or activated through keyboard navigation.
 *
 * @param props - The component props
 * @returns JSX element representing the dropdown menu trigger
 */
function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

/**
 * DropdownMenu content component.
 *
 * This component provides the main content container for the dropdown menu
 * with proper positioning, animations, and styling.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes
 * @param props.sideOffset - Offset from the trigger element
 * @returns JSX element representing the dropdown menu content
 */
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          `bg-popover text-popover-foreground data-[state=open]:animate-in
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0
          data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
          data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2
          data-[side=left]:slide-in-from-right-2
          data-[side=right]:slide-in-from-left-2
          data-[side=top]:slide-in-from-bottom-2 z-50
          max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem]
          origin-(--radix-dropdown-menu-content-transform-origin)
          overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md`,
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

/**
 * DropdownMenu group component.
 *
 * This component provides grouping functionality for related dropdown menu items
 * with proper spacing and visual separation.
 *
 * @param props - The component props
 * @returns JSX element representing the dropdown menu group
 */
function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

/**
 * DropdownMenu item component.
 *
 * This component provides individual menu items with proper styling,
 * hover states, and support for different variants including destructive actions.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes
 * @param props.inset - Whether to add inset padding
 * @param props.variant - Item variant (default or destructive)
 * @returns JSX element representing the dropdown menu item
 */
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        `focus:bg-accent focus:text-accent-foreground
        data-[variant=destructive]:text-destructive
        data-[variant=destructive]:focus:bg-destructive/10
        dark:data-[variant=destructive]:focus:bg-destructive/20
        data-[variant=destructive]:focus:text-destructive
        data-[variant=destructive]:*:[svg]:!text-destructive
        [&_svg:not([class*='text-'])]:text-muted-foreground relative flex
        cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm
        outline-hidden select-none data-[disabled]:pointer-events-none
        data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none
        [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
        className,
      )}
      {...props}
    />
  );
}

/**
 * DropdownMenu checkbox item component.
 *
 * This component provides a checkbox item for dropdown menus with proper
 * styling, checked state management, and accessibility features.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes
 * @param props.children - Content to display in the checkbox item
 * @param props.checked - Whether the checkbox is checked
 * @returns JSX element representing the dropdown menu checkbox item
 */
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        `focus:bg-accent focus:text-accent-foreground relative flex
        cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm
        outline-hidden select-none data-[disabled]:pointer-events-none
        data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-4`,
        className,
      )}
      checked={checked}
      {...props}>
      <span
        className="pointer-events-none absolute left-2 flex size-3.5
          items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

/**
 * DropdownMenu radio group component.
 *
 * This component provides grouping functionality for radio button items
 * in dropdown menus with proper state management.
 *
 * @param props - The component props
 * @returns JSX element representing the dropdown menu radio group
 */
function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

/**
 * DropdownMenu radio item component.
 *
 * This component provides a radio button item for dropdown menus with proper
 * styling, selection state management, and accessibility features.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes
 * @param props.children - Content to display in the radio item
 * @returns JSX element representing the dropdown menu radio item
 */
function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        `focus:bg-accent focus:text-accent-foreground relative flex
        cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm
        outline-hidden select-none data-[disabled]:pointer-events-none
        data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-4`,
        className,
      )}
      {...props}>
      <span
        className="pointer-events-none absolute left-2 flex size-3.5
          items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

/**
 * DropdownMenu label component.
 *
 * This component provides a label element for dropdown menu sections
 * with proper styling and optional inset padding.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes
 * @param props.inset - Whether to add inset padding
 * @returns JSX element representing the dropdown menu label
 */
function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

/**
 * DropdownMenu separator component.
 *
 * This component provides a visual separator between dropdown menu items
 * with proper styling and spacing.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes
 * @returns JSX element representing the dropdown menu separator
 */
function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

/**
 * DropdownMenu shortcut component.
 *
 * This component provides keyboard shortcut display for dropdown menu items
 * with proper styling and typography.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes
 * @returns JSX element representing the dropdown menu shortcut
 */
function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

/**
 * DropdownMenu submenu component.
 *
 * This component provides submenu functionality for nested dropdown menus
 * with proper state management and accessibility features.
 *
 * @param props - The component props
 * @returns JSX element representing the dropdown menu submenu
 */
function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

/**
 * DropdownMenu submenu trigger component.
 *
 * This component provides a trigger element for submenu functionality
 * with proper styling and chevron icon indication.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes
 * @param props.inset - Whether to add inset padding
 * @param props.children - Content to display in the submenu trigger
 * @returns JSX element representing the dropdown menu submenu trigger
 */
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        `focus:bg-accent focus:text-accent-foreground
        data-[state=open]:bg-accent data-[state=open]:text-accent-foreground
        [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default
        items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden
        select-none data-[inset]:pl-8 [&_svg]:pointer-events-none
        [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
        className,
      )}
      {...props}>
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

/**
 * DropdownMenu submenu content component.
 *
 * This component provides the content container for submenu functionality
 * with proper positioning, animations, and styling.
 *
 * @param props - The component props
 * @param props.className - Additional CSS classes
 * @returns JSX element representing the dropdown menu submenu content
 */
function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        `bg-popover text-popover-foreground data-[state=open]:animate-in
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
        data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2
        data-[side=left]:slide-in-from-right-2
        data-[side=right]:slide-in-from-left-2
        data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem]
        origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden
        rounded-md border p-1 shadow-lg`,
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
