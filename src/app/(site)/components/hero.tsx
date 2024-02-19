import Image from "next/image";

import { Button } from "@/components/ui/button";
import TitleSection from "./titleSection";

import banner from "../../../../public/appBanner.png";

function Hero() {
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <TitleSection
        pill="✨ Your Workspace, Perfected"
        title="All-In-One Collaboration and Productivity Platform"
      />
      <div className="relative z-10 mt-[6px] rounded-xl bg-gradient-to-r from-primary to-secondary p-[2px] sm:w-[300px]">
        <Button
          variant={"btn-secondary"}
          className="w-full rounded-[10px] bg-background p-6 text-2xl"
        >
          Get Notion Free
        </Button>
      </div>
      <div className="relative ml-[-50px] mt-[-40px] flex w-[750px] items-center justify-center sm:ml-0 sm:w-full md:mt-[-90px]">
        <Image src={banner} alt="Application banner" />
        <div className="absolute inset-0 top-[50%] z-10 bg-gradient-to-t dark:from-background" />
      </div>
    </>
  );
}

export default Hero;
