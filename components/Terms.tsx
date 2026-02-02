import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { TermsModal } from './TermsModal';
import { PrivacyModal } from './PrivacyModal';
import { ContactModal } from './ContactModal';

export const Terms: React.FC = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="bg-background-dark text-white font-display min-h-screen flex flex-col relative selection:bg-primary selection:text-white">
      {/* Background Overlay */}
      <div className="fixed inset-0 z-0 bg-grid-overlay opacity-10 pointer-events-none"></div>
      
      <Header />
      
      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex-grow w-full">
        {/* Page Title */}
        <div className="border-l-4 border-primary pl-6 mb-16">
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white mb-2 leading-none">
                Terms &<br/> Services
            </h1>
            <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mt-4">
                AGENCY_PROTOCOL // LEGAL_FRAMEWORK.DOC
            </p>
        </div>

        {/* Legal Content */}
        <div className="space-y-12">
            
            <section className="border border-border-dark bg-surface-dark/50 p-8 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <h3 className="font-mono text-sm font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-wider border-b border-border-dark pb-4">
                    <span className="text-primary material-symbols-outlined text-lg">gavel</span>
                    01 // Service Usage Agreement
                </h3>
                <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                    By accessing the ZEROCOMM infrastructure, you agree to operate within the defined parameters of the Zero Commission Protocol. This system is designed for direct-to-consumer independence. Any attempt to reverse engineer, subvert, or misuse the terminal nodes for unauthorized data scraping is strictly prohibited and will result in immediate termination of the uplink.
                </p>
            </section>

            <section className="border border-border-dark bg-surface-dark/50 p-8 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <h3 className="font-mono text-sm font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-wider border-b border-border-dark pb-4">
                    <span className="text-primary material-symbols-outlined text-lg">payments</span>
                    02 // Payments & Fee Structure
                </h3>
                <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                    ZEROCOMM operates on a strict <span className="text-white">"No Commission"</span> basis for order processing. We do not take a cut of your food sales. However, infrastructure maintenance fees (SaaS subscription) are billed monthly to support server costs and ongoing updates. Failure to settle terminal fees within 7 days of the billing cycle will result in a temporary suspension of the ordering node.
                </p>
            </section>

             <section className="border border-border-dark bg-surface-dark/50 p-8 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <h3 className="font-mono text-sm font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-wider border-b border-border-dark pb-4">
                    <span className="text-primary material-symbols-outlined text-lg">security</span>
                    03 // Data Ownership & Privacy
                </h3>
                <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                    Unlike aggregator platforms (e.g., Zomato, Swiggy), ZEROCOMM does not claim ownership of your customer data. All transaction logs, customer phone numbers, and order histories belong solely to the Vendor (You). We act only as the encrypted conduit for these data streams. We do not sell, share, or analyze your customer data for third-party advertising.
                </p>
            </section>

            <section className="border border-border-dark bg-surface-dark/50 p-8 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <h3 className="font-mono text-sm font-bold text-white mb-6 flex items-center gap-3 uppercase tracking-wider border-b border-border-dark pb-4">
                    <span className="text-primary material-symbols-outlined text-lg">warning</span>
                    04 // Liability & Fulfillment
                </h3>
                <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                    ZEROCOMM provides the technological framework for orders but is not responsible for the fulfillment, quality, hygiene, or delivery of food items. All dispute resolution regarding missing items, food quality, or refunds must be handled directly between the Vendor and the End-Customer.
                </p>
            </section>

            <div className="pt-8 border-t border-border-dark flex items-center gap-2 text-neutral-600">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span className="font-mono text-[10px] uppercase">Last Updated: October 2023 // SHA-256 VERIFIED</span>
            </div>
        </div>
      </main>

      <Footer 
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};