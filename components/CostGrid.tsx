import React, { useEffect, useRef, useState } from 'react';

const targets = [
  { id: '01', name: 'HIGH COMMISSIONS' },
  { id: '02', name: 'LISTING FEES' },
  { id: '03', name: 'FORCED DISCOUNTS' },
  { id: '04', name: 'STOLEN CUSTOMER DATA' },
  { id: '05', name: 'LATE PAYMENTS' },
  { id: '06', name: 'HIDDEN CHARGES' },
];

export const CostGrid: React.FC = () => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="border-b border-border-dark bg-[#050505] px-6 py-20 sm:py-32 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 border-l border-b border-border-dark opacity-20"></div>
      <div className="mx-auto max-w-6xl relative z-10">
        <div className={`mb-16 flex flex-col sm:flex-row sm:items-end justify-between border-b border-border-dark pb-6 gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <p className="text-3xl font-bold uppercase text-white tracking-tight">Stop Wasting Money On</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-px bg-border-dark sm:grid-cols-2 lg:grid-cols-3 border border-border-dark">
          {targets.map((target, idx) => (
            <div 
                key={target.id} 
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`group relative bg-surface-dark p-6 sm:p-8 hover:bg-[#0a0a0a] transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="absolute top-4 right-4 text-neutral-700 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">close</span>
              </div>
              <h4 className="font-mono text-xs text-neutral-500 mb-2">PROBLEM #{target.id}</h4>
              <span className="text-lg font-bold text-neutral-300 line-through decoration-primary decoration-2 opacity-50 group-hover:opacity-100 break-words">
                {target.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};