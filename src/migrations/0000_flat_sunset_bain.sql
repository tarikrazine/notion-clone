CREATE TABLE IF NOT EXISTS "workspaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"workspace_Owner" uuid NOT NULL,
	"icon_id" text NOT NULL,
	"data" text NOT NULL,
	"in_trash" boolean NOT NULL,
	"logo" text NOT NULL,
	"banner_url" text NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
