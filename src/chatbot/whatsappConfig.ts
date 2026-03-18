

const WA_PHONE = "918936078905"; // Primary number (country code + number)

export const getWhatsAppLink = (message: string): string => {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
};

export const WA_LINKS = {

  // ── General / Home page ──────────────────────────────────────────────────
  general: getWhatsAppLink(
    "Hello BN Intelhub! 👋 I visited your website and would like to know more about your services."
  ),

  // ── Training / Courses page ──────────────────────────────────────────────
  courses: getWhatsAppLink(
    "Hello BN Intelhub! 🎓 I'm interested in your Training Programs. Can you share more details about available courses and fees?"
  ),

  // ── Internship page ──────────────────────────────────────────────────────
  internship: getWhatsAppLink(
    "Hello BN Intelhub! 💼 I'm interested in your Internship Program. Please share the details about eligibility, duration, and how to apply."
  ),

  // ── Development Services page ────────────────────────────────────────────
  devServices: getWhatsAppLink(
    "Hello BN Intelhub! 🛠️ I'm looking for Development Services for my business. Can we discuss my project requirements?"
  ),

  // ── Full Stack course ────────────────────────────────────────────────────
  fullStack: getWhatsAppLink(
    "Hello BN Intelhub! 🌐 I'm interested in the Full Stack Development course. Please share the syllabus, duration, and fee details."
  ),

  // ── Data Science course ──────────────────────────────────────────────────
  dataScience: getWhatsAppLink(
    "Hello BN Intelhub! 📊 I'm interested in the Data Science course. Can you share the syllabus and pricing?"
  ),

  // ── AI / ML course ───────────────────────────────────────────────────────
  aiML: getWhatsAppLink(
    "Hello BN Intelhub! 🤖 I'm interested in the AI & Machine Learning course. Please share the details."
  ),

  // ── Pricing inquiry ──────────────────────────────────────────────────────
  pricing: getWhatsAppLink(
    "Hello BN Intelhub! 💰 I'd like to know about your pricing for courses and development services."
  ),

  // ── Contact page ─────────────────────────────────────────────────────────
  contact: getWhatsAppLink(
    "Hello BN Intelhub! 📬 I'd like to get in touch with your team. Please let me know the best way to connect."
  ),

  // ── Startup IT Package ───────────────────────────────────────────────────
  startupPackage: getWhatsAppLink(
    "Hello BN Intelhub! 🚀 I'm interested in your Startup IT Setup Package. Can you share what's included and the pricing?"
  ),
};

/**
 * Dynamic link builder — use when you need a custom message on the fly.
 * Example: <a href={buildWALink("I want to know about Flutter course")}>
 */
export const buildWALink = (customMessage: string): string =>
  getWhatsAppLink(customMessage);