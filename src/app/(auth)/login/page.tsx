import { LoginForm } from "@/modules/auth/elements/login-form.component";
const LoginPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <LoginForm />
    </div>
  );
};
export default LoginPage;
