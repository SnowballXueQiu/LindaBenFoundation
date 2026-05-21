"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type TestimonialReview = {
  reviewId: string;
  reviewerName: string;
  comment: string;
  backgroundImage?: string;
  locationName?: string;
};

export type TestimonialsPageLabels = {
  title: string;
  reviewsEyebrow: string;
  carouselTitle: string;
  unavailableText: string;
  previous: string;
  next: string;
  show: string;
};

const AUTOPLAY_DELAY = 7000;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function TestimonialsPageCarousel({
  reviews,
  labels,
}: {
  reviews: TestimonialReview[];
  labels: TestimonialsPageLabels;
}) {
  const normalizedReviews = useMemo(
    () => reviews.filter((review) => review.reviewerName && review.comment),
    [reviews],
  );
  const [current, setCurrent] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const activeReview = normalizedReviews[current];

  const moveTo = useCallback(
    (nextIndex: number) => {
      if (normalizedReviews.length < 2) return;
      setIsChanging(true);
      window.setTimeout(() => {
        setCurrent(
          ((nextIndex % normalizedReviews.length) + normalizedReviews.length) %
            normalizedReviews.length,
        );
        window.requestAnimationFrame(() => setIsChanging(false));
      }, 180);
    },
    [normalizedReviews.length],
  );

  const moveBy = useCallback(
    (offset: number) => {
      moveTo(current + offset);
    },
    [current, moveTo],
  );

  useEffect(() => {
    if (normalizedReviews.length < 2) return;
    const timer = window.setInterval(() => {
      setIsChanging(true);
      window.setTimeout(() => {
        setCurrent((index) => (index + 1) % normalizedReviews.length);
        window.requestAnimationFrame(() => setIsChanging(false));
      }, 180);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [normalizedReviews.length]);

  if (!activeReview) {
    return (
      <div className="mx-auto max-w-3xl rounded-lg bg-white px-6 py-16 text-center shadow-sm">
        <h2
          className="text-2xl font-bold"
          style={{
            color: "var(--green-deep)",
            fontFamily: "var(--font-merriweather), serif",
          }}
        >
          {labels.title}
        </h2>
        <p className="mt-4 text-base" style={{ color: "var(--text-mid)" }}>
          {labels.unavailableText}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl" dir="ltr">
      <div className="mb-10 text-center">
        <p
          className="mb-3 text-sm font-semibold uppercase tracking-[0.18em]"
          style={{ color: "var(--green-mid)" }}
        >
          {labels.reviewsEyebrow}
        </p>
        <h2
          className="text-3xl font-bold lg:text-4xl"
          style={{
            color: "var(--green-deep)",
            fontFamily: "var(--font-merriweather), serif",
          }}
        >
          {labels.carouselTitle}
        </h2>
      </div>

      <div className="grid items-center gap-6 lg:grid-cols-[64px_1fr_64px]">
        <button
          type="button"
          aria-label={labels.previous}
          onClick={() => moveBy(-1)}
          className="hidden h-14 w-14 items-center justify-center rounded-full border border-[--green-pale] bg-white text-3xl leading-none text-[--green-deep] shadow-sm transition-all duration-200 hover:-translate-x-1 hover:bg-[--green-pale] disabled:cursor-not-allowed disabled:opacity-40 lg:flex"
          disabled={normalizedReviews.length < 2}
        >
          ‹
        </button>

        <article
          aria-live="polite"
          className="relative min-h-90 overflow-hidden rounded-lg bg-white px-6 py-10 text-center shadow-sm ring-1 ring-black/5 lg:px-16 lg:py-14"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-px"
            style={{ background: "var(--green-pale)" }}
          />
          <div
            className={`transition-all duration-300 ease-out motion-reduce:transition-none ${
              isChanging
                ? "translate-y-3 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <div
              className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-[--green-deep] bg-center bg-no-repeat text-lg font-bold tracking-[0.18em] text-[--gold] shadow-lg shadow-green-950/10"
              style={
                activeReview.backgroundImage
                  ? {
                      backgroundImage: `url("${activeReview.backgroundImage}")`,
                      backgroundSize: "88px auto",
                    }
                  : undefined
              }
            >
              {!activeReview.backgroundImage && "★★★★★"}
            </div>

            <h3
              className="mt-8 text-2xl font-bold"
              style={{
                color: "var(--text-dark)",
                fontFamily: "var(--font-merriweather), serif",
              }}
            >
              {activeReview.reviewerName}
            </h3>
            {activeReview.locationName && (
              <p
                className="mt-1 text-sm font-semibold uppercase tracking-[0.16em]"
                style={{ color: "var(--green-mid)" }}
              >
                {activeReview.locationName}
              </p>
            )}

            <p
              className="mx-auto mt-6 max-w-3xl whitespace-pre-line text-lg leading-8 lg:text-xl lg:leading-9"
              style={{ color: "var(--text-dark)" }}
            >
              {activeReview.comment}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {normalizedReviews.map((review, index) => (
              <button
                key={review.reviewId}
                type="button"
                aria-label={`${labels.show} ${index + 1}`}
                onClick={() => moveTo(index)}
                className={`h-2.5 rounded-full transition-all duration-200 ${
                  index === current ? "w-8" : "w-2.5"
                }`}
                style={{
                  background:
                    index === current
                      ? "var(--green-mid)"
                      : "rgba(64, 145, 108, 0.28)",
                }}
              />
            ))}
          </div>
        </article>

        <button
          type="button"
          aria-label={labels.next}
          onClick={() => moveBy(1)}
          className="hidden h-14 w-14 items-center justify-center rounded-full border border-[--green-pale] bg-white text-3xl leading-none text-[--green-deep] shadow-sm transition-all duration-200 hover:translate-x-1 hover:bg-[--green-pale] disabled:cursor-not-allowed disabled:opacity-40 lg:flex"
          disabled={normalizedReviews.length < 2}
        >
          ›
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => moveBy(-1)}
          className="h-12 w-12 rounded-full border border-[--green-pale] bg-white text-2xl text-[--green-deep] shadow-sm"
          aria-label={labels.previous}
          disabled={normalizedReviews.length < 2}
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => moveBy(1)}
          className="h-12 w-12 rounded-full border border-[--green-pale] bg-white text-2xl text-[--green-deep] shadow-sm"
          aria-label={labels.next}
          disabled={normalizedReviews.length < 2}
        >
          ›
        </button>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {normalizedReviews.slice(0, 3).map((review) => (
          <div
            key={`summary-${review.reviewId}`}
            className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5"
          >
            <div
              className="mb-4 flex h-11 w-11 items-center justify-center rounded-full font-bold text-white"
              style={{ background: "var(--green-mid)" }}
            >
              {getInitials(review.reviewerName)}
            </div>
            <h4 className="font-semibold" style={{ color: "var(--text-dark)" }}>
              {review.reviewerName}
            </h4>
            <p className="mt-2 line-clamp-3 text-sm leading-6" style={{ color: "var(--text-mid)" }}>
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
