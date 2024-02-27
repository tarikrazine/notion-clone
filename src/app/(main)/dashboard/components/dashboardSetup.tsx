"use client";

import { useState } from "react";

import EmojiPicker from "@/components/emojiPicker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Subscription } from "@/types/supabase";
import { AuthUser } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { WorkspaceSchemaType } from "@/schema/workspace.schema";

interface DashboardSetupProps {
  user: AuthUser;
  subscription: Subscription | null;
}

function DashboardSetup(props: DashboardSetupProps) {
  const [selectedEmoji, setSelectedEmoji] = useState("💼");

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
    // const workspaceUUID = v4();
    console.log(file);

    // if (file) {
    //   try {
    //     const { data, error } = await supabase.storage
    //       .from("workspace-logos")
    //       .upload(`workspaceLogo.${workspaceUUID}`, file, {
    //         cacheControl: "3600",
    //         upsert: true,
    //       });
    //     if (error) throw new Error("");
    //     filePath = data.path;
    //   } catch (error) {
    //     console.log("Error", error);
    //     // toast({
    //     //   variant: "destructive",
    //     //   title: "Error! Could not upload your workspace logo",
    //     // });
    //   }
    // }
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
                // disabled={isLoading || !props.subscription?.status}
                {...form.register("workspaceLogo")}
              />
              <small className="text-rose-600">
                {form.formState.errors.workspaceLogo?.message?.toString()}
              </small>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default DashboardSetup;
