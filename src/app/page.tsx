import Hero from "@/components/home/Hero";
import IsThisForYou from "@/components/home/IsThisForYou";
import AppShowcase from "@/components/home/AppShowcase";
import AiSection from "@/components/home/AiSection";
import Flights from "@/components/home/Flights";
import ProgramsCards from "@/components/home/ProgramsCards";
import LoyaltyBenefits from "@/components/home/LoyaltyBenefits";
import Faq from "@/components/home/Faq";
import AboutUs from "@/components/home/AboutUs";

export default function Home() {
  return (
    <>
      <Hero />
      <IsThisForYou />
      <AppShowcase />
      <AiSection />
      <Flights />
      <ProgramsCards />
      <LoyaltyBenefits />
      <Faq />
      <AboutUs />
    </>
  );
}
