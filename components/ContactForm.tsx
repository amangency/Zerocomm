import React, { useState } from 'react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    city: '',
    ownerName: '',
    phone: '',
    currentApp: '',
    orderVolume: '', // New Field
    launchTimeline: '' // New Field
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'phone' && error) setError(null); // Clear error when typing
  };

  const handleWhatsAppRedirect = () => {
    const { restaurantName, city, ownerName, phone, currentApp, orderVolume, launchTimeline } = formData;
    
    // Validation: Require Phone Number at minimum
    if (!phone || phone.length < 10) {
      setError("ERROR: VALID_PHONE_REQUIRED");
      const phoneInput = document.querySelector('input[name="phone"]') as HTMLInputElement;
      if (phoneInput) phoneInput.focus();
      return;
    }

    // Client-Side Only Logic (No API Key Needed)
    setIsSubmitting(true);

    // Artificial delay to make it feel like a "System Processing" event
    setTimeout(() => {
        // Construct message with new fields
        const text = `*New Agency Inquiry*\n\nRestaurant: ${restaurantName || 'N/A'}\nCity: ${city || 'N/A'}\nOwner: ${ownerName || 'N/A'}\nPhone: ${phone}\nCurrent App: ${currentApp || 'N/A'}\nOrder Volume: ${orderVolume || 'N/A'}\nTimeline: ${launchTimeline || 'N/A'}\n\nI want to start my journey with ZeroComm.`;
        
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/916299431382?text=${encodedText}`;
        
        // CRITICAL MOBILE FIX: 
        // iOS Safari blocks window.open() inside a setTimeout. 
        // Using window.location.href ensures the WhatsApp app opens reliably on all devices.
        window.location.href = whatsappUrl;
        
        setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact-form" className="bg-[#050505] px-6 py-20 sm:py-32 sm:px-6 lg:px-8 scroll-mt-2">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 border-l-4 border-primary pl-6 flex justify-between items-end">
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tight text-white">Join The System</h3>
            <p className="mt-2 font-mono text-xs text-neutral-400">SIGN UP FORM // GET STARTED TODAY</p>
          </div>
          <div className="hidden sm:flex flex-col items-end">
            <span className="material-symbols-outlined text-primary">lock</span>
            <span className="font-mono text-[10px] text-primary uppercase mt-1">End-to-End Encryption</span>
          </div>
        </div>
        
        <form className="space-y-6 bg-surface-dark border border-border-dark p-6 sm:p-12 relative overflow-hidden" onSubmit={(e) => e.preventDefault()}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="font-mono text-[10px] font-bold uppercase text-neutral-500 tracking-wider">Restaurant Name</label>
              <input 
                type="text" 
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                disabled={isSubmitting}
                autoComplete="organization"
                className="w-full rounded-none border border-border-dark bg-[#050505] px-4 py-4 font-mono text-sm text-white placeholder-neutral-700 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all disabled:opacity-50"
                placeholder="ENTER NAME"
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] font-bold uppercase text-neutral-500 tracking-wider">City Name</label>
              <input 
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={isSubmitting}
                autoComplete="address-level2"
                className="w-full rounded-none border border-border-dark bg-[#050505] px-4 py-4 font-mono text-sm text-white placeholder-neutral-700 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all disabled:opacity-50"
                placeholder="ENTER CITY"
              />
            </div>
          </div>
          
          <div className="relative z-10 space-y-2">
            <label className="font-mono text-[10px] font-bold uppercase text-neutral-500 tracking-wider">Owner Name</label>
            <input 
              type="text" 
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              disabled={isSubmitting}
              autoComplete="name"
              className="w-full rounded-none border border-border-dark bg-[#050505] px-4 py-4 font-mono text-sm text-white placeholder-neutral-700 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all disabled:opacity-50"
              placeholder="FULL NAME"
            />
          </div>
          
          <div className="relative z-10 space-y-2">
            <div className="flex justify-between">
              <label className={`font-mono text-[10px] font-bold uppercase tracking-wider ${error ? 'text-red-500' : 'text-neutral-500'}`}>
                Phone Number {error && <span className="ml-2 animate-pulse">// {error}</span>}
              </label>
              <span className="font-mono text-[10px] text-primary">*REQUIRED</span>
            </div>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              autoComplete="tel"
              className={`w-full rounded-none border bg-[#050505] px-4 py-4 font-mono text-sm text-white placeholder-neutral-700 focus:ring-1 focus:outline-none transition-all disabled:opacity-50 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-border-dark focus:border-primary focus:ring-primary'}`}
              placeholder="+91 00000 00000"
            />
          </div>
          
          {/* Current App */}
          <div className="relative z-10 space-y-2">
            <label className="font-mono text-[10px] font-bold uppercase text-neutral-500 tracking-wider">Current App Used</label>
            <div className="relative">
              <select 
                name="currentApp"
                value={formData.currentApp}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full appearance-none rounded-none border border-border-dark bg-[#050505] bg-none px-4 py-4 font-mono text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all disabled:opacity-50"
              >
                <option value="" disabled hidden>SELECT APP</option>
                <option value="Zomato">Zomato</option>
                <option value="Swiggy">Swiggy</option>
                <option value="Other App">Other App</option>
                <option value="None of the above">None of the above</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>

          {/* NEW: Order Volume */}
          <div className="relative z-10 space-y-2">
            <label className="font-mono text-[10px] font-bold uppercase text-neutral-500 tracking-wider">Approx. Monthly Orders?</label>
            <div className="relative">
              <select 
                name="orderVolume"
                value={formData.orderVolume}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full appearance-none rounded-none border border-border-dark bg-[#050505] bg-none px-4 py-4 font-mono text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all disabled:opacity-50"
              >
                <option value="" disabled hidden>SELECT VOLUME</option>
                <option value="0 - 100">0 - 100</option>
                <option value="100 - 500">100 - 500</option>
                <option value="500+">500+</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>

          {/* NEW: Speed of Launch */}
          <div className="relative z-10 space-y-2">
            <label className="font-mono text-[10px] font-bold uppercase text-neutral-500 tracking-wider">When do you want to go Live?</label>
            <div className="relative">
              <select 
                name="launchTimeline"
                value={formData.launchTimeline}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full appearance-none rounded-none border bg-[#050505] bg-none px-4 py-4 font-mono text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all disabled:opacity-50 ${formData.launchTimeline === 'Within 48 Hours' ? 'text-primary font-bold border-primary' : 'text-white border-border-dark'}`}
              >
                <option value="" disabled hidden>SELECT TIMELINE</option>
                <option value="Within 48 Hours">Within 48 Hours (Urgent)</option>
                <option value="Next Week">Next week</option>
                <option value="Just Checking">Just checking for now</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 pt-8">
            <button 
              type="button"
              onClick={handleWhatsAppRedirect}
              disabled={isSubmitting}
              className={`group relative flex h-16 w-full items-center justify-center overflow-hidden border border-primary bg-primary text-base font-bold uppercase tracking-[0.15em] text-white transition-all active:scale-[0.98] ${isSubmitting ? 'opacity-80 cursor-wait' : 'hover:bg-red-600'}`}
            >
              {isSubmitting ? (
                 <span className="relative z-10 flex items-center gap-3 animate-pulse">
                    <span className="material-symbols-outlined animate-spin">sync</span>
                    ESTABLISHING UPLINK...
                 </span>
              ) : (
                <>
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="material-symbols-outlined">lock_open</span>
                    Start Your Journey
                  </span>
                  {/* Clean sliding fill effect - Removed skew for perfect edge coverage */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-500 ease-out"></div>
                </>
              )}
            </button>
            <div className="mt-4 flex justify-center items-center gap-2 text-center font-mono text-[10px] text-neutral-600">
              <span className="material-symbols-outlined text-xs">vpn_key</span>
              <span>SECURE DATA TRANSMISSION V2.4</span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};