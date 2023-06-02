"use client";

import { type Database } from "@/lib/schema";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  // Obtain session from context provider
  const router = useRouter();
  const { session } = useSessionContext();

  // Refresh route on session status (login) change
  useEffect(() => {
    if (session) {
      router.refresh();
    }
  }, [session, router]);

  const { theme } = useTheme();

  // Obtain supabase client from context provider and pass to imported Auth UI
  const supabaseClient = useSupabaseClient<Database>();

  return (
    <Auth
      supabaseClient={supabaseClient}
      appearance={{
        theme: ThemeSupa,
      }}
      providers={[]}
      socialLayout="horizontal"
      theme={theme === "light" ? "default" : "dark"}
    />
  );
}
