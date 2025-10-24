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
