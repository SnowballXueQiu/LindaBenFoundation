import type { Metadata } from "next";
import Header from "@/components/Header";
import DonationCTA from "@/components/DonationCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import TestimonialsPageCarousel, {
  type TestimonialReview,
} from "@/components/TestimonialsPageCarousel";
import {
  defaultLocale,
  getAlternates,
  isSupportedLocale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";

const TESTIMONIALS_ENDPOINT =
  process.env.TESTIMONIALS_API_URL ||
  "https://api.levitate.ai/googleBusiness/dudaSync?token=4dc5dbc8-de52-4531-a2db-9e1d3a842360";

function readString(record: Record<string, unknown>, key: string) {
  const value = record[key];
  return typeof value === "string" ? value.trim() : "";
}

function normalizeRemoteImage(value: string) {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.protocol === "http:") {
      return url.toString();
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function collectReviewRecords(payload: unknown): Record<string, unknown>[] {
  if (Array.isArray(payload)) {
    return payload.filter(
      (item): item is Record<string, unknown> =>
        Boolean(item) && typeof item === "object" && !Array.isArray(item),
    );
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return [];
  }

  const record = payload as Record<string, unknown>;
  for (const key of ["items", "data", "reviews", "results", "records"]) {
    const value = record[key];
    if (Array.isArray(value)) {
      return value.filter(
        (item): item is Record<string, unknown> =>
          Boolean(item) && typeof item === "object" && !Array.isArray(item),
      );
    }
  }

  return [];
}

function normalizeReview(
  record: Record<string, unknown>,
  index: number,
): TestimonialReview | null {
  const reviewerName = readString(record, "reviewerName");
  const comment = readString(record, "comment");
  if (!reviewerName || !comment) return null;

  const reviewId = readString(record, "reviewId") || `review-${index}`;
  const locationName = readString(record, "locationName") || undefined;
  const backgroundImage = normalizeRemoteImage(
    readString(record, "backgroundImage"),
  );

  return {
    reviewId,
    reviewerName,
    comment,
    backgroundImage,
    locationName,
  };
}

async function getTestimonials() {
  try {
    const response = await fetch(TESTIMONIALS_ENDPOINT, {
      cache: "no-store",
    });

    if (!response.ok) return [];

    const payload: unknown = await response.json();
    return collectReviewRecords(payload)
      .map((record, index) => normalizeReview(record, index))
      .filter((review): review is TestimonialReview => Boolean(review));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.testimonials;

  return {
    title: `${page.title} — LindaBen Foundation`,
    description: page.metaDescription,
    alternates: {
      canonical: `/${locale}/testimonials`,
      languages: getAlternates("/testimonials"),
    },
  };
}

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const [dictionary, reviews] = await Promise.all([
    getDictionary(locale),
    getTestimonials(),
  ]);
  const page = dictionary.pages.testimonials;

  return (
    <div className="min-h-screen">
      <Header />
      <section
        className="pt-32 pb-16 lg:pt-40 lg:pb-20"
        style={{ background: "var(--cream)" }}
      >
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-12">
          <h1
            className="text-4xl font-bold lg:text-6xl"
            style={{
              color: "var(--green-deep)",
              fontFamily: "var(--font-merriweather), serif",
            }}
          >
            {page.title}
          </h1>
        </div>
      </section>

      <section
        className="py-16 lg:py-24"
        style={{ background: "var(--warm-white)" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <TestimonialsPageCarousel reviews={reviews} labels={page} />
        </div>
      </section>

      <DonationCTA />
      <ContactForm />
      <Footer />
    </div>
  );
}
