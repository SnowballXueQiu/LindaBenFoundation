"use client";

import { useEffect, useRef } from "react";

type ArticleBodyProps = {
  html: string;
  className?: string;
};

export default function ArticleBody({ html, className }: ArticleBodyProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];
    const galleries = Array.from(root.querySelectorAll<HTMLElement>(".article-gallery"));

    galleries.forEach((gallery) => {
      if (gallery.dataset.carouselReady === "true") return;

      const items = Array.from(gallery.querySelectorAll<HTMLElement>(".article-gallery-item"));
      if (items.length <= 1) return;

      gallery.dataset.carouselReady = "true";
      gallery.setAttribute("tabindex", "0");
      gallery.setAttribute("aria-roledescription", "carousel");

      let activeIndex = 0;
      let intervalId: number | undefined;

      const controls = document.createElement("div");
      controls.className = "article-gallery-controls";
      controls.setAttribute("aria-label", "Gallery controls");

      const prev = document.createElement("button");
      prev.type = "button";
      prev.className = "article-gallery-arrow";
      prev.setAttribute("aria-label", "Previous image");
      prev.textContent = "‹";

      const next = document.createElement("button");
      next.type = "button";
      next.className = "article-gallery-arrow";
      next.setAttribute("aria-label", "Next image");
      next.textContent = "›";

      const dots = document.createElement("div");
      dots.className = "article-gallery-dots";

      const dotButtons = items.map((_item, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "article-gallery-dot";
        dot.setAttribute("aria-label", `Show image ${index + 1} of ${items.length}`);
        dot.addEventListener("click", () => goTo(index));
        dots.append(dot);
        return dot;
      });

      controls.append(prev, dots, next);
      gallery.insertAdjacentElement("afterend", controls);

      function setActive(index: number) {
        activeIndex = index;
        gallery.style.setProperty("--article-gallery-index", String(index));
        dotButtons.forEach((dot, dotIndex) => {
          if (dotIndex === index) {
            dot.setAttribute("aria-current", "true");
          } else {
            dot.removeAttribute("aria-current");
          }
        });
      }

      function goTo(index: number) {
        const nextIndex = (index + items.length) % items.length;
        setActive(nextIndex);
      }

      function startAutoplay() {
        window.clearInterval(intervalId);
        intervalId = window.setInterval(() => goTo(activeIndex + 1), 5200);
      }

      function stopAutoplay() {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }

      const onPrev = () => goTo(activeIndex - 1);
      const onNext = () => goTo(activeIndex + 1);

      prev.addEventListener("click", onPrev);
      next.addEventListener("click", onNext);
      gallery.addEventListener("mouseenter", stopAutoplay);
      gallery.addEventListener("mouseleave", startAutoplay);
      gallery.addEventListener("focusin", stopAutoplay);
      gallery.addEventListener("focusout", startAutoplay);

      setActive(0);
      startAutoplay();

      cleanups.push(() => {
        stopAutoplay();
        prev.removeEventListener("click", onPrev);
        next.removeEventListener("click", onNext);
        gallery.removeEventListener("mouseenter", stopAutoplay);
        gallery.removeEventListener("mouseleave", startAutoplay);
        gallery.removeEventListener("focusin", stopAutoplay);
        gallery.removeEventListener("focusout", startAutoplay);
        controls.remove();
        gallery.style.removeProperty("--article-gallery-index");
        delete gallery.dataset.carouselReady;
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [html]);

  return <div ref={rootRef} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
