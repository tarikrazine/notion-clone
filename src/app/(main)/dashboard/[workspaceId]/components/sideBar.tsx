interface SideBarProps {
  workspaceId: string;
}

function SideBar(props: SideBarProps) {
  console.log(props.workspaceId);
  return <div>sidebar</div>;
}

export default SideBar;
