"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Database } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UserAuthForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // Obtain session from context provider
  const router = useRouter();

  // Obtain supabase client from context provider and pass to imported Auth UI
  const supabaseClient = createClientComponentClient<Database>();

  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(location.origin);
    const { data, error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    console.log(data);
    console.log(error);

    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={(event: React.SyntheticEvent) => void onSubmit(event)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
