/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import ScrollManager from './components/ScrollManager';
import BootcampPromoPopup from './components/BootcampPromoPopup';
import Chatbot from "./chatbot/Chatbot";  
import WhatsAppButton  from "./chatbot/WhatsAppButton";

const Home = lazy(() => import('./pages/Home'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const Bootcamp = lazy(() => import('./pages/Bootcamp'));
const About = lazy(() => import('./pages/About'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const InternshipPage = lazy(() => import('./pages/InternshipPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const CancellationRefundPolicy = lazy(() => import('./pages/CancellationRefundPolicy'));

function RouteFallback() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="animate-pulse space-y-8">
          <div className="rounded-3xl bg-slate-900 px-8 py-16 md:px-12 md:py-20">
            <div className="mb-6 h-6 w-32 rounded-full bg-white/15" />
            <div className="mb-4 h-12 max-w-2xl rounded-xl bg-white/20" />
            <div className="mb-3 h-5 max-w-3xl rounded-lg bg-white/10" />
            <div className="h-5 max-w-xl rounded-lg bg-white/10" />
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-4 h-8 w-52 rounded-lg bg-slate-200" />
                <div className="space-y-3">
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-11/12 rounded bg-slate-100" />
                  <div className="h-4 w-8/12 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <Router>
      <ScrollManager />
      <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <BootcampPromoPopup />
        <main>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/courses" element={<PageTransition><CoursesPage /></PageTransition>} />
              <Route path="/bootcamp" element={<PageTransition><InternshipPage /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
              <Route path="/internships" element={<PageTransition><Bootcamp /></PageTransition>} />
              <Route path="/internships1" element={<PageTransition><InternshipPage /></PageTransition>} />
              <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
              <Route path="/terms-and-conditions" element={<PageTransition><TermsAndConditions /></PageTransition>} />
              <Route path="/cancellation-refund-policy" element={<PageTransition><CancellationRefundPolicy /></PageTransition>} />
            </Routes>
          </Suspense>
        </main>
        <Chatbot />
        <WhatsAppButton />
        <Footer />
      </div>
    </Router>
  );
}
