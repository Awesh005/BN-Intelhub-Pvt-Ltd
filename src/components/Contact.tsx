import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SectionWrapper, Container } from './ui/Layout';
import { Badge } from './ui/Badge';
import { markSubmission, sanitizeEmail, sanitizePhone, sanitizeText, validateSubmission } from '@/lib/formSecurity';

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startedAtRef = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const submissionError = validateSubmission({
      formKey: "contact-form",
      honeypot: website,
      startedAt: startedAtRef.current,
    });
    if (submissionError) {
      alert(submissionError);
      return;
    }

    const formData = new FormData();
    formData.append("entry.1404571374", sanitizeText(fullName));
    formData.append("entry.1855901574", sanitizeEmail(email));
    formData.append("entry.471054464", sanitizePhone(phone));
    formData.append("entry.1645794894", sanitizeText(interest));
    formData.append("entry.899394948", sanitizeText(message));

    try {
      setIsSubmitting(true);
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSfmELFPb5ieG-EdmNil6i_vo_soSvjBtyFf0Q_RmvesEm9xgw/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );

      markSubmission("contact-form");
      alert("Application Submitted Successfully!");

      setFullName("");
      setEmail("");
      setPhone("");
      setInterest("");
      setMessage("");
      setWebsite("");
      startedAtRef.current = Date.now();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("There was an error submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="contact" background="light">
      <Container>
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-6 border border-orange-200">
              Get in Touch
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display text-slate-900 leading-tight">
              Start Your Journey with <span className="text-orange-600">BN Intelhub</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mb-8 sm:mb-12 leading-relaxed">
              Have questions about our courses or internships? Fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Email Us</h4>

                  <a
                    href="mailto:bnintelhub@gmail.com"
                    className="text-slate-600 hover:text-orange-600 transition"
                  >
                    bnintelhub@gmail.com
                  </a>
                  <br />

                  <a
                    href="mailto:bnintelhub.services@gmail.com"
                    className="text-slate-600 hover:text-orange-600 transition"
                  >
                    bnintelhub.services@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Call Us</h4>

                  <a
                    href="tel:+918936078905"
                    className="text-slate-600 hover:text-orange-600 transition"
                  >
                    +91 8936078905
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Visit Us</h4>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=STPI+Plot-8+Part+Namkum+Industrial+Area+Ranchi+834010"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-orange-600 transition"
                  >
                    STPI- Plot -8 Part, Namkum <br />
                    Industrial Area, Namkum Ranchi - 834010
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-5 sm:p-7 md:p-8 shadow-xl border border-slate-200"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              BN Intelhub - Enrollment Application Form
            </h3>

            <p className="text-slate-500 mb-6 text-sm">
              Please complete this form to apply for our programs. Our team will contact you shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="hidden"
                aria-hidden="true"
              />

              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
              />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
              />

              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
              />

              <select
                required
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
              >
                <option value="">Select Interest</option>
                <option value="Software Development Services">
                  Software Development Services
                </option>
                <option value="Professional Training Courses">
                  Professional Training Courses
                </option>
                <option value="Internship Programs">
                  Internship Programs
                </option>
              </select>

              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your background and goals..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-400 disabled:bg-slate-400 disabled:cursor-not-allowed text-slate-950 disabled:text-white py-4 rounded-lg font-semibold transition-all"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </motion.div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
