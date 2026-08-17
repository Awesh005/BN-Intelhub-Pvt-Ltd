import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper, Container } from './ui/Layout';
import { PrimaryButton } from './ui/Buttons';
import { Badge } from './ui/Badge';
import { Card } from './ui/Cards';

export default function Services() {
  const navigate = useNavigate();

  return (
    <SectionWrapper id="services" background="default" className="relative">
      <Container>
        <div className="text-center mb-10 sm:mb-16">
          <Badge variant="secondary" className="mb-4 border border-orange-200">
            Our Expertise
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-slate-900">
            Development <span className="text-orange-600">Services</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We build scalable, high-performance digital solutions to help your business grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-12 sm:mb-16">
          {SERVICES.slice(0, 6).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card 
                variant="glass" 
                className="group h-full p-5 sm:p-6 hover:border-orange-200 flex flex-col relative overflow-hidden"
                hoverEffect={true}
              >
                <div className="relative z-10 mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-slate-950 transition-colors duration-300 shadow-sm">
                    {service.icon}
                  </div>
                </div>

                <h3 className="relative z-10 text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="relative z-10 text-slate-600 mb-6 flex-grow leading-relaxed">
                  {service.description}
                </p>

                <div className="relative z-10 pt-4 border-t border-slate-100/50">
                  <span className="inline-flex items-center text-sm font-medium text-orange-600 group-hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                    Learn more <ArrowRight size={16} className="ml-1" />
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <PrimaryButton 
            className="px-8 py-4 text-lg shadow-orange-200"
            onClick={() => {
              navigate('/services');
              window.scrollTo(0, 0);
            }}
          >
            View All Services
          </PrimaryButton>
        </div>
      </Container>
    </SectionWrapper>
  );
}
