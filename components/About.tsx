import React, { useEffect, useRef, useState } from 'react';

export const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative border-b border-border-dark bg-[#050505] px-6 py-20 sm:py-32 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

        <div className="mx-auto max-w-6xl relative z-10">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
                {/* Left Column: Mobile (Slide Up) | Desktop (Slide Right) */}
                <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-y-8 sm:translate-y-0 sm:-translate-x-8'}`}>
                     <div className="mb-6 flex items-center gap-2 text-primary">
                        <span className="h-2 w-2 bg-primary rounded-none animate-pulse"></span>
                        <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                            About The Agency
                        </h3>
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tighter leading-tight sm:leading-[0.9] mb-8 break-words">
                        We Engineer <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">Independence.</span>
                    </h2>
                    <div className="space-y-6 text-neutral-400 font-mono text-sm leading-relaxed max-w-lg">
                        <p>
                            <strong className="text-white">ZEROCOMM</strong> is not just a software provider. We are an infrastructure defense unit for the hospitality industry.
                        </p>
                        <p>
                            The current food delivery ecosystem is broken. It is designed to bleed restaurants dry through commissions, hidden fees, and data theft. We built the counter-measure.
                        </p>
                        <p>
                            Our mission is simple: Deploy high-speed, direct-ordering terminals that put 100% of the profit back in your pocket.
                        </p>
                    </div>

                    <div className="mt-12 flex gap-8 border-t border-border-dark pt-8">
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">2023</div>
                            <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">System Online</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">500+</div>
                            <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Nodes Active</div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Mobile (Slide Up) | Desktop (Slide Left) */}
                <div className={`relative mt-8 lg:mt-0 transition-all duration-700 delay-200 ease-out ${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-y-8 sm:translate-y-0 sm:translate-x-8'}`}>
                    {/* Adjusted inner padding to p-6 for better fit on mobile */}
                    <div className="border border-border-dark bg-surface-dark p-6 sm:p-8 relative overflow-hidden group hover:border-primary/30 transition-colors duration-500">
                        {/* Decorative header */}
                        <div className="flex justify-between items-center border-b border-border-dark pb-4 mb-6">
                            <span className="font-mono text-[10px] text-neutral-500">AGENCY_CORE.SYS</span>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-neutral-700 rounded-full"></div>
                                <div className="w-2 h-2 bg-neutral-700 rounded-full"></div>
                                <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_#ff4400]"></div>
                            </div>
                        </div>

                        {/* List - Improved Flex layout for mobile safety */}
                        <ul className="space-y-4">
                            {[
                                { label: 'Philosophy', val: 'Anti-Commission' },
                                { label: 'Architecture', val: 'Direct-to-Consumer' },
                                { label: 'Latency', val: '< 100ms Response' },
                                { label: 'Data Policy', val: 'Client Ownership 100%' },
                                { label: 'Support', val: '24/7 Dedicated Uplink' }
                            ].map((item, i) => (
                                <li key={i} className="flex justify-between items-start sm:items-center gap-4 border-b border-border-dark/50 pb-2 last:border-0 last:pb-0">
                                    <span className="font-mono text-[10px] sm:text-xs text-neutral-500 uppercase tracking-wider shrink-0 mt-0.5 sm:mt-0">
                                        // {item.label}
                                    </span>
                                    <span className="font-bold text-xs sm:text-sm text-white text-right break-words">
                                        {item.val}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* ASCII Art */}
                        <div className="mt-8 bg-black/50 p-4 border border-border-dark font-mono text-[10px] text-primary/50 leading-tight">
                            STATUS: OPERATIONAL<br/>
                            TARGET: ELIMINATE_FEES<br/>
                            <span className="animate-blink">_</span>
                        </div>
                        
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary"></div>
                        <div className="absolute -top-1 -left-1 w-3 h-3 bg-white"></div>
                    </div>
                    <div className="absolute -z-10 top-4 -right-4 w-full h-full border border-border-dark bg-[#0a0a0a] hidden sm:block"></div>
                </div>
            </div>
        </div>
    </section>
  );
};