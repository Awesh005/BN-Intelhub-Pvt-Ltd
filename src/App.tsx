/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from "./chatbot/Chatbot";  
import WhatsAppButton  from "./chatbot/WhatsAppButton";

const Home = lazy(() => import('./pages/Home'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const About = lazy(() => import('./pages/About'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const InternshipPage = lazy(() => import('./pages/InternshipPage'));

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main>
          <Suspense fallback={<div className="py-16 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/internships" element={<InternshipPage />} />
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
