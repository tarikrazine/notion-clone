export default function DashboardLayout(props: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen overflow-hidden">{props.children}</main>
  );
}
