import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Building2, 
  Users, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  DollarSign, 
  Calculator, 
  Clock, 
  Sparkles, 
  Briefcase, 
  Send, 
  BadgeCheck, 
  FileCheck, 
  Settings, 
  Stethoscope,
  Trash2,
  Lock,
  Landmark
} from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  hpcsaNumber: string;
  location: string;
  model: string;
  message: string;
  timestamp: string;
  status: 'Pending Review' | 'Credential Verification' | 'Interview Scheduled' | 'Approved';
}

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export default function PartnerPage() {
  // Calculator states
  const [specialty, setSpecialty] = useState<'neuro' | 'dental' | 'cardio' | 'ortho' | 'general'>('neuro');
  const [slotsPerWeek, setSlotsPerWeek] = useState<number>(25);
  const [avgFee, setAvgFee] = useState<number>(1200); // in ZAR (Rands)
  const [includeAdmin, setIncludeAdmin] = useState<boolean>(true);
  const [includeEquipment, setIncludeEquipment] = useState<boolean>(true);

  // Configurator states
  const [roomType, setRoomType] = useState<'consult' | 'specialist' | 'diagnostic'>('specialist');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['fiber', 'billing']);

  // Form states
  const [formName, setFormName] = useState('');
  const [formSpecialty, setFormSpecialty] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formHpcsa, setFormHpcsa] = useState('');
  const [formLocation, setFormLocation] = useState('Hillcrest Medical Centre');
  const [formModel, setFormModel] = useState('Full-time Suite Residency');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Local storage inquiries
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Load inquiries from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('advance_health_partner_inquiries');
      if (stored) {
        setInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading inquiries', e);
    }
  }, []);

  // Specialty parameters for calculation
  const specialtyDefaults = {
    neuro: { name: 'Neurophysiology', avgFee: 1500, timeSavedPerHour: 1.5, referralMultiplier: 1.4 },
    dental: { name: 'Clinical Dentistry & Oral Health', avgFee: 950, timeSavedPerHour: 1.2, referralMultiplier: 1.35 },
    cardio: { name: 'Cardiology & Diagnostics', avgFee: 1800, timeSavedPerHour: 1.6, referralMultiplier: 1.5 },
    ortho: { name: 'Orthopedics & Sports Rehab', avgFee: 1100, timeSavedPerHour: 1.1, referralMultiplier: 1.25 },
    general: { name: 'General Medicine / Diagnostics', avgFee: 650, timeSavedPerHour: 1.0, referralMultiplier: 1.2 }
  };

  // Sync fee if specialty changes to default
  const handleSpecialtyChange = (selected: 'neuro' | 'dental' | 'cardio' | 'ortho' | 'general') => {
    setSpecialty(selected);
    setAvgFee(specialtyDefaults[selected].avgFee);
  };

  // Calculations
  const selectedSpecInfo = specialtyDefaults[specialty];
  const rawWeeklyRevenue = slotsPerWeek * avgFee;
  const monthlyRevenue = rawWeeklyRevenue * 4.33; // 4.33 weeks per month
  
  // Calculate expenses & net benefit
  const adminCharge = includeAdmin ? monthlyRevenue * 0.12 : 0; // 12% admin service charge
  const equipmentCharge = includeEquipment ? 4500 : 0; // Fixed flat equipment charge
  const estimatedNetRevenue = monthlyRevenue - adminCharge - equipmentCharge;

  // Time saved
  const adminHoursSavedPerWeek = includeAdmin ? (slotsPerWeek * selectedSpecInfo.timeSavedPerHour * 0.4) : 0;
  const practiceGrowthBoost = Math.round((selectedSpecInfo.referralMultiplier - 1) * 100);

  // Toggle addons helper
  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formPhone || !formSpecialty || !formHpcsa) {
      setErrorMsg('Please fill in all mandatory fields, including your HPCSA registration number.');
      return;
    }
    setErrorMsg('');

    const newInquiry: Inquiry = {
      id: 'inquiry-' + Date.now(),
      name: formName,
      specialty: formSpecialty,
      email: formEmail,
      phone: formPhone,
      hpcsaNumber: formHpcsa,
      location: formLocation,
      model: formModel,
      message: formMessage,
      timestamp: new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Pending Review'
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('advance_health_partner_inquiries', JSON.stringify(updated));

    setFormSubmitted(true);
    
    // Reset form fields
    setFormName('');
    setFormSpecialty('');
    setFormEmail('');
    setFormPhone('');
    setFormHpcsa('');
    setFormMessage('');
  };

  // Delete an inquiry
  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter(item => item.id !== id);
    setInquiries(updated);
    localStorage.setItem('advance_health_partner_inquiries', JSON.stringify(updated));
  };

  return (
    <div className="py-12 pb-28 space-y-24 bg-slate-50/10">
      
      {/* SECTION 1: HERO HEADER */}
      <div className="relative overflow-hidden py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.12),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="lg:col-span-7 space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-sans tracking-tight leading-[1.08]">
              Elevate Your Private Practice with <span className="text-teal-400">Advance Health.</span>
            </h1>
            <p className="text-slate-300 font-light text-sm md:text-base leading-relaxed max-w-2xl">
              We empower medical specialists with world-class facilities, clinical technology, automated front-desks, and a dynamic multi-specialty internal referral network. Join a community focusing strictly on evidence-based diagnostics, longevity, and superior patient outcomes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#calculator" 
                className="px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-500/10"
              >
                <span>Calculate Practice Value</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#apply" 
                className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
              >
                <span>Submit HPCSA Registry</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-900/60 p-3 backdrop-blur-xs">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80" 
                  alt="Modern diagnostics station" 
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-slate-950/90 border border-slate-800/80 p-4 rounded-xl flex items-center gap-4">
                <div className="p-2.5 bg-teal-500/10 text-teal-400 rounded-lg">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">PRACTICE STANDARDS</p>
                  <p className="text-xs font-semibold text-slate-200">HPCSA & POPIA Compliant Ecosystem</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* SECTION 2: WHY PARTNER WITH US? (HEAVY EMPHASIS) */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-12">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 text-[10px] font-mono font-bold tracking-widest uppercase">
              PRACTICE BENEFITS & GROWTH
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Partner with Us?
            </h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto">
              We eliminate administrative friction, secure modern facilities, and support a built-in referral pipeline so you can focus entirely on high-quality medical diagnostics and clinical care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            
            {/* Bento Grid Item 1: Prime Locations */}
            <div className="lg:col-span-5 bg-white border border-slate-150 rounded-3xl p-8 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="p-3 bg-teal-500/10 text-teal-600 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                    Prime Clinical Locations
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 font-light leading-relaxed">
                    Operate within high-end medical precincts. Our sites in **Hillcrest** (Hillcrest Medical Centre) and **Pinetown** are accessible directly via major transit nodes and cater to a premium patient demographic seeking custom care.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-50 flex flex-wrap gap-2">
                <span className="text-[9px] font-mono font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-full">Hillcrest Medical Centre</span>
                <span className="text-[9px] font-mono font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-full">Pinetown Practice Wing</span>
              </div>
            </div>

            {/* Bento Grid Item 2: Modern Shared Equipment */}
            <div className="lg:col-span-7 bg-white border border-slate-150 rounded-3xl p-8 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="p-3 bg-violet-500/10 text-violet-600 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                    State-of-the-Art Diagnostic Infrastructure
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 font-light leading-relaxed">
                    Gain direct access to specialized clinical equipment without heavy upfront capital. Partnering clinicians utilize advanced sleep-science hardware (such as full Polysomnography & CPAP titration rigs), modern clinical dental operatory chairs, high-spec functional EEG wave-scanning, and computerized hemodynamic cardiac equipment.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-violet-500 uppercase">Capital Expenditure Safeguard</span>
                <span className="text-xs text-slate-400 font-light font-mono">Save up to R750k in startup costs</span>
              </div>
            </div>

            {/* Bento Grid Item 3: Admin & Billing Suite */}
            <div className="lg:col-span-7 bg-white border border-slate-150 rounded-3xl p-8 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="p-3 bg-emerald-500/10 text-emerald-600 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                    End-to-End Billing, Reception, & NHI Compliance
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 font-light leading-relaxed">
                    Leave medical claims submission, patient triage, and payment collection to us. Our dedicated receptionists manage live scheduling, client welcoming, and HPCSA-aligned POPIA data records. Our medical billing hub handles medical aid inquiries and direct invoice generation seamlessly.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase">POPIA & HPCSA COMPLIANT</span>
                <span className="text-xs text-slate-400 font-light font-mono">12% Service Cap</span>
              </div>
            </div>

            {/* Bento Grid Item 4: Cross Referral Network */}
            <div className="lg:col-span-5 bg-white border border-slate-150 rounded-3xl p-8 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="p-3 bg-teal-500/10 text-teal-600 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                    Specialist Cross-Referral Loop
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 font-light leading-relaxed">
                    We nurture a highly unified medical ecosystem. A patient undergoing a diagnostic brain wave scan may easily access our dental clinic or outpatient cardiology wing. Our internal cross-referral engine secures a steady flow of pre-triaged, highly relevant patient consults.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-50 flex flex-wrap gap-2">
                <span className="text-[10px] font-mono font-bold text-teal-600 uppercase tracking-wider">&bull; Integrated Network Growth</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* SECTION 3: INTERACTIVE CALCULATOR (VALUE & IMPACT ESTIMATOR) */}
      <div id="calculator" className="max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.1),transparent_40%)]" />
          
          <div className="relative z-10">
            
            {/* Calculator Controls */}
            <div className="max-w-3xl mx-auto w-full space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold">
                  LIVE REVENUE & TIME CALCULATOR
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-sans text-white">
                  Estimate Your Partnership Potential
                </h2>
                <p className="text-slate-400 font-light text-xs md:text-sm">
                  Adjust the sliders and choose clinical preferences to view estimated monthly gross, net earnings, and administrative time savings inside the Advance Health ecosystem.
                </p>
              </div>

              <div className="space-y-6 pt-2">
                {/* Specialty select buttons */}
                <div className="space-y-2.5">
                  <label className="text-[11px] font-mono uppercase font-bold text-slate-400">Select Your Medical Discipline</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(Object.keys(specialtyDefaults) as Array<keyof typeof specialtyDefaults>).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleSpecialtyChange(key)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          specialty === key 
                            ? 'bg-teal-600 border-teal-400 text-white shadow-md'
                            : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <p className="font-bold uppercase tracking-wider text-[9px] mb-0.5 text-teal-400">
                          {key === 'neuro' ? 'Neuro' : key === 'dental' ? 'Dental' : key === 'cardio' ? 'Cardio' : key === 'ortho' ? 'Ortho' : 'GP'}
                        </p>
                        <p className="font-semibold truncate">{specialtyDefaults[key].name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Patient Sessions Slider */}
                <div className="space-y-3 bg-slate-950/40 p-5 rounded-2xl border border-slate-800/60">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-300 font-sans">Target Patients/Sessions Per Week</span>
                    <span className="text-teal-400 font-mono text-sm font-bold bg-teal-950/50 px-3 py-1 rounded-lg border border-teal-500/20">
                      {slotsPerWeek} Consults
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={slotsPerWeek}
                    onChange={(e) => setSlotsPerWeek(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-slate-500">
                    <span>5 (Part-time Block)</span>
                    <span>30 (Standard)</span>
                    <span>60 (Full Resident Peak)</span>
                  </div>
                </div>

                {/* Consultation Fee Slider */}
                <div className="space-y-3 bg-slate-950/40 p-5 rounded-2xl border border-slate-800/60">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-300 font-sans">Average Fee per Session</span>
                    <span className="text-teal-400 font-mono text-sm font-bold bg-teal-950/50 px-3 py-1 rounded-lg border border-teal-500/20">
                      R {avgFee} ZAR
                    </span>
                  </div>
                  <input
                    type="range"
                    min="400"
                    max="3000"
                    step="50"
                    value={avgFee}
                    onChange={(e) => setAvgFee(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-slate-500">
                    <span>R400</span>
                    <span>R1,500</span>
                    <span>R3,000</span>
                  </div>
                </div>

                {/* Additional Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setIncludeAdmin(!includeAdmin)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      includeAdmin 
                        ? 'bg-slate-950/60 border-teal-500/40 text-white' 
                        : 'bg-slate-950/20 border-slate-800/80 text-slate-500'
                    }`}
                  >
                    <div className={`p-1.5 rounded-md mt-0.5 ${includeAdmin ? 'bg-teal-500/15 text-teal-400' : 'bg-slate-900 text-slate-600'}`}>
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold font-sans">Full Admin & Billing Suite</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">Includes reception desk, electronic records, medical aid submissions, & collections</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setIncludeEquipment(!includeEquipment)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      includeEquipment 
                        ? 'bg-slate-950/60 border-teal-500/40 text-white' 
                        : 'bg-slate-950/20 border-slate-800/80 text-slate-500'
                    }`}
                  >
                    <div className={`p-1.5 rounded-md mt-0.5 ${includeEquipment ? 'bg-teal-500/15 text-teal-400' : 'bg-slate-900 text-slate-600'}`}>
                      <Settings className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold font-sans">Advanced Shared Equipment</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">Unlimited access to Polysomnography labs, Autoclaves, and specialist equipment</p>
                    </div>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 4: PRACTICE SUITE CONFIGURATOR (INTERACTIVE CHOICE TOOL) */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 text-[10px] font-mono font-bold tracking-widest uppercase">
              INTERACTIVE SUITE CONFIGURATOR
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Build Your Custom Practice Suite Style
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-light leading-relaxed">
              Every medical professional has distinct needs. Use our configurator tool to specify your preferred consulting space, technological addons, and clinic attendance style.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="p-1.5 bg-teal-50 text-teal-600 rounded-lg shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Bespoke Fitting Out</p>
                  <p className="text-[11px] text-slate-500 leading-normal">All rooms come beautifully pre-painted, containing premium desks, adjustable ergonomic chairs, examine beds, and high-intensity clinical lamps.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-1.5 bg-teal-50 text-teal-600 rounded-lg shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Shared Infrastructure Access</p>
                  <p className="text-[11px] text-slate-500 leading-normal">Free access to patient restrooms, spacious waiting lounge, staff kitchen, high-speed secure LAN networks, and autoclave cleaning utilities.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-150 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
            <div className="space-y-5">
              
              {/* Option 1: Consulting Suite Type */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-mono uppercase font-bold text-slate-400">1. Select Consulting Suite Tier</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setRoomType('consult')}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      roomType === 'consult' 
                        ? 'border-teal-500 bg-teal-50/20 text-slate-900 shadow-3xs' 
                        : 'border-slate-100 bg-slate-50/30 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-850">Resident Consultation Room</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-normal">18m² space. Perfect for consultation, general medicine, and private therapy.</p>
                  </button>

                  <button
                    onClick={() => setRoomType('specialist')}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      roomType === 'specialist' 
                        ? 'border-teal-500 bg-teal-50/20 text-slate-900 shadow-3xs' 
                        : 'border-slate-100 bg-slate-50/30 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-850">Specialist Operatory Room</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-normal">24m² space. Outfitted with plumbing and utility columns for dentistry or minor procedures.</p>
                  </button>

                  <button
                    onClick={() => setRoomType('diagnostic')}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      roomType === 'diagnostic' 
                        ? 'border-teal-500 bg-teal-50/20 text-slate-900 shadow-3xs' 
                        : 'border-slate-100 bg-slate-50/30 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-850">High-Spec Diagnostics Suite</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-normal">30m² space. Electromagnetic insulation for Polysomnography, EEGs, or heavy diagnostic gear.</p>
                  </button>
                </div>
              </div>

              {/* Option 2: Addon requirements */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-mono uppercase font-bold text-slate-400">2. Select Your Operational Addons</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'fiber', label: 'Dedicated Clinical Fiber', desc: 'Symmetric redundant fiber connection with backup LTE' },
                    { id: 'billing', label: 'EMR & Automated Billing Integration', desc: 'HPCSA & POPIA compliant electronic records system linked with automated claims engine' },
                    { id: 'reception', label: 'Shared Front-Desk Receptionist', desc: 'Welcoming staff, call routing, and booking flow coordination' },
                    { id: 'marketing', label: 'Practitioner Profile Marketing Pack', desc: 'Featured listing in patient-facing newsletter and primary web listings' }
                  ].map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                          isSelected 
                            ? 'border-teal-500 bg-teal-50/10 text-slate-900' 
                            : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
                        }`}
                      >
                        <div className={`p-1 rounded-md shrink-0 mt-0.5 ${isSelected ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-850">{addon.label}</p>
                          <p className="text-[9px] text-slate-400 mt-0.5 leading-snug">{addon.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Configurator Real-time Output Panel */}
            <div className="mt-4 p-5 bg-slate-950 text-white rounded-2xl border border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-[8px] font-mono text-teal-400 tracking-wider uppercase font-bold">YOUR CONFIGURED PRACTICE PACKAGE</p>
                <h4 className="text-sm font-bold text-slate-100 leading-tight">
                  {roomType === 'consult' ? 'Resident Consultation Room' : roomType === 'specialist' ? 'Specialist Operatory Suite' : 'High-Spec Diagnostics Wing'}
                </h4>
                <p className="text-[10px] text-slate-400">
                  With {selectedAddons.length} customized operational addons active
                </p>
              </div>

              <a
                href="#apply"
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer self-stretch sm:self-auto text-center"
              >
                <span>Select & Apply</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* SECTION 5: INQUIRY PORTAL WITH LIVE SUBMISSION HISTORY */}
      <div id="apply" className="max-w-7xl mx-auto px-6 scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Partnership form panel */}
        <div className="lg:col-span-7 bg-white border border-slate-150 rounded-[2rem] p-8 shadow-xs space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-teal-600 text-[10px] font-mono font-bold tracking-widest uppercase">
              <FileCheck className="w-3.5 h-3.5" />
              <span>REGISTRY REGISTRATION</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Practice Partnership Inquiry
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-light leading-relaxed">
              Ready to take the next step? Fill out the form below to submit your credentials to our clinical board. Our administration panel will verify your HPCSA status and schedule a physical walkthrough of our Hillcrest/Pinetown suites.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs rounded-xl font-medium">
                {errorMsg}
              </div>
            )}

            {formSubmitted && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-teal-50 border border-teal-150 rounded-2xl text-teal-850 text-xs space-y-3"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-teal-500 text-white rounded-full">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="font-bold text-sm">Partnership Proposal Submitted Successfully!</p>
                </div>
                <p className="leading-relaxed font-light">
                  Thank you for submitting your practitioner registry profile. Your application has been logged locally on your workspace, and our clinical board has queued your HPCSA credential verification. We will be in touch with you shortly.
                </p>
                <button 
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="text-teal-700 font-bold underline cursor-pointer"
                >
                  Submit another proposal / practitioner
                </button>
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase font-bold text-slate-500">Full Name & Title <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Dr. Arthur Pendelton" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase font-bold text-slate-500">Clinical Specialty <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  value={formSpecialty}
                  onChange={(e) => setFormSpecialty(e.target.value)}
                  placeholder="e.g. Clinical Neurophysiologist" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase font-bold text-slate-500">Email Address <span className="text-rose-500">*</span></label>
                <input 
                  type="email" 
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="e.g. arthur@clinic.co.za" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase font-bold text-slate-500">Mobile Phone <span className="text-rose-500">*</span></label>
                <input 
                  type="tel" 
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="e.g. +27 82 123 4567" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase font-bold text-slate-500">HPCSA Registry Number <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  value={formHpcsa}
                  onChange={(e) => setFormHpcsa(e.target.value)}
                  placeholder="e.g. MP 0123456" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-mono focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  required
                />
                <p className="text-[9px] text-slate-400">South African Health Professions Council registry identification</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase font-bold text-slate-500">Preferred Location</label>
                <select 
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option>Hillcrest Medical Centre</option>
                  <option>Pinetown Practice Wing</option>
                  <option>Shared Multi-Clinic Allocation</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase font-bold text-slate-500">Preferred Residency Model</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Full-time Suite Residency',
                  'Part-time Session Allocation (Block Booking)',
                  'Shared High-Spec Equipment Partnership Only',
                  'Virtual Consulting & Referral Network Only'
                ].map((model) => (
                  <button
                    key={model}
                    type="button"
                    onClick={() => setFormModel(model)}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                      formModel === model 
                        ? 'border-teal-500 bg-teal-50/10 text-slate-900 font-medium' 
                        : 'border-slate-100 bg-slate-50/30 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase font-bold text-slate-500">Brief message / Special requests</label>
              <textarea 
                rows={3}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder="Let us know what clinical facilities or diagnostic setups you require..." 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-teal-600/10"
              id="submit-partnership-inquiry-btn"
            >
              <Send className="w-4 h-4" />
              <span>Submit Partnership Inquiry</span>
            </button>
          </form>
        </div>

        {/* Board Verification Protocol Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-150 rounded-[2rem] p-6 space-y-4 shadow-xs">
            <h4 className="text-xs font-bold text-slate-850 uppercase font-mono tracking-wider">Board Verification Protocol</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-light">
              Advance Health is bound by strict protocols outlined by the **Health Professions Council of South Africa (HPCSA)** and **POPIA** guidelines. All clinical applications go through:
            </p>
            <ul className="space-y-2 text-[10px] text-slate-600 font-mono">
              <li className="flex items-start gap-1.5">
                <span className="text-teal-600 font-bold">1.</span>
                <span>Active licensing lookup on HPCSA public database</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-teal-600 font-bold">2.</span>
                <span>In-person walk-through of dental, EEG, & polysomnography rooms</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-teal-600 font-bold">3.</span>
                <span>Setup of secure electronic health record databases & billing credentials</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
