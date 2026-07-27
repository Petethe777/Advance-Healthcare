import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

const revealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please provide a valid email.';
    }
    if (!subject.trim()) newErrors.subject = 'Subject is required.';
    if (!message.trim()) newErrors.message = 'Please type your message details.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSuccess(true);

    // Reset fields
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    // Self dismiss success message after 6 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 6000);
  };

  const contactDetails = [
    {
      icon: <Phone className="w-5 h-5 text-teal-600" />,
      label: 'Clinical Consultation Desk',
      value: '+27 (0) 31 765 1234',
      sub: 'Mon - Fri, 8 AM - 5 PM'
    },
    {
      icon: <Mail className="w-5 h-5 text-teal-600" />,
      label: 'Patient Care Email',
      value: 'support@advancehealth.co.za',
      sub: 'Replies within 24 hours'
    },
    {
      icon: <MapPin className="w-5 h-5 text-teal-600" />,
      label: 'Main Facility Location',
      value: '32 Inanda Rd, Belvedere Ext 1',
      sub: 'Hillcrest, 3650, South Africa'
    }
  ];

  const operatingHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 5:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 2:00 PM (Urgent Care)' },
    { day: 'Sunday', hours: 'Closed (Emergency Inquiries)' }
  ];

  return (
    <div className="py-12 space-y-28 pb-28">
      {/* Page Header */}
      <div className="bg-[#FAF9F5] py-16 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="max-w-3xl space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold font-sans tracking-tight text-slate-900 leading-[1.1]">
              Reach Out to Our Care Coordination Team
            </h1>
            <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed">
              Need scheduling coordination, specialised testing directions, or have general patient support questions? Drop us a message below or call us directly.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact details, Hour panel & Image visual (left) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={revealVariants}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-6">
              {contactDetails.map((detail, i) => (
                <div key={i} className="flex gap-4 items-start" id={`contact-page-detail-${i}`}>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                    {detail.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wide">
                      {detail.label}
                    </h4>
                    <p className="font-semibold text-slate-900 text-sm mt-1">
                      {detail.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {detail.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Operating Hours Panel */}
            <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-600" />
                <h4 className="font-bold text-slate-900 text-sm font-sans">
                  Clinic Hours of Operation
                </h4>
              </div>
              <div className="divide-y divide-slate-200/60 text-xs text-slate-700">
                {operatingHours.map((h, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between">
                    <span className="font-semibold text-slate-800">{h.day}</span>
                    <span className="font-mono text-slate-600">{h.hours}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 p-3 bg-white rounded-xl border border-slate-100 text-[10px] text-slate-500 leading-relaxed flex items-center gap-2 shadow-3xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Need Emergency Medical Assistance? Call 112 or Netcare 911 at 082 911, or head to the nearest South African Emergency Centre immediately.</span>
              </div>
            </div>
          </motion.div>

          {/* Secure Message form (right) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={revealVariants}
            className="lg:col-span-7 bg-[#FAF9F5] p-6 md:p-8 rounded-3xl border border-slate-200/80 relative h-fit shadow-2xs"
          >
            <h3 className="text-base font-bold text-slate-900 mb-6 font-sans">
              Send a Secure General Inquiry
            </h3>

            {isSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs sm:text-sm flex gap-3 items-start animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Message Logged Successfully!</span>
                  Our administrative clinical nurse coordinator has received your general query. We will evaluate and reply within 24 business hours.
                </div>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Johnathan Miller"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors({});
                    }}
                    className={`w-full p-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent ${
                      errors.name ? 'border-red-300 bg-red-50/10' : 'border-slate-250 bg-slate-50/20'
                    }`}
                    id="contact-page-name-input"
                  />
                  {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. j.miller@domain.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({});
                    }}
                    className={`w-full p-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent ${
                      errors.email ? 'border-red-300 bg-red-50/10' : 'border-slate-250 bg-slate-50/20'
                    }`}
                    id="contact-page-email-input"
                  />
                  {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject / Clinical Department
                </label>
                <input
                  type="text"
                  placeholder="e.g. Billing inquiries, Specialist coordination..."
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setErrors({});
                  }}
                  className={`w-full p-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent ${
                    errors.subject ? 'border-red-300 bg-red-50/10' : 'border-slate-250 bg-slate-50/20'
                  }`}
                  id="contact-page-subject-input"
                />
                {errors.subject && <p className="text-[10px] text-red-500 mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message Description
                </label>
                <textarea
                  placeholder="Provide precise details for the administrative team to assist you..."
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setErrors({});
                  }}
                  className={`w-full p-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent ${
                    errors.message ? 'border-red-300 bg-red-50/10' : 'border-slate-250 bg-slate-50/20'
                  }`}
                  id="contact-page-message-input"
                />
                {errors.message && <p className="text-[10px] text-red-500 mt-1">{errors.message}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-xs tracking-wide uppercase rounded-xl transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  id="contact-page-submit-btn"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Secure Message</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
