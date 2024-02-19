export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="h-full">{children}</main>;
}
