import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("No code", { status: 400 });
  }

  const supabase = createRouteHandlerClient({ cookies });

  await supabase.auth.exchangeCodeForSession(code);

  return NextResponse.redirect(`${url.origin}/dashboard`);
}
