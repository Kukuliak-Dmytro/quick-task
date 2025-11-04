import type { Metadata } from "next";
import { RegisterForm } from "@/app/modules/auth/elements/register-form.component";

/** Register page metadata configuration */
export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

/**
 * Register page component.
 *
 * This page provides the user interface for user registration, including
 * the registration form and page title. It's designed to be simple and focused
 * on the account creation process.
 *
 * @returns JSX element representing the register page
 */
const RegisterPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">Register</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
