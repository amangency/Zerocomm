import React, { useState, useEffect, Suspense, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';

// --- CRITICAL PATH OPTIMIZATION ---
import { VideoSection } from './components/VideoSection';
import { ContactForm } from './components/ContactForm';

// --- PERFORMANCE OPTIMIZATION: LAZY LOAD SECONDARY CONTENT ---
const CostGrid = React.lazy(() => import('./components/CostGrid').then(m => ({ default: m.CostGrid })));
const Sequence = React.lazy(() => import('./components/Sequence').then(m => ({ default: m.Sequence })));
const Calculator = React.lazy(() => import('./components/Calculator').then(m => ({ default: m.Calculator })));
const Benchmark = React.lazy(() => import('./components/Benchmark').then(m => ({ default: m.Benchmark })));
const Metrics = React.lazy(() => import('./components/Metrics').then(m => ({ default: m.Metrics })));
const About = React.lazy(() => import('./components/About').then(m => ({ default: m.About })));
const FAQ = React.lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
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
  
  const [showMobileCta, setShowMobileCta] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const contactSectionRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setShowMobileCta(!entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      observer.observe(node);
      observerRef.current = observer;
    } else {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    }
  }, []);

  // --- FIXED DEEP LINKING SYSTEM (Layout Shift Proof) ---
  useEffect(() => {
    const hash = window.location.hash;
    
    if (hash) {
      const targetId = hash.substring(1);
      
      const checkAndScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
           const rect = element.getBoundingClientRect();
           // Logic: header is ~80px (scroll-padding-top).
           // If rect.top is > 200px (meaning we see content above it like Calculator),
           // OR if rect.top < 0 (we scrolled past it), then force snap back.
           // We use 200px as a safe threshold to distinguish between 'correctly aligned' and 'pushed down by layout shift'.
           if (rect.top > 200 || rect.top < 0) {
             element.scrollIntoView({ behavior: 'auto', block: 'start' });
           }
        }
      };

      // 1. Initial Immediate Scroll
      checkAndScroll();

      // 2. The Fix: Watch for layout changes (Lazy components loading above)
      // Use ResizeObserver to detect when Calculator/About sections expand the page height
      const resizeObserver = new ResizeObserver(() => {
        checkAndScroll();
      });

      // Observe body for any height changes
      resizeObserver.observe(document.body);

      // 3. Backup Interval: Sometimes ResizeObserver misses subtle repaints
      // We check every 500ms for the first few seconds
      const interval = setInterval(checkAndScroll, 500);

      // 4. Cleanup: Stop forcing scroll after 4 seconds (assume everything is loaded)
      // This releases control back to the user
      const timer = setTimeout(() => {
        resizeObserver.disconnect();
        clearInterval(interval);
      }, 4000);

      return () => {
        resizeObserver.disconnect();
        clearInterval(interval);
        clearTimeout(timer);
      };
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
      
      <Header />
      
      <main className="relative mt-16 flex min-h-screen w-full flex-col z-10 pb-28 sm:pb-0">
        <Hero />
        <TrustBar />
        
        <Suspense fallback={<LoadingFallback />}>
          <CostGrid />
          <Sequence />
        </Suspense>

        <VideoSection />

        <Suspense fallback={<LoadingFallback />}>
          <Calculator />
          <Benchmark />
          <Metrics />
          <About />
          <FAQ />
        </Suspense>

        {/* --- CONTACT FORM RESTORED TO BOTTOM (Best for storytelling flow) --- */}
        <div ref={contactSectionRef}>
          <ContactForm />
        </div>

        <Suspense fallback={<LoadingFallback />}>
          <Footer 
            onOpenTerms={() => setIsTermsOpen(true)} 
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
          />
        </Suspense>
        
        {/* Mobile Sticky CTA */}
        <div className={`fixed bottom-0 left-0 right-0 z-50 border-t border-border-dark bg-[#050505]/95 p-4 backdrop-blur sm:hidden safe-area-bottom transition-all duration-500 ease-in-out ${showMobileCta ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
          <button 
            onClick={scrollToForm}
            className="flex h-14 w-full items-center justify-center border border-primary bg-primary text-sm font-bold uppercase tracking-widest text-white hover:bg-red-600 shadow-[0_0_20px_rgba(255,68,0,0.3)]"
          >
            Start Now
          </button>
        </div>
      </main>

      <Suspense fallback={null}>
        {isTermsOpen && <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />}
        {isPrivacyOpen && <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />}
        {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
      </Suspense>
    </div>
  );
}

export default App;