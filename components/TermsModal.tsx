import React, { useEffect } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Window */}
      <div className="relative w-full max-w-lg border border-border-dark bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header (Draggable look) */}
        <div className="flex items-center justify-between border-b border-border-dark bg-surface-dark px-4 py-3 select-none">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">gavel</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
              AGENCY_LEGAL.TXT
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="h-[60vh] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          <div className="space-y-6 font-mono text-xs leading-relaxed text-neutral-400">
            <p className="text-white font-bold uppercase border-b border-border-dark pb-2 mb-4">
              // 01. Service Usage
            </p>
            <p>
              By accessing ZEROCOMM infrastructure, you verify that you are a legitimate food service operator. This terminal provides direct-to-consumer ordering capabilities. Any attempt to scrape, reverse-engineer, or flood the network with bot traffic will result in an immediate IP ban.
            </p>

            <p className="text-white font-bold uppercase border-b border-border-dark pb-2 mb-4 mt-8">
              // 02. Zero Commission Policy
            </p>
            <p>
              We adhere to a strict <span className="text-primary">NO COMMISSION</span> protocol. We do not take a percentage of your food orders. You are billed a flat monthly SaaS fee for server maintenance. If payment fails, the node goes offline automatically after 48 hours.
            </p>

            <p className="text-white font-bold uppercase border-b border-border-dark pb-2 mb-4 mt-8">
              // 03. Data Ownership
            </p>
            <p>
              Unlike aggregators, ZEROCOMM does not own your customer data. The phone numbers and order history generated through this terminal belong 100% to you. We act solely as the transmission layer.
            </p>

            <p className="text-white font-bold uppercase border-b border-border-dark pb-2 mb-4 mt-8">
              // 04. Liability
            </p>
            <p>
              ZEROCOMM ensures the digital message is delivered. We are not responsible for food quality, delivery delays, or refund disputes. All service disputes must be resolved between Vendor and Customer.
            </p>
            
            <div className="mt-8 p-3 border border-dashed border-border-dark bg-white/5 text-[10px]">
              STATUS: LEGALLY_BINDING<br/>
              TIMESTAMP: {new Date().getFullYear()}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border-dark bg-surface-dark p-4 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-white text-black font-mono text-xs font-bold uppercase px-6 py-2 hover:bg-primary hover:text-white transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>

        {/* Decorative Corner */}
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary"></div>
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white"></div>
      </div>
    </div>
  );
};