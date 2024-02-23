"use server";

import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { action } from "@/lib/safe-action";
import { LoginSchema } from "@/schema/login.schema";

export const login = action(LoginSchema, async ({ email, password }) => {
  const supabase = createServerActionClient({ cookies });

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("[LOGIN_ERROR]", error);
    return {
      error: true,
      message: "Invalid login credentials",
    };
  }

  return {
    success: true,
    user: data.user,
  };
});
