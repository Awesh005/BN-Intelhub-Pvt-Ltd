import { motion } from 'motion/react';
import { Calendar, Briefcase, Users, Award, Laptop, GraduationCap } from 'lucide-react';
import { SectionWrapper, Container } from './ui/Layout';
import { PrimaryButton } from './ui/Buttons';
import { Badge } from './ui/Badge';
import { Card } from './ui/Cards';
import { useNavigate } from 'react-router-dom';

interface InternshipsProps {
  onEnrollClick?: () => void;
}

export default function Internships({ onEnrollClick }: InternshipsProps) {

  const navigate = useNavigate();

  const features = [
    { icon: <Calendar className="w-5 h-5" />, text: "2 to 6 Months Duration" },
    { icon: <Laptop className="w-5 h-5" />, text: "Live Client-Based Projects" },
    { icon: <Users className="w-5 h-5" />, text: "Expert Mentorship Support" },
    { icon: <Award className="w-5 h-5" />, text: "Internship Certificate" },
    { icon: <Briefcase className="w-5 h-5" />, text: "Performance-Based Placement" },
  ];

  const roadmap = [
    {
      step: 1,
      title: "Training Phase",
      description: "Intensive hands-on training on required technologies and tools.",
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      color: "bg-orange-500"
    },
    {
      step: 2,
      title: "Live Project Work",
      description: "Work on real-world client projects under senior developer guidance.",
      icon: <Laptop className="w-6 h-6 text-white" />,
      color: "bg-amber-500"
    },
    {
      step: 3,
      title: "Certification",
      description: "Receive an industry-recognized internship certificate upon completion.",
      icon: <Award className="w-6 h-6 text-white" />,
      color: "bg-yellow-500"
    },
    {
      step: 4,
      title: "Placement Support",
      description: "Get placement assistance and interview opportunities with partner companies.",
      icon: <Briefcase className="w-6 h-6 text-white" />,
      color: "bg-slate-800"
    }
  ];

  return (
    <SectionWrapper id="internship" background="gradient">
      <Container>
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-6 border border-orange-200">
            Career Launchpad
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display text-slate-900 leading-tight">
            Industry Internship with <span className="text-orange-600">Real Client Projects</span> at BN Intelhub Pvt Ltd
          </h2>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Gain the experience that employers are looking for. Bridge the gap between academic learning and industry requirements.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                variant="glass"
                className="p-4 flex flex-col items-center text-center h-full justify-center"
                hoverEffect={true}
              >
                <div className="p-3 bg-orange-50 text-orange-600 rounded-lg mb-3">
                  {feature.icon}
                </div>
                <span className="font-medium text-slate-700 text-sm">{feature.text}</span>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Roadmap Timeline */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2 md:hidden" />

          <div className="space-y-12">
            {roadmap.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 ml-12 md:ml-0">
                  <Card 
                    variant="glass"
                    className={`p-6 relative ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}
                    hoverEffect={true}
                  >
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </Card>
                </div>

                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full ${item.color} shadow-lg flex items-center justify-center z-20 border-4 border-white`}>
                    {item.icon}
                  </div>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <PrimaryButton 
            onClick={() => {
              if (onEnrollClick) {
                onEnrollClick();
                return;
              }
              navigate('/bootcamp');
              window.scrollTo(0, 0);
            }}
            className="px-8 py-4 text-lg shadow-xl shadow-orange-500/20"
          >
            Start Your Internship Journey
          </PrimaryButton>
        </div>

      </Container>
    </SectionWrapper>
  );
}
