import { and, eq } from "drizzle-orm";

import db from "@/db";
import { collaborators } from "@/db/schema/collaborators";
import { workspaces } from "@/db/schema/workspaces";
import { users } from "@/db/schema/users";
import { Workspace } from "@/types/supabase";

export async function getCollaboratingWorkspaces(userId: string) {
  if (!userId) return { data: [], error: "No user id provided" };

  try {
    const collaboratingWorkspaces = await db.select(
      {
        id: workspaces.id,
        createdAt: workspaces.createdAt,
        workspaceOwner: workspaces.workspaceOwner,
        title: workspaces.title,
        iconId: workspaces.iconId,
        data: workspaces.data,
        inTrash: workspaces.inTrash,
        logo: workspaces.logo,
      },
    ).from(users).innerJoin(
      collaborators,
      eq(users.id, collaborators.userId),
    ).innerJoin(
      workspaces,
      and(eq(collaborators.workspaceId, workspaces.workspaceOwner)),
    ).where(
      eq(users.id, userId),
    ) as Workspace[];

    if (!collaboratingWorkspaces) {
      return {
        error: "No collaborating workspaces found",
        data: [],
      };
    }

    return {
      error: null,
      data: collaboratingWorkspaces,
    };
  } catch (error: any) {
    console.log("[GET_COLLABORATING_WORKSPACES_ERROR]", error);
    return {
      error: error.message,
      data: [],
    };
  }
}
