import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cn } from "@/lib/utils";
import WorkspaceDropDown from "./workspaceDropDown";
import { getUserSubscriptionStatus } from "@/lib/getUserSubscriptionStatus";
import { getFolders } from "@/lib/getFolders";
import { getPrivateWorkspaces } from "@/lib/getPrivateWorkspace";
import { getCollaboratingWorkspaces } from "@/lib/getCollaboratingWorkspaces";
import { getSharedWorkspaces } from "@/lib/getSharedWorkspaces";

interface SideBarProps {
  className: string;
  workspaceId: string;
}

async function SideBar(props: SideBarProps) {
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
    props.workspaceId,
  );

  const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratingWorkspaces(user.id),
      getSharedWorkspaces(user.id),
    ]);

  return (
    <aside
      className={cn(
        props.className,
        "flex flex-col !justify-between gap-4 p-4",
      )}
    >
      <WorkspaceDropDown
        privateWorkspaces={privateWorkspaces.data}
        collaboratingWorkspaces={collaboratingWorkspaces.data}
        sharedWorkspaces={sharedWorkspaces.data}
        defaultValue={[
          ...privateWorkspaces.data,
          ...collaboratingWorkspaces.data,
          ...sharedWorkspaces.data,
        ].find((workspace) => workspace.id === props.workspaceId)}
      />
    </aside>
  );
}

export default SideBar;
