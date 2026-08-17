import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Container } from './ui/Layout';
import { useState, useEffect, useRef, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ShaderBackground } from './ui/animated-shader-hero';
import { markSubmission, sanitizeEmail, sanitizePhone, sanitizeText, validateSubmission } from '@/lib/formSecurity';

const courses = [
  "Full Stack Developer",
  "Data Science",
  "Robotics",
  "Big Data",
  "IoT",
  "AI & ML",
  "Digital Marketing"
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [mobile, setMobile] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startedAtRef = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % courses.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const submissionError = validateSubmission({
      formKey: "hero-counselling",
      honeypot: website,
      startedAt: startedAtRef.current,
    });
    if (submissionError) {
      alert(submissionError);
      return;
    }

    const formData = new FormData();
    formData.append("entry.1345355600", sanitizeText(name));
    formData.append("entry.335730671", sanitizeEmail(email));
    formData.append("entry.994511878", sanitizeText(gradYear));
    formData.append("entry.11620289", sanitizeText(jobTitle));
    formData.append("entry.1963209061", sanitizePhone(mobile));

    try {
      setIsSubmitting(true);
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSfbERB8_CBmQ_2PrZUxgWJXD-Yf4YU9ZIydWLuhsOynL8dRVg/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );

      markSubmission("hero-counselling");
      alert("Form Submitted Successfully!");

      setName("");
      setEmail("");
      setGradYear("");
      setJobTitle("");
      setMobile("");
      setWebsite("");
      startedAtRef.current = Date.now();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex min-h-[calc(100svh-1px)] items-center overflow-hidden bg-black pt-24 pb-12 sm:pt-28 sm:pb-16">
      <div className="absolute inset-0 overflow-hidden">
        <ShaderBackground />
        <div className="absolute inset-0 bg-slate-950/58" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.28),transparent_34%),linear-gradient(90deg,rgba(2,6,23,0.94)_0%,rgba(2,6,23,0.76)_48%,rgba(2,6,23,0.62)_100%)]" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="text-left text-white">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-orange-200/25 bg-white/10 px-4 py-2 text-xs font-medium text-orange-50 shadow-lg shadow-black/10 backdrop-blur-md sm:mb-6 sm:text-sm"
            >
              <Sparkles className="h-4 w-4 flex-shrink-0 text-yellow-300" />
              <span className="truncate">Industry training, internships and software services</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 sm:mb-6">
              <div className="flex flex-col">
                <div className="min-h-[1.18em] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={courses[index]}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="block bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-200 bg-clip-text text-transparent"
                    >
                      {courses[index]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span>Training by BN Intelhub</span>
              </div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mb-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg"
            >
              Learn job-ready skills, work on practical projects, and get guidance from a team that builds real digital products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 flex-shrink-0 mt-1" />
                <p className="text-base sm:text-lg text-orange-50">
                  Upskill in <strong className="text-white">Industry-Relevant Skills</strong> with our comprehensive curriculum
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 flex-shrink-0 mt-1" />
                <p className="text-base sm:text-lg text-orange-50">
                  Build <strong className="text-white">real-world projects</strong> by mastering in-demand technologies
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 flex-shrink-0 mt-1" />
                <p className="text-base sm:text-lg text-orange-50">
                  Learn essential <strong className="text-white">concepts from scratch</strong> to advanced level
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#programs"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-orange-950/30 transition hover:from-orange-400 hover:to-yellow-300"
              >
                Explore Programs
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Talk to Counsellor
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/95 rounded-lg p-5 sm:p-6 md:p-7 shadow-2xl shadow-black/30 max-w-md lg:ml-auto w-full border border-white/60 backdrop-blur"
          >
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Free Career Counselling is just a call away
              </h3>
              <p className="text-slate-500 text-sm">
                Get guidance and clear your doubts.
              </p>
            </div>

            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="hidden"
                aria-hidden="true"
              />

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your Full Name"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Email Id <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email ID"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Graduation Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  placeholder="Year of Graduation"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>

                <div className="space-y-2">
                  {["Student", "Working Professional", "Other"].map((item) => (
                    <label key={item} className="flex items-center gap-2 text-slate-700">
                      <input
                        type="radio"
                        name="jobTitle"
                        value={item}
                        checked={jobTitle === item}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E11D48] hover:bg-[#BE123C] disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-colors shadow-lg shadow-red-900/20 text-lg"
              >
                {isSubmitting ? "Submitting..." : "Continue"}
              </button>

              <p className="text-xs text-slate-400 text-center leading-relaxed">
                By creating an account I have read and agree to BN Intelhub's <Link to="/terms-and-conditions" className="text-orange-600 hover:underline">Terms</Link> and <Link to="/privacy-policy" className="text-orange-600 hover:underline">Privacy Policy</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
