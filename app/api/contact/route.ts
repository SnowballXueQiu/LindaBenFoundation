import { NextResponse } from "next/server";
import {
  createContactSubmission,
  parseContactSubmissionPayload,
} from "@/lib/contact/submissions";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  try {
    const input = parseContactSubmissionPayload(payload);
    const submission = await createContactSubmission(input);
    return NextResponse.json({ ok: true, id: submission.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit message.";
    const status = message.includes("required") || message.includes("valid") ? 400 : 500;
    return NextResponse.json({ ok: false, message }, { status });
  }
}
