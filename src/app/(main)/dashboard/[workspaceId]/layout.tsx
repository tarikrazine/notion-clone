import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import SideBar from "./components/sideBar";
import { getUserSubscriptionStatus } from "@/lib/getUserSubscriptionStatus";
import { redirect } from "next/navigation";
import { getFolders } from "@/lib/getFolders";

export default async function WorkspaceIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get subscription
  const { data: subscription, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  // Get folders
  const { data: folders, error: foldersError } = await getFolders(
    params.workspaceId,
  );

  //   if (subscriptionError || foldersError) {
  //     redirect("/dashboard");
  //   }

  return (
    <main className="flex h-full w-full overflow-hidden">
      <div className="hidden w-[350px] overflow-hidden sm:flex">
        <SideBar workspaceId={params.workspaceId} />
      </div>
      <div className="relative h-full w-full overflow-hidden border-l dark:border-neutral-700/70">
        {children}
      </div>
    </main>
  );
}
