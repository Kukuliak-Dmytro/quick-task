import type { Metadata } from "next";
import { LoginModule } from "@/app/modules/auth";

import { PageContainer } from "@/app/shared/components/page-container";

/** Login page metadata configuration */
export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account",
};

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
      <div className="space-y-6">
        <LoginModule />
      </div>
    </PageContainer>
  );
};

export default LoginPage;
