import Hero from "./components/hero";
import ClientSection from "./components/clients";
import Features from "./components/features";
import Testimonials from "./components/testimonials";
import Pricing from "./components/pricing";

export default async function HomePage() {
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
        <Pricing />
      </section>
    </>
  );
}
