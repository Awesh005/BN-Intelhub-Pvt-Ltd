import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { SectionWrapper, Container } from './ui/Layout';
import { Badge } from './ui/Badge';

const FAQS = [
  {
    question: "Do I need prior coding experience to join?",
    answer: "No, our courses are designed for all levels. We start from the basics and guide you to advanced topics. For specialized courses like AI/ML, some basic programming knowledge is helpful but not mandatory."
  },
  {
    question: "Is the internship guaranteed?",
    answer: "Yes, our internship program guarantees real-world project experience. We partner with various companies to provide live projects, ensuring you gain practical skills that employers value."
  },
  {
    question: "Do you offer placement assistance?",
    answer: "Absolutely! We have a dedicated placement cell that helps with resume building, mock interviews, and connecting you with our hiring partners. We support you until you land a job."
  },
  {
    question: "Can I pay the fees in installments?",
    answer: "Yes, we offer flexible EMI options and installment plans to make quality education accessible to everyone. Contact our admissions team for more details."
  },
  {
    question: "Are the classes online or offline?",
    answer: "We offer both online and offline modes. Our online classes are live and interactive, while our offline centers provide a collaborative learning environment."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionWrapper id="faq" background="white">
      <Container>
        <div className="text-center mb-10 sm:mb-16">
          <Badge variant="secondary" className="mb-4 border border-orange-200">
            Common Questions
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-slate-900">
            Frequently Asked <span className="text-orange-600">Questions</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about our programs and services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full text-left p-4 sm:p-6 rounded-lg border transition-all duration-300 flex justify-between items-center gap-4 ${
                  openIndex === index
                    ? 'bg-orange-50/60 border-orange-200 shadow-sm'
                    : 'bg-white border-slate-100 hover:border-orange-100'
                }`}
              >
                <span className={`font-semibold text-base sm:text-lg ${openIndex === index ? 'text-orange-950' : 'text-slate-700'}`}>
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-orange-600' : 'text-slate-400'
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-6 pt-2 text-slate-600 leading-relaxed border-x border-b border-orange-100/70 rounded-b-lg bg-orange-50/30 mx-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
