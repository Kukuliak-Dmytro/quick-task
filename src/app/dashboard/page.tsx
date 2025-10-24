import { requireAuth } from "@/shared/utils/auth-utils";

export default async function DashboardPage() {
  const session = await requireAuth();

  return (
    <div>
      <h1>Protected Dashboard</h1>
      <p>Welcome, {session.user.name}!</p>
    </div>
  );
}
