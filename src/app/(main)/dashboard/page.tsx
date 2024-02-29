import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { asc, eq } from "drizzle-orm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import db from "@/db";
import { workspaces } from "@/db/schema/workspaces";
import DashboardSetup from "./components/dashboardSetup";
import { getUserSubscriptionStatus } from "@/lib/getUserSubscriptionStatus";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div>
        <p>Access Denied</p>
        <a href="/">Go back</a>
      </div>
    );
  }

  const { data: subscription, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  const [workspace] = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.workspaceOwner, user.id))
    .orderBy(asc(workspaces.createdAt))
    .limit(1);

  if (!workspace) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <DashboardSetup user={user} subscription={subscription} />
      </div>
    );
  }

  return redirect(`/dashboard/${workspace.id}`);
}
