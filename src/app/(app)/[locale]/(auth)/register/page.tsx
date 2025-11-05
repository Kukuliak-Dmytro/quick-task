import { RegisterModule } from "@/app/modules/auth";

import { PageContainer } from "@/app/shared/components/page-container";

/**
 * Register page component.
 *
 * This page provides the user interface for user registration, including
 * the registration module and page title. It's designed to be simple and focused
 * on the account creation process.
 *
 * @returns JSX element representing the register page
 */
const RegisterPage = () => {
  return (
    <PageContainer>
      <div className="mx-auto max-w-md space-y-6">
        <RegisterModule />
      </div>
    </PageContainer>
  );
};

export default RegisterPage;
