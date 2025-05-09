import type { Route } from "./+types/register";
import { RegisterView } from "@views/auth/register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register" },
    { name: "description", content: "Create a new account" },
  ];
}

export default function Register() {
  return <RegisterView />;
}
