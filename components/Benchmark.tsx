import React, { useEffect, useRef, useState } from 'react';

const comparisons = [
  { legacy: '15-35% Commission per order', zero: '0% Commission forever', icon: 'check_circle' },
  { legacy: 'Payments after 30-60 days', zero: 'Instant / Next Day Payouts', icon: 'bolt' },
  { legacy: 'They own the customer data', zero: 'You own 100% of data', icon: 'database' },
  { legacy: 'Broken Hardware Costs', zero: 'Lifetime Hardware Warranty', icon: 'shield' },
  { legacy: 'Hard Menu Edits', zero: 'Unlimited Managed Updates', icon: 'support_agent' },
];

export const Benchmark: React.FC = () => {
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
    <section ref={sectionRef} className="border-b border-border-dark bg-[#050505] px-6 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header: Mobile Slide Up | Desktop Slide Right */}
        <div className={`mb-12 flex items-end justify-between border-b border-white pb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-y-4 sm:translate-y-0 sm:-translate-x-8'}`}>
          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">System Comparison</h3>
          <span className="font-mono text-[10px] sm:text-xs text-neutral-500">REF: MARKET_DATA</span>
        </div>
        <div className="w-full text-left">
          {/* Mobile Safe: Grid layout with adequate spacing */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 py-4 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-500">
            <div>Old Delivery Apps</div>
            <div className="text-primary">ZEROCOMM System</div>
          </div>
          {comparisons.map((row, idx) => (
            <div 
                key={idx} 
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`grid grid-cols-2 gap-4 sm:gap-8 border-t border-border-dark py-6 sm:py-8 group hover:bg-surface-dark transition-all duration-500 px-1 sm:px-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="font-mono text-xs sm:text-sm text-neutral-400 break-words pr-2">{row.legacy}</div>
              <div className="font-bold text-white flex items-start sm:items-center gap-2 text-xs sm:text-base">
                <span className="material-symbols-outlined text-primary text-sm shrink-0 mt-0.5 sm:mt-0">{row.icon}</span>
                <span className="break-words leading-tight">{row.zero}</span>
              </div>
            </div>
          ))}
          <div className="border-t border-border-dark"></div>
        </div>
      </div>
    </section>
  );
};