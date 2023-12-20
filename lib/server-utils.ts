import "server-only";
// Add util functions that should only be run in server components. Importing these in client components will throw an error.
// For more info on how to avoid poisoning your server/client components: https://www.youtube.com/watch?v=BZlwtR9pDp4
import { env } from "@/env.mjs";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";
import { type Database } from "./schema";

/* Modified createServerComponentClient variant that correctly handles passing of cookies from next/headers to
avoid a bug with Next.js static page rendering.
Read more here: https://github.com/vercel/next.js/issues/49373
This issue may be fixed in newer versions of Next.js and/or @supabase/auth-helpers-nextjs, so you may not need this function
in the future and can just call createServerComponentClient like usual. */
export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });
  return supabase;
});
