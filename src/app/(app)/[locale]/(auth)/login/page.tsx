import { LoginModule } from "@/app/modules/auth";

import { PageContainer } from "@/app/shared/components/page-container";

/**
 * Login page component.
 *
 * This page provides the user interface for user authentication, including
 * the login module and page title. It's designed to be simple and focused
 * on the authentication process.
 *
 * @returns JSX element representing the login page
 */
const LoginPage = () => {
  return (
    <PageContainer>
      <div className="mx-auto max-w-md space-y-6">
        <LoginModule />
      </div>
    </PageContainer>
  );
};

export default LoginPage;
