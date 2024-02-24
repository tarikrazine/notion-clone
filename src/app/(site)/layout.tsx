import Header from "./components/header";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="h-full">{children}</main>;
    </>
  );
}
