import Image from "next/image";

import TitleSection from "./titleSection";

import cal from "../../../../public/cal.png";

function Features() {
  return (
    <>
      <div className="top-22 absolute -z-10 h-32 w-[30%] rounded-full bg-purple-600/50 blur-[120px] " />
      <TitleSection
        title="Keep track of your meetings all in one place"
        subHeading="Capture your ideas, thoughts, and meeting notes in a structured and organized manner"
        pill="Features"
      />
      <div className="relative mt-10 flex max-w-[450px] items-center justify-center rounded-2xl border-8 border-purple-300 border-opacity-10 sm:ml-0">
        <Image src={cal} alt="Banner" className="rounded-2xl" />
      </div>
    </>
  );
}

export default Features;
