import { motion } from 'motion/react';
import { PrimaryButton, SecondaryButton } from './ui/Buttons';
import { SectionWrapper } from './ui/Layout';
import { useNavigate } from 'react-router-dom';

export default function CTA() {

  const navigate = useNavigate();

  return (
    <SectionWrapper className="px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-lg overflow-hidden bg-slate-950 text-center py-14 sm:py-20 px-5 sm:px-12 shadow-2xl shadow-slate-900/20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.45),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(120,53,15,0.82))]" />
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-6 text-white">
              Ready to Launch Your Career?
            </h2>
            <p className="text-base sm:text-xl text-orange-100 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Join thousands of students who have transformed their lives with BN Intelhub Pvt Ltd.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <PrimaryButton
                onClick={() => {
                  navigate('/bootcamp');
                  window.scrollTo(0, 0);
                }}
                className="w-full sm:w-auto bg-white text-orange-700 hover:bg-orange-50 border-none"
              >
                Get Started Now
              </PrimaryButton>

              <SecondaryButton className="w-full sm:w-auto bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white/50">
                Download Brochure
              </SecondaryButton>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
