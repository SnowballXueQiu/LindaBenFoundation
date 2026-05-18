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
import { getDictionary } from "@/lib/i18n/dictionaries";
import { listArticles } from "@/lib/content/repository";
import { defaultLocale, isSupportedLocale } from "@/lib/i18n/config";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const [dictionary, posts] = await Promise.all([
    getDictionary(locale),
    listArticles("blogs", locale),
  ]);

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
        <Blog posts={posts.slice(0, 3)} locale={locale} dictionary={dictionary} />
        <Partners />
        <DonationCTA />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
