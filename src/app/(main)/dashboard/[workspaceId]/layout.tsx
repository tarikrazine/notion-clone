import SideBar from "./components/sideBar";

export default async function WorkspaceIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) {
  return (
    <main className="flex h-full w-full overflow-hidden">
      <div className="hidden w-[250px] shrink-0 overflow-hidden sm:flex">
        <SideBar workspaceId={params.workspaceId} className="" />
      </div>
      <div className="relative h-full w-full overflow-hidden border-l dark:border-neutral-700/70">
        {children}
      </div>
    </main>
  );
}
