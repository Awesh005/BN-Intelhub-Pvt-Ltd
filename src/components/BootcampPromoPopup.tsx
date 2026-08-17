import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle, X, Sparkles, ArrowRight, Laptop, Award, Cpu, BookOpen } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import BootcampEnquiryModal from './BootcampEnquiryModal';

export default function BootcampPromoPopup() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    // Show popup shortly after page load
    const timer = window.setTimeout(() => setIsOpen(true), 800);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const handleOpenForm = () => {
    setIsOpen(false);
    setIsFormOpen(true);
  };

  return (
    <>
      <BootcampEnquiryModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[90000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="bg-slate-900/95 rounded-3xl w-full max-w-4xl shadow-2xl border border-white/10 overflow-hidden relative shadow-[0_0_60px_-15px_rgba(124,58,237,0.4)]"
                role="dialog"
                aria-modal="true"
                aria-labelledby="bootcamp-promo-title"
              >
                {/* Background decorative glows */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                {/* Absolute close button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close bootcamp popup"
                  className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-800/80 border border-white/10 hover:bg-slate-700 hover:text-white text-slate-400 transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer"
                >
                  <X size={16} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12 w-full">
                  {/* Left Column: Visual Mockup Showcase (Hidden on Mobile) */}
                  <div className="hidden md:flex md:col-span-5 bg-slate-950/80 p-8 flex-col justify-between border-r border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="space-y-6 z-10">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">BN Intelhub Tech</span>
                      </div>

                      {/* Mockup Dev Terminal */}
                      <div className="bg-slate-900/90 rounded-2xl border border-white/10 p-4 font-mono text-[11px] leading-relaxed text-slate-300 shadow-inner">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                          </div>
                          <span className="text-[10px] text-slate-500">bootcamp.config.json</span>
                        </div>
                        
                        <p className="text-blue-400">{"{"}</p>
                        <p className="pl-4 text-slate-400">"status": <span className="text-emerald-400">"Exclusive"</span>,</p>
                        <p className="pl-4 text-slate-400">"duration": <span className="text-orange-400">"5-6 Weeks"</span>,</p>
                        <p className="pl-4 text-slate-400">"curriculum": <span className="text-purple-400">"Projects"</span>,</p>
                        <p className="pl-4 text-slate-400">"mentorship": <span className="text-blue-300">"1:1 Industry Leaders"</span>,</p>
                          <p className="text-blue-400">{"}"}</p>
                      </div>

                      {/* Tech Chips */}
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">High-Demand Skill Tracks</p>
                        <div className="flex flex-wrap gap-1.5">
                          {['React.js', 'Node.js', 'Python AI', 'DevOps', 'Java Fullstack'].map((chip) => (
                            <span 
                              key={chip} 
                              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5 text-slate-300 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Left Column Bottom Note: MSME & Startup India Recognition */}
                    <div className="space-y-3 pt-6 border-t border-white/5 z-10">
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Government Recognitions</p>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {/* Govt MSME Badge */}
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all">
                          <svg className="w-5 h-5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <circle cx="12" cy="11" r="3" />
                          </svg>
                          <div className="leading-tight">
                            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tight">Registered</p>
                            <p className="text-[10px] font-extrabold text-white uppercase">Govt. MSME</p>
                          </div>
                        </div>

                        {/* Startup India Badge */}
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all">
                          <div className="relative shrink-0 flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                              <polyline points="17 6 23 6 23 12" />
                            </svg>
                            <div className="absolute -bottom-1 -right-1 flex gap-0.5 scale-75">
                              <span className="w-1 h-1 rounded-full bg-[#FF9933]" />
                              <span className="w-1 h-1 rounded-full bg-white" />
                              <span className="w-1 h-1 rounded-full bg-[#128807]" />
                            </div>
                          </div>
                          <div className="leading-tight">
                            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tight">Recognised</p>
                            <p className="text-[10px] font-extrabold text-white uppercase">Startup India</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 leading-normal">
                        BN Intelhub Pvt Ltd is recognised under Startup India and registered with MSME.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Promotional Content & Form Trigger */}
                  <div className="col-span-12 md:col-span-7 p-6 sm:p-8 flex flex-col justify-between relative">
                    <div>
                      {/* Header Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 text-orange-400 mb-4 animate-pulse">
                        <Sparkles size={12} />
                        <span>Next Batch Enrolling Now</span>
                      </div>

                      {/* Title */}
                      <h2 id="bootcamp-promo-title" className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-display tracking-tight">
                        Transform into a Confident{' '}
                        <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                          Software Engineer
                        </span>
                      </h2>

                      {/* Subtitle */}
                      <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                        A focused, practical roadmap packed with real-world exposure, mentor guidance, and professional-grade projects.
                      </p>

                      {/* Specification Cards Grid */}
                      <div className="grid grid-cols-3 gap-2.5 my-6">
                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:bg-white/[0.04] transition-all duration-300 hover:scale-[1.02]">
                          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            <Laptop size={10} className="text-blue-400" />
                            <span>Duration</span>
                          </div>
                          <p className="font-bold text-xs sm:text-sm text-white mt-1">5-6 Weeks</p>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:bg-white/[0.04] transition-all duration-300 hover:scale-[1.02]">
                          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            <Cpu size={10} className="text-purple-400" />
                            <span>Schedule</span>
                          </div>
                          <p className="font-bold text-xs sm:text-sm text-white mt-1">Mon - Sat</p>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 hover:bg-white/[0.04] transition-all duration-300 hover:scale-[1.02]">
                          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            <BookOpen size={10} className="text-orange-400" />
                            <span>Learning</span>
                          </div>
                          <p className="font-bold text-xs sm:text-sm text-white mt-1">Live Coding</p>
                        </div>
                      </div>

                      {/* Core Highlights Checklist */}
                      <div className="space-y-3 mb-6 sm:mb-8">
                        {[
                          'Industry Exposure & Collaborative Team Environment',
                          'Master the Basics and Progress to Advanced Stacks',
                          'Daily 1:1 Mentoring with Expert Developers',
                          'Build & Deploy Real-World Apps for your Resume',
                        ].map((item) => (
                          <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 group">
                            <CheckCircle className="h-4.5 w-4.5 text-orange-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                            <span className="group-hover:text-white transition-colors duration-200">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(249,115,22,0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleOpenForm}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                      >
                        <span>Start Registration Form</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsOpen(false);
                          navigate('/internships');
                        }}
                        className="w-full sm:w-auto px-6 py-3 bg-white/[0.04] border border-white/10 text-white hover:text-orange-400 font-semibold rounded-xl transition-all flex items-center justify-center text-sm sm:text-base cursor-pointer"
                      >
                        Explore Curriculum
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
