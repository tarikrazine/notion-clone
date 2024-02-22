import { randomUUID } from "crypto";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CustomCard from "./customCard";
import { CardDescription, CardTitle } from "@/components/ui/card";
import TitleSection from "./titleSection";

import { USERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function Testimonials() {
  return (
    <>
      <div className="absolute top-56 -z-10 h-32 w-full rounded-full bg-purple-600/50 blur-[120px] " />
      <div className="mt-20 flex flex-col overflow-visible overflow-x-hidden px-4 sm:px-6 ">
        <TitleSection
          title="Trusted by all"
          subHeading="Join thousands of satisfied users who rely on our platform for their personal and professional productivity needs"
          pill="Testimonials"
        />
        {[...Array(2)].map((arr, index) => (
          <div
            key={randomUUID()}
            className={cn(
              "mt-10 flex flex-nowrap gap-6 self-start",
              {
                "flex-row-reverse": index === 1,
                "animate-[slide_250s_linear_infinite]": true,
                "animate-[slide_250s_linear_infinite_reverse]": index === 1,
                "ml-[100vw]": index === 1,
              },
              "hover:paused",
            )}
          >
            {USERS.map((testimonial, index) => (
              <CustomCard
                key={testimonial.name}
                className="w-[500px] shrink-0 rounded-xl border-8 border-opacity-10 dark:bg-gradient-to-t dark:from-border dark:to-background"
                card_header={
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={`/avatars/${index + 1}.png`} />
                      <AvatarFallback>{testimonial.name}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-foreground">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className="dark:text-purple-100">
                        {testimonial.name.toLocaleLowerCase()}
                      </CardDescription>
                    </div>
                  </div>
                }
                card_content={
                  <p className="dark:text-purple-100">{testimonial.message}</p>
                }
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Testimonials;
