import React, { useState, useEffect } from 'react';

export const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "hvqc-eAOfZM"; 
  
  // PERFORMANCE STRATEGY:
  // 1. Initial State: Lightweight SD Thumbnail (~10KB).
  // 2. Optimization: We DO NOT fetch the HD image immediately.
  // 3. We wait for 2.5 seconds (allowing the rest of the site to load first) before fetching the 150KB HD image.
  const [thumbnailUrl, setThumbnailUrl] = useState(`https://i.ytimg.com/vi/${videoId}/sddefault.jpg`);

  useEffect(() => {
    // Delay HD fetch to prioritize Hero section loading
    const timer = setTimeout(() => {
      const highResImg = new Image();
      highResImg.src = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      
      // Smart Load: Only update if HD image actually exists and loads successfully
      highResImg.onload = () => {
        setThumbnailUrl(highResImg.src);
      };
      
      // Safety: If HD doesn't exist (404), we silently keep the SD version. No broken images.
      highResImg.onerror = () => {
        console.warn("HD Thumbnail not found, keeping SD version.");
      };

    }, 2500); // 2.5 second delay - ensures site is interactive first

    return () => clearTimeout(timer);
  }, [videoId]);

  const scrollToForm = () => {
    const form = document.getElementById('contact-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact-form');
    }
  };

  return (
    <section id="video-demo" className="border-b border-border-dark bg-[#050505] px-6 py-20 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Grid Background - optimized opacity */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDQwaDQwVjBIMHY0MHptMi0yVjJoMzZ2MzZIMnoiIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')] opacity-20 pointer-events-none"></div>

      <div className="mx-auto max-w-6xl relative z-10">
        
        {/* Header Content */}
        <div className="mb-10 flex flex-col items-start border-l-4 border-primary pl-6">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase text-white tracking-tighter mix-blend-lighten leading-none break-words max-w-full">
            See It In Action
          </h2>
          {/* Professional Sub-Header Update */}
          <div className="mt-6 flex flex-col gap-2">
             <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-primary/50"></span>
                <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                  AB <span className="text-primary bg-primary/10 px-2 py-0.5">30% COMMISSION</span> BAND!
                </h3>
             </div>
             <p className="font-mono text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2 pl-11">
                <span className="material-symbols-outlined text-sm text-primary">terminal</span>
                Zerocomm Full Setup Guide For Restaurants
             </p>
          </div>
        </div>

        {/* Video Container Frame */}
        <div className="relative w-full border border-blue-500/60 p-2 sm:p-8 bg-[#050505]/50 shadow-[0_0_40px_rgba(59,130,246,0.1)]">
          
          {/* Inset Orange Corners */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-primary z-20 pointer-events-none"></div>
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 border-primary z-20 pointer-events-none"></div>
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 border-primary z-20 pointer-events-none"></div>
          <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-primary z-20 pointer-events-none"></div>

          {/* Video Wrapper */}
          <div className="relative w-full pt-[56.25%] bg-black z-10 overflow-hidden shadow-2xl group">
            {!isPlaying ? (
              <button 
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 w-full h-full cursor-pointer group flex items-center justify-center bg-black/20 sm:bg-black/50 hover:bg-black/30 transition-all"
                aria-label="Play Video"
              >
                {/* Progressive Image Loading: Starts blurry/small, becomes HD automatically */}
                <img 
                  src={thumbnailUrl} 
                  alt="ZeroComm System Demo" 
                  className="absolute inset-0 w-full h-full object-cover opacity-90 sm:opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  loading="lazy"
                  width="1280"
                  height="720"
                />
                
                {/* Custom Play Button */}
                <div className="relative z-10 h-14 w-14 sm:h-20 sm:w-20 flex items-center justify-center rounded-full bg-primary/90 text-white shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl sm:text-5xl ml-1">play_arrow</span>
                </div>
              </button>
            ) : (
              <iframe
                // Force 1080p using &vq=hd1080 query param
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&vq=hd1080&modestbranding=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full animate-in fade-in duration-300"
              ></iframe>
            )}
          </div>
        </div>

        {/* Status Indicators */}
        <div className="mt-4 flex justify-between items-center px-1 mb-8">
          <div className="flex items-center gap-2 text-neutral-500">
             <span className={`material-symbols-outlined text-sm ${isPlaying ? 'text-green-500 animate-pulse' : 'text-primary'}`}>
               {isPlaying ? 'wifi_tethering' : 'radio_button_unchecked'}
             </span>
             <span className="font-mono text-[10px] uppercase tracking-wider">
               {isPlaying ? 'High-Res Stream Active' : 'Video Connection Ready'}
             </span>
          </div>
          <div className="font-mono text-[10px] text-neutral-600 uppercase">
             Secure Connection
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center w-full">
            <button 
                onClick={scrollToForm}
                className="group relative flex h-14 sm:h-16 w-full sm:w-auto items-center justify-center gap-3 sm:gap-4 border border-primary/30 bg-[#0f0f0f] px-8 sm:px-12 py-4 text-white transition-all hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_30px_rgba(255,68,0,0.2)] active:scale-95 cursor-pointer"
            >
                {/* Tech decorative elements */}
                <div className="absolute -left-1 -top-1 h-2 w-2 border-l border-t border-primary opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute -right-1 -bottom-1 h-2 w-2 border-r border-b border-primary opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute -right-1 -top-1 h-2 w-2 border-r border-t border-primary opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute -left-1 -bottom-1 h-2 w-2 border-l border-b border-primary opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-primary group-hover:text-white transition-colors">
                    Please Fill The Form
                </span>
                <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform group-hover:text-white">
                    arrow_forward
                </span>
            </button>
        </div>

      </div>
    </section>
  );
};