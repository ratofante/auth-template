//Lib
import { getEmailProvider } from "@/lib/utils";

// Components
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import {
  TypographyH3,
  TypographyP,
  TypographySmall,
} from "@/components/typography";

// Icons
import { MailQuestion } from "lucide-react";

export function EmailValidationView() {
  const { user, resendEmail } = useAuth();

  const onResend = async () => {
    if (!user?.email) return;
    try {
      await resendEmail("signup", user?.email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center">
            <MailQuestion size={24} />
            <TypographyH3 text="Confirm your email" />
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 text-center">
          <TypographyP
            text={`We've sent a confirmation link to ${
              user?.email ?? "your email"
            }. Please verify your email to access your account.`}
          />
          <Button
            className="w-full mt-4"
            onClick={() =>
              (window.location.href = getEmailProvider(user?.email ?? ""))
            }
          >
            Open email
          </Button>
          <div className="flex items-center justify-center gap-2">
            <TypographySmall text="Didn't receive the email?" />
            <Button
              variant="link"
              className="p-0 inline"
              onClick={() => onResend()}
            >
              Click to resend
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="p-0 h-fit m-auto">
            <Link to="auth/login"> Back to login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
