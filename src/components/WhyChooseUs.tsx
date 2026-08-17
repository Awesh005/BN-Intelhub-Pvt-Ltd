import { motion } from 'motion/react';
import { WHY_CHOOSE_US } from '../constants';
import { SectionWrapper, Container } from './ui/Layout';
import { Badge } from './ui/Badge';
import { Card } from './ui/Cards';

export default function WhyChooseUs() {
  return (
    <SectionWrapper id="why-choose-us" background="light">
      <Container>
        <div className="text-center mb-10 sm:mb-16">
          <Badge variant="secondary" className="mb-4 border border-orange-200">
            Our Advantage
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-slate-900">
            Why Choose <span className="text-orange-600">BN Intelhub?</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We are committed to providing the best learning experience and career opportunities for our students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {WHY_CHOOSE_US.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card 
                variant="default" 
                className="h-full flex flex-col items-center text-center hover:border-orange-200"
                hoverEffect={true}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
