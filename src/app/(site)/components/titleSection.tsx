interface TitleSectionProps {
  title: string;
  subHeading?: string;
  pill: string;
}

function TitleSection(props: TitleSectionProps) {
  return (
    <section className="flex flex-col items-start justify-center gap-4 md:items-center">
      <article className="rounded-full p-[1px] text-sm dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600">
        <div className="rounded-full px-3 py-1 dark:bg-black">{props.pill}</div>
      </article>
      {props.subHeading ? (
        <>
          <h2 className="text-left text-3xl font-semibold dark:text-purple-200 sm:max-w-[750px] sm:text-5xl md:text-center">
            {props.title}
          </h2>
          <p className="dark:text-purple-100 sm:max-w-[450px] md:text-center">
            {props.subHeading}
          </p>
        </>
      ) : (
        <h1 className="text-left text-4xl font-semibold dark:text-purple-200 sm:max-w-[850px] sm:text-6xl md:text-center">
          {props.title}
        </h1>
      )}
    </section>
  );
}

export default TitleSection;
