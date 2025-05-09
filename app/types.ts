export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  created_at: string;
}

export type ResendType = "signup" | "email_change";
