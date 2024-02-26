import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  const { data: { session } } = await supabase.auth.getSession();

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const emailLinkError = "Email link is invalid or has expired";
  if (
    request.nextUrl.searchParams.get("/error_description") === emailLinkError &&
    request.nextUrl.pathname !== "/signup"
  ) {
    return NextResponse.redirect(
      new URL(
        `/signup?error_description=${
          request.nextUrl.searchParams.get(
            "error_description",
          )
        }`,
        request.url,
      ),
    );
  }

  if (["/login", "/signup"].includes(request.nextUrl.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}
