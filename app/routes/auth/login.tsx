import type { Route } from "./+types/login";
import { LoginView } from "@views/auth/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login to your account" },
  ];
}

export default function Login() {
  return <LoginView />;
}
