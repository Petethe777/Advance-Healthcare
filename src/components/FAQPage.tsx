import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQS } from '../data';

interface FAQPageProps {
  onNavigate: (pageId: string) => void;
}

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export default function FAQPage({ onNavigate }: FAQPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Appointments', 'Services', 'Billing'];

  const filteredFaqs = selectedCategory === 'All'
    ? FAQS
    : FAQS.filter(f => f.category === selectedCategory);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="py-12 space-y-16 pb-24">
      {/* Page Header */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="max-w-3xl space-y-4"
          >
            <span className="text-[11px] font-mono font-bold tracking-widest text-teal-600 uppercase">
              PATIENT INFORMATION & RESOURCES
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold font-sans tracking-tight text-slate-900 leading-[1.1]">
              Frequently Asked Clinic Inquiries
            </h1>
            <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed">
              Quickly resolve inquiries regarding billing credentials, specialist scheduling parameters, and diagnostic timelines.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Category Filtering menu (left) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={revealVariants}
            className="lg:col-span-4 space-y-4"
          >
            <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-2xs">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4">
                FAQ Categories
              </h4>
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setExpandedId(null);
                    }}
                    className={`py-2 px-4 rounded-xl text-xs font-semibold text-left transition-all whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-teal-600 text-white shadow-sm font-semibold'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-200/50'
                    }`}
                    id={`faq-page-category-btn-${cat}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-teal-50/40 border border-teal-100/30 space-y-3">
              <div className="p-2 rounded-lg bg-teal-600 text-white w-fit">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h5 className="font-semibold text-slate-900 text-sm font-sans">
                Still have clinical questions?
              </h5>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Our support team is available Mon-Fri 8:00 AM - 5:00 PM for specialized support.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
                id="faq-speak-to-nurse-btn"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Speak to a Nurse &rarr;
              </button>
            </div>

            {/* Visual Support Card */}
            <div className="rounded-2xl overflow-hidden border border-slate-150 p-1 bg-white shadow-3xs">
              <div className="h-32 rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80"
                  alt="Clinical Nurse Support Desk"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Accordion List (right) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={revealVariants}
            className="lg:col-span-8 space-y-3"
          >
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all ${
                    isExpanded
                      ? 'border-teal-600/30 bg-white shadow-sm'
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                  id={`faq-page-item-container-${faq.id}`}
                >
                  {/* Trigger Header */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 flex justify-between items-center text-left gap-4 cursor-pointer"
                    id={`faq-page-toggle-btn-${faq.id}`}
                  >
                    <span className="font-semibold text-slate-900 text-sm md:text-base font-sans tracking-tight">
                      {faq.question}
                    </span>
                    <span className={`p-1 rounded-full bg-slate-50 border border-slate-100/50 transition-transform ${
                      isExpanded ? 'rotate-180 text-teal-600 bg-teal-50' : 'text-slate-400'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {/* Collapsible Content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'max-h-60 border-t border-slate-100' : 'max-h-0'
                    }`}
                  >
                    <div className="p-5 text-slate-500 font-light text-xs md:text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
