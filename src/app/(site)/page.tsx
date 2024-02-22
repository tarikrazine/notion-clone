import Hero from "./components/hero";
import ClientSection from "./components/clients";
import Features from "./components/features";
import TitleSection from "./components/titleSection";
import { cn } from "@/lib/utils";
import { PRICING_CARDS, PRICING_PLANS, USERS } from "@/lib/constants";
import CustomCard from "./components/customCard";
import Testimonials from "./components/testimonials";
import { CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Diamond from "../../../public/icons/diamond.svg";
import CheckIcon from "../../../public/icons/check.svg";
import { Button } from "@/components/ui/button";

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
        <Testimonials />
      </section>
      <section className="mt-20 px-4 sm:px-6">
        <TitleSection
          title="The Perfect Plan For You"
          subHeading="Experience all the benefits of our platform. Select a plan that suits your needs and take your productivity to new heights"
          pill="Pricing"
        />
        <div className="mt-10 flex flex-col-reverse items-center justify-center gap-4 sm:flex-row sm:items-stretch">
          {PRICING_CARDS.map((card) => (
            <CustomCard
              key={card.planType}
              className={cn(
                "relative w-[300px] rounded-2xl border-8 border-opacity-10 backdrop-blur-3xl  dark:bg-black/45",
                {
                  "border-purple-600/70":
                    card.planType === PRICING_PLANS.proplan,
                },
              )}
              card_header={
                <CardTitle className="text-2xl font-semibold">
                  {card.planType === PRICING_PLANS.proplan ? (
                    <>
                      <div className="absolute top-0 -z-10 hidden h-32 w-full rounded-full bg-purple-600/80 blur-[120px] dark:block" />
                      <Image
                        className="absolute right-6 top-6"
                        src={Diamond}
                        alt="Pro plan icon"
                      />
                    </>
                  ) : null}
                  {card.planType}
                </CardTitle>
              }
              card_content={
                <div>
                  <span className="text-2xl font-normal">${card.price}</span>
                  {+card.price > 0 ? (
                    <span className="ml-1 dark:text-purple-100">/mo</span>
                  ) : (
                    ""
                  )}
                  <p className="dark:text-purple-100">{card.description}</p>
                  <Button
                    variant="btn-primary"
                    className="mt-4 w-full whitespace-nowrap"
                  >
                    {card.planType === PRICING_PLANS.proplan
                      ? "Go Pro"
                      : "Get Started"}
                  </Button>
                </div>
              }
              card_footer={
                <ul className="mb-2 flex flex-col gap-4 font-normal">
                  <small>{card.highlightFeature}</small>
                  <small>
                    {card.freatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Image src={CheckIcon} alt="Check Icon" /> {feature}
                      </li>
                    ))}
                  </small>
                </ul>
              }
            ></CustomCard>
          ))}
        </div>
      </section>
    </>
  );
}
