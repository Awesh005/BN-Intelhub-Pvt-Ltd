import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { COURSES } from '../constants';
import { ArrowRight, Clock } from 'lucide-react';
import { SectionWrapper, Container } from './ui/Layout';
import { Badge } from './ui/Badge';

export default function Courses() {
  const navigate = useNavigate();
  const visibleCount = 6;

  return (
    <SectionWrapper id="programs" background="default">
      <Container>
        <div className="text-center mb-10 sm:mb-16">
          <Badge variant="outline" className="mb-4">
            Our Offerings
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-slate-900">
            Industry-Ready <span className="text-orange-600">Programs</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Comprehensive curriculum designed by industry experts to help you master the latest technologies and launch your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-10 sm:mb-12">
          <AnimatePresence>
            {COURSES.slice(0, visibleCount).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="h-full"
              >
                <div className="group relative h-full bg-white rounded-lg border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="p-3 rounded-lg bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-slate-950 transition-colors duration-300">
                      {course.icon}
                    </div>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                      {course.level}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 flex-grow text-sm leading-relaxed">
                    {course.description}
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {course.technologies?.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-100">
                          {tech}
                        </span>
                      ))}
                      {course.technologies && course.technologies.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-md bg-slate-50 text-slate-500 border border-slate-100">
                          +{course.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <button className="w-full py-3 px-4 rounded-lg bg-slate-50 text-slate-900 font-medium hover:bg-orange-500 hover:text-slate-950 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                      View Details
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="text-center">
          <button 
            onClick={() => {
              navigate('/courses');
              window.scrollTo(0, 0);
            }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-orange-50 hover:border-orange-300 transition-all shadow-sm hover:shadow-md"
          >
            View All {COURSES.length} Courses <ArrowRight size={20} />
          </button>
        </div>
      </Container>
    </SectionWrapper>
  );
}
