"use server";

import db from "@/db";
import { workspaces } from "@/db/schema/workspaces";
import { Workspace } from "@/types/supabase";

export const createWorkspace = async (workspace: Workspace) => {
  try {
    const [response] = await db.insert(workspaces).values(workspace)
      .returning();
    return { data: response, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};
