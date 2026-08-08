import Hero from "@/components/sections/Hero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FeaturedServices from "@/components/sections/FeaturedServices";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Clients from "@/components/sections/Clients";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <FeaturedServices />
      <FeaturedProjects />
      <Stats />
      <Testimonials />
      <Clients />
    </>
  );
}