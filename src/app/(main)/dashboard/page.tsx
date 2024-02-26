import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { desc, eq } from "drizzle-orm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import db from "@/db";
import { workspaces } from "@/db/schema/workspaces";
import DashboardSetup from "./components/dashboardSetup";

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

  const [workspace] = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.workspaceOwner, user.id))
    .orderBy(desc(workspaces.createdAt))
    .limit(1);

  if (!workspace) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <DashboardSetup />
      </div>
    );
  }

  return redirect(`/workspace/${workspace.id}`);
}
