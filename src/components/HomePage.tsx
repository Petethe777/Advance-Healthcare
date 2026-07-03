import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ShieldCheck, HeartPulse, Activity, Calendar, Award, Heart, Baby, Bone, Stethoscope, Sparkles } from 'lucide-react';
import HeroCarousel from './HeroCarousel';

// Import generated images
import lobbyImage from '../assets/images/medical_center_lobby_1782959169482.jpg';
import a1Image from '../assets/images/A1.png';
import doctorsImage from '../assets/images/doctors_team_1782959185361.jpg';
import neurologyImage from '../assets/images/neurology_brain_health_1782959199623.jpg';
import pediatricianImage from '../assets/images/pediatrician_caring_1782959211815.jpg';

interface HomePageProps {
  onNavigate: (pageId: string) => void;
  onOpenBooking: () => void;
}

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export default function HomePage({ onNavigate, onOpenBooking }: HomePageProps) {
  const [activeSystemId, setActiveSystemId] = useState<keyof typeof anatomicalExplorerData>('neurophysiology');

  // Core anatomical systems & clinical diagnostic services
  const anatomicalExplorerData = {
    'neurophysiology': {
      title: 'Neurophysiology & Sleep Science',
      specialty: 'Brain Wave Mapping & Sleep Diagnostics',
      description: 'Non-invasive brainwave mapping and sleep disorder studies that analyze neurological pathway activity to improve restful sleep, track autonomic functions, and restore cognitive clarity.',
      image: neurologyImage,
      icon: <Activity className="w-5 h-5 text-violet-400" />,
      services: [
        'Polysomnography & Sleep Pattern Tracking (Continuous recording of brainwaves, respiration, and eye-movements to diagnose underlying sleep disorders and restore deep restorative sleep)',
        'Electroencephalography (EEG) Diagnostics (Safe monitoring of neural electrical signals to identify sub-clinical seizures, cognitive variances, and functional pathway efficiency)',
        'Nerve Velocity & Sensory Assessments (Evaluates neuro-pathway speeds to find sensory damage, diagnose neuropathies, and guide neuromuscular restoration)'
      ],
      ctaText: 'Schedule Sleep & Brain Scan'
    },
    'dental': {
      title: 'Dental Care & Therapy',
      specialty: 'Comprehensive Oral Health & Preventive Care',
      description: 'Gentle dental therapy, oral health tracking, and modern enamel restoration designed to prevent active decay, treat gum disease, and build strong oral health foundations.',
      image: a1Image,
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      services: [
        'Clinical Dentistry & Enamel Therapies (Comprehensive fillings, gentle decay removal, and restorative treatments that preserve healthy tooth structures)',
        'Preventive Cleanings & Tissue Profiling (Strategic hygiene treatments and clinical gum evaluations that eliminate plaque reservoirs and halt active decay)',
        'Primary Oral Care & Reconstruction (Comprehensive bite alignment, custom smile protection planning, and advanced enamel sealants to prevent future cavities)'
      ],
      ctaText: 'Schedule Dental Care'
    },
    'cardiology': {
      title: 'Cardiovascular Care',
      specialty: 'Heart, Valve, & Circulation Profiling',
      description: 'Computerized hemodynamic assessments and non-invasive scanning of the heart to map blood flow, track vascular elasticity, and prevent cardiovascular events.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      services: [
        'Advanced ECG & Echocardiography (Real-time ultrasound imaging of heart chambers and valves to measure exact muscle performance and pump efficiency)',
        'Preventive Cardiovascular Screenings (Detailed vascular stiffness analysis and lipid profiling to assess overall circulatory age and detect arterial warning signs early)',
        'Hypertension & Arrhythmia Management (Comprehensive blood pressure tracking and custom pacing plans to resolve irregular heartbeats and high pressure safely)'
      ],
      ctaText: 'Schedule Cardiac Exam'
    },
    'neurology': {
      title: 'Neurological Services',
      specialty: 'Nervous System & Cognitive Diagnostics',
      description: 'In-depth testing and specialized therapy pathways for nervous system disorders, chronic migraines, balance issues, and memory care.',
      image: neurologyImage,
      icon: <Activity className="w-5 h-5 text-sky-400" />,
      services: [
        'Comprehensive Neurological Evaluations (Diagnostic assessments of reflex speeds, cognitive status, motor control, and sensory pathways to locate neural blockages)',
        'Migraine & Chronic Headache Therapy (Identifies physical triggers and designs therapeutic plans to block neuromuscular pain signals and improve quality of life)',
        'Cognitive & Memory Care Assessments (Advanced screenings to identify early-stage cognitive shifts and design evidence-based exercises to keep memory sharp)'
      ],
      ctaText: 'Request Neurological Exam'
    },
    'orthopedics': {
      title: 'Musculoskeletal Integrity',
      specialty: 'Joint, Bone, & Mobility Restoration',
      description: 'Biomechanical mobility assessments and non-invasive scanning of bone density and joint structure to reverse joint pain and restore physical freedom.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
      icon: <Bone className="w-5 h-5 text-teal-400" />,
      services: [
        'Joint Reconstruction & Preservation (Minimally-invasive joint health assessments and motion mapping to plan restorative rehabilitation and prevent degradation)',
        'Sports Traumatology & Rehabilitation (Tailored mechanical recovery programs targeting ligament, tendon, and muscular strength restoration for active lifestyles)',
        'Biomechanical Mobility Evaluations (Advanced analysis of posture, gaits, and bone mineral density to improve physical agility and protect structural longevity)'
      ],
      ctaText: 'Schedule Orthopedic Scan'
    }
  };

  return (
    <div className="space-y-28 pb-28 bg-slate-50/20">
      {/* 1. Automated slideshow carousel */}
      <HeroCarousel onOpenBooking={onOpenBooking} />

      {/* 2. Welcome & Philosophy introduction (Split modern layout with custom imagery stack) */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={revealVariants}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-[11px] font-mono font-bold tracking-widest text-teal-600 uppercase bg-teal-50 px-3 py-1 rounded-full">
              Clinical Integrity & Compassion
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-sans tracking-tight text-slate-900 leading-tight">
              A Higher Standard of Outpatient Medicine & Diagnostics
            </h2>
            <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed">
              At Advance Health, we believe that modern medicine is not about handling numbers, but about tailoring preventative pathways. Our clinic acts as a high-performance diagnostics hub, gathering leading board-certified specialists and advanced medical scanning under one master roof in Hillcrest, KwaZulu-Natal.
            </p>
            <p className="text-slate-500 font-light text-xs md:text-sm leading-relaxed">
              We operate completely offline-first on local browser storage during your scheduled visits to ensure zero friction, quick triage registrations, and complete transparency in clinical care tracking.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-slate-100 rounded-2xl">
                <p className="text-2xl font-bold font-mono text-teal-600">100%</p>
                <p className="text-xs text-slate-500 mt-1 font-sans">POPIA Compliance Secure</p>
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-2xl">
                <p className="text-2xl font-bold font-mono text-teal-600">24h</p>
                <p className="text-xs text-slate-500 mt-1 font-sans">Average Lab Results Return</p>
              </div>
            </div>
          </motion.div>

          {/* Visual block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={revealVariants}
            className="lg:col-span-6 relative"
          >
            {/* Background design accents */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-teal-100/40 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-teal-50 rounded-full blur-2xl -z-10" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-white p-2">
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={a1Image}
                  alt="Putting a smile on our patients"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Floating diagnostic badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-xl flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
                    <HeartPulse className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono tracking-wider text-slate-400 font-bold uppercase">PATIENT CARE</p>
                    <p className="text-xs font-semibold text-slate-100">Putting a smile on our patients.</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono font-bold bg-teal-500 text-slate-950 px-2.5 py-1 rounded-full">
                  HILLCREST HQ
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>



      {/* 3. Interactive Diagnostics Explorer Lounge (Highly Creative Section!) */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        {/* Dynamic mesh backgrounds */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={revealVariants}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-mono font-bold tracking-widest uppercase">
              ANATOMICAL EXPLORER
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-sans tracking-tight leading-tight">
              Anatomical System & Diagnostics Explorer
            </h2>
            <p className="text-slate-400 font-light text-xs md:text-sm max-w-xl mx-auto">
              Select a clinical system below to explore our targeted diagnostic capabilities, specialized procedures, and primary care pathways.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* System Selectors (Left side) */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-3">
              {(Object.keys(anatomicalExplorerData) as Array<keyof typeof anatomicalExplorerData>).map((key) => {
                const sys = anatomicalExplorerData[key];
                const isActive = activeSystemId === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveSystemId(key)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-4 cursor-pointer group ${
                      isActive
                        ? 'bg-slate-800 border-teal-500/50 text-white shadow-lg shadow-teal-500/5'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/40 hover:border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl transition-all ${
                      isActive ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-900 text-slate-500 group-hover:text-slate-300'
                    }`}>
                      {sys.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-xs font-sans tracking-wider group-hover:translate-x-0.5 transition-transform duration-300 truncate">
                        {sys.title}
                      </h4>
                      <p className="text-[9px] text-slate-500 font-mono font-bold uppercase mt-0.5 truncate">
                        {sys.specialty}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Display Panel (Right side) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSystemId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-950/60 border border-slate-800 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 h-full min-h-[420px]"
                >
                  {/* Image/Visual Display */}
                  <div className="md:col-span-5 relative bg-slate-950 flex flex-col justify-between p-6 overflow-hidden min-h-[200px] md:min-h-0 border-r border-slate-850">
                    <div className="absolute inset-0 z-0">
                      <img
                        src={anatomicalExplorerData[activeSystemId].image}
                        alt={anatomicalExplorerData[activeSystemId].title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-65 mix-blend-screen hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
                    </div>

                    <div className="z-10 self-start">
                      <span className="text-[8px] font-mono text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20 font-bold tracking-widest uppercase">
                        ACTIVE SYSTEM
                      </span>
                    </div>

                    <div className="z-10 space-y-1">
                      <p className="text-[8px] font-mono text-slate-500">CLINICAL DISCIPLINE</p>
                      <p className="text-xs font-bold font-sans tracking-tight text-white leading-tight">
                        {anatomicalExplorerData[activeSystemId].title}
                      </p>
                      <div className="h-0.5 w-8 bg-teal-500 rounded-full" />
                    </div>
                  </div>

                  {/* Services & Value Description */}
                  <div className="md:col-span-7 p-8 flex flex-col justify-between bg-slate-950/40">
                    <div className="space-y-6">
                      <div>
                        <span className="text-[9px] font-mono text-teal-500 uppercase tracking-widest font-bold">
                          {anatomicalExplorerData[activeSystemId].specialty}
                        </span>
                        <h3 className="text-lg font-extrabold font-sans text-white tracking-tight mt-1">
                          {anatomicalExplorerData[activeSystemId].title}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-light mt-2 leading-relaxed">
                          {anatomicalExplorerData[activeSystemId].description}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold">
                          Core Provided Services & Clinical Value
                        </p>
                        <div className="space-y-2.5">
                          {anatomicalExplorerData[activeSystemId].services.map((svc, i) => (
                            <div key={i} className="flex gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60 hover:border-slate-700/60 transition-colors items-start">
                              <div className="p-1 bg-teal-500/15 text-teal-400 rounded-md shrink-0 mt-0.5">
                                <ShieldCheck className="w-4 h-4" />
                              </div>
                              <span className="text-xs text-slate-200 font-light leading-snug">{svc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={onOpenBooking}
                        className="w-full md:w-auto px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-teal-600/20"
                        id={`explorer-cta-booking-${activeSystemId}`}
                      >
                        <span>{anatomicalExplorerData[activeSystemId].ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Photographic Gateway Cards (Modern Bento-Grid Style Pathways) */}
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={revealVariants}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest text-teal-600 uppercase">
            EXPLORE CLINICAL GATEWAYS
          </span>
          <h2 className="text-3xl font-extrabold font-sans tracking-tight text-slate-900 leading-tight">
            Seamless Professional Navigation
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={revealVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Pathway 1: About */}
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="h-52 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80"
                  alt="Clinical Care story"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <div className="absolute top-4 left-4 p-2 bg-teal-50 text-teal-700 rounded-xl">
                  <HeartPulse className="w-5 h-5" />
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 font-sans group-hover:text-teal-700 transition-colors">
                  Our Healthcare Story
                </h3>
                <p className="text-slate-500 text-xs md:text-sm font-light leading-relaxed">
                  Learn about our state-of-the-art facility, our historic milestone timeline, and certified clinical values.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => onNavigate('about')}
                className="text-xs font-bold text-teal-600 group-hover:text-teal-700 flex items-center gap-1.5 cursor-pointer self-start"
                id="home-to-about-btn-visual"
              >
                Explore Our Story <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Pathway 2: Services */}
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="h-52 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80"
                  alt="Clinical Diagnostics"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <div className="absolute top-4 left-4 p-2 bg-teal-50 text-teal-700 rounded-xl">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 font-sans group-hover:text-teal-700 transition-colors">
                  Practice Partnerships
                </h3>
                <p className="text-slate-500 text-xs md:text-sm font-light leading-relaxed">
                  We invite board-certified clinicians to join our Hillcrest & Pinetown suites. Explore co-working space specs and shared equipment benefits.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => onNavigate('partner')}
                className="text-xs font-bold text-teal-600 group-hover:text-teal-700 flex items-center gap-1.5 cursor-pointer self-start"
                id="home-to-partner-btn-visual"
              >
                Join Our Practice <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Pathway 3: Professionals */}
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="h-52 overflow-hidden relative">
                <img
                  src={doctorsImage}
                  alt="Medical specialists"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <div className="absolute top-4 left-4 p-2 bg-teal-50 text-teal-700 rounded-xl">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 font-sans group-hover:text-teal-700 transition-colors">
                  Board-Certified Team
                </h3>
                <p className="text-slate-500 text-xs md:text-sm font-light leading-relaxed">
                  Review the extensive academic credentials, clinical experience, and real-time scheduling slots of our specialists.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => onNavigate('professionals')}
                className="text-xs font-bold text-teal-600 group-hover:text-teal-700 flex items-center gap-1.5 cursor-pointer self-start"
                id="home-to-professionals-btn-visual"
              >
                Meet Our Team <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 5. Mini Clinical Highlights banner */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={revealVariants}
          className="p-8 md:p-12 rounded-3xl bg-slate-900 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="lg:col-span-8 space-y-4 relative z-10">
            <span className="text-[10px] font-mono tracking-widest text-teal-400 font-bold uppercase">
              IMMEDIATE RESERVATIONS OPEN
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold font-sans tracking-tight">
              Ready to schedule a comprehensive health profiling scan?
            </h3>
            <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed max-w-xl">
              Register securely inside our live portal. Choose your specialty service, matching attending clinician, and lock in an open time slot.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right relative z-10">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs tracking-wide uppercase rounded-xl transition-all shadow-lg hover:shadow-teal-500/20 hover:-translate-y-0.5 cursor-pointer"
              id="home-inline-booking-cta"
            >
              Book Appointment Now
            </button>
          </div>
        </motion.div>
      </div>

      {/* 6. Trust Metrics */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={revealVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="p-6 rounded-2xl bg-white border border-slate-100 flex items-start gap-4">
            <div className="p-2 bg-teal-50 rounded-xl text-teal-600 shadow-3xs shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">POPIA Secure Care</h4>
              <p className="text-xs text-slate-500 mt-1 font-light">Your personal charts are fully encrypted under SA law.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-100 flex items-start gap-4">
            <div className="p-2 bg-teal-50 rounded-xl text-teal-600 shadow-3xs shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Direct Scheduling</h4>
              <p className="text-xs text-slate-500 mt-1 font-light">Live slots aligned with physicians.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-100 flex items-start gap-4">
            <div className="p-2 bg-teal-50 rounded-xl text-teal-600 shadow-3xs shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Board-Certified</h4>
              <p className="text-xs text-slate-500 mt-1 font-light">Elite medical faculty & specialists.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-100 flex items-start gap-4">
            <div className="p-2 bg-teal-50 rounded-xl text-teal-600 shadow-3xs shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Patient-Centric</h4>
              <p className="text-xs text-slate-500 mt-1 font-light">Custom wellness profiling plans.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
