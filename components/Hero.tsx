import React from 'react';

export const Hero: React.FC = () => {
  // PERFORMANCE FIX: Removed useState/useEffect for visibility.
  // We now use CSS classes (animate-fade-up) to ensure text is visible 
  // the millisecond the HTML parses, without waiting for JS Hydration.

  const scrollToForm = () => {
    const form = document.getElementById('contact-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact-form');
    }
  };

  const scrollToVideo = () => {
    const videoSection = document.getElementById('video-demo');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#video-demo');
    }
  };

  return (
    <section className="relative flex min-h-[85vh] sm:min-h-[90vh] w-full flex-col justify-center border-b border-border-dark px-6 py-20 sm:px-6 sm:py-32 lg:px-8 overflow-hidden bg-[#050505]">
      
      {/* CONCEPT: High-Performance CSS Grid Animation (0KB Size) */}
      <div className="absolute inset-0 z-0">
        {/* Animated Grid Pattern - GPU Accelerated */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 animate-[pulse_8s_ease-in-out_infinite] will-change-transform transform-gpu"></div>
        
        {/* Ambient Glow behind text (Static CSS, no lag) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-fade-up"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        
        {/* Animated Headline - Using CSS Animate-Fade-Up for INSTANT visibility */}
        {/* Mobile Optimization: text-3xl sm:text-4xl prevents wrapping on small screens */}
        <h1 className="max-w-5xl text-3xl xs:text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-tight sm:leading-[0.9] tracking-tighter text-white mix-blend-normal break-words hyphens-auto w-full overflow-hidden">
          <div className="opacity-0-start animate-fade-up">
            30% COMMISSION
          </div>
          <div className="opacity-0-start animate-fade-up-delay-1">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-primary bg-[length:200%_auto] animate-shine will-change-[background-position]">
              IS THEFT.
            </span>
          </div>
        </h1>
        
        <p className="opacity-0-start animate-fade-up-delay-2 mt-8 max-w-2xl font-mono text-xs sm:text-sm text-neutral-400 leading-relaxed uppercase tracking-wide">
          Don't let <b>Aggregator Apps</b> take your hard-earned money.<br/>
          Build your own direct ordering web app.<br/>
          Keep 100% of your profit.
        </p>

        <div className="opacity-0-start animate-fade-up-delay-3 mt-12 flex flex-col gap-4 sm:flex-row">
          <button 
            onClick={scrollToForm}
            className="group flex h-14 w-full items-center justify-center border border-primary bg-primary px-10 text-sm font-bold uppercase tracking-widest text-white hover:bg-transparent hover:text-primary transition-all sm:w-auto hover:shadow-[0_0_20px_rgba(255,68,0,0.4)] active:scale-95"
          >
            <span className="mr-2 material-symbols-outlined text-lg">lock_open</span>
            Unlock 100% Profit
          </button>
          <button 
            onClick={scrollToVideo}
            className="flex h-14 w-full items-center justify-center border border-neutral-800 bg-transparent px-10 text-sm font-bold uppercase tracking-widest text-neutral-400 hover:border-white hover:text-white transition-all sm:w-auto active:scale-95"
          >
            See How It Works
          </button>
        </div>
      </div>

      {/* Tech Decoration Bottom Right - Loaded via CSS */}
      <div className="opacity-0-start animate-fade-up-delay-3 absolute bottom-10 right-10 hidden lg:block text-right">
        <div className="flex gap-1 justify-end mb-2">
           <div className="w-1 h-1 bg-neutral-700"></div>
           <div className="w-1 h-1 bg-neutral-700"></div>
           <div className="w-1 h-1 bg-neutral-700"></div>
           <div className="w-1 h-1 bg-primary"></div>
        </div>
        <div className="font-mono text-[10px] text-neutral-600">
           Trusted by 500+<br/>
           Restaurants
        </div>
      </div>
    </section>
  );
};