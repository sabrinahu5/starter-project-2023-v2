import { toast } from "@/components/ui/use-toast";
import { type Database } from "@/lib/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
// https://supabase.com/docs/guides/auth/managing-user-data
// getSession().session.user
export async function getProfile() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  const { data, error } = await supabase.from("profiles").select("*").eq("id", session.user.id);
  if (error) {
    return toast({
      title: "Something went wrong.",
      description: error.message,
      variant: "destructive",
    });
  }
  // how to handle undefined?
  return data;
}
