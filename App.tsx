import React, { useState, useEffect, Suspense, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';

// --- PERFORMANCE OPTIMIZATION: LAZY LOAD BELOW-THE-FOLD CONTENT ---
// This ensures the browser only downloads the Hero section code initially.
// Everything else is fetched in the background or when needed.
const CostGrid = React.lazy(() => import('./components/CostGrid').then(m => ({ default: m.CostGrid })));
const Sequence = React.lazy(() => import('./components/Sequence').then(m => ({ default: m.Sequence })));
const VideoSection = React.lazy(() => import('./components/VideoSection').then(m => ({ default: m.VideoSection })));
const Calculator = React.lazy(() => import('./components/Calculator').then(m => ({ default: m.Calculator })));
const Benchmark = React.lazy(() => import('./components/Benchmark').then(m => ({ default: m.Benchmark })));
const Metrics = React.lazy(() => import('./components/Metrics').then(m => ({ default: m.Metrics })));
const About = React.lazy(() => import('./components/About').then(m => ({ default: m.About })));
const FAQ = React.lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const ContactForm = React.lazy(() => import('./components/ContactForm').then(m => ({ default: m.ContactForm })));
const Footer = React.lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const TermsModal = React.lazy(() => import('./components/TermsModal').then(m => ({ default: m.TermsModal })));
const PrivacyModal = React.lazy(() => import('./components/PrivacyModal').then(m => ({ default: m.PrivacyModal })));
const ContactModal = React.lazy(() => import('./components/ContactModal').then(m => ({ default: m.ContactModal })));

// Lightweight loading placeholder
const LoadingFallback = () => (
  <div className="w-full h-24 flex items-center justify-center bg-[#050505]">
    <div className="h-1 w-24 bg-neutral-800 overflow-hidden">
      <div className="h-full w-full bg-primary/50 animate-progress origin-left"></div>
    </div>
  </div>
);

function App() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // State to manage visibility of the mobile sticky button
  const [showMobileCta, setShowMobileCta] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Callback Ref to detect when Contact Form is loaded and visible in viewport
  const contactSectionRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Hide button when form is visible (isIntersecting = true -> showMobileCta = false)
          setShowMobileCta(!entry.isIntersecting);
        },
        { threshold: 0.1 } // Trigger when 10% of the form is visible
      );
      observer.observe(node);
      observerRef.current = observer;
    } else {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    }
  }, []);

  // Handle auto-scroll for Anchors (Form, Video, etc.)
  useEffect(() => {
    const hash = window.location.hash;
    
    if (hash === '#contact-form' || hash === '#video-demo') {
      const targetId = hash.substring(1);
      
      const attemptScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
          return true;
        }
        return false;
      };

      if (!attemptScroll()) {
        const intervalId = setInterval(() => {
          if (attemptScroll()) {
            clearInterval(intervalId);
          }
        }, 100);
        setTimeout(() => clearInterval(intervalId), 2000);
      }
    }
  }, []);

  const scrollToForm = () => {
    const form = document.getElementById('contact-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact-form');
    }
  };

  return (
    <div className="bg-background-dark text-white font-display overflow-x-hidden antialiased selection:bg-primary selection:text-white relative">
      <div className="fixed inset-0 z-0 bg-grid-overlay opacity-20 pointer-events-none"></div>
      
      {/* Eager Loaded: Critical for LCP (Largest Contentful Paint) */}
      <Header />
      
      <main className="relative mt-16 flex min-h-screen w-full flex-col z-10 pb-28 sm:pb-0">
        <Hero />
        <TrustBar />
        
        {/* Lazy Loaded: Fetched only after main render */}
        <Suspense fallback={<LoadingFallback />}>
          <CostGrid />
          <Sequence />
          <VideoSection />
          <Calculator />
          <Benchmark />
          <Metrics />
          <About />
          <FAQ />
          {/* Wrapped ContactForm in a div with ref to track visibility */}
          <div ref={contactSectionRef}>
            <ContactForm />
          </div>
          <Footer 
            onOpenTerms={() => setIsTermsOpen(true)} 
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
          />
        </Suspense>
        
        {/* Mobile Sticky CTA */}
        {/* Added dynamic classes to slide down (translate-y-full) when showMobileCta is false */}
        <div className={`fixed bottom-0 left-0 right-0 z-50 border-t border-border-dark bg-[#050505]/95 p-4 backdrop-blur sm:hidden safe-area-bottom transition-all duration-500 ease-in-out ${showMobileCta ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
          <button 
            onClick={scrollToForm}
            className="flex h-14 w-full items-center justify-center border border-primary bg-primary text-sm font-bold uppercase tracking-widest text-white hover:bg-red-600 shadow-[0_0_20px_rgba(255,68,0,0.3)]"
          >
            Start Now
          </button>
        </div>
      </main>

      {/* 
        OPTIMIZATION: Conditional Rendering for Modals.
        By checking {isOpen && ...}, we ensure the browser DOES NOT download the modal code 
        until the user actually clicks the button. This saves bandwidth on initial load.
      */}
      <Suspense fallback={null}>
        {isTermsOpen && <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />}
        {isPrivacyOpen && <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />}
        {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
      </Suspense>
    </div>
  );
}

export default App;