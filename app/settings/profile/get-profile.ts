import { toast } from "@/components/ui/use-toast";
import { type Database } from "@/lib/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// ! Note for Ashley: This component is deprecated with this commit, so delete it once you've read the note below.

// https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
// https://supabase.com/docs/guides/auth/managing-user-data
// getSession().session.user
export async function getProfile() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  // * Note for Ashley: You cannot toast inside a server component, I think. Toasts fall under "reactive" content with a hook that can only be used in client components. A typical naming convention for hooks (which can only be in client components) is use____, so you can tell because you're importing toast from use-toast.
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
