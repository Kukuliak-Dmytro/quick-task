import { PageContainer } from "@/app/shared/components/page-container";

/**
 * Not Found page component.
 *
 * This page is displayed when a route is not found (404 error).
 * It provides a user-friendly error message and a way to navigate back to the home page.
 *
 * @returns JSX element representing the not found page
 */
export default function NotFound() {
  return (
    <PageContainer
      className="flex min-h-[60vh] flex-col items-center justify-center gap-2
        text-center">
      <div className="text-6xl font-bold text-foreground">404</div>
      <div className="text-2xl font-semibold text-foreground">Not Found</div>
    </PageContainer>
  );
}
