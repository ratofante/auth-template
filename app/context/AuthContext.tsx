import type { User } from "@supabase/supabase-js";
import type { Profile, ResendType } from "@/types";
import { supabase } from "@/lib/supabase";
import {
  useContext,
  createContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signUp: (
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ) => Promise<User | undefined>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setProfile: (profile: Profile) => void;
  resendEmail: (type: ResendType, email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getInitialSession = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setIsAuthenticated(session ? true : false);

      if (session) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) throw error;
        setProfile(profile);
      }
    } catch (error) {
      console.error("Error fetching session", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name,
            last_name,
          },
          emailRedirectTo: `${window.location.origin}/email-confirmation`,
        },
      });
      if (error) throw error;

      const user = data.user;
      if (!user) throw new Error("User not returned");

      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      console.log("data", data);
      const user = data.user;
      if (!user) throw error;
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resendEmail = async (type: ResendType, email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resend({
        type,
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/email-confirmation`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error resending email:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInitialSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setIsAuthenticated(session ? true : false);
      console.log("Session changed " + _event, session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isAuthenticated,
        signUp,
        login,
        logout,
        setProfile,
        resendEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
