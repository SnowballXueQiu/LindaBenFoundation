"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ArticleTranslationStatus, ArticleType } from "@/lib/content/types";

function isActiveState(state: string) {
  return state === "pending" || state === "processing" || state === "translating";
}

const staleProcessingMs = 60_000;

function isFreshProcessing(status: ArticleTranslationStatus) {
  if (status.state !== "processing" && status.state !== "translating") return false;
  const updatedAt = Date.parse(status.updatedAt || "");
  return Number.isFinite(updatedAt) && Date.now() - updatedAt <= staleProcessingMs;
}

function shouldKickWorker(statuses: ArticleTranslationStatus[]) {
  const hasFreshProcessing = statuses.some(isFreshProcessing);
  const hasPending = statuses.some((status) => status.state === "pending");
  const hasStaleProcessing = statuses.some((status) => (status.state === "processing" || status.state === "translating") && !isFreshProcessing(status));
  return hasStaleProcessing || (hasPending && !hasFreshProcessing);
}

function canPreview(state: string) {
  return state === "done" || state === "origin" || state === "stale";
}

function statusLabel(state: string) {
  if (state === "done" || state === "origin") return "Preview";
  if (state === "pending") return "Queued";
  if (state === "processing" || state === "translating") return "Processing";
  if (state === "failed") return "Failed";
  if (state === "stale") return "Outdated";
  return "Missing";
}

function statusClassName(state: string) {
  if (state === "done" || state === "origin") return "bg-emerald-100 text-emerald-800";
  if (state === "processing" || state === "translating") return "bg-amber-100 text-amber-900 ring-1 ring-amber-300";
  if (state === "pending") return "bg-slate-200 text-slate-700";
  if (state === "failed") return "bg-red-100 text-red-700";
  if (state === "stale") return "bg-blue-100 text-blue-800";
  return "bg-slate-100 text-slate-500";
}

type StatusResponse = {
  statuses: ArticleTranslationStatus[];
  updatedAt: string;
};

export default function TranslationStatusPanel({
  type,
  slug,
  currentLocale,
  sourceTitle,
  locales,
  availableLocales,
  initialStatuses,
  queued,
  translated,
}: {
  type: ArticleType;
  slug: string;
  currentLocale: string;
  sourceTitle: string;
  locales: string[];
  availableLocales: string[];
  initialStatuses: ArticleTranslationStatus[];
  queued?: string;
  translated?: string;
}) {
  const [statuses, setStatuses] = useState(initialStatuses);
  const [lastUpdated, setLastUpdated] = useState("");
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [queueing, setQueueing] = useState(false);
  const [queueMessage, setQueueMessage] = useState("");
  const [queuedCount, setQueuedCount] = useState(queued ? Number(queued) || 0 : 0);
  const workerInFlightRef = useRef(false);
  const statusByLocale = useMemo(() => new Map(statuses.map((status) => [status.locale, status])), [statuses]);
  const availableLocaleSet = useMemo(() => new Set(availableLocales), [availableLocales]);
  const activeTranslationCount = statuses.filter((status) => isActiveState(status.state)).length;
  const processingTranslationCount = statuses.filter((status) => status.state === "processing" || status.state === "translating").length;
  const completedTranslationCount = statuses.filter((status) => status.state === "done" || status.state === "origin").length;
  const failedTranslationCount = statuses.filter((status) => status.state === "failed").length;
  const progressPercent = Math.round((completedTranslationCount / locales.length) * 100);

  useEffect(() => {
    if (!activeTranslationCount) return;

    let cancelled = false;
    let timer: number | undefined;

    const refresh = async () => {
      const response = await fetch(`/api/admin/articles/${type}/${slug}/status?sourceLocale=${currentLocale}`, {
        cache: "no-store",
      });
      if (!response.ok) return null;
      const result = (await response.json()) as StatusResponse;
      if (!cancelled) {
        setStatuses(result.statuses);
        setLastUpdated(new Date(result.updatedAt).toLocaleTimeString());
      }
      return result.statuses;
    };

    const kickWorker = async () => {
      if (workerInFlightRef.current) return;
      workerInFlightRef.current = true;
      try {
        await fetch(`/api/admin/articles/${type}/${slug}/translate-next`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sourceLocale: currentLocale }),
        });
      } finally {
        workerInFlightRef.current = false;
      }
    };

    const loop = async () => {
      const nextStatuses = await refresh().catch(() => null);
      if (nextStatuses && shouldKickWorker(nextStatuses)) {
        void kickWorker().then(() => refresh().catch(() => undefined));
      }
      if (!cancelled) timer = window.setTimeout(loop, 900);
    };

    timer = window.setTimeout(loop, 250);
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [activeTranslationCount, currentLocale, slug, type]);

  function toggleTarget(locale: string) {
    setQueueMessage("");
    setSelectedTargets((items) => (items.includes(locale) ? items.filter((item) => item !== locale) : [...items, locale]));
  }

  async function queueTranslations() {
    const targetLocales = selectedTargets.includes("all") ? ["all"] : selectedTargets;
    if (!targetLocales.length) {
      setQueueMessage("Select at least one target language.");
      return;
    }

    setQueueing(true);
    setQueueMessage("");
    try {
      const response = await fetch(`/api/admin/articles/${type}/${slug}/queue-translations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceLocale: currentLocale, targetLocales }),
      });
      const result = (await response.json()) as StatusResponse & { ok?: boolean; queued?: number; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Could not queue translations.");
      }

      setStatuses(result.statuses);
      setLastUpdated(new Date(result.updatedAt).toLocaleTimeString());
      setQueuedCount(result.queued || 0);
      setQueueMessage(result.queued ? `${result.queued} translation${result.queued === 1 ? "" : "s"} queued.` : "No target languages selected.");
      setSelectedTargets([]);
    } catch (error) {
      setQueueMessage(error instanceof Error ? error.message : "Could not queue translations.");
    } finally {
      setQueueing(false);
    }
  }

  return (
    <>
      {activeTranslationCount > 0 && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-amber-800 shadow-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-600" />
          </span>
          Updating translations
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">Languages</h2>
          <p className="mt-1 text-sm text-slate-500">
            Current language: <span className="font-bold uppercase text-slate-900">{currentLocale}</span>. Other languages are available in the switcher.
          </p>
        </div>
        {lastUpdated && <p className="text-xs font-semibold text-slate-400">Updated {lastUpdated}</p>}
        {queuedCount > 0 && activeTranslationCount > 0 && (
          <p className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-800">
            {queuedCount} translation{queuedCount === 1 ? "" : "s"} queued
          </p>
        )}
        {translated && activeTranslationCount === 0 && (
          <p className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">
            {translated} translation{translated === "1" ? "" : "s"} generated
          </p>
        )}
        {activeTranslationCount > 0 && (
          <p className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-800">
            {processingTranslationCount} processing · {activeTranslationCount - processingTranslationCount} queued
          </p>
        )}
        {failedTranslationCount > 0 && (
          <p className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
            {failedTranslationCount} failed
          </p>
        )}
      </div>

      <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-semibold text-slate-700">Translation progress</span>
          <span className="text-slate-500">
            {completedTranslationCount}/{locales.length} ready
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full rounded-full bg-emerald-700 transition-all duration-700 ${activeTranslationCount > 0 ? "animate-pulse" : ""}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <details open className="mt-4 rounded-md border border-slate-200 bg-slate-50">
        <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-slate-800">
          Switch language and view translation status
        </summary>
        <div className="grid gap-2 border-t border-slate-200 p-4 sm:grid-cols-2 lg:grid-cols-4">
          {locales.map((locale) => {
            const status = statusByLocale.get(locale);
            const state = status?.state || "missing";
            const active = isActiveState(state);
            const preview = canPreview(state);

            return (
              <div key={locale} className={`rounded-md border px-3 py-2 text-sm ${currentLocale === locale ? "border-emerald-700 bg-emerald-50" : "border-slate-200 bg-white"}`}>
                <Link
                  href={`/admin/articles/${type}/${slug}?locale=${locale}`}
                  prefetch={false}
                  className={preview ? "font-bold text-slate-950" : "font-semibold text-slate-500"}
                >
                  {locale.toUpperCase()}
                </Link>
                <span className={`ml-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold uppercase ${statusClassName(state)}`}>
                  {active && <span className={`h-1.5 w-1.5 rounded-full ${state === "pending" ? "bg-slate-500" : "animate-ping bg-amber-700"}`} />}
                  {statusLabel(state)}
                </span>
                {preview ? (
                  <Link href={`/${locale}/${type}/${slug}`} target="_blank" prefetch={false} className="ml-3 text-xs font-semibold text-emerald-800">
                    Preview
                  </Link>
                ) : (
                  <span className="ml-3 text-xs text-slate-400">Not generated</span>
                )}
                {status?.error && <p className="mt-1 text-xs text-red-700">{status.error}</p>}
              </div>
            );
          })}
        </div>
      </details>

      <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-bold text-slate-700">Translate from</p>
        <p className="mt-2 text-sm text-slate-600">
          <span className="font-bold uppercase text-emerald-800">{currentLocale}</span> - {sourceTitle}
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={selectedTargets.includes("all")}
              onChange={() => setSelectedTargets((items) => (items.includes("all") ? [] : ["all"]))}
            />
            All other languages
          </label>
          {locales.map((locale) => (
            <label key={locale} className="flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2 text-sm">
              <input
                type="checkbox"
                checked={selectedTargets.includes("all") || selectedTargets.includes(locale)}
                disabled={locale === currentLocale || selectedTargets.includes("all")}
                onChange={() => toggleTarget(locale)}
              />
              {locale.toUpperCase()}
              {availableLocaleSet.has(locale) && locale !== currentLocale && <span className="text-xs text-amber-700">overwrite</span>}
            </label>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={queueTranslations}
            disabled={queueing}
            className="rounded-md bg-emerald-800 px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
          >
            {queueing ? "Queueing..." : "Regenerate selected translations"}
          </button>
          {queueMessage && <span className="text-sm font-semibold text-slate-600">{queueMessage}</span>}
        </div>
      </div>
    </>
  );
}
