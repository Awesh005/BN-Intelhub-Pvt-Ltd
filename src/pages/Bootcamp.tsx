import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BarChart, Briefcase, Calendar, CheckCircle, ChevronDown, Clock, Code, Cpu, GraduationCap, Laptop, Smartphone, Sparkles, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Cards';
import { PrimaryButton, SecondaryButton } from '../components/ui/Buttons';
import { Container, SectionWrapper } from '../components/ui/Layout';
import BootcampEnquiryModal from '../components/BootcampEnquiryModal';

const highlights = [
  { label: 'Duration', value: '5-6 Weeks', icon: <Calendar className="h-5 w-5" /> },
  { label: 'Batch Size', value: '25-30 Learners', icon: <Users className="h-5 w-5" /> },
  { label: 'Mode', value: 'Online + Offline', icon: <Laptop className="h-5 w-5" /> },
  { label: 'Mentor Hours', value: '2x per week', icon: <Clock className="h-5 w-5" /> },
];

const outcomes = [
  {
    title: 'Portfolio ready projects',
    description: 'Build 4 real projects that showcase your skills to hiring teams.',
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    title: 'Interview readiness',
    description: 'Mock interviews, resume polishing, and LinkedIn reviews included.',
    icon: <GraduationCap className="h-6 w-6" />,
  },
  {
    title: 'Mentor driven feedback',
    description: 'Weekly code reviews and 1:1 guidance to fix gaps fast.',
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: 'Verified certification',
    description: 'Completion certificate with assessment report and skill mapping.',
    icon: <CheckCircle className="h-6 w-6" />,
  },
];

const whatsNewItems = [
  {
    title: 'Industry exposure + work culture',
    description: 'Understand how real teams work, communicate, and deliver.',
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    title: '5-6 week focused sprint',
    description: 'Short and intense program built for quick learning and application.',
    icon: <Calendar className="h-6 w-6" />,
  },
  {
    title: 'Learn from the basics',
    description: 'Start from fundamentals and grow step-by-step with mentor guidance.',
    icon: <GraduationCap className="h-6 w-6" />,
  },
  {
    title: 'Learn what matters',
    description: 'Only practical skills used in real projects across 4 tracks.',
    icon: <Sparkles className="h-6 w-6" />,
  },
];

const tracks = [
  {
    title: 'Web Development',
    description: 'Build modern web apps from UI to API and deployment.',
    icon: <Code className="h-6 w-6" />,
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Android Development',
    description: 'Create Android apps with real device testing and Play Store prep.',
    icon: <Smartphone className="h-6 w-6" />,
    skills: ['Java/Kotlin', 'Android Studio', 'APIs', 'Firebase', 'UI/UX'],
  },
  {
    title: 'Data Analytics',
    description: 'Learn data pipelines, analytics, and applied insights.',
    icon: <BarChart className="h-6 w-6" />,
    skills: ['Python', 'Excel', 'SQL', 'Power BI', 'Statistics'],
  },
  {
    title: 'Full Stack AI - PHP/Java/Node/Python',
    description: 'Build AI-powered apps using modern backend stacks.',
    icon: <Cpu className="h-6 w-6" />,
    skills: ['PHP', 'Java', 'Node.js', 'Python', 'AI basics'],
  },
];

const onlineBootcampPoints = [
  'Learn from anywhere with focused daily live sessions',
  'Choose from Web, Android, Data Analytics, or Full Stack AI tracks',
  'Build projects with modern tools (React, Node, Firebase, Power BI)',
  'Fast doubt-solving with direct WhatsApp support',
  'Weekly competitions + mentor-led tasks and challenges',
  'Real-world projects with every module',
  'Structured learning system that keeps you disciplined',
  'Perfect for students balancing college or work life',
];

const offlineBootcampPoints = [
  'Learn in person with a focused, high-performance classroom environment',
  'Build stronger discipline with a consistent, structured daily routine',
  'Get instant on-spot mentor help for faster doubt-solving',
  'Experience real teamwork, live collaboration, and presentations',
  'More competitions, in-person tech activities, weekly code sprints',
  'Perfect for students who want full focus and a driven community',
  'Sharpen communication and presentation skills through real practice',
  'Weekly personality development sessions to level up confidence',
  'Weekly offline mini-projects to build real momentum',
];

const roadmap = [
  {
    title: 'Foundations',
    description: 'Core concepts, tooling, and daily practice to build confidence fast.',
  },
  {
    title: 'Build sprints',
    description: 'Weekly assignments with mentor review and feedback loops.',
  },
  {
    title: 'Capstone build',
    description: 'Team project with real client style requirements and demo day.',
  },
  {
    title: 'Career launch',
    description: 'Interview prep, mock panels, and placement support.',
  },
];

const capstones = [
  {
    title: 'Product Launch Platform',
    description: 'Responsive landing, admin dashboard, and analytics insights.',
    tags: ['UI/UX', 'Auth', 'Analytics'],
  },
  {
    title: 'Data Insight Pipeline',
    description: 'Automated data cleaning, model training, and reporting.',
    tags: ['ETL', 'ML', 'Dashboards'],
  },
];

const pricingPlans = [
  {
    mode: 'Online Bootcamp',
    description: 'Build real-world projects, master core technologies, and become industry-ready.',
    price: '₹3,000',
    priceNote: '(3,000 + 18% GST)',
    includes: [
      'One-on-One Challenges',
      'Exclusive Tech Masterclasses',
      'Live Doubt Solving Sessions',
      'Peer Code Reviews',
      'Offline 2-Day Hackathon Finale',
    ],
    hours: '150Hrs',
  },
  {
    mode: 'Offline Bootcamp',
    description: 'Learn in a real tech environment with mentors, teams, and live competitions.',
    price: '₹3,000',
    priceNote: '(3,000 + 18% GST)',
    includes: [
      'In-Person Team Challenges',
      'Daily Classroom Sessions',
      'On-Campus Tech Masterclasses',
      'Real-Time Mentor Support',
      'Offline Mini Hack Sprints',
      'Leadership & Presentation Drills',
    ],
    hours: '150Hrs',
  },
];

const syllabus = [
  {
    title: 'Web Development',
    intro: 'Start from web basics and build a complete full stack foundation.',
    topics: [
      'HTML, CSS, responsive layout basics',
      'JavaScript essentials + DOM practice',
      'React fundamentals and component flow',
      'Backend intro with Node.js + Express',
      'MongoDB basics + CRUD operations',
      'APIs, auth basics, deployment + Git/GitHub',
    ],
  },
  {
    title: 'Android Development',
    intro: 'Build Android apps from the basics to Play Store readiness.',
    topics: [
      'Java/Kotlin basics and Android Studio setup',
      'UI layouts, activities, fragments',
      'Networking and REST API integration',
      'Firebase auth + database basics',
      'Testing, debugging, and device deployment',
      'Mini project: real app flow',
    ],
  },
  {
    title: 'Data Analytics',
    intro: 'Clean, analyze, and visualize real datasets in 5-6 weeks.',
    topics: [
      'Excel essentials and data handling',
      'Python basics + Pandas',
      'SQL queries and joins',
      'Data cleaning + EDA',
      'Power BI dashboards',
      'Mini project: insights report',
    ],
  },
  {
    title: 'Full Stack AI - PHP/Java/Node/Python',
    intro: 'Choose a backend stack and integrate AI features end to end.',
    topics: [
      'Core programming basics for selected stack',
      'REST APIs + database fundamentals',
      'AI/API integration and automation',
      'Prompting and model usage basics',
      'Security + deployment basics',
      'Mini project: AI powered app',
    ],
  },
];

export default function Bootcamp() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-20">
      <BootcampEnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-20 lg:py-24 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.35),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(251,191,36,0.25),transparent_40%),linear-gradient(135deg,rgba(2,6,23,0.96),rgba(15,23,42,0.9))]" />
        </div>

        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="glass" className="mb-6 border-white/20 text-white">
                BN Intelhub Bootcamp
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-5">
                A 5-6 week bootcamp that builds real industry confidence
              </h1>
              <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                Get industry exposure, understand work culture, and learn technology from the basics.
                We follow a simple idea: learn what matters, build what matters.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <PrimaryButton
                  className="bg-orange-500 text-slate-950 hover:bg-orange-400"
                  icon={<ArrowRight size={16} />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Apply for Bootcamp
                </PrimaryButton>
                <SecondaryButton
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  onClick={() => navigate('/courses')}
                >
                  View Courses
                </SecondaryButton>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div className="text-orange-200">{item.icon}</div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-300">{item.label}</p>
                      <p className="font-semibold text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-white/95 text-slate-900 border border-white/60 shadow-2xl shadow-black/20">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-white">
                    Next Cohort
                  </Badge>
                  <span className="text-xs text-slate-500">Limited seats</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold">Start in 2 weeks</h3>
                <p className="text-slate-600 text-sm mt-2">
                  5-6 week schedule focused on fundamentals, projects, and industry exposure.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-orange-500" />
                    <span className="text-sm text-slate-700">Mon to Saturday</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <span className="text-sm text-slate-700">2 hours live + 1 hour labs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-orange-500" />
                    <span className="text-sm text-slate-700">Small cohorts for 1:1 focus</span>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-orange-50 border border-orange-100 px-4 py-3 text-sm text-slate-600">
                  Get a curriculum plan and free counselling call before you join.
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      <SectionWrapper background="white">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-orange-50">
              Bootcamp Outcomes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-3">
              Learn what matters and apply it fast
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              A short, focused journey that starts from basics and ends with real industry learning.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((item, index) => (
              <Card
                key={item.title}
                className="h-full"
                hoverEffect={true}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper background="light">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-white">
              What's New?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-3">
              What makes this bootcamp better than the rest
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Short, focused learning with real industry exposure and practical outcomes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whatsNewItems.map((item, index) => (
              <Card
                key={item.title}
                className="h-full"
                hoverEffect={true}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-lg bg-white text-orange-600 flex items-center justify-center mb-5 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper background="white">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-orange-50">
              Difference
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-3">
              Online Bootcamp vs Offline Bootcamp
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Choose the format that matches your routine and learning style.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="h-full border-slate-200" hoverEffect={true}>
              <Badge variant="outline" className="mb-4 bg-white">
                Online Bootcamp
              </Badge>
              <p className="text-sm text-slate-600 mb-5">
                An exclusive online bootcamp by BN Intelhub.
              </p>
              <ul className="space-y-2">
                {onlineBootcampPoints.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="h-full border-slate-200" hoverEffect={true}>
              <Badge variant="outline" className="mb-4 bg-white">
                Offline Bootcamp
              </Badge>
              <p className="text-sm text-slate-600 mb-5">
                An exclusive offline bootcamp by BN Intelhub.
              </p>
              <ul className="space-y-2">
                {offlineBootcampPoints.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper background="light">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-white">
              Bootcamp Tracks
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-3">
              Pick the track that fits your goal
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Each track includes live sessions, labs, and a capstone project.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {tracks.map((track, index) => (
              <Card
                key={track.title}
                className="h-full"
                hoverEffect={true}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                    {track.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{track.title}</h3>
                    <p className="text-sm text-slate-600 mt-2">{track.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {track.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper background="white">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-orange-50">
              What You'll Study
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-3">
              5-6 weeks of structured, practical engineering
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Introduction syllabus designed to cover the essentials without wasting time.
            </p>
          </div>

          <div className="space-y-4">
            {syllabus.map((item) => (
              <details key={item.title} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="flex items-start justify-between gap-4 list-none cursor-pointer [&::-webkit-details-marker]:hidden">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{item.intro}</p>
                  </div>
                  <span className="flex items-center gap-2 text-sm font-semibold text-orange-600">
                    Expand
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </span>
                </summary>

                <div className="mt-4 border-t border-slate-100 pt-4">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {item.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper background="white">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-orange-50">
              Simple Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-3">
              Pick the plan that fits your bootcamp goal
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Transparent pricing with everything you need to become industry-ready.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {pricingPlans.map((plan) => (
              <Card key={plan.mode} className="h-full border-slate-200" hoverEffect={true}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-orange-600 font-semibold">
                      {plan.mode}
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">{plan.mode}</h3>
                  </div>
                  <Badge variant="outline" className="bg-white">
                    Delivery Time
                  </Badge>
                </div>

                <p className="text-sm text-slate-600 mt-3 leading-relaxed">{plan.description}</p>

                <div className="mt-6 flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-sm text-slate-500">{plan.priceNote}</span>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-slate-900 mb-3">What's Included</p>
                  <ul className="space-y-2">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Delivery Time</p>
                    <p className="text-sm font-semibold text-slate-900">{plan.hours}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-500 transition-colors"
                  >
                    Get a Call Back
                    <ArrowRight size={16} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper background="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] items-start">
            <div>
              <Badge variant="outline" className="mb-4 bg-orange-50">
                Bootcamp Roadmap
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-900 mb-4">
                What your 5-6 weeks look like
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mb-6">
                Weekly sprints keep you moving. Every phase ends with deliverables and mentor feedback.
              </p>

              <div className="space-y-4">
                {roadmap.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <Badge variant="outline" className="mb-4 bg-orange-50">
                Capstone Projects
              </Badge>
              <h3 className="text-2xl font-bold font-display text-slate-900 mb-4">
                Real projects you can show recruiters
              </h3>
              <div className="grid gap-4">
                {capstones.map((project, index) => (
                  <Card
                    key={project.title}
                    className="h-full"
                    hoverEffect={true}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <h4 className="text-lg font-bold text-slate-900">{project.title}</h4>
                    <p className="text-sm text-slate-600 mt-2">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper background="gradient">
        <Container>
          <div className="rounded-2xl border border-orange-100 bg-white/80 p-8 sm:p-10 shadow-xl">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div>
                <Badge variant="outline" className="mb-4 bg-white">
                  Career Support
                </Badge>
                <h3 className="text-3xl font-bold font-display text-slate-900 mb-4">
                  We stay with you until you get placed
                </h3>
                <p className="text-slate-600 text-base sm:text-lg">
                  Our team helps you with resume reviews, mock interviews, and referrals. You also get access
                  to community sessions and alumni support after the bootcamp.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
                  <CheckCircle className="h-5 w-5 text-orange-500" />
                  <span className="text-sm text-slate-700">Weekly career coaching calls</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
                  <CheckCircle className="h-5 w-5 text-orange-500" />
                  <span className="text-sm text-slate-700">Resume, GitHub, and LinkedIn review</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
                  <CheckCircle className="h-5 w-5 text-orange-500" />
                  <span className="text-sm text-slate-700">Mock interviews with hiring feedback</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper className="bg-slate-950">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Ready to join the next bootcamp cohort?
            </h2>
            <p className="text-orange-100 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Talk to our counsellor today and get a personalized plan that fits your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <PrimaryButton
                className="bg-white text-orange-700 hover:bg-orange-50"
                onClick={() => navigate('/#contact')}
              >
                Book a Counselling Call
              </PrimaryButton>
              <SecondaryButton
                className="bg-transparent text-white border-white/30 hover:bg-white/10"
                onClick={() => navigate('/bootcamp')}
              >
                Explore Internships
              </SecondaryButton>
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </div>
  );
}
