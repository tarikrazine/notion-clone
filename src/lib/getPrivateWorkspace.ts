import { and, eq, notExists } from "drizzle-orm";

import db from "@/db";
import { workspaces } from "@/db/schema/workspaces";
import { collaborators } from "@/migrations/schema";
import { Workspace } from "@/types/supabase";

export async function getPrivateWorkspaces(
  userId: string,
) {
  if (userId) return { error: "No user found", data: [] };

  try {
    const privateWorkspace = await db.select({
      id: workspaces.id,
      createdAt: workspaces.createdAt,
      workspaceOwner: workspaces.workspaceOwner,
      title: workspaces.title,
      iconId: workspaces.iconId,
      data: workspaces.data,
      inTrash: workspaces.inTrash,
      logo: workspaces.logo,
    }).from(workspaces).where(
      and(
        notExists(
          db.select().from(collaborators)
            .where(eq(collaborators.workspaceId, workspaces.id)),
        ),
        eq(workspaces.workspaceOwner, userId),
      ),
    ) as Workspace[];

    if (!privateWorkspace) throw new Error("No private workspace found");

    return {
      error: null,
      data: privateWorkspace,
    };
  } catch (error: any) {
    console.log(["GET_PRIVATE_WORKSPACE_ERROR"], error);
    return {
      error: error.message,
      data: [],
    };
  }
}
