import "server-only";

import { randomUUID } from "node:crypto";
import { deleteObject, getObjectJson, listObjects, putObject } from "@/lib/storage/s3";

const INDEX_KEY = "contact-submissions/index.json";
const SUBMISSION_PREFIX = "contact-submissions/items/";

export type ContactSubmissionInput = {
  fullName: string;
  phoneNumber?: string;
  email: string;
  subject?: string;
  message: string;
  smsConsent: boolean;
};

export type ContactSubmission = ContactSubmissionInput & {
  id: string;
  createdAt: string;
  source: "website-contact-form";
};

export type ContactSubmissionSummary = Pick<
  ContactSubmission,
  "id" | "fullName" | "phoneNumber" | "email" | "subject" | "message" | "smsConsent" | "createdAt"
>;

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanMultilineText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").replace(/\n{4,}/g, "\n\n\n").trim().slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function submissionKey(id: string) {
  return `${SUBMISSION_PREFIX}${id}.json`;
}

function toSummary(submission: ContactSubmission): ContactSubmissionSummary {
  return {
    id: submission.id,
    fullName: submission.fullName,
    phoneNumber: submission.phoneNumber,
    email: submission.email,
    subject: submission.subject,
    message: submission.message,
    smsConsent: submission.smsConsent,
    createdAt: submission.createdAt,
  };
}

async function readIndex() {
  return getObjectJson<ContactSubmissionSummary[]>(INDEX_KEY, []);
}

async function writeIndex(summaries: ContactSubmissionSummary[]) {
  await putObject(INDEX_KEY, JSON.stringify(summaries, null, 2), "application/json");
}

export function parseContactSubmissionPayload(payload: unknown): ContactSubmissionInput {
  const record = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
  const fullName = cleanText(record.fullName, 160);
  const phoneNumber = cleanText(record.phoneNumber, 60);
  const email = cleanText(record.email, 220).toLowerCase();
  const subject = cleanText(record.subject, 220);
  const message = cleanMultilineText(record.message, 5000);
  const smsConsent = record.smsConsent === true;

  if (!fullName) throw new Error("Full name is required.");
  if (!email || !isValidEmail(email)) throw new Error("A valid email is required.");
  if (!message) throw new Error("Message is required.");

  return {
    fullName,
    phoneNumber: phoneNumber || undefined,
    email,
    subject: subject || undefined,
    message,
    smsConsent,
  };
}

export async function createContactSubmission(input: ContactSubmissionInput) {
  const createdAt = new Date().toISOString();
  const id = `${createdAt.replace(/[:.]/g, "-")}-${randomUUID()}`;
  const submission: ContactSubmission = {
    ...input,
    id,
    createdAt,
    source: "website-contact-form",
  };

  await putObject(submissionKey(id), JSON.stringify(submission, null, 2), "application/json");

  const summaries = await readIndex();
  const nextSummaries = [toSummary(submission), ...summaries.filter((item) => item.id !== id)]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  await writeIndex(nextSummaries);

  return submission;
}

export async function listContactSubmissions() {
  const indexed = await readIndex();
  if (indexed.length) {
    return indexed.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  const objects = await listObjects(SUBMISSION_PREFIX);
  const submissions = await Promise.all(
    objects
      .filter((object) => object.key.endsWith(".json"))
      .map((object) => getObjectJson<ContactSubmission | null>(object.key, null)),
  );

  const summaries = submissions
    .filter((submission): submission is ContactSubmission => Boolean(submission))
    .map(toSummary)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  if (summaries.length) await writeIndex(summaries);
  return summaries;
}

export async function deleteContactSubmission(id: string) {
  if (!id || id.includes("/") || id.includes("..")) {
    throw new Error("Invalid contact submission id.");
  }

  await deleteObject(submissionKey(id));
  const summaries = await readIndex();
  await writeIndex(summaries.filter((item) => item.id !== id));
}
