import type { Metadata } from "next";
import { LoginForm } from "@/app/modules/auth/elements/login-form.component";

/** Login page metadata configuration */
export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account",
};

/**
 * Login page component.
 *
 * This page provides the user interface for user authentication, including
 * the login form and page title. It's designed to be simple and focused
 * on the authentication process.
 *
 * @returns JSX element representing the login page
 */
const LoginPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
