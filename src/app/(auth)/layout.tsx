/**
 * Authentication layout component.
 *
 * This layout provides a centered, full-screen container for authentication
 * pages (login and register). It includes responsive design and theme support
 * for both light and dark modes.
 *
 * @param props - The component props
 * @param props.children - React children to render within the auth layout
 * @returns JSX element representing the authentication layout
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-zinc-50
        font-sans dark:bg-black">
      <div className="w-full max-w-2xl">{children}</div>
    </div>
  );
}
