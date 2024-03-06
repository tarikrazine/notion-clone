"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Workspace } from "@/types/supabase";

interface SelectedWorkspaceProps {
  workspace: Workspace;
  onClick?: () => void;
}

function SelectedWorkspace(props: SelectedWorkspaceProps) {
  const [workspaceLogo, setWorkspaceLogo] = useState("/cypresslogo.svg");

  const supabase = createClientComponentClient();

  useEffect(() => {
    if (props.workspace.logo) {
      const path = supabase.storage
        .from("workspace-logos")
        .getPublicUrl(props.workspace.logo)?.data.publicUrl;

      setWorkspaceLogo(path);
    }

    return () => {};
  }, [props.workspace, supabase]);

  return (
    <Link
      href={`/dashboard/${props.workspace.id}`}
      onClick={() => {
        if (props.onClick) props.onClick();
      }}
      className="my-2 flex cursor-pointer flex-row items-center justify-center gap-4 rounded-md p-2 transition-all hover:bg-muted"
    >
      <Image
        src={workspaceLogo}
        alt={props.workspace.title}
        width={26}
        height={26}
        objectFit="cover"
      />
      <div className="flex flex-col">
        <p className="w-[170px] overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">
          {props.workspace.title}
        </p>
      </div>
    </Link>
  );
}

export default SelectedWorkspace;
