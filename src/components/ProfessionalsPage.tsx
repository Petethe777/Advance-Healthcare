import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  GraduationCap, 
  Clock, 
  CalendarCheck, 
  ShieldCheck, 
  Info, 
  CheckCircle2, 
  Briefcase, 
  MapPin, 
  Sparkles,
  User,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { PROFESSIONALS } from '../data';
import { Professional } from '../types';

// Import generated wellness lifestyle image
import wellnessImage from '../assets/images/wellness_lifestyle_1783946675009.jpg';

interface ProfessionalsPageProps {
  onBookProfessional: (profId: string) => void;
  initialProfessionalId?: string | null;
}

const revealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

type ModalTab = 'bio' | 'specializations' | 'credentials' | 'rotations';

export default function ProfessionalsPage({ onBookProfessional, initialProfessionalId }: ProfessionalsPageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProf, setSelectedProf] = useState<Professional | null>(null);
  const [modalTab, setModalTab] = useState<ModalTab>('bio');
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);

  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialProfessionalId) {
      const found = PROFESSIONALS.find(p => p.id === initialProfessionalId);
      if (found) {
        setSelectedProf(found);
        setModalTab('bio');
      }
    }
  }, [initialProfessionalId]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PROFESSIONALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PROFESSIONALS.length) % PROFESSIONALS.length);
  };

  const openModal = (prof: Professional) => {
    setSelectedProf(prof);
    setModalTab('bio');
  };

  const closeModal = () => {
    setSelectedProf(null);
  };

  const daysOfWeek = [
    { name: 'Monday', short: 'M' },
    { name: 'Tuesday', short: 'T' },
    { name: 'Wednesday', short: 'W' },
    { name: 'Thursday', short: 'T' },
    { name: 'Friday', short: 'F' }
  ];

  const activeProf = PROFESSIONALS[activeIndex];

  // Drag handler for gesture swiping
  const handleDragEnd = (_event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <div className="py-12 space-y-20 pb-28 bg-slate-50/20 overflow-hidden">
      {/* 1. Header Hero & Group Showcase */}
      <div className="bg-slate-50 py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="lg:col-span-6 space-y-4"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold font-sans tracking-tight text-slate-900 leading-[1.1]">
              Highly Accomplished Medical Professionals Dedicated to Your Care
            </h1>
            <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed">
              Our clinical leaders maintain active board certifications, academic residencies, and over a decade of proactive medicine experience.
            </p>
          </motion.div>

          {/* Group Photo Showcase */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="lg:col-span-6"
          >
            <div className="rounded-3xl overflow-hidden border border-slate-200/80 p-1.5 bg-white shadow-xl relative">
              <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                <img
                  src={wellnessImage}
                  alt="Wellness and specialist care"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute top-4 right-4 bg-blue-900/90 text-white font-mono text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                Hillcrest KZN Faculty
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. Professionals Grid (Matching user screenshot layout) */}
      <section className="bg-[#FAF9F5] py-12 md:py-16 px-6 md:px-12 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-sans-clean font-extrabold uppercase tracking-widest text-slate-500 bg-slate-200/60 px-3 py-1 rounded-full">
              Clinical Team & Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-serif-display font-normal text-slate-900 tracking-tight">
              Our Medical Professionals & Clinical Focus
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed">
              Explore our multidisciplinary team of board-certified specialists, clinical leaders, and researchers dedicated to your health journey.
            </p>
          </div>

          {/* 3-Column Grid matching active professionals layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 items-start">
            {PROFESSIONALS.map((prof) => {
              // Custom title & sublabel matching screenshot aesthetic
              const customData = {
                'prof-sithabile-mncwango': {
                  title: 'Clinical Psychology',
                  subLabel: "SITHABILE'S SPECIALTY",
                  description: "HPCSA-registered Clinical Psychologist offering collaborative, evidence-based psychotherapy, psychological assessments, stress management, trauma counselling, and couples therapy."
                },
                'prof-ocean-naidoo': {
                  title: 'Sleep & Neurobiology',
                  subLabel: "OCEAN'S SPECIALTY",
                  description: "Qualified at the Bloemfontein Sleep Laboratory, Ocean leads Neurowave in diagnosing complex sleep disorders, nerve conduction health, Polysomnography studies, and CPAP titration across South Africa."
                },
                'prof-lesley-naidoo': {
                  title: 'Public Health & Dentistry',
                  subLabel: "LESLEY'S SPECIALTY",
                  description: "With a distinguished background in clinical dentistry, public health policy, and national health agendas, Lesley serves as a Presidential Health Summit delegate focused on primary healthcare transformation."
                }
              }[prof.id] || {
                title: prof.specialty,
                subLabel: `${prof.name.split(' ')[0].toUpperCase()}'S SPECIALTY`,
                description: prof.bio
              };

              return (
                <motion.div
                  key={prof.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={revealVariants}
                  className="flex flex-col justify-between group bg-transparent p-0 transition-all"
                >
                  <div className="space-y-4">
                    {/* B&W Portrait Photo Frame matching screenshot */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#ECECEC] shadow-xs group-hover:shadow-md transition-all">
                      <img
                        src={prof.image}
                        alt={prof.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                      />
                    </div>

                    {/* Divider Line & Title Box */}
                    <div className="border-t border-slate-300/80 pt-4 space-y-1.5">
                      <h3 className="text-2xl md:text-3xl font-serif-display font-normal text-slate-900 leading-tight min-h-[64px] flex items-start">
                        {customData.title}
                      </h3>

                      <p className="text-[11px] font-sans-clean font-extrabold text-slate-700 uppercase tracking-widest">
                        {customData.subLabel}
                      </p>

                      <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed pt-2">
                        {customData.description}
                      </p>
                    </div>
                  </div>

                  {/* Button Row matching screenshot styling */}
                  <div className="pt-6 space-y-2">
                    <button
                      onClick={() => openModal(prof)}
                      className="w-full py-3 bg-[#B5D5E8] hover:bg-[#a0c7dd] text-slate-900 font-bold font-sans-clean text-xs tracking-wider uppercase transition-colors cursor-pointer text-center"
                    >
                      VIEW PROFILE
                    </button>

                    <button
                      onClick={() => onBookProfessional(prof.id)}
                      className="w-full py-2 bg-transparent hover:bg-slate-200/50 text-slate-700 font-bold font-sans-clean text-[11px] tracking-wider uppercase transition-colors cursor-pointer text-center border border-slate-300"
                    >
                      BOOK CONSULTATION
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Assurance banner */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={revealVariants}
          className="p-8 md:p-12 bg-slate-50 rounded-3xl border border-slate-150 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
        >
          <div className="md:col-span-8 space-y-4">
            <h3 className="text-2xl font-extrabold font-sans tracking-tight text-slate-900">
              HPCSA Regulatory Standards
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light max-w-xl">
              All diagnostic operations, patient referrals, and clinical charting records comply directly with the Health Professions Council of South Africa (HPCSA) and POPIA guidelines.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <span className="inline-block py-2.5 px-5 rounded-full border border-teal-600 text-teal-700 font-mono text-[10px] font-bold uppercase tracking-wide">
              Official Care Practice
            </span>
          </div>
        </motion.div>
      </div>

      {/* 4. IMMERSIVE MODAL POPUP FOR RICH DETAILS */}
      <AnimatePresence>
        {selectedProf && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id={`professional-modal-${selectedProf.id}`}>
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeModal}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
            />

            {/* Modal Dialog Box */}
            <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-10 relative z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-full max-w-2xl bg-[#FAF9F5] rounded-[2rem] border border-slate-200/80 shadow-2xl overflow-hidden flex flex-col relative"
              >
                {/* Close Button top-right */}
                <button
                  onClick={closeModal}
                  className="absolute top-5 right-5 z-40 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Top Banner Cover */}
                <div className="h-2 bg-gradient-to-r from-teal-500 via-indigo-500 to-emerald-500" />

                {/* Centered Image Header inside Modal */}
                <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100 flex flex-col items-center text-center space-y-4">
                  {/* Circular High-res Portrait */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-md scale-110" />
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-teal-500 to-indigo-500 shadow-lg relative z-10">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        <img
                          src={selectedProf.image}
                          alt={selectedProf.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 relative z-10">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-sans">
                      {selectedProf.name}
                    </h3>
                    <p className="text-xs font-mono font-bold text-teal-600 uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full inline-block">
                      {selectedProf.role}
                    </p>
                    <p className="text-xs text-slate-500 font-mono tracking-wide">
                      Specialty: <span className="font-bold text-indigo-700">{selectedProf.specialty}</span>
                    </p>
                  </div>
                </div>

                {/* Tab Navigation buttons inside Modal */}
                <div className="flex border-b border-slate-100 bg-white px-4 sm:px-6 overflow-x-auto scrollbar-none py-2 gap-1 shrink-0">
                  <button
                    onClick={() => setModalTab('bio')}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                      modalTab === 'bio'
                        ? 'bg-teal-500 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    About & Bio
                  </button>

                  {selectedProf.coreSpecializations && selectedProf.coreSpecializations.length > 0 && (
                    <button
                      onClick={() => setModalTab('specializations')}
                      className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                        modalTab === 'specializations'
                          ? 'bg-teal-500 text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      Specialities
                    </button>
                  )}

                  {selectedProf.degreesAndCredentials && selectedProf.degreesAndCredentials.length > 0 && (
                    <button
                      onClick={() => setModalTab('credentials')}
                      className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                        modalTab === 'credentials'
                          ? 'bg-teal-500 text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      Credentials
                    </button>
                  )}

                  {selectedProf.rotations && selectedProf.rotations.length > 0 && (
                    <button
                      onClick={() => setModalTab('rotations')}
                      className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                        modalTab === 'rotations'
                          ? 'bg-teal-500 text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      Rotations & Residency
                    </button>
                  )}
                </div>

                {/* Modal Tab Contents */}
                <div className="p-6 md:p-8 overflow-y-auto max-h-[350px] min-h-[220px]">
                  <AnimatePresence mode="wait">
                    {modalTab === 'bio' && (
                      <motion.div
                        key="bio"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-4"
                      >
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light font-sans">
                          {selectedProf.extendedBio || selectedProf.bio}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="font-mono text-[8px] font-bold text-slate-400 uppercase block">Institution Education</span>
                            <span className="font-bold text-xs text-slate-800 block mt-1 leading-tight">{selectedProf.education}</span>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="font-mono text-[8px] font-bold text-slate-400 uppercase block">Active Experience</span>
                            <span className="font-bold text-xs text-slate-800 block mt-1 leading-tight">{selectedProf.experience}</span>
                          </div>
                        </div>

                        {/* Availability Planner */}
                        <div className="pt-4 border-t border-slate-100 space-y-2">
                          <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Weekly Outpatient Consultation Planner
                          </span>
                          <div className="flex items-center gap-1.5">
                            {daysOfWeek.map((day) => {
                              const isAvailable = selectedProf.availability.some(
                                a => a.toLowerCase() === day.name.toLowerCase()
                              );
                              return (
                                <div
                                  key={day.name}
                                  className={`flex-1 py-2 text-center rounded-lg text-xs font-bold border transition-all ${
                                    isAvailable
                                      ? 'bg-teal-50 border-teal-200 text-teal-800 shadow-3xs'
                                      : 'bg-slate-50 border-slate-100 text-slate-300'
                                  }`}
                                >
                                  {day.short}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {modalTab === 'specializations' && selectedProf.coreSpecializations && (
                      <motion.div
                        key="specializations"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-3.5"
                      >
                        {selectedProf.coreSpecializations.map((spec, sIdx) => (
                          <div
                            key={spec}
                            className="bg-gradient-to-br from-teal-50/5 to-teal-500/10 border border-teal-500/15 p-4 rounded-xl shadow-3xs hover:border-teal-400 transition-all flex flex-col justify-between items-start"
                          >
                            <Sparkles className="w-4 h-4 text-teal-600 mb-3" />
                            <div>
                              <span className="text-[8px] font-mono font-bold text-teal-600 uppercase block">Specialization {sIdx + 1}</span>
                              <h4 className="text-xs font-bold text-slate-800 mt-1 leading-tight">{spec}</h4>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {modalTab === 'credentials' && selectedProf.degreesAndCredentials && (
                      <motion.div
                        key="credentials"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-3.5"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {selectedProf.degreesAndCredentials.map((deg, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-150 shadow-3xs hover:border-teal-500/20 transition-all"
                            >
                              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                              <span className="text-xs font-semibold text-slate-700 leading-tight">
                                {deg}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {modalTab === 'rotations' && selectedProf.rotations && (
                      <motion.div
                        key="rotations"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="relative pl-5 border-l-2 border-slate-200 space-y-4 ml-1"
                      >
                        {selectedProf.rotations.map((rot, rIdx) => (
                          <div key={rIdx} className="relative group/modalrot">
                            {/* Bullet */}
                            <span className="absolute -left-[27px] top-1.5 flex h-2.5 w-2.5 items-center justify-center">
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-150 hover:border-indigo-500/20 transition-all flex gap-2.5 items-start">
                              <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                              <p className="text-xs font-semibold text-slate-800 leading-normal">
                                {rot}
                              </p>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Action */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                  <p className="text-[10px] text-slate-400 text-center sm:text-left leading-normal font-light">
                    Regulatory clinical verification active. Request an appointment below.
                  </p>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={closeModal}
                      className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        closeModal();
                        onBookProfessional(selectedProf.id);
                      }}
                      className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg active:scale-98"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
