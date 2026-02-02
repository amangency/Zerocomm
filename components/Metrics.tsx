import React, { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    subject: 'Burger Spot, Delhi',
    icon: 'trending_up',
    value: '24%',
    label: 'Profit Increase',
    quote: '"Shifted 80% of our orders to direct channels within 30 days. Saved huge commissions."',
  },
  {
    subject: 'Biryani House, HYD',
    icon: 'storage',
    value: '4.5k',
    label: 'Customers Captured',
    quote: '"Built our own marketing list from zero. Customers now order directly again and again."',
  },
  {
    subject: 'Pizza Outlet, Mumbai',
    icon: 'timer',
    value: '3-5 Days',
    label: 'Avg. Setup Time',
    quote: '"Full system deployment took less than a week. No business interruption, seamless transition."',
  }
];

export const Metrics: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Run once for performance
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="border-b border-border-dark bg-surface-dark px-6 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className={`mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl font-bold uppercase text-white tracking-tight">Success Stories</h2>
        </div>

        {/* Static Grid Layout with Staggered Animation */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, idx) => (
                <div 
                    key={idx}
                    style={{ transitionDelay: `${idx * 150}ms` }}
                    className={`h-full bg-[#050505] border border-border-dark p-6 sm:p-8 hover:border-primary/50 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex flex-col justify-between group relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                    {/* Hover Accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent -translate-x-full group-hover:animate-shine opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest border border-neutral-800 px-2 py-1 rounded-sm">
                                {item.subject}
                            </span>
                            <span className="material-symbols-outlined text-neutral-600 text-xl group-hover:text-primary transition-colors">{item.icon}</span>
                        </div>
                        <div className="text-5xl font-black text-white mb-2 tracking-tighter break-words">{item.value}</div>
                        <div className="font-mono text-xs font-bold text-primary uppercase tracking-widest">{item.label}</div>
                    </div>
                    <p className="mt-8 text-xs text-neutral-400 leading-relaxed font-mono relative pl-4 border-l-2 border-neutral-800 group-hover:border-primary transition-colors">
                        {item.quote}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};