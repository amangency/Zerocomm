import React from 'react';

const badges = [
  { icon: 'lock_open', text: 'SECURE DATA' },
  { icon: 'verified_user', text: 'INDUSTRY STANDARD' },
  { icon: 'dns', text: 'FAST NETWORK' },
  { icon: 'payments', text: 'INSTANT PAYOUTS' },
  { icon: 'shield', text: 'FRAUD PROTECTION' },
];

export const TrustBar: React.FC = () => {
  return (
    <section className="border-b border-border-dark bg-surface-dark py-6 sm:py-8 overflow-hidden">
      {/* Mobile View: Infinite Marquee */}
      {/* Uses a duplicated list to create a seamless loop with the translateX(-50%) animation */}
      {/* Added transform-gpu and translate-z-0 for hardware acceleration to fix mobile lag */}
      <div className="sm:hidden relative flex overflow-hidden opacity-80">
        <div className="flex animate-marquee w-max py-2 will-change-transform transform-gpu translate-z-0">
          {/* First Set */}
          <div className="flex shrink-0">
            {badges.map((badge, idx) => (
              <div key={`m1-${idx}`} className="flex items-center gap-2 mx-6">
                <span className="material-symbols-outlined text-neutral-500 text-lg">{badge.icon}</span>
                <span className="font-mono text-[10px] font-bold text-neutral-400 tracking-widest uppercase">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
          {/* Second Set (Duplicate for Loop) */}
          <div className="flex shrink-0" aria-hidden="true">
            {badges.map((badge, idx) => (
              <div key={`m2-${idx}`} className="flex items-center gap-2 mx-6">
                <span className="material-symbols-outlined text-neutral-500 text-lg">{badge.icon}</span>
                <span className="font-mono text-[10px] font-bold text-neutral-400 tracking-widest uppercase">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Fade gradients for smooth edge appearance */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-surface-dark to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-surface-dark to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Desktop View: Static Flex Grid */}
      <div className="hidden sm:flex mx-auto max-w-7xl flex-wrap justify-between items-center gap-8 opacity-60 px-4">
        {badges.map((badge, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="material-symbols-outlined text-neutral-500">{badge.icon}</span>
            <span className="font-mono text-xs font-bold text-neutral-400 tracking-widest">
              {badge.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};