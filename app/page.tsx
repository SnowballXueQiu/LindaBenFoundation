import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MissionVision from "@/components/MissionVision";
import Programs from "@/components/Programs";
import Stats from "@/components/Stats";
import HowToHelp from "@/components/HowToHelp";
import BibleQuote from "@/components/BibleQuote";
import Testimonials from "@/components/Testimonials";
import AboutUs from "@/components/AboutUs";
import Blog from "@/components/Blog";
import Partners from "@/components/Partners";
import DonationCTA from "@/components/DonationCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MissionVision />
        <Programs />
        <Stats />
        <HowToHelp />
        <BibleQuote />
        <Testimonials />
        <AboutUs />
        <Blog />
        <Partners />
        <DonationCTA />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
