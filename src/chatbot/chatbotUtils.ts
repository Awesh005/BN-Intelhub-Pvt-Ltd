

import { FAQ_DATA, FALLBACK_ANSWER, FAQEntry } from "./chatbotData";

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface LeadData {
  name: string;
  email: string;
  interest?: string;
}

/** Unique message ID */
export const generateId = (): string =>
  `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

/** Lowercase + strip punctuation */
export const normalizeText = (text: string): string =>
  text.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();

/** Keyword matcher — returns first matching FAQ entry */
export const matchFAQ = (input: string): FAQEntry | null => {
  const normalized = normalizeText(input);
  for (const entry of FAQ_DATA) {
    for (const keyword of entry.keywords) {
      if (normalized.includes(keyword.toLowerCase())) {
        return entry;
      }
    }
  }
  return null;
};

/**
 * Main query resolver.
 * Returns: answer text, type, and optional waMessage for WA CTA button.
 */
export const resolveQuery = (
  input: string
): { answer: string; type: FAQEntry["type"]; waMessage?: string } => {
  const matched = matchFAQ(input);
  if (matched) {
    return {
      answer:    matched.answer,
      type:      matched.type ?? "info",
      waMessage: matched.whatsapp, // ← passes WA pre-filled message if set
    };
  }
  return {
    answer:    FALLBACK_ANSWER,
    type:      "info",
    waMessage: "Hello BN Intelhub! 👋 I have a query. Can you help me?",
    // ↑ Even fallback responses get a WA button so user can always reach you
  };
};

/** Parse **bold** markdown into segments */
export const parseMarkdown = (
  text: string
): Array<{ type: "line"; segments: Array<{ text: string; bold: boolean }> }> => {
  const lines = text.split("\n");
  return lines.map((line) => {
    const segments: Array<{ text: string; bold: boolean }> = [];
    const regex = /\*\*(.+?)\*\*/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ text: line.slice(lastIndex, match.index), bold: false });
      }
      segments.push({ text: match[1], bold: true });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < line.length) {
      segments.push({ text: line.slice(lastIndex), bold: false });
    }
    if (segments.length === 0) segments.push({ text: "", bold: false });
    return { type: "line" as const, segments };
  });
};

/** Validate lead capture form */
export const validateLead = (lead: Partial<LeadData>): string | null => {
  if (!lead.name || lead.name.trim().length < 2) return "Please enter a valid name.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!lead.email || !emailRegex.test(lead.email)) return "Please enter a valid email address.";
  return null;
};

/** Placeholder: Future AI API integration */
export const fetchAIResponse = async (
  _userMessage: string,
  _history: ChatMessage[]
): Promise<string> => {
  throw new Error("AI integration not yet configured.");
};

export const shouldCaptureLead  = (type: FAQEntry["type"]) => type === "lead";
export const isRedirectResponse = (type: FAQEntry["type"]) => type === "redirect";