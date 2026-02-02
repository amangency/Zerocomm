import React, { useState, useMemo, useEffect, useRef } from 'react';

export const Calculator: React.FC = () => {
  const [revenue, setRevenue] = useState(50000);
  const [taxRate, setTaxRate] = useState(30);
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = useMemo(() => {
    const monthlyLoss = revenue * (taxRate / 100);
    const annualBleed = monthlyLoss * 12;
    const aggregatorNet = revenue - monthlyLoss;
    const zerocommNet = revenue; 

    return {
      monthlyLoss,
      annualBleed,
      aggregatorNet,
      zerocommNet
    };
  }, [revenue, taxRate]);

  const maxBarHeight = 200;
  // If not visible yet, force height to 0 for animation effect
  const zerocommHeight = isVisible ? maxBarHeight : 0; 
  const aggregatorHeight = isVisible ? maxBarHeight * ((100 - taxRate) / 100) : 0;

  const getSliderBackground = (value: number, min: number, max: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, #ff4400 0%, #ff4400 ${percentage}%, #333 ${percentage}%, #333 100%)`
    };
  };

  return (
    <section ref={sectionRef} className="border-b border-border-dark bg-[#050505] px-6 py-20 sm:py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className={`mb-16 text-center transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest border border-primary/30 px-3 py-1 bg-primary/5">
            Savings Calculator
          </span>
          <h3 className="mt-6 text-3xl sm:text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
            Profit Loss Checker
          </h3>
          <p className="mt-4 font-mono text-xs sm:text-sm text-neutral-500">
            CALCULATE MONEY LOST TO THIRD-PARTY COMMISSIONS
          </p>
        </div>
        
        <div className="relative bg-surface-dark border border-border-dark p-6 sm:p-8 md:p-12 shadow-2xl shadow-black">
          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary"></div>

          <div className="grid gap-16 lg:grid-cols-2">
            <div className="space-y-12">
              <div>
                <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <label className="font-mono text-xs font-bold uppercase text-neutral-500 tracking-wider">
                    Monthly Sales (Revenue)
                  </label>
                  <span className="font-mono text-xl font-bold text-white">
                    ₹{revenue.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="1000"
                  value={revenue}
                  onChange={(e) => setRevenue(parseInt(e.target.value))}
                  className="w-full h-2 appearance-none rounded-none cursor-pointer focus:outline-none"
                  style={getSliderBackground(revenue, 10000, 200000)}
                />
                <div className="mt-2 flex justify-between text-[10px] font-mono text-neutral-600">
                  <span>₹10K</span>
                  <span>₹200K</span>
                </div>
              </div>

              <div>
                <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <label className="font-mono text-xs font-bold uppercase text-neutral-500 tracking-wider">
                    App Commission %
                  </label>
                  <span className="font-mono text-xl font-bold text-white">{taxRate}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseInt(e.target.value))}
                  className="w-full h-2 appearance-none rounded-none cursor-pointer focus:outline-none"
                  style={getSliderBackground(taxRate, 0, 40)}
                />
                <div className="mt-2 flex justify-between text-[10px] font-mono text-neutral-600">
                  <span>0%</span>
                  <span>40%</span>
                </div>
              </div>

              <div className="pt-8 border-t border-border-dark">
                <span className="font-mono text-xs font-bold uppercase text-neutral-500">
                  Yearly Money Lost
                </span>
                <div className="mt-2 text-3xl font-bold text-white tracking-tight">
                  ₹{stats.annualBleed.toLocaleString()}
                </div>
                <p className="mt-2 font-mono text-[10px] text-red-500 uppercase">
                  Warning: Money being lost
                </p>
              </div>
            </div>

            <div className="flex flex-col bg-[#050505] border border-border-dark p-6 sm:p-8 relative">
              <div className="absolute top-4 right-4 animate-pulse">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              </div>
              <span className="font-mono text-xs font-bold uppercase text-neutral-500 mb-6">
                Payout Comparison (Net)
              </span>
              
              <div className="flex-1 flex items-end justify-around gap-4 pb-8 border-b border-border-dark min-h-[220px]">
                {/* Aggregator Bar */}
                <div className="flex flex-col items-center gap-2 w-1/3 group">
                  <span className="font-mono text-xs font-bold text-neutral-500 group-hover:text-white transition-colors">
                    ₹{(stats.aggregatorNet / 1000).toFixed(0)}k
                  </span>
                  <div 
                    className="w-full bg-neutral-800 relative border-t border-white/10 hover:bg-neutral-700 transition-all duration-[1000ms] ease-out origin-bottom"
                    style={{ height: `${aggregatorHeight}px` }}
                  >
                    <div className="absolute top-0 w-full h-[1px] bg-white/20"></div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-max text-center text-[10px] font-mono text-neutral-500 tracking-tighter whitespace-nowrap">
                      OTHER APPS
                    </div>
                  </div>
                </div>

                {/* Zerocomm Bar */}
                <div className="flex flex-col items-center gap-2 w-1/3 group">
                  <span className="font-mono text-xs font-bold text-primary">
                    ₹{(stats.zerocommNet / 1000).toFixed(0)}k
                  </span>
                  <div 
                    className="w-full bg-primary/20 border border-primary relative shadow-[0_0_15px_rgba(255,68,0,0.2)] transition-all duration-[1000ms] ease-out origin-bottom"
                    style={{ height: `${zerocommHeight}px` }}
                  >
                    <div className="absolute top-0 w-full h-0.5 bg-primary shadow-[0_0_10px_#ff4400]"></div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-max text-center text-[10px] font-mono text-white font-bold tracking-tighter whitespace-nowrap">
                      ZEROCOMM
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <span className="font-mono text-xs text-neutral-500 uppercase">
                  Monthly Loss Detected
                </span>
                <div className="mt-1 text-4xl sm:text-5xl font-black tracking-tighter text-primary break-words">
                  ₹{stats.monthlyLoss.toLocaleString()}
                </div>
                <span className="mt-2 block font-mono text-[10px] text-neutral-400">
                  RECOVERABLE IMMEDIATELY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};