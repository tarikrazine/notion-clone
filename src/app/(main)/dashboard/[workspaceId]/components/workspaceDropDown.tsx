"use client";

import { useEffect, useState } from "react";

import { useAppState } from "@/lib/providers/state-provider";

import { Workspace } from "@/types/supabase";
import SelectedWorkspace from "./selectedWorkspace";

interface WorkspaceDropDownProps {
  privateWorkspaces: Workspace[] | [];
  collaboratingWorkspaces: Workspace[] | [];
  sharedWorkspaces: Workspace[] | [];
  defaultValue: Workspace | undefined;
}

function WorkspaceDropDown(props: WorkspaceDropDownProps) {
  const [selectedOption, setSelectedOption] = useState(props.defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const { dispatch, state } = useAppState();

  useEffect(() => {
    if (!state.workspaces.length) {
      dispatch({
        type: "SET_WORKSPACES",
        payload: {
          workspaces: [
            ...props.privateWorkspaces,
            ...props.collaboratingWorkspaces,
            ...props.sharedWorkspaces,
          ].map((workspace) => ({
            ...workspace,
            folders: [],
          })),
        },
      });
    }

    return () => {};
  }, [
    dispatch,
    props.collaboratingWorkspaces,
    props.privateWorkspaces,
    props.sharedWorkspaces,
    state.workspaces.length,
  ]);

  function handleSelect(option: Workspace) {
    setSelectedOption(option);
    setIsOpen(false);
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <span onClick={() => setIsOpen(!isOpen)}>
          {selectedOption ? (
            <SelectedWorkspace workspace={selectedOption} />
          ) : (
            "Select Workspace"
          )}
        </span>
      </div>
    </div>
  );
}

export default WorkspaceDropDown;
