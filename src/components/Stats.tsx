import { motion } from 'motion/react';
import { STATS } from '../constants';
import { SectionWrapper, Container } from './ui/Layout';
import { StatsCard } from './ui/Cards';

export default function Stats() {
  return (
    <SectionWrapper background="light">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 lg:gap-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <StatsCard 
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
