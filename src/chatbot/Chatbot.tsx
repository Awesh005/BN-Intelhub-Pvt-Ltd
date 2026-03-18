// Chatbot.tsx
// BN Intelhub — AI Chatbot
//
// DESKTOP (≥1024px): FAB at top:17px, right:935px (navbar) ← UNCHANGED
// MOBILE  (<1024px): FAB at bottom-RIGHT, stacked ABOVE WhatsApp button
//   WhatsApp → bottom: 24px,  right: 16px
//   AI FAB   → bottom: 90px,  right: 16px  (24 + 56 + 10 gap)
//
// CHAT WINDOW: Always bottom-right on all screen sizes

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChatMessage,
  generateId,
  resolveQuery,
  parseMarkdown,
  validateLead,
  shouldCaptureLead,
  isRedirectResponse,
  LeadData,
} from "./chatbotUtils";
import {
  SUGGESTIONS,
  BOT_NAME,
  BOT_TAGLINE,
  TYPING_DELAY_MS,
  buildWAUrl,
} from "./chatbotData";

// ─── WhatsApp CTA ─────────────────────────────────────────────────────────────

const WAIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const WhatsAppCTA: React.FC<{ message: string }> = ({ message }) => (
  <a
    href={buildWAUrl(message)}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-xs font-semibold text-white px-3 py-2 rounded-xl transition-all active:scale-95 hover:brightness-110"
    style={{
      background: "#25D366",
      boxShadow: "0 2px 10px rgba(37,211,102,0.4)",
      animation: "waCtaIn 0.3s ease forwards",
    }}
  >
    <WAIcon />
    Chat on WhatsApp →
  </a>
);

// ─── Sound Wave Bars ──────────────────────────────────────────────────────────

const SoundWaveBars: React.FC<{ size?: "sm" | "md" }> = ({ size = "md" }) => {
  const barW = size === "sm" ? 2 : 3;
  const gap  = size === "sm" ? 2 : 2.5;
  const maxH = size === "sm" ? 14 : 20;
  const bars = [
    { h: maxH * 0.4, anim: "waveBar1" },
    { h: maxH * 0.7, anim: "waveBar2" },
    { h: maxH,       anim: "waveBar3" },
    { h: maxH * 0.7, anim: "waveBar4" },
    { h: maxH * 0.4, anim: "waveBar5" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: `${gap}px`, height: `${maxH}px` }}>
      {bars.map((b, i) => (
        <div key={i} style={{
          width: `${barW}px`, height: `${b.h}px`,
          borderRadius: "99px", background: "white",
          transformOrigin: "center",
          animation: `${b.anim} ${0.85 + i * 0.07}s ease-in-out infinite`,
          animationDelay: `${i * 0.08}s`,
        }} />
      ))}
    </div>
  );
};

// ─── Markdown ─────────────────────────────────────────────────────────────────

const MarkdownText: React.FC<{ text: string }> = ({ text }) => {
  const parsed = parseMarkdown(text);
  return (
    <span className="block space-y-0.5">
      {parsed.map((line, li) => (
        <span key={li} className="block leading-relaxed">
          {line.segments.map((seg, si) =>
            seg.bold
              ? <strong key={si} className="font-semibold">{seg.text}</strong>
              : <span key={si}>{seg.text}</span>
          )}
        </span>
      ))}
    </span>
  );
};

// ─── Typing Indicator ─────────────────────────────────────────────────────────

const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    {[0, 150, 300].map((delay, i) => (
      <span key={i} className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
        style={{ animationDelay: `${delay}ms` }} />
    ))}
  </div>
);

// ─── Lead Form ────────────────────────────────────────────────────────────────

interface LeadFormProps { onSubmit: (lead: LeadData) => void; onSkip: () => void; }

const LeadCaptureForm: React.FC<LeadFormProps> = ({ onSubmit, onSkip }) => {
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const err = validateLead({ name, email });
    if (err) { setError(err); return; }
    onSubmit({ name: name.trim(), email: email.trim(), interest: "Internship" });
  };

  return (
    <div className="mt-2 bg-white border border-blue-100 rounded-2xl p-4 shadow-sm space-y-3">
      <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">🎯 Quick Apply</p>
      <input type="text" placeholder="Your name" value={name}
        onChange={(e) => { setName(e.target.value); setError(null); }}
        className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 placeholder-slate-400 text-slate-700 transition-all" />
      <input type="email" placeholder="Your email" value={email}
        onChange={(e) => { setEmail(e.target.value); setError(null); }}
        className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 placeholder-slate-400 text-slate-700 transition-all" />
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div className="flex gap-2">
        <button onClick={handleSubmit}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium py-2 rounded-xl transition-all active:scale-95">Submit</button>
        <button onClick={onSkip}
          className="flex-1 border border-slate-200 text-slate-500 text-sm py-2 rounded-xl hover:bg-slate-50 transition-all">Skip</button>
      </div>
    </div>
  );
};

// ─── Chat Bubble ──────────────────────────────────────────────────────────────

export interface ChatMessageEx extends ChatMessage { waMessage?: string; }

interface BubbleProps {
  message: ChatMessageEx;
  showLeadForm: boolean;
  onLeadSubmit: (lead: LeadData) => void;
  onLeadSkip: () => void;
  showRedirectCTA: boolean;
}

const ChatBubble: React.FC<BubbleProps> = ({
  message, showLeadForm, onLeadSubmit, onLeadSkip, showRedirectCTA,
}) => {
  const isUser = message.role === "user";

  const BotAvatar = () => (
    <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 shadow-md overflow-hidden relative"
      style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}>
      <div style={{
        position: "absolute", top: 2, left: 3, width: "46%", height: "36%",
        background: "radial-gradient(ellipse,rgba(255,255,255,0.3) 0%,rgba(255,255,255,0) 100%)",
        borderRadius: "50%",
      }} />
      <SoundWaveBars size="sm" />
    </div>
  );

  if (message.isTyping) {
    return (
      <div className="flex items-end gap-2">
        <BotAvatar />
        <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm shadow-sm">
          <TypingIndicator />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {!isUser ? <BotAvatar /> : (
        <div className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md"
          style={{ background: "linear-gradient(135deg,#64748b,#475569)" }}>U</div>
      )}
      <div className={`flex flex-col gap-2 max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div className={`px-4 py-3 text-sm shadow-sm ${
          isUser
            ? "text-white rounded-2xl rounded-br-sm"
            : "bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-bl-sm"
        }`} style={isUser ? { background: "linear-gradient(135deg,#3b82f6,#6366f1)" } : {}}>
          <MarkdownText text={message.text} />
        </div>
        {!isUser && showRedirectCTA && (
          <a href="/services"
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl hover:bg-blue-100 transition-all">
            🛠️ Go to Development Services →
          </a>
        )}
        {!isUser && message.waMessage && <WhatsAppCTA message={message.waMessage} />}
        {!isUser && showLeadForm && <LeadCaptureForm onSubmit={onLeadSubmit} onSkip={onLeadSkip} />}
        <span className="text-[10px] text-slate-400 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
};

// ─── Suggestions ─────────────────────────────────────────────────────────────

const SuggestionsPanel: React.FC<{
  onSelect: (q: string) => void; showAll: boolean; onToggle: () => void;
}> = ({ onSelect, showAll, onToggle }) => {
  const visible = showAll ? SUGGESTIONS : SUGGESTIONS.slice(0, 8);
  return (
    <div className="px-3 py-2 bg-white border-t border-slate-100 shrink-0">
      <div className="flex flex-wrap gap-1.5">
        {visible.map((s) => (
          <button key={s.label} onClick={() => onSelect(s.query)}
            className="text-xs bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-600 hover:text-blue-700 px-3 py-1.5 rounded-full transition-all whitespace-nowrap font-medium active:scale-95">
            {s.label}
          </button>
        ))}
        <button onClick={onToggle}
          className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full transition-all font-medium active:scale-95">
          {showAll ? "Show less ↑" : `+${SUGGESTIONS.length - 8} more ↓`}
        </button>
      </div>
    </div>
  );
};

// ─── useIsMobile ──────────────────────────────────────────────────────────────

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

// ─── Main Chatbot ─────────────────────────────────────────────────────────────

const Chatbot: React.FC = () => {
  const isMobile = useIsMobile();

  const [isOpen,            setIsOpen]            = useState(false);
  const [hovered,           setHovered]           = useState(false);
  const [messages,          setMessages]          = useState<ChatMessageEx[]>([]);
  const [input,             setInput]             = useState("");
  const [isTyping,          setIsTyping]          = useState(false);
  const [leadMessageId,     setLeadMessageId]     = useState<string | null>(null);
  const [redirectMessageId, setRedirectMessageId] = useState<string | null>(null);
  const [leadSubmitted,     setLeadSubmitted]     = useState(false);
  const [hasOpened,         setHasOpened]         = useState(false);
  const [unreadCount,       setUnreadCount]       = useState(1);
  const [showAllPills,      setShowAllPills]      = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
      setUnreadCount(0);
      const welcome: ChatMessageEx = {
        id: generateId(), role: "bot",
        text: "Hello 👋 Welcome to **BN Intelhub**!\n\nI can help you with:\n• 🎓 **Training & Courses**\n• 💼 **Internship Programs**\n• 🛠️ **IT & Development Services**\n• 📬 **Contact & Pricing**\n\nHow can I assist you today?",
        timestamp: new Date(),
      };
      setTimeout(() => { setMessages([welcome]); inputRef.current?.focus(); }, 300);
    }
    if (isOpen) setUnreadCount(0);
  }, [isOpen, hasOpened]);

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setMessages((prev) => [...prev, {
      id: generateId(), role: "user", text: trimmed, timestamp: new Date(),
    }]);
    setInput(""); setIsTyping(true); setShowAllPills(false);
    setTimeout(() => {
      setIsTyping(false);
      const { answer, type, waMessage } = resolveQuery(trimmed);
      const botId = generateId();
      setMessages((prev) => [...prev, {
        id: botId, role: "bot", text: answer, timestamp: new Date(), waMessage,
      }]);
      if (shouldCaptureLead(type) && !leadSubmitted) setLeadMessageId(botId);
      if (isRedirectResponse(type)) setRedirectMessageId(botId);
    }, TYPING_DELAY_MS);
  }, [isTyping, leadSubmitted]);

  const handleLeadSubmit = (lead: LeadData) => {
    setLeadMessageId(null); setLeadSubmitted(true);
    setMessages((prev) => [...prev, {
      id: generateId(), role: "bot",
      text: `Thank you **${lead.name}**! 🎉 We'll reach out to **${lead.email}** shortly.`,
      timestamp: new Date(),
      waMessage: `Hello BN Intelhub! 💼 My name is ${lead.name}. I applied for the internship. Please get in touch!`,
    }]);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // POSITION LOGIC
  //
  // WhatsAppButton.tsx uses:  bottom: 24px,  right: 24px  (56px tall)
  //
  // Desktop FAB (unchanged):  top: 17px,     right: 935px
  //
  // Mobile FAB (NEW — stacked above WhatsApp on same right side):
  //   right: 16px   ← aligns with WhatsApp (right: 24px center ≈ 16px edge)
  //   bottom: 90px  ← 24px + 56px (WA height) + 10px gap = 90px
  //
  // Mobile chat window:
  //   right: 16px, bottom: 160px (above the two FABs)
  //   width: calc(100vw - 32px) capped at 370px
  // ─────────────────────────────────────────────────────────────────────────

  // FAB position
  const fabStyle: React.CSSProperties = isMobile
    ? { position: "fixed", bottom: "90px", right: "24px", zIndex: 200 }
    : { position: "fixed", top: "17px",    right: "935px", zIndex: 200 };

  // Chat window position — bottom-right always, but on mobile sits higher
  const windowStyle: React.CSSProperties = isMobile
    ? { bottom: "160px", right: "16px", left: "auto", width: "calc(100vw - 32px)", maxWidth: "370px" }
    : { bottom: "96px",  right: "24px", left: "auto", width: "370px" };

  return (
    <>
      {/* ── FAB ─────────────────────────────────────────────────────────── */}
      <div
        style={fabStyle}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
      >
        {/* Desktop hover tooltip only */}
        {hovered && !isOpen && !isMobile && (
          <div
            className="absolute top-full left-1/2 mt-2.5 -translate-x-1/2 whitespace-nowrap
                       text-white text-xs font-semibold px-3 py-1.5 rounded-lg
                       pointer-events-none select-none z-10"
            style={{
              background: "linear-gradient(135deg,#1e293b,#0f172a)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
              animation: "tooltipIn 0.15s ease forwards",
            }}
          >
            ✨ Chat with us!
            <span className="absolute bottom-full left-1/2 -translate-x-1/2"
              style={{
                width: 0, height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderBottom: "5px solid #1e293b",
              }} />
          </div>
        )}

        {/* AI orb / close */}
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open chat"
            className="relative flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ width: isMobile ? 52 : 46, height: isMobile ? 52 : 46 }}
          >
            {/* Glow rings */}
            <span className="absolute rounded-full" style={{
              inset: -5, border: "1.5px solid rgba(99,102,241,0.3)", borderRadius: "50%",
              animation: "ringPulse 2.2s ease-in-out infinite",
            }} />
            <span className="absolute rounded-full" style={{
              inset: -2, border: "1px solid rgba(59,130,246,0.2)", borderRadius: "50%",
              animation: "ringPulse 2.2s ease-in-out infinite", animationDelay: "0.5s",
            }} />
            {/* Orb */}
            <span className="absolute inset-0 rounded-full" style={{
              background: "linear-gradient(135deg,#3b82f6 0%,#6366f1 55%,#8b5cf6 100%)",
              boxShadow: "0 4px 20px rgba(99,102,241,0.55)",
              animation: "orbFloat 3s ease-in-out infinite",
            }} />
            {/* Shine */}
            <span className="absolute pointer-events-none" style={{
              top: 4, left: 5, width: "46%", height: "38%",
              background: "radial-gradient(ellipse,rgba(255,255,255,0.32) 0%,rgba(255,255,255,0) 100%)",
              borderRadius: "50%",
            }} />
            {/* Wave bars */}
            <span className="relative z-10"><SoundWaveBars size="md" /></span>
            {/* Unread badge */}
            {unreadCount > 0 && (
              <span className="absolute flex items-center justify-center text-white font-bold rounded-full"
                style={{
                  top: -3, right: -3, width: 18, height: 18, fontSize: 9,
                  background: "#ef4444", border: "2px solid white",
                  boxShadow: "0 1px 4px rgba(239,68,68,0.5)",
                  animation: "badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
                }}>
                {unreadCount}
              </span>
            )}
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="relative flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ width: isMobile ? 52 : 46, height: isMobile ? 52 : 46 }}
          >
            <span className="absolute inset-0 rounded-full" style={{
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              boxShadow: "0 4px 16px rgba(99,102,241,0.45)",
            }} />
            <span className="relative z-10 text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {/* ── Chat Window — bottom-right always ────────────────────────────── */}
      <div
        className={`fixed z-[9998] max-h-[580px] flex flex-col rounded-3xl overflow-hidden
                    border border-slate-200/60 transition-all duration-500 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        }`}
        style={{
          ...windowStyle,
          backdropFilter: "blur(20px)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.12), 0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(99,102,241,0.08)",
        }}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center gap-3 shrink-0"
          style={{ background: "linear-gradient(135deg,#1d4ed8 0%,#4f46e5 60%,#7c3aed 100%)" }}>
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-full flex items-center justify-center overflow-hidden relative"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                border: "1.5px solid rgba(255,255,255,0.2)",
              }}>
              <div style={{
                position: "absolute", top: 3, left: 4,
                width: "46%", height: "36%",
                background: "radial-gradient(ellipse,rgba(255,255,255,0.25) 0%,rgba(255,255,255,0) 100%)",
                borderRadius: "50%",
              }} />
              <SoundWaveBars size="md" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
              style={{ background: "#34d399", borderColor: "#4f46e5", boxShadow: "0 0 6px rgba(52,211,153,0.7)" }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-sm truncate">{BOT_NAME}</h3>
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md"
                style={{ background: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.95)" }}>
                AI
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
                style={{ boxShadow: "0 0 5px rgba(52,211,153,0.8)" }} />
              <p className="text-blue-100 text-xs truncate">{BOT_TAGLINE}</p>
            </div>
          </div>

          <button onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            style={{ background: "rgba(255,255,255,0.12)" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Rainbow shimmer */}
        <div className="h-[2px] shrink-0" style={{
          background: "linear-gradient(90deg,#3b82f6,#6366f1,#8b5cf6,#ec4899,#8b5cf6,#6366f1,#3b82f6)",
          backgroundSize: "200% 100%",
          animation: "rainbowShift 4s linear infinite",
        }} />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50/95"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#e2e8f0 transparent" }}>
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-8 gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden"
                style={{ background: "linear-gradient(135deg,#eff6ff,#eef2ff)" }}>
                <SoundWaveBars size="md" />
              </div>
              <p className="text-slate-400 text-sm">Starting conversation...</p>
            </div>
          )}
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg}
              showLeadForm={leadMessageId === msg.id}
              onLeadSubmit={handleLeadSubmit}
              onLeadSkip={() => setLeadMessageId(null)}
              showRedirectCTA={redirectMessageId === msg.id}
            />
          ))}
          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}>
                <SoundWaveBars size="sm" />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm shadow-sm">
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {!isTyping && (
          <SuggestionsPanel
            onSelect={sendMessage}
            showAll={showAllPills}
            onToggle={() => setShowAllPills((v) => !v)}
          />
        )}

        {/* Input */}
        <div className="px-4 py-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0">
          <input ref={inputRef} type="text" value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Type your message..."
            disabled={isTyping}
            className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-slate-400 text-slate-700 transition-all disabled:opacity-50"
          />
          <button onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-90 hover:brightness-110"
            style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}>
            <svg className="w-4 h-4 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="bg-white px-4 py-2 border-t border-slate-50 text-center shrink-0">
          <span className="text-[10px] text-slate-400 font-medium">
            Powered by{" "}
            <span className="font-semibold" style={{
              background: "linear-gradient(90deg,#3b82f6,#6366f1)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              BN Intelhub AI
            </span>
          </span>
        </div>
      </div>

      {/* ── Keyframes ────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes waveBar1 { 0%,100%{transform:scaleY(0.4)} 50%{transform:scaleY(1)}   }
        @keyframes waveBar2 { 0%,100%{transform:scaleY(0.7)} 50%{transform:scaleY(0.3)} }
        @keyframes waveBar3 { 0%,100%{transform:scaleY(1)}   50%{transform:scaleY(0.5)} }
        @keyframes waveBar4 { 0%,100%{transform:scaleY(0.5)} 50%{transform:scaleY(0.9)} }
        @keyframes waveBar5 { 0%,100%{transform:scaleY(0.3)} 50%{transform:scaleY(0.8)} }
        @keyframes orbFloat {
          0%,100%{transform:translateY(0);   box-shadow:0 4px 20px rgba(99,102,241,0.55);}
          50%    {transform:translateY(-2px); box-shadow:0 8px 28px rgba(99,102,241,0.65);}
        }
        @keyframes ringPulse {
          0%,100%{opacity:0.7;transform:scale(1);}
          50%    {opacity:0;  transform:scale(1.55);}
        }
        @keyframes tooltipIn {
          from{opacity:0;transform:translateX(-50%) translateY(-4px);}
          to  {opacity:1;transform:translateX(-50%) translateY(0);}
        }
        @keyframes waCtaIn {
          from{opacity:0;transform:translateY(4px);}
          to  {opacity:1;transform:translateY(0);}
        }
        @keyframes badgePop {
          from{transform:scale(0);}
          to  {transform:scale(1);}
        }
        @keyframes rainbowShift {
          0%  {background-position:0% center;}
          100%{background-position:200% center;}
        }
      `}</style>
    </>
  );
};

export default Chatbot;