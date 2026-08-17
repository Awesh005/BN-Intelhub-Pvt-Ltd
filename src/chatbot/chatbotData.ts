

export interface FAQEntry {
  keywords: string[];
  answer: string;
  type?: "redirect" | "lead" | "info";
  whatsapp?: string; 
}

export interface SuggestionPill {
  label: string;
  query: string;
}

const WA_PHONE = "918936078905";

export const buildWAUrl = (message: string) =>
  `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;

export const FAQ_DATA: FAQEntry[] = [

  // ── Greetings ──────────────────────────────────────────────────────────────
  {
    keywords: ["hi", "hello", "hey", "hii", "helo", "start", "help"],
    answer:
      "Hello 👋 Welcome to **BN Intelhub**!\n\nWe are a leading company offering:\n\n• 🎓 **Training & Internship Programs**\n• 💻 **IT Development Services**\n• 🤖 **AI & Automation Solutions**\n\nHow can I assist you today?",
    type: "info",
  },

  // ── About ──────────────────────────────────────────────────────────────────
  {
    keywords: ["about", "company", "who are you", "bn intelhub", "intelhub", "what do you do"],
    answer:
      "**BN Intelhub** is an innovation-driven company based at **STPI Ranchi, Jharkhand**.\n\n🏢 *Innovations in Training, Software, AI and Robotics*\n\nWe specialize in:\n• 🌐 Software & Web Development\n• 🤖 AI & Automation\n• 🎓 Training & Internship Programs\n• 📱 Mobile App Development\n• 🎨 Graphic Design & Video Production\n\n📍 Namkum Industrial Area, Ranchi, Jharkhand 834010",
    type: "info",
    whatsapp: "Hello BN Intelhub! 👋 I'd like to know more about your company and services.",
  },

  // ── All Services ───────────────────────────────────────────────────────────
  {
    keywords: ["services", "all services", "what services", "offerings", "packages", "startup", "it setup"],
    answer:
      "🚀 **Our Fast Services (Startup IT Setup Package)**\n\n1. 🌐 **Web Development**\n2. 📱 **Mobile App Development**\n3. 💻 **Software Development**\n4. 🤖 **AI & Automation Solutions**\n5. 🎨 **Graphic Designing**\n6. 🎬 **Video Production & Editing**\n7. 📣 **Digital Marketing**\n8. ☁️ **Cloud & IT Support**\n9. 🎓 **Training & Development**\n\nWhich service would you like to know more about?",
    type: "redirect",
    whatsapp: "Hello BN Intelhub! 🚀 I'd like to know more about your IT services and packages.",
  },

  // ── Web Development ────────────────────────────────────────────────────────
  {
    keywords: ["web development", "website", "web design", "landing page", "frontend", "backend", "html", "react", "node"],
    answer:
      "🌐 **Web Development** at BN Intelhub:\n\n• Custom business websites & portals\n• Frontend (HTML, CSS, React, Next.js)\n• Backend (Node.js, Express, PHP)\n• E-commerce & CMS solutions\n• Responsive & SEO-optimized design\n• Real-world project-based training also available!",
    type: "redirect",
    whatsapp: "Hello BN Intelhub! 🌐 I'm interested in Web Development services. Please share more details.",
  },

  // ── Mobile App ─────────────────────────────────────────────────────────────
  {
    keywords: ["mobile app", "app development", "android", "ios", "flutter", "react native", "mobile"],
    answer:
      "📱 **Mobile App Development** at BN Intelhub:\n\n• Android & iOS app development\n• Cross-platform apps (Flutter, React Native)\n• UI/UX design for mobile\n• API integration & backend setup\n• App testing & deployment",
    type: "redirect",
    whatsapp: "Hello BN Intelhub! 📱 I'm interested in Mobile App Development. Can we discuss my requirements?",
  },

  // ── Software Development ───────────────────────────────────────────────────
  {
    keywords: ["software development", "software", "desktop app", "erp", "crm", "custom software"],
    answer:
      "💻 **Software Development** at BN Intelhub:\n\n• Custom software solutions for businesses\n• ERP & CRM systems\n• Desktop application development\n• Database design & management\n• API development & integration\n• Quality testing & maintenance",
    type: "redirect",
    whatsapp: "Hello BN Intelhub! 💻 I need a custom software solution. Can we connect?",
  },

  // ── AI & Automation ────────────────────────────────────────────────────────
  {
    keywords: ["ai", "artificial intelligence", "automation", "machine learning", "deep learning", "robotics", "ml", "nlp", "chatbot development", "rpa"],
    answer:
      "🤖 **AI & Automation Solutions** at BN Intelhub:\n\n• AI-powered application development\n• Machine Learning & Deep Learning models\n• Robotics & IoT solutions\n• RPA (Robotic Process Automation)\n• NLP & Chatbot development\n• Data analysis & prediction models\n\nWe also offer **AI Training programs** for students & professionals!",
    type: "info",
    whatsapp: "Hello BN Intelhub! 🤖 I'm interested in AI & Automation solutions. Please share details.",
  },

  // ── Graphic Design ─────────────────────────────────────────────────────────
  {
    keywords: ["graphic", "graphic design", "logo", "branding", "poster", "banner", "design", "ui ux", "figma", "adobe"],
    answer:
      "🎨 **Graphic Designing** at BN Intelhub:\n\n• Logo & brand identity design\n• Social media creatives & banners\n• UI/UX design (Figma, Adobe XD)\n• Brochures, posters & print design\n• Marketing materials & pitch decks",
    type: "info",
    whatsapp: "Hello BN Intelhub! 🎨 I'm interested in Graphic Design services. Can we discuss?",
  },

  // ── Video Production ───────────────────────────────────────────────────────
  {
    keywords: ["video", "video production", "video editing", "reels", "youtube", "animation", "motion graphics", "editing"],
    answer:
      "🎬 **Video Production & Editing** at BN Intelhub:\n\n• Corporate video production\n• Product demo & explainer videos\n• Social media reels & YouTube content\n• Motion graphics & 2D animation\n• Professional video editing\n• Training videos & e-learning content",
    type: "redirect",
    whatsapp: "Hello BN Intelhub! 🎬 I need video production services. Let's connect!",
  },

  // ── Digital Marketing ──────────────────────────────────────────────────────
  {
    keywords: ["digital marketing", "seo", "social media", "marketing", "ads", "google ads", "facebook ads", "content marketing", "email marketing"],
    answer:
      "📣 **Digital Marketing** at BN Intelhub:\n\n• SEO & website ranking\n• Social media management\n• Google & Facebook Ads\n• Content marketing & blogging\n• Email marketing campaigns\n• Brand awareness & lead generation",
    type: "redirect",
    whatsapp: "Hello BN Intelhub! 📣 I'm interested in Digital Marketing services. Please share details.",
  },

  // ── Cloud & IT Support ─────────────────────────────────────────────────────
  {
    keywords: ["cloud", "cloud computing", "it support", "aws", "azure", "hosting", "server", "devops", "network"],
    answer:
      "☁️ **Cloud & IT Support** at BN Intelhub:\n\n• Cloud setup (AWS, Azure, Google Cloud)\n• Server hosting & management\n• DevOps & CI/CD pipelines\n• Network setup & IT infrastructure\n• 24/7 technical support",
    type: "redirect",
    whatsapp: "Hello BN Intelhub! ☁️ I need Cloud & IT Support services. Can we connect?",
  },

  // ── Training Overview ──────────────────────────────────────────────────────
  {
    keywords: ["training", "course", "courses", "programs", "learn", "study", "certification", "syllabus"],
    answer:
      "🎓 **Training Programs at BN Intelhub:**\n\n• 🌐 Full Stack Web Development\n• 📊 Data Science & Analytics\n• 🤖 AI & Machine Learning\n• 📱 Mobile App Development\n• 🎨 Graphic Design & UI/UX\n• 📣 Digital Marketing\n• ☁️ Cloud Computing\n• 🎬 Video Editing & Production\n• 💻 Software Development\n\nAll courses include **real-world projects + certification**. Which interests you?",
    type: "info",
    whatsapp: "Hello BN Intelhub! 🎓 I want to know about your Training Programs. Please share details.",
  },

  // ── Full Stack ─────────────────────────────────────────────────────────────
  {
    keywords: ["full stack", "fullstack", "web development course", "mern", "mean"],
    answer:
      "🌐 **Full Stack Development Course:**\n\n• HTML, CSS, JavaScript & React\n• Node.js, Express & REST APIs\n• Databases: MySQL & MongoDB\n• Git, GitHub & deployment\n• Real-world project building\n• Job-readiness preparation\n\n🏆 Certification + Internship opportunity included!",
    type: "info",
    whatsapp: "Hello BN Intelhub! 🌐 I'm interested in the Full Stack Development course. Please share the syllabus and fee details.",
  },

  // ── Data Science ───────────────────────────────────────────────────────────
  {
    keywords: ["data science", "data analytics", "data analysis", "python", "pandas", "numpy", "tableau", "power bi"],
    answer:
      "📊 **Data Science & Analytics Course:**\n\n• Python for Data Analysis (Pandas, NumPy)\n• Data visualization (Matplotlib, Tableau, Power BI)\n• Machine Learning fundamentals\n• Real-world datasets & case studies\n• Statistics & probability\n• Capstone project + certification",
    type: "info",
    whatsapp: "Hello BN Intelhub! 📊 I'm interested in the Data Science course. Please share details.",
  },

  // ── AI Training ────────────────────────────────────────────────────────────
  {
    keywords: ["ai training", "artificial intelligence course", "ml course", "machine learning course", "deep learning course"],
    answer:
      "🤖 **AI & Machine Learning Course:**\n\n• Python + ML libraries (Scikit-learn, TensorFlow)\n• Supervised & unsupervised learning\n• Deep learning & neural networks\n• NLP & Computer Vision basics\n• AI project with real-world use cases\n• Robotics & automation modules\n\n🎓 Certification + placement support provided!",
    type: "info",
    whatsapp: "Hello BN Intelhub! 🤖 I'm interested in the AI & ML course. Please share the details.",
  },

  // ── Mobile App Course ──────────────────────────────────────────────────────
  {
    keywords: ["mobile app course", "android course", "flutter course", "app development training"],
    answer:
      "📱 **Mobile App Development Course:**\n\n• Flutter / React Native fundamentals\n• UI design for mobile\n• State management & APIs\n• Firebase integration\n• Publish app on Play Store\n• Real project + certification",
    type: "info",
    whatsapp: "Hello BN Intelhub! 📱 I'm interested in the Mobile App Development course. Please share details.",
  },

  // ── Graphic Design Course ──────────────────────────────────────────────────
  {
    keywords: ["graphic design course", "ui ux course", "figma course", "design course", "photoshop", "illustrator"],
    answer:
      "🎨 **Graphic Design & UI/UX Course:**\n\n• Design principles & color theory\n• Figma, Adobe Photoshop & Illustrator\n• Logo, poster & banner creation\n• UI/UX for web & mobile apps\n• Portfolio building\n• Freelance career guidance\n\n🏆 Certification included!",
    type: "info",
    whatsapp: "Hello BN Intelhub! 🎨 I'm interested in the Graphic Design & UI/UX course. Please share details.",
  },

  // ── Digital Marketing Course ───────────────────────────────────────────────
  {
    keywords: ["digital marketing course", "seo course", "social media course", "marketing training"],
    answer:
      "📣 **Digital Marketing Course:**\n\n• SEO & Google Search Console\n• Social Media Marketing (Instagram, LinkedIn)\n• Google Ads & Facebook Ads\n• Content creation & blogging\n• Email marketing tools\n• Analytics & reporting\n\n📜 Certification + live campaign practice!",
    type: "info",
    whatsapp: "Hello BN Intelhub! 📣 I'm interested in the Digital Marketing course. Please share details.",
  },

  // ── Cloud Course ───────────────────────────────────────────────────────────
  {
    keywords: ["cloud course", "cloud training", "aws course", "devops course", "cloud computing course"],
    answer:
      "☁️ **Cloud Computing Course:**\n\n• Cloud fundamentals (AWS / Azure)\n• Virtual machines & storage\n• Networking & security basics\n• DevOps & CI/CD pipelines\n• Deployment of real projects\n• Certification preparation",
    type: "info",
    whatsapp: "Hello BN Intelhub! ☁️ I'm interested in the Cloud Computing course. Please share details.",
  },

  // ── Video Editing Course ───────────────────────────────────────────────────
  {
    keywords: ["video editing course", "video production course", "premiere pro", "after effects", "editing course"],
    answer:
      "🎬 **Video Production & Editing Course:**\n\n• Adobe Premiere Pro & After Effects\n• Shooting techniques & storyboarding\n• Motion graphics & transitions\n• YouTube & Reels content creation\n• Color grading & audio editing\n• Portfolio project + certification",
    type: "info",
    whatsapp: "Hello BN Intelhub! 🎬 I'm interested in the Video Editing course. Please share details.",
  },

  // ── Internship ─────────────────────────────────────────────────────────────
  {
    keywords: ["internship", "intern", "industrial training", "on the job", "live project", "placement"],
    answer:
      "💼 **Internship Programs at BN Intelhub:**\n\n• Live project experience across all domains\n• Mentorship from industry professionals\n• Hands-on training at STPI Ranchi office\n• Certificate of completion\n• Letter of recommendation\n• Placement assistance\n\nDomains: Web Dev, AI/ML, Mobile App, Design, Digital Marketing, Cloud",
    type: "lead",
    whatsapp: "Hello BN Intelhub! 💼 I'm interested in your Internship Program. Please share eligibility and application details.",
  },

  // ── Pricing ────────────────────────────────────────────────────────────────
  {
    keywords: ["price", "cost", "fees", "fee", "pricing", "charges", "how much", "rate", "package"],
    answer:
      "💰 **Pricing at BN Intelhub:**\n\nPricing varies depending on:\n• Course / Internship type & duration\n• Development project scope\n• IT setup package requirements\n\nContact us directly for a detailed quote:",
    type: "info",
    whatsapp: "Hello BN Intelhub! 💰 I'd like to know the pricing/fees for your courses and services. Please share details.",
  },

  // ── Contact ────────────────────────────────────────────────────────────────
  {
    keywords: ["contact", "phone", "email", "reach", "call", "address", "location", "office", "ranchi", "jharkhand"],
    answer:
      "📬 **Contact BN Intelhub:**\n\n📞 **8936078905** | **9041289863** | **08877446631**\n📧 **bNintelhub.services@gmail.com**\n🌐 **www.bnitelhub.com**\n\n📍 STPI Ranchi, Plot-8 Part, Namkum Industrial Area,\nNamkum, Ranchi, Jharkhand 834010\n\nOr reach us directly on WhatsApp:",
    type: "info",
    whatsapp: "Hello BN Intelhub! 📬 I'd like to get in touch with your team.",
  },

  // ── Website ────────────────────────────────────────────────────────────────
  {
    keywords: ["website", "www", "bnitelhub", "web url", "link"],
    answer:
      "🌐 Visit our official website:\n\n**www.bnitelhub.com**\n\nYou'll find our complete service catalog, training programs, and portfolio there!",
    type: "info",
  },

  // ── Development Services Redirect ──────────────────────────────────────────
  {
    keywords: ["development services", "it services", "hire", "build for me", "develop", "project development", "outsource"],
    answer:
      "🛠️ For **Development Services**, please visit the **'Development Services'** section from the navbar.\n\nWe provide:\n• 🌐 Web & Mobile App Development\n• 💻 Custom Software Solutions\n• 🤖 AI & Automation\n• 🎨 Design & Branding\n• 📣 Digital Marketing\n• ☁️ Cloud & IT Support",
    type: "redirect",
    whatsapp: "Hello BN Intelhub! 🛠️ I need development services for my project. Can we discuss?",
  },
];

export const SUGGESTIONS: SuggestionPill[] = [
  { label: "📚 All Courses",       query: "courses available" },
  { label: "🚀 All Services",      query: "all services" },
  { label: "💼 Internship",        query: "internship details" },
  { label: "🌐 Full Stack",        query: "full stack" },
  { label: "📊 Data Science",      query: "data science" },
  { label: "🤖 AI & ML",           query: "ai training" },
  { label: "📱 Mobile App",        query: "mobile app course" },
  { label: "🎨 Graphic Design",    query: "graphic design course" },
  { label: "📣 Digital Marketing", query: "digital marketing course" },
  { label: "☁️ Cloud Computing",   query: "cloud course" },
  { label: "🎬 Video Editing",     query: "video editing course" },
  { label: "🌐 Web Dev",           query: "web development" },
  { label: "🤖 AI Solutions",      query: "ai automation solutions" },
  { label: "💰 Pricing",           query: "pricing" },
  { label: "📬 Contact",           query: "contact" },
  { label: "🛠️ Dev Services",      query: "development services" },
];

export const FALLBACK_ANSWER =
  "🤔 Sorry, I didn't quite understand that.\n\nYou can ask me about:\n• **Courses & Training** (Full Stack, AI, Data Science...)\n• **Services** (Web, App, AI, Design, Cloud...)\n• **Internship** opportunities\n• **Pricing** or **Contact** info\n\nOr contact us directly at 📧 **bNintelhub.services@gmail.com**";

export const BOT_NAME        = "BN Intelhub Assistant";
export const BOT_TAGLINE     = "Training · Services · Internships";
export const TYPING_DELAY_MS = 1100;