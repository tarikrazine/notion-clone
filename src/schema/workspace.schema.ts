import * as z from "zod";

export const WorkspaceSchema = z.object({
  workspaceName: z.string().min(1, { message: "Workspace name is required" }),
  workspaceLogo: z.any(),
});

export type WorkspaceSchemaType = z.output<typeof WorkspaceSchema>;
