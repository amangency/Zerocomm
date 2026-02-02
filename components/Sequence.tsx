import React, { useEffect, useRef, useState } from 'react';

const steps = [
  {
    id: '01',
    title: 'Customer Scans QR',
    desc: 'Customer scans the QR code on the table. No app download needed.',
  },
  {
    id: '02',
    title: 'Menu Opens Instantly',
    desc: 'Your digital menu opens in seconds. Fast and easy to use.',
  },
  {
    id: '03',
    title: 'Order on WhatsApp',
    desc: 'Order details are sent directly to your WhatsApp. No middleman.',
  },
  {
    id: '04',
    title: 'You Keep The Data',
    desc: 'You get the customer phone number & data. You own it 100%.',
  },
];

export const Sequence: React.FC = () => {
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
    <section ref={sectionRef} className="border-b border-border-dark bg-surface-dark px-6 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Responsive Animation: Mobile (Slide Up) | Desktop (Slide Right) */}
        <div className={`mb-16 border-l-4 border-white pl-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0 translate-y-8 sm:translate-y-0 sm:-translate-x-8'}`}>
          <h3 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-primary mb-2">
            Easy Process
          </h3>
          <h2 className="text-3xl font-bold uppercase text-white tracking-tight">How It Works</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {steps.map((step, idx) => (
            <div 
              key={step.id} 
              style={{ transitionDelay: `${idx * 150}ms` }}
              className={`relative flex flex-col gap-6 group transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              <div className="font-mono text-xs text-neutral-500 border-b border-neutral-800 pb-2">
                STEP_{step.id}
              </div>
              <div className="font-black text-7xl text-neutral-800 group-hover:text-primary/20 transition-colors leading-none select-none transform origin-left group-hover:scale-110 duration-500">
                {step.id}
              </div>
              <div>
                <h4 className="text-lg font-bold uppercase tracking-wide text-white break-words">{step.title}</h4>
                <p className="mt-2 text-sm text-neutral-400 font-mono leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};