"use client";

import { Button } from "@/components/ui/button";
import { type Database } from "@/lib/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Login() {
  // Obtain session from context provider
  const router = useRouter();

  // Obtain supabase client from context provider and pass to imported Auth UI
  const supabaseClient = createClientComponentClient<Database>();

  const handleEmailLogin = async () => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: "abcde@gmail.com",
      password: "12345",
    });

    if (error) {
      console.log({ error });
    }

    router.refresh();
  };

  return (
    <Button
      onClick={() => {
        void handleEmailLogin();
      }}
    >
      Log In
    </Button>
  );
}
