import { PageContainer } from "@/app/shared/components/page-container";

//component
/**
 * NotFound component.
 */
export const NotFound = () => {
  //return
  return (
    <PageContainer
      className="flex min-h-[60vh] flex-col items-center justify-center gap-2
        text-center">
      <div className="text-6xl font-bold text-foreground">404</div>
      <div className="text-2xl font-semibold text-foreground">Not Found</div>
    </PageContainer>
  );
};

export default NotFound;
