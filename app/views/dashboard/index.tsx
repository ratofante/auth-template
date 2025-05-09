//Contexts
import { useAuth } from "@/context/AuthContext";

//Components
import { Button } from "@/components/ui/button";

export function DashboardView() {
  const { user, logout } = useAuth();
  console.log(user);
  return <h1 className="text-2xl font-bold text-primary">Dashboard</h1>;
}
