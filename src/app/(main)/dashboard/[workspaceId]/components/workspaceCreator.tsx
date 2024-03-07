"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { User } from "@/types/supabase";
import { Lock, Share } from "lucide-react";

import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function WorkspaceCreator() {
  const router = useRouter();

  const { user } = useSupabaseUser();
  const [permissions, setPermissions] = useState("private");
  const [title, setTitle] = useState("");
  const [collaborators, setCollaborators] = useState<User[]>([]);

  function addCollaborator(user: User) {
    setCollaborators([...collaborators, user]);
  }

  function removeCollaborator(user: User) {
    setCollaborators(
      collaborators.filter((collaborator) => collaborator.id !== user.id),
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name" className="text-sm text-muted-foreground">
          Name
        </Label>
        <div className="flex items-center justify-center gap-2">
          <Input
            name="name"
            value={title}
            placeholder="Workspace Name"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
      </div>
      <>
        <Label
          htmlFor="permissions"
          className="text-sm
          text-muted-foreground"
        >
          Permission
        </Label>
        <Select
          onValueChange={(val) => {
            setPermissions(val);
          }}
          defaultValue={permissions}
        >
          <SelectTrigger className="h-26 -mt-3 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="private">
                <div
                  className="flex
                  items-center
                  justify-center
                  gap-4
                  p-2
                "
                >
                  <Lock />
                  <article className="flex flex-col text-left">
                    <span>Private</span>
                    <p>
                      Your workspace is private to you. You can choose to share
                      it later.
                    </p>
                  </article>
                </div>
              </SelectItem>
              <SelectItem value="shared">
                <div className="flex items-center justify-center gap-4 p-2">
                  <Share />
                  <article className="flex flex-col text-left">
                    <span>Shared</span>
                    <span>You can invite collaborators.</span>
                  </article>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </>

      <Button type="button" variant={"secondary"}>
        Create
      </Button>
    </div>
  );
}

export default WorkspaceCreator;
