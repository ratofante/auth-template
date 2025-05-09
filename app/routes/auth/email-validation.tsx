import type { Route } from "./+types/email-validation";
import { EmailValidationView } from "@views/auth/email-validation";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Email Confirmation" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function EmailValidation() {
  return <EmailValidationView />;
}
