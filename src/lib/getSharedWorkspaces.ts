import db from "@/db";
import { collaborators } from "@/db/schema/collaborators";
import { workspaces } from "@/db/schema/workspaces";
import { eq } from "drizzle-orm";

export async function getSharedWorkspaces(userId: string) {
  if (!userId) {
    return {
      error: "No user id provided",
      data: [],
    };
  }

  try {
    const sharedWorkspaces = await db.selectDistinct({
      id: workspaces.id,
      createdAt: workspaces.createdAt,
      workspaceOwner: workspaces.workspaceOwner,
      title: workspaces.title,
      iconId: workspaces.iconId,
      data: workspaces.data,
      inTrash: workspaces.inTrash,
      logo: workspaces.logo,
    }).from(workspaces).orderBy(workspaces.createdAt).innerJoin(
      collaborators,
      eq(workspaces.id, collaborators.workspaceId),
    ).where(eq(workspaces.workspaceOwner, userId));

    if (!sharedWorkspaces) {
      return {
        error: "No shared workspaces found",
        data: [],
      };
    }

    return {
      error: null,
      data: sharedWorkspaces,
    };
  } catch (error: any) {
    console.log("[GET_SHARED_WORKSPACES_ERROR]", error);
    return {
      error: error.message,
      data: [],
    };
  }
}
