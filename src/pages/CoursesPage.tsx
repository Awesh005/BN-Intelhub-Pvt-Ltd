import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COURSES } from '../constants';
import { Search, Filter, X, Clock, ChevronDown } from 'lucide-react';
import { SectionWrapper, Container } from '../components/ui/Layout';
import { Badge } from '../components/ui/Badge';
import { PrimaryButton } from '../components/ui/Buttons';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const levels = Array.from(new Set(COURSES.map(c => c.level)));
  const durations = Array.from(new Set(COURSES.map(c => c.duration)));

  const filteredCourses = useMemo(() => {
    return COURSES.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.technologies?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesLevel = selectedLevel ? course.level === selectedLevel : true;
      const matchesDuration = selectedDuration ? course.duration === selectedDuration : true;
      
      return matchesSearch && matchesLevel && matchesDuration;
    });
  }, [searchQuery, selectedLevel, selectedDuration]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLevel(null);
    setSelectedDuration(null);
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <SectionWrapper background="default" className="py-12">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display text-slate-900">
              Explore Our <span className="text-orange-600">Courses</span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Find the perfect program to accelerate your career growth.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0 space-y-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Filter size={20} /> Filters
                  </h3>
                  {(selectedLevel || selectedDuration || searchQuery) && (
                    <button 
                      onClick={clearFilters}
                      className="text-xs text-red-500 hover:text-red-700 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-3 text-sm">Level</h4>
                    <div className="space-y-2">
                      {levels.map(level => (
                        <label key={level} className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="level" 
                            checked={selectedLevel === level}
                            onChange={() => setSelectedLevel(level)}
                            className="w-4 h-4 text-orange-600 border-slate-300 focus:ring-orange-500"
                          />
                          <span className="text-slate-600 text-sm group-hover:text-orange-600 transition-colors">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="font-semibold text-slate-700 mb-3 text-sm">Duration</h4>
                    <div className="space-y-2">
                      {durations.map(duration => (
                        <label key={duration} className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="duration" 
                            checked={selectedDuration === duration}
                            onChange={() => setSelectedDuration(duration)}
                            className="w-4 h-4 text-orange-600 border-slate-300 focus:ring-orange-500"
                          />
                          <span className="text-slate-600 text-sm group-hover:text-orange-600 transition-colors">{duration}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm font-medium text-slate-700"
              >
                <span className="flex items-center gap-2"><Filter size={18} /> Filters</span>
                <ChevronDown size={18} className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-2 space-y-6">
                      <div>
                        <h4 className="font-semibold text-slate-700 mb-3 text-sm">Level</h4>
                        <div className="flex flex-wrap gap-2">
                          {levels.map(level => (
                            <button
                              key={level}
                              onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                                selectedLevel === level 
                                  ? 'bg-orange-50 border-orange-200 text-orange-700' 
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-orange-200'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-700 mb-3 text-sm">Duration</h4>
                        <div className="flex flex-wrap gap-2">
                          {durations.map(duration => (
                            <button
                              key={duration}
                              onClick={() => setSelectedDuration(selectedDuration === duration ? null : duration)}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                                selectedDuration === duration 
                                  ? 'bg-orange-50 border-orange-200 text-orange-700' 
                                  : 'bg-white border-slate-200 text-slate-600 hover:border-orange-200'
                              }`}
                            >
                              {duration}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={clearFilters}
                        className="w-full py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search courses by name, technology, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all shadow-sm text-slate-700"
                />
              </div>

              {/* Results Count */}
              <div className="mb-6 text-slate-500 text-sm">
                Showing {filteredCourses.length} courses
              </div>

              {/* Course Grid */}
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300 flex flex-col h-full group"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div className="p-3 rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-slate-950 transition-colors duration-300">
                          {course.icon}
                        </div>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-xs">
                          {course.level}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">
                        {course.title}
                      </h3>
                      
                      <p className="text-slate-600 mb-4 text-sm line-clamp-2 flex-grow">
                        {course.description}
                      </p>

                      <div className="space-y-4 mt-auto">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock size={14} />
                          <span>{course.duration}</span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {course.technologies?.slice(0, 3).map((tech, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100">
                              {tech}
                            </span>
                          ))}
                          {course.technologies && course.technologies.length > 3 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-100">
                              +{course.technologies.length - 3}
                            </span>
                          )}
                        </div>

                        <PrimaryButton className="w-full py-2.5 text-sm justify-center bg-slate-900 text-white hover:bg-orange-500 hover:text-slate-950 border-none shadow-none">
                          View Details
                        </PrimaryButton>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Search size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">No courses found</h3>
                  <p className="text-slate-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                  <button 
                    onClick={clearFilters}
                    className="text-orange-600 font-medium hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </div>
  );
}
