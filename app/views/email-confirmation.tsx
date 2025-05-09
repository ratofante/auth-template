// Context
import { useAuth } from "@/context/AuthContext";

//Lib
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { supabase } from "@/lib/supabase";
import classNames from "classnames";

// Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TypographyH3,
  TypographyMuted,
  TypographyP,
} from "@/components/typography";

// Icons
import { MailCheck } from "lucide-react";

export function EmailConfirmationView() {
  const { setProfile } = useAuth();
  const [created, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const { id, user_metadata } = session.user;

          try {
            const { data: existingProfile, error: fetchError } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", id)
              .single();

            console.log(existingProfile);

            if (!existingProfile) {
              const { data: newProfile, error: insertError } = await supabase
                .from("profiles")
                .insert({
                  id,
                  first_name: user_metadata.first_name,
                  last_name: user_metadata.last_name,
                })
                .select()
                .single();

              if (insertError) throw insertError;
              if (newProfile) setProfile(newProfile);
            }

            setCreated(true);
            if (existingProfile) setProfile(existingProfile);
          } catch (err: any) {
            console.error(err);
            setError("Something went wrong while creating your profile.");
          }
        }
      }
    );

    return () => subscription?.subscription.unsubscribe();
  }, []);

  // const createProfileIfNeeded = async () => {
  //   try {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();

  //     if (!session || !session.user) {
  //       setError("No active session found. Please log in again.");
  //       return;
  //     }

  //     const { id, user_metadata } = session.user;

  //     const { data: existingProfile, error } = await supabase
  //       .from("profiles")
  //       .select("id, first_name, last_name, email, avatar, created_at")
  //       .eq("id", id)
  //       .single();

  //     if (!existingProfile) {
  //       const { error: insertError } = await supabase.from("profiles").insert({
  //         id,
  //         first_name: user_metadata.first_name,
  //         last_name: user_metadata.last_name,
  //       });

  //       if (insertError) throw insertError;
  //     }
  //     setCreated(true);
  //     if (existingProfile) {
  //       setProfile(existingProfile);
  //     }
  //   } catch (err: any) {
  //     console.error(err);
  //     setError("Something went wrong while creating your profile.");
  //   }
  // };

  // useEffect(() => {
  //   createProfileIfNeeded();
  // }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center">
            <MailCheck size={24} />
            <TypographyH3 text="Email Confirmed!" />
          </CardTitle>
          <CardDescription className="text-center">
            {!created
              ? "You have successfully confirmed your email."
              : "Setting up your profile..."}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {error && <p className="text-destructive">{error}</p>}
          {created && (
            <TypographyP text="You're all set. You can now use the app." />
          )}
          {!created && !error && (
            <TypographyMuted text="Please wait while we finalize your setup..." />
          )}
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full" disabled={!created}>
            <Link
              to="/dashboard"
              className={classNames({
                "pointer-events-none opacity-50": !created,
              })}
            >
              Go to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
