import TitleSection from "./components/titleSection";

export default function HomePage() {
  return (
    <section>
      <div className="mt-10 gap-4 overflow-hidden px-4 sm:flex sm:flex-col sm:px-6 md:items-center md:justify-center">
        <TitleSection
          pill="✨ Your Workspace, Perfected"
          title="All-In-One Collaboration and Productivity Platform"
        />
      </div>
    </section>
  );
}
