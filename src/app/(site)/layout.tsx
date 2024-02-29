import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import Header from "./components/header";

export default async function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <Header user={user} />
      <main className="h-full">{children}</main>;
    </>
  );
}
