"use server";

import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { action } from "@/lib/safe-action";
import { RegisterSchema } from "@/schema/register.schema";

export const register = action(RegisterSchema, async ({ email, password }) => {
  const supabase = createServerActionClient({ cookies });

  const { data: { user }, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}api/auth/callback`,
    },
  });

  if (error) {
    console.log("[REGISTER_ERROR]", error);
    return {
      error: true,
      message: "Something went wrong. Please try again.",
    };
  }

  const emailIsTaken = user?.identities?.length === 0;

  if (emailIsTaken) {
    return {
      error: true,
      message: "Already signed up, sign in instead?",
    };
  }

  if (user?.identities?.length) {
    return {
      success: true,
      message: "Please confirm your email.",
    };
  }
});
