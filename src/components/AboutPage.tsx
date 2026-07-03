import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, Eye, CheckCircle2 } from 'lucide-react';
import healthyLivingImg from '../assets/images/healthy_living.png';
import aboutSlideOne from '../assets/images/about_slide_one_1783085827590.jpg';
import aboutSlideThree from '../assets/images/about_slide_three_1783085841227.jpg';

const ABOUT_SLIDES = [aboutSlideOne, aboutSlideThree];

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export default function AboutPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ABOUT_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const missionFocusAreas = [
    { 
      title: 'Early detection', 
      desc: 'Screening and predictive testing to preempt chronic challenges.',
      color: 'teal',
      markerPos: 'left-[-16px] top-[20%] -translate-y-1/2',
      badgeColor: 'bg-teal-500',
      textColor: 'text-teal-600',
      glowColor: 'shadow-teal-500/50',
      gradient: 'from-teal-500 to-emerald-500',
      num: 1
    },
    { 
      title: 'Health optimisation', 
      desc: 'Restoring physiological balance for peak mental and physical vitality.',
      color: 'emerald',
      markerPos: 'left-[-16px] top-[50%] -translate-y-1/2',
      badgeColor: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      glowColor: 'shadow-emerald-500/50',
      gradient: 'from-emerald-500 to-teal-500',
      num: 2
    },
    { 
      title: 'Preventive healthcare', 
      desc: 'Tailoring customized cardiovascular, metabolic, and systemic plans.',
      color: 'cyan',
      markerPos: 'left-[-16px] top-[80%] -translate-y-1/2',
      badgeColor: 'bg-cyan-500',
      textColor: 'text-cyan-600',
      glowColor: 'shadow-cyan-500/50',
      gradient: 'from-cyan-500 to-blue-500',
      num: 3
    },
    { 
      title: 'Evidence-based aesthetics', 
      desc: 'Scientific, safe dermatological treatments aligned with organic longevity.',
      color: 'rose',
      markerPos: 'right-[-16px] top-[20%] -translate-y-1/2',
      badgeColor: 'bg-rose-500',
      textColor: 'text-rose-600',
      glowColor: 'shadow-rose-500/50',
      gradient: 'from-rose-500 to-pink-500',
      num: 4
    },
    { 
      title: 'Mindfulness and mental wellness', 
      desc: 'Integrated neural relaxation, cognitive support, and stress management.',
      color: 'indigo',
      markerPos: 'right-[-16px] top-[50%] -translate-y-1/2',
      badgeColor: 'bg-indigo-500',
      textColor: 'text-indigo-600',
      glowColor: 'shadow-indigo-500/50',
      gradient: 'from-indigo-500 to-purple-500',
      num: 5
    },
    { 
      title: 'Longevity science', 
      desc: 'Deploying the latest bio-age research and lifestyle medicine therapeutics.',
      color: 'amber',
      markerPos: 'right-[-16px] top-[80%] -translate-y-1/2',
      badgeColor: 'bg-amber-500',
      textColor: 'text-amber-600',
      glowColor: 'shadow-amber-500/50',
      gradient: 'from-amber-500 to-orange-500',
      num: 6
    }
  ];

  return (
    <div className="py-12 space-y-24 pb-28">
      {/* Page Header with Custom Image Background Slideshow */}
      <div className="relative py-24 md:py-32 overflow-hidden border-b border-slate-200/50">
        {/* Background Slideshow Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={ABOUT_SLIDES[currentSlide]}
              alt={`About Background Slide ${currentSlide + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Semi-transparent dark overlay for high contrast and modern styling */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] z-10" />
        
        {/* Navigation Dot Indicators */}
        <div className="absolute bottom-4 right-6 z-20 flex gap-1.5">
          {ABOUT_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-350 ${
                currentSlide === idx ? 'w-5 bg-teal-400' : 'w-1.5 bg-white/45 hover:bg-white'
              }`}
              title={`Go to slide ${idx + 1}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="max-w-3xl space-y-4"
          >
            <span className="inline-block text-[11px] font-mono font-bold tracking-widest text-teal-300 uppercase bg-teal-950/60 border border-teal-800/30 px-3.5 py-1.5 rounded-full w-fit">
              ABOUT ADVANCE HEALTH
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-sans tracking-tight text-white leading-[1.1]">
              Our Vision & Mission
            </h1>
            <p className="text-slate-200 font-light text-sm md:text-base md:text-lg leading-relaxed max-w-2xl">
              We are dedicated to pioneering proactive medicine and customized healthcare solutions for optimal longevity and wellbeing.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 1. Our Vision Section - Text Left, Image Right */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center font-sans">
          {/* Text on Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={revealVariants}
            className="lg:col-span-6 space-y-6"
          >
            <div className="flex items-center gap-2 text-teal-600 font-mono text-[11px] font-bold tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full w-fit">
              <Compass className="w-3.5 h-3.5" />
              <span>Our Vision</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Building a fortress around your health through lifestyle and clinical foresight.
            </h2>

            {/* Innovation callout box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-600 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Innovation</h4>
                <p className="text-xs text-slate-500 font-light mt-1">
                  Constantly evolving our practice with the latest medical technologies to provide innovative healthcare solutions.
                </p>
              </div>
            </div>

            <p className="text-slate-500 font-light text-xs md:text-sm leading-relaxed">
              Our vision is to provide innovative healthcare solutions that empower individuals and communities to achieve optimal wellbeing and longevity, improving quality of life through a people-centred medical and wellness approach.
            </p>
          </motion.div>

          {/* Image on Right */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={revealVariants}
            className="lg:col-span-6"
          >
            <div className="aspect-video sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 relative p-1.5 bg-white">
              <div className="rounded-2xl overflow-hidden w-full h-full relative">
                <img
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
                  alt="Innovative Diagnostics Suite"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-150/60 shadow-lg flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-teal-500 animate-pulse shrink-0" />
                <span className="text-[11px] font-bold text-slate-800">
                  Precision Technology & Clinical Foresight
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. Our Mission Section - Interactive Image Central Mapping */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-12">
          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={revealVariants}
            className="max-w-3xl space-y-4 font-sans"
          >
            <div className="flex items-center gap-2 text-indigo-600 font-mono text-[11px] font-bold tracking-wider uppercase bg-indigo-50 px-3 py-1 rounded-full w-fit">
              <Eye className="w-3.5 h-3.5" />
              <span>Our Mission</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Advance HealthCare promotes proactive medicine & wellbeing
            </h2>
            <p className="text-slate-500 font-light text-sm">
              Our clinical and lifestyle guidelines are designed around holistic optimization. Hover over our focal priorities or the surrounding marker points to explore how they map directly to healthy, vibrant longevity.
            </p>
          </motion.div>

          {/* Interactive Core Map Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
            
            {/* Left Column: Points 0, 1, 2 */}
            <div className="lg:col-span-4 space-y-4 flex flex-col justify-center order-2 lg:order-1">
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Core Therapeutics:
              </p>
              {missionFocusAreas.slice(0, 3).map((area, idx) => {
                const isHovered = hoveredIndex === idx;
                const isAnyHovered = hoveredIndex !== null;
                const activeClasses = isHovered 
                  ? 'border-teal-500 bg-teal-50/20 shadow-md scale-[1.02]' 
                  : isAnyHovered 
                    ? 'border-slate-100 opacity-50' 
                    : 'border-slate-150 bg-white';
                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative group ${activeClasses}`}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    id={`mission-left-point-${idx}`}
                  >
                    <div className="flex gap-4 items-start">
                      <div className={`p-2 rounded-xl transition-all ${
                        isHovered ? 'bg-teal-500 text-white scale-110' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded">
                            {area.num}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 transition-colors duration-300 group-hover:text-teal-600">
                            {area.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 font-light mt-1 leading-relaxed">
                          {area.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Column: Interactive Portrait Image (Overflow visible to allow dots around it) */}
            <div className="lg:col-span-4 flex justify-center items-center py-4 order-1 lg:order-2">
              <div className="relative w-full max-w-[340px] aspect-[2/3] rounded-[2.5rem] p-2 bg-slate-100 border border-slate-200 shadow-2xl overflow-visible group">
                
                {/* Clean, fully visible inner image container */}
                <div className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden bg-slate-950">
                  <img
                    src={healthyLivingImg}
                    alt="Healthy Living Representation"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-700 brightness-95"
                  />
                  
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                  {/* Dynamic Active Label overlay inside the image at the bottom */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <AnimatePresence mode="wait">
                      {hoveredIndex !== null ? (
                        <motion.div
                          key={hoveredIndex}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.25 }}
                          className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg text-center"
                        >
                          <span className={`text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${
                            missionFocusAreas[hoveredIndex].gradient
                          }`}>
                            Active Focus
                          </span>
                          <h5 className="text-xs font-extrabold text-slate-900 mt-1.5">
                            {missionFocusAreas[hoveredIndex].title}
                          </h5>
                          <p className="text-[10px] text-slate-500 leading-normal font-light mt-1">
                            {missionFocusAreas[hoveredIndex].desc}
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-slate-900/80 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10 text-center"
                        >
                          <p className="text-[10px] font-medium text-white/95 uppercase tracking-wider">
                            Interactive Guide
                          </p>
                          <p className="text-[9px] text-slate-300 font-light leading-normal mt-0.5">
                            Hover the numbered markers or point blocks to highlight priorities
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Hotspot Markers placed strictly AROUND the image frame */}
                {missionFocusAreas.map((area, idx) => {
                  const isHovered = hoveredIndex === idx;
                  return (
                    <button
                      key={idx}
                      className={`absolute ${area.markerPos} z-30 flex items-center justify-center focus:outline-none transition-all duration-300`}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      aria-label={`Hotspot for ${area.title}`}
                    >
                      <span className="relative flex h-8 w-8 items-center justify-center">
                        {/* Outer Glow Ring */}
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${
                          isHovered ? `${area.badgeColor} scale-125` : 'bg-slate-300'
                        }`}></span>
                        {/* Solid Actionable Core Circle containing the Point ID */}
                        <span className={`relative inline-flex items-center justify-center rounded-full h-7 w-7 text-[11px] font-bold text-white shadow-xl transition-all duration-300 border border-white ${
                          isHovered ? `${area.badgeColor} scale-110` : 'bg-slate-750'
                        }`}>
                          {area.num}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Points 3, 4, 5 */}
            <div className="lg:col-span-4 space-y-4 flex flex-col justify-center order-3 lg:order-3">
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                Wellbeing Priorities:
              </p>
              {missionFocusAreas.slice(3, 6).map((area, idx) => {
                const realIdx = idx + 3;
                const isHovered = hoveredIndex === realIdx;
                const isAnyHovered = hoveredIndex !== null;
                const activeClasses = isHovered 
                  ? 'border-indigo-500 bg-indigo-50/20 shadow-md scale-[1.02]' 
                  : isAnyHovered 
                    ? 'border-slate-100 opacity-50' 
                    : 'border-slate-150 bg-white';
                return (
                  <div
                    key={realIdx}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative group ${activeClasses}`}
                    onMouseEnter={() => setHoveredIndex(realIdx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    id={`mission-right-point-${realIdx}`}
                  >
                    <div className="flex gap-4 items-start">
                      <div className={`p-2 rounded-xl transition-all ${
                        isHovered ? 'bg-indigo-500 text-white scale-110' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">
                            {area.num}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">
                            {area.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 font-light mt-1 leading-relaxed">
                          {area.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
