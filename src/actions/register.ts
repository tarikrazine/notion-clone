"use server";

import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { action } from "@/lib/safe-action";
import { RegisterSchema } from "@/schema/register.schema";

export const register = action(RegisterSchema, async ({ email, password }) => {
  const supabase = createServerActionClient({ cookies });

  const { data: existingUser } = await supabase.from("users").select("*").eq(
    "email",
    email,
  );

  if (existingUser?.length) {
    return {
      error: true,
      message: "User already exists.",
    };
  }

  const { data, error } = await supabase.auth.signUp({
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

  return {
    success: true,
    user: data.user,
  };
});
