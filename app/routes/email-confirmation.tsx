import type { Route } from "./+types/email-confirmation";
import { EmailConfirmationView } from "@views/email-confirmation";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Email Confirmation" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function EmailConfirmation() {
  return <EmailConfirmationView />;
}
