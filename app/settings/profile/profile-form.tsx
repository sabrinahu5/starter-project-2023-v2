"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { type Database } from "@/lib/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type BaseSyntheticEvent } from "react";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z.string().email().optional(), // Is there better way to handle read-only?
  bio: z
    .string()
    .max(160, {
      message: "Biography cannot be longer than 160 characters.",
    })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function ProfileForm({ profile }: { profile: Profile }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: profile.display_name ?? undefined,
      bio: profile.biography ?? undefined, // Reassigns a potential `null` value from the Supabase schema to the expected `undefined` for react-hook-form
    },
    mode: "onChange",
  });

  const supabase = createClientComponentClient<Database>();

  const onSubmit = async (data: ProfileFormValues) => {
    await supabase
      .from("profiles")
      .update({ biography: data.bio, display_name: data.username, email: data.email })
      .eq("id", profile.id);
    toast({
      title: "Profile updated successfully!",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={(e: BaseSyntheticEvent) => void form.handleSubmit(onSubmit)(e)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input readOnly placeholder={profile.email} />
          </FormControl>
          <FormDescription>This is your verified email address.</FormDescription>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
