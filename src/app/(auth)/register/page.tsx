import { RegisterForm } from "@/modules/auth/elements/register-form.component";
const RegisterPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">Register</h1>
      <RegisterForm />
    </div>
  );
};
export default RegisterPage;
