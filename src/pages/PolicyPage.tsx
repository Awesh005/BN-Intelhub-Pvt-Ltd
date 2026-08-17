import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Cards';
import { Container } from '../components/ui/Layout';

export type PolicySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

interface PolicyPageProps {
  badgeText: string;
  title: string;
  subtitle: string;
  effectiveDate: string;
  sections: PolicySection[];
  contactEmail: string;
}

const pageFlowVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const flowItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function PolicyPage({
  badgeText,
  title,
  subtitle,
  effectiveDate,
  sections,
  contactEmail,
}: PolicyPageProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageFlowVariants}
      className="pt-20 min-h-screen bg-slate-50"
    >
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-orange-500/30 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-amber-500/30 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <motion.div
            variants={flowItemVariants}
            className="max-w-3xl"
          >
            <div className="mb-6 space-y-3">
              <div className="h-1.5 w-24 rounded-full bg-white/70" />
              <div className="h-1.5 w-40 rounded-full bg-white/20" />
            </div>
            <Badge variant="outline" className="mb-6 border-white/20 bg-white/10 text-white">
              {badgeText}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight mb-4">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6">
              {subtitle}
            </p>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              {effectiveDate}
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <motion.div variants={flowItemVariants} className="mb-8">
            <div className="flex items-center gap-3 text-slate-500">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                Page Structure
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
          </motion.div>

          <div className="relative grid gap-6">
            <div className="absolute left-6 top-0 bottom-0 hidden w-px bg-slate-200 md:block" />
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                variants={flowItemVariants}
                className="relative"
              >
                <div className="absolute left-[17px] top-10 z-10 hidden h-4 w-4 rounded-full border-4 border-slate-50 bg-orange-500 md:block" />
                <Card className="p-6 md:p-8 border-slate-200 shadow-sm md:ml-12">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-semibold">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="space-y-2">
                        <div className="h-1.5 w-16 rounded-full bg-orange-200" />
                        <div className="h-1.5 w-24 rounded-full bg-slate-200" />
                      </div>
                    </div>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="space-y-2 pl-5 list-disc text-slate-600">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={flowItemVariants} className="mt-10">
            <Card className="p-6 md:p-8 bg-slate-900 text-white border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2">Contact us</h2>
                  <p className="text-slate-300">
                    For questions about these policies, reach out to our team.
                  </p>
                </div>
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-2 text-orange-300 hover:text-white transition-colors"
                >
                  <Mail size={18} />
                  {contactEmail}
                </a>
              </div>
            </Card>
          </motion.div>
        </Container>
      </section>
    </motion.div>
  );
}
