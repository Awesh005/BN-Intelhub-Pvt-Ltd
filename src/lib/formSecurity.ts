const SUBMISSION_PREFIX = "bn-intelhub-submit:";
const DEFAULT_COOLDOWN_MS = 15_000;
const DEFAULT_MIN_FILL_MS = 1_500;

type ValidationOptions = {
  formKey: string;
  honeypot?: string;
  startedAt: number;
  cooldownMs?: number;
  minFillMs?: number;
};

export function sanitizeText(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function sanitizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function sanitizePhone(value: string): string {
  return value.replace(/[^\d+\s()-]/g, "").trim();
}

export function validateSubmission({
  formKey,
  honeypot,
  startedAt,
  cooldownMs = DEFAULT_COOLDOWN_MS,
  minFillMs = DEFAULT_MIN_FILL_MS,
}: ValidationOptions): string | null {
  if (honeypot?.trim()) {
    return "Suspicious submission blocked. Please refresh and try again.";
  }

  if (Date.now() - startedAt < minFillMs) {
    return "Please take a moment to complete the form before submitting.";
  }

  if (typeof window === "undefined") {
    return null;
  }

  const lastSubmittedAt = Number(window.localStorage.getItem(`${SUBMISSION_PREFIX}${formKey}`) ?? 0);
  if (lastSubmittedAt && Date.now() - lastSubmittedAt < cooldownMs) {
    return "Please wait a few seconds before submitting again.";
  }

  return null;
}

export function markSubmission(formKey: string): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(`${SUBMISSION_PREFIX}${formKey}`, String(Date.now()));
}
