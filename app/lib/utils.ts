import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEmailProvider(email: string): string {
  const domain = email.split("@")[1]?.toLowerCase();

  if (!domain) return "https://mail.google.com";
  if (domain.includes("gmail")) return "https://mail.google.com";
  if (domain.includes("outlook") || domain.includes("hotmail"))
    return "https://outlook.live.com";
  if (domain.includes("yahoo")) return "https://mail.yahoo.com";
  if (domain.includes("icloud")) return "https://www.icloud.com/mail";

  return "https://mail.google.com";
}
