"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { v4 } from "uuid";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import EmojiPicker from "@/components/emojiPicker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Subscription, Workspace } from "@/types/supabase";
import { AuthUser } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { WorkspaceSchemaType } from "@/schema/workspace.schema";
import { createWorkspace } from "@/lib/createWorkspace";
import { useAppState } from "@/lib/providers/state-provider";
import { Button } from "@/components/ui/button";
import { FormDescription } from "@/components/ui/form";
import { Loader } from "lucide-react";

interface DashboardSetupProps {
  user: AuthUser;
  subscription: Subscription | null;
}

function DashboardSetup(props: DashboardSetupProps) {
  const [selectedEmoji, setSelectedEmoji] = useState("💼");
  const router = useRouter();

  const workspaceId = v4();

  const { dispatch } = useAppState();

  const supabase = createClientComponentClient();

  const form = useForm<WorkspaceSchemaType>({
    mode: "onChange",
    defaultValues: {
      workspaceName: "",
      workspaceLogo: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(value: WorkspaceSchemaType) {
    const file = value.workspaceLogo?.[0];
    let filePath = null;

    if (file) {
      try {
        const { data, error } = await supabase.storage
          .from("workspace-logos")
          .upload(`workspaceLogo.${workspaceId}-${file.name}`, file, {
            cacheControl: "3600",
            upsert: true,
          });
        if (error) throw new Error("");
        filePath = data.path;
      } catch (error) {
        console.log("Error", error);
        toast.error("Error! Could not upload your workspace logo");
      }

      try {
        const newWorkspace: Workspace = {
          data: "",
          iconId: selectedEmoji,
          id: workspaceId,
          inTrash: false,
          title: value.workspaceName,
          workspaceOwner: props.user.id,
          logo: filePath || "",
          bannerUrl: "",
          createdAt: new Date().toISOString(),
          updatedAt: null,
        };
        const { data, error: createError } =
          await createWorkspace(newWorkspace);
        if (createError) {
          throw new Error();
        }
        dispatch({
          type: "ADD_WORKSPACE",
          payload: { ...newWorkspace, folders: [] },
        });

        toast.success(`${newWorkspace.title} has been created successfully.`);

        router.replace(`/dashboard/${newWorkspace.id}`);
      } catch (error) {
        console.log(error, "Error");
        toast.error(
          "Oops! Something went wrong, and we couldn't create your workspace. Try again or come back later.",
        );
      } finally {
        form.reset();
      }
    }
  }

  return (
    <Card className="relative h-screen w-full shadow-md backdrop-blur-3xl dark:bg-black/25 sm:h-auto sm:w-[800px]">
      <div className="top-22 absolute -z-10 h-32 w-[30%] rounded-full bg-purple-600/60 blur-[120px] " />
      <CardHeader>
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription>
          Lets create a private workspace to get you started. You can add
          collaborators later from the workspace settings tab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">
                <EmojiPicker getValue={setSelectedEmoji}>
                  {selectedEmoji}
                </EmojiPicker>
              </div>
              <div className="w-full">
                <label
                  htmlFor="workspaceName"
                  className="text-sm text-muted-foreground"
                >
                  Name
                </label>
                <Input
                  id="workspaceName"
                  type="text"
                  placeholder="Workspace name"
                  disabled={isLoading}
                  {...form.register("workspaceName")}
                />
                <small className="text-rose-600">
                  {form.formState.errors.workspaceName?.message?.toString()}
                </small>
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="workspaceLogo"
                className="text-sm text-muted-foreground"
              >
                Logo
              </label>
              <Input
                id="workspaceLogo"
                type="file"
                accept="image/*"
                placeholder="Workspace logo"
                disabled={isLoading || props.subscription?.status !== "active"}
                {...form.register("workspaceLogo")}
              />
              {props.subscription?.status !== "active" ? (
                <small
                  className="
                  block
                  text-muted-foreground
              "
                >
                  To customize your workspace, you need to be on a Pro Plan
                </small>
              ) : null}
              <small className="text-rose-600">
                {form.formState.errors.workspaceLogo?.message?.toString()}
              </small>
            </div>
            <div className="self-end">
              <Button disabled={isLoading} type="submit">
                {!isLoading ? (
                  "Create Workspace"
                ) : (
                  <Loader className="h-5 w-5 animate-spin" />
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default DashboardSetup;
