import React, { useEffect, useState } from 'react';

export const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToForm = () => {
    const form = document.getElementById('contact-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b border-border-dark bg-[#050505]/90 backdrop-blur-md transition-all duration-700 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="flex h-16 max-w-7xl mx-auto items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">terminal</span>
          {/* SEO Update: Changed h1 to div to reserve h1 for the main page content */}
          <div className="font-mono text-xs font-bold tracking-[0.2em] text-white uppercase">
            ZEROCOMM
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <button 
            onClick={scrollToForm}
            className="h-9 flex items-center justify-center border border-primary/50 bg-primary/10 px-6 text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all"
          >
            Get Started
          </button>
        </div>
        {/* Removed non-functional hamburger menu for clearer mobile UX */}
      </div>
    </header>
  );
};