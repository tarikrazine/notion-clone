import { randomUUID } from "crypto";

import Hero from "./components/hero";
import ClientSection from "./components/clients";
import Features from "./components/features";
import TitleSection from "./components/titleSection";
import { cn } from "@/lib/utils";
import { USERS } from "@/lib/constants";
import CustomCard from "./components/customCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardDescription, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <>
      <section className="relative gap-4 overflow-hidden px-4 pt-10 sm:flex sm:flex-col sm:px-6 md:items-center md:justify-center">
        <Hero />
      </section>
      <section className="relative">
        <ClientSection />
      </section>
      <section className="relative flex flex-col items-center justify-center px-4 sm:px-6">
        <Features />
      </section>
      <section className="relative">
        <div className="absolute top-56 -z-10 h-32 w-full rounded-full bg-purple-600/50 blur-[120px] " />
        <div className="mt-20 flex flex-col overflow-visible overflow-x-hidden px-4 sm:px-6">
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
                  className="w-[500px] shrink-0 rounded-xl dark:bg-gradient-to-t dark:from-border dark:to-background"
                  cardHeader={
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
                  cardContent={
                    <p className="dark:text-purple-100">
                      {testimonial.message}
                    </p>
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
