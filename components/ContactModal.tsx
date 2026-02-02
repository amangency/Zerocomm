import React, { useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
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
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-md border border-border-dark bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-dark bg-surface-dark px-4 py-3 select-none">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">alternate_email</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
              CONTACT_SUPPORT
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6 border-l-2 border-primary pl-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Direct Support</h3>
            <p className="font-mono text-xs text-neutral-500">AGENCY HQ // CHANNEL_OPEN</p>
          </div>

          <div className="space-y-6">
            {/* Email Block */}
            <div className="group relative bg-surface-dark p-4 border border-border-dark hover:border-primary/50 transition-colors">
              <span className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 font-mono text-[10px] text-neutral-500">
                OFFICIAL_EMAIL
              </span>
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-sm text-white break-all">
                  teamzerocomm@gmail.com
                </span>
                <a 
                  href="mailto:teamzerocomm@gmail.com"
                  className="flex items-center justify-center h-8 w-8 border border-neutral-700 hover:bg-primary hover:border-primary hover:text-white transition-all text-neutral-400"
                  title="Send Email"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                </a>
              </div>
            </div>

            {/* Phone Block (Active) */}
            <div className="group relative bg-surface-dark p-4 border border-border-dark hover:border-primary/50 transition-colors">
              <span className="absolute -top-2 left-3 bg-[#0a0a0a] px-1 font-mono text-[10px] text-neutral-500">
                VOICE_LINE
              </span>
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-sm text-white tracking-wider">
                  +91 6299431382
                </span>
                <a 
                  href="tel:+916299431382"
                  className="flex items-center justify-center h-8 w-8 border border-neutral-700 hover:bg-primary hover:border-primary hover:text-white transition-all text-neutral-400"
                  title="Call Now"
                >
                  <span className="material-symbols-outlined text-sm">call</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
             <p className="font-mono text-[10px] text-neutral-600 uppercase">
                Response Time: &lt; 24 Hours
             </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border-dark bg-surface-dark p-4 flex justify-end">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto bg-white text-black font-mono text-xs font-bold uppercase px-6 py-3 hover:bg-primary hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};