import React, { useState } from 'react';

const faqs = [
  {
    question: "Is it actually 0% commission?",
    answer: "Yes. We are a software provider, not a broker. You pay a small fixed monthly fee for the technology. We never touch your order revenue. Every rupee goes to you."
  },
  {
    question: "Do I own the customer data?",
    answer: "100%. Unlike aggregator apps that hide data, you get the customer's name, phone number, and order history. This is your asset for marketing and loyalty campaigns."
  },
  {
    question: "How do payments work?",
    answer: "Instant settlement. You use your own UPI or Payment Gateway. Money goes directly from the customer to your bank account immediately. No waiting 7 days for payouts."
  },
  {
    question: "How long does setup take?",
    answer: "Standard setup takes 3 to 5 days. We ensure everything is perfectly configured—menu, payment gateways, and branding. In rare complex cases, it may take up to 1 week maximum, but never longer."
  },
  {
    question: "Is there a lock-in period?",
    answer: "No hostages. Our service is month-to-month. We believe our product quality—not a legal contract—should be the reason you stay with us."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-b border-border-dark bg-[#050505] px-6 py-20 sm:py-32 sm:px-6 lg:px-8 relative overflow-hidden">
       {/* Background accent */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-4xl relative z-10">
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-border-dark pb-8">
            <div>
                {/* Removed: /// Knowledge Base */}
                <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                    System FAQ
                </h2>
            </div>
            {/* Removed Status/Database info block */}
        </div>

        <div className="grid gap-px bg-border-dark border border-border-dark">
            {faqs.map((faq, idx) => (
                <div 
                    key={idx} 
                    className={`group relative bg-surface-dark transition-all duration-300 ${openIndex === idx ? 'bg-[#0a0a0a]' : 'hover:bg-[#111]'}`}
                >
                    <button 
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        className="flex w-full items-center justify-between p-6 sm:p-8 text-left focus:outline-none"
                    >
                        <div className="flex items-start gap-6 pr-6">
                            <span className={`font-mono text-xs font-bold pt-1 transition-colors duration-300 ${openIndex === idx ? 'text-primary' : 'text-neutral-600 group-hover:text-neutral-400'}`}>
                                {(idx + 1).toString().padStart(2, '0')}
                            </span>
                            <span className={`text-sm sm:text-base font-bold uppercase tracking-wider leading-relaxed transition-colors duration-300 ${openIndex === idx ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                                {faq.question}
                            </span>
                        </div>
                        
                        {/* Animated Icon */}
                        <div className={`relative flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-300 ${openIndex === idx ? 'border-primary bg-primary text-white rotate-90' : 'border-neutral-800 text-neutral-500 group-hover:border-white group-hover:text-white'}`}>
                             <span className="material-symbols-outlined text-lg">add</span>
                        </div>
                    </button>
                    
                    <div 
                        className={`grid transition-all duration-300 ease-in-out ${openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                        <div className="overflow-hidden">
                            {/* Mobile Optimization: Reduced left padding (pl-6 -> pl-[3.25rem]) to prevent text squishing on small screens */}
                            <div className="px-6 pb-8 sm:px-8 sm:pb-8 pl-[3.25rem] sm:pl-[4.5rem]">
                                <div className="font-mono text-xs sm:text-sm text-neutral-400 leading-7 border-l-2 border-primary/20 pl-4">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Indicator Line */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-primary transition-all duration-300 ${openIndex === idx ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};