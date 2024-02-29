"use server";

import { asc, eq } from "drizzle-orm";
import { validate } from "uuid";

import db from "@/db";
import { folders as foldersSchema } from "@/db/schema/folders";

export async function getFolders(workspaceId: string) {
  const isValid = validate(workspaceId);

  if (!isValid) {
    return {
      data: null,
      error: "Invalid workspaceId",
    };
  }

  try {
    const folders = await db.select().from(foldersSchema).where(
      eq(foldersSchema.workspaceId, workspaceId),
    ).orderBy(asc(foldersSchema.createdAt));

    if (!folders) throw new Error("No folders found for this workspace");

    return {
      data: folders,
      error: null,
    };
  } catch (error: any) {
    console.log("[GET_WORKSPACE_FOLDERS_ERROR]", error.message);
    return {
      data: null,
      error: error?.message,
    };
  }
}
