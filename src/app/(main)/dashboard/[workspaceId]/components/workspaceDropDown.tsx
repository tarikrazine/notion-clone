"use client";

import { useEffect, useState } from "react";

import { useAppState } from "@/lib/providers/state-provider";

import { Workspace } from "@/types/supabase";
import SelectedWorkspace from "./selectedWorkspace";
import CustomDialogTrigger from "@/components/CustomDialogTrigger";
import WorkspaceCreator from "./workspaceCreator";

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
      {isOpen ? (
        <div className="group absolute z-50 h-[190px] w-full origin-top-right overflow-scroll rounded-md border-[1px] border-muted bg-black/10 shadow-md backdrop-blur-lg">
          <div className="flex flex-col rounded-md">
            <div className="!p-2">
              {!!props.privateWorkspaces.length ? (
                <>
                  <p className="text-muted-foreground">Private</p>
                  <hr />
                  {props.privateWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={handleSelect}
                    />
                  ))}
                </>
              ) : null}
              {!!props.sharedWorkspaces.length ? (
                <>
                  <p className="text-muted-foreground">Private</p>
                  <hr />
                  {props.privateWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={handleSelect}
                    />
                  ))}
                </>
              ) : null}
              {!!props.collaboratingWorkspaces.length ? (
                <>
                  <p className="text-muted-foreground">Private</p>
                  <hr />
                  {props.privateWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={handleSelect}
                    />
                  ))}
                </>
              ) : null}
            </div>
            <CustomDialogTrigger
              header="Create Workspace"
              content={<WorkspaceCreator></WorkspaceCreator>}
              description="Workspaces give you the power to collaborate with others. You can change your workspace privacy settings after creating the workspace too."
            >
              <></>
            </CustomDialogTrigger>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default WorkspaceDropDown;
