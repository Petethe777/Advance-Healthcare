import { useState, useRef } from 'react';
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

// Import generated doctors team image
import doctorsImage from '../assets/images/doctors_team_1782959185361.jpg';

interface ProfessionalsPageProps {
  onBookProfessional: (profId: string) => void;
}

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

type ModalTab = 'bio' | 'specializations' | 'credentials' | 'rotations';

export default function ProfessionalsPage({ onBookProfessional }: ProfessionalsPageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProf, setSelectedProf] = useState<Professional | null>(null);
  const [modalTab, setModalTab] = useState<ModalTab>('bio');
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);

  const slideRef = useRef<HTMLDivElement>(null);

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
            <span className="text-[11px] font-mono font-bold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1.5 rounded-full uppercase">
              MEET OUR CLINICAL DIRECTORS & FACULTY
            </span>
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
                  src={doctorsImage}
                  alt="Advance Health Clinical Medical Faculty"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute top-4 right-4 bg-teal-600/90 text-white font-mono text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                Hillcrest KZN Faculty
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. Swiper / Carousel Section */}
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-teal-600 font-bold uppercase">
            ACTIVE SPECIALIST CAROUSEL
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold font-sans tracking-tight text-slate-900">
            Swipe to Explore Specialists
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-light">
            Swipe left or right, or use the navigation controls. Click <strong>"View Full Profile"</strong> to open their interactive medical record and complete academic credentials.
          </p>
        </div>

        {/* Carousel Slider Outer Wrapper - Mobile First focus */}
        <div className="relative max-w-xl md:max-w-2xl mx-auto px-4">
          
          {/* Navigation Arrows - Left Arrow (Visible on md screens, hidden on small screens) */}
          <button
            onClick={handlePrev}
            className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-teal-600 hover:border-teal-500 hover:shadow-lg transition-all active:scale-90 hidden md:flex cursor-pointer"
            aria-label="Previous specialist"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Sliding Track Component */}
          <div className="relative overflow-visible" ref={slideRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="w-full bg-white rounded-[2.5rem] border border-slate-150 p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 space-y-6 relative select-none cursor-grab active:cursor-grabbing"
              >
                {/* Visual Top Decorative Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-indigo-500 to-emerald-500 rounded-t-[2.5rem]" />

                {/* Profile Center Image & Badges */}
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Circle Portrait Frame */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-teal-500/5 blur-lg scale-110 pointer-events-none" />
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-teal-500 to-indigo-500 shadow-md">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        <img
                          src={activeProf.image}
                          alt={activeProf.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover pointer-events-none"
                        />
                      </div>
                    </div>
                    {/* Active Pulsing Badge */}
                    <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
                    </span>
                  </div>

                  {/* Specialist Titles */}
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-sans">
                      {activeProf.name}
                    </h3>
                    <p className="text-xs font-mono font-bold text-teal-600 uppercase tracking-widest">
                      {activeProf.role}
                    </p>
                    <span className="inline-block text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider mt-1.5">
                      {activeProf.specialty}
                    </span>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-4 text-center">
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-light">
                    {activeProf.bio}
                  </p>
                </div>

                {/* Info Pills Section */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="p-3 bg-white border border-slate-100 rounded-xl flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[8px] font-mono font-bold uppercase text-slate-400 block">Training</span>
                      <span className="text-[10px] font-bold text-slate-700 leading-tight block truncate max-w-[100px] sm:max-w-xs">{activeProf.education}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white border border-slate-100 rounded-xl flex items-start gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[8px] font-mono font-bold uppercase text-slate-400 block">Clinic Hours</span>
                      <span className="text-[10px] font-bold text-slate-700 leading-tight block truncate max-w-[100px] sm:max-w-xs">{activeProf.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Row */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openModal(activeProf)}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-teal-600 hover:bg-teal-50 text-teal-700 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-3xs"
                  >
                    <Info className="w-4 h-4" />
                    <span>View Full Profile</span>
                  </button>

                  <button
                    onClick={() => onBookProfessional(activeProf.id)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-md hover:shadow-teal-600/20 active:scale-98"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows - Right Arrow (Visible on md screens, hidden on small screens) */}
          <button
            onClick={handleNext}
            className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-teal-600 hover:border-teal-500 hover:shadow-lg transition-all active:scale-90 hidden md:flex cursor-pointer"
            aria-label="Next specialist"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Mobile navigation controls below the slider */}
          <div className="flex md:hidden items-center justify-between mt-4">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {PROFESSIONALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? 'w-8 bg-teal-600' : 'w-2.5 bg-slate-200 hover:bg-slate-350'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

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
            <div className="flex items-center gap-2 text-teal-600">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                COMMITTED TO PATIENT RIGHTS & CONFIDENTIALITY
              </span>
            </div>
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
                className="w-full max-w-2xl bg-white rounded-[2rem] border border-slate-200/50 shadow-2xl overflow-hidden flex flex-col relative"
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
