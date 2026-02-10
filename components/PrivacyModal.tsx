import React, { useEffect } from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
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
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-dark bg-surface-dark px-4 py-3 select-none">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">security</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
              PRIVACY_PROTOCOL.LOG
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
              // 01. Data Collection & Cookies
            </p>
            <p>
              <span className="text-primary">STATUS: MINIMALIST.</span> ZEROCOMM currently deploys <strong className="text-white">NO cookies, NO third-party trackers, and NO Google Analytics beacons</strong>. We operate on a strict need-to-know basis. The only data entering this system is what you manually input (Name, Restaurant Name, City, Phone). We do not silently spy on your browsing behavior.
            </p>

            <p className="text-white font-bold uppercase border-b border-border-dark pb-2 mb-4 mt-8">
              // 02. Transmission Vector (WhatsApp)
            </p>
            <p>
              Data routing is configured to send all inquiries directly to the <span className="text-white">WhatsApp API</span>. This ensures immediate delivery to you. We act as a passthrough conduit. We do not warehouse your potential customer lists on centralized servers for third-party mining or sale.
            </p>

            <p className="text-white font-bold uppercase border-b border-border-dark pb-2 mb-4 mt-8">
              // 03. Financial Firewall
            </p>
            <p>
              <span className="text-green-500">PAYMENT GATEWAYS: INACTIVE.</span> This terminal node does not request, store, or process Credit Card, Banking, or UPI credentials. No financial data is harvested through this frontend interface.
            </p>

            <p className="text-white font-bold uppercase border-b border-border-dark pb-2 mb-4 mt-8">
              // 04. Communication Protocols
            </p>
            <p>
              By engaging the terminal form, you authorize encrypted communication via WhatsApp. This channel is used for account setup coordination and critical system updates. Email protocols may be activated in future patches for administrative alerts.
            </p>
            
            <div className="mt-8 p-3 border border-dashed border-border-dark bg-white/5 text-[10px]">
              ENCRYPTION: STANDARD_SSL<br/>
              TRACKING: DISABLED<br/>
              TIMESTAMP: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border-dark bg-surface-dark p-4 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-white text-black font-mono text-xs font-bold uppercase px-6 py-2 hover:bg-primary hover:text-white transition-colors"
          >
            Close Log
          </button>
        </div>

        {/* Decorative Corner */}
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary"></div>
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white"></div>
      </div>
    </div>
  );
};