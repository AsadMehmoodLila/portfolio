export const ENQUIRY_DRAFT_KEY = "scriptlilla-enquiry-draft-v1";
export const ENQUIRY_DRAFT_MAX_AGE = 24 * 60 * 60 * 1000;
export type EnquiryDraft = {
  step: number;
  service: string;
  budget: string;
  timing: string;
  details: string;
  email: string;
};
type SavedDraft = EnquiryDraft & { version: 1; updatedAt: number };
let memoryDraft: SavedDraft | null = null;

export function clearEnquiryDraft() {
  memoryDraft = null;
  try {
    sessionStorage.removeItem(ENQUIRY_DRAFT_KEY);
  } catch {}
}

export function readEnquiryDraft(): EnquiryDraft | null {
  try {
    let saved: unknown = memoryDraft;
    let raw: string | null = null;
    try {
      raw = sessionStorage.getItem(ENQUIRY_DRAFT_KEY);
    } catch {
      /* In-memory fallback also supports storage-blocked navigation. */
    }
    if (raw && raw.length <= 10000) saved = JSON.parse(raw);
    else if (raw) {
      clearEnquiryDraft();
      return null;
    }
    if (!saved || typeof saved !== "object") return null;
    const item = saved as Partial<SavedDraft>;
    if (
      item.version !== 1 ||
      typeof item.updatedAt !== "number" ||
      !Number.isFinite(item.updatedAt) ||
      Date.now() - item.updatedAt > ENQUIRY_DRAFT_MAX_AGE ||
      item.updatedAt > Date.now() + 60000 ||
      !Number.isInteger(item.step) ||
      item.step! < 0 ||
      item.step! > 2 ||
      ![item.service, item.budget, item.timing, item.details, item.email].every(
        (value) => typeof value === "string",
      )
    ) {
      clearEnquiryDraft();
      return null;
    }
    return {
      step: item.step!,
      service: item.service!.slice(0, 80),
      budget: item.budget!.slice(0, 80),
      timing: item.timing!.slice(0, 80),
      details: item.details!.slice(0, 2000),
      email: item.email!.slice(0, 254),
    };
  } catch {
    clearEnquiryDraft();
    return null;
  }
}

export function saveEnquiryDraft(draft: EnquiryDraft) {
  if (!draft.service && !draft.details && !draft.email) {
    clearEnquiryDraft();
    return;
  }
  // Persist only these fields, never consent, validation errors or delivery state.
  memoryDraft = {
    version: 1,
    updatedAt: Date.now(),
    step: draft.step,
    service: draft.service,
    budget: draft.budget,
    timing: draft.timing,
    details: draft.details,
    email: draft.email,
  };
  try {
    sessionStorage.setItem(ENQUIRY_DRAFT_KEY, JSON.stringify(memoryDraft));
  } catch {}
}
