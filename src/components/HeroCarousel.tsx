import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data';

interface HeroCarouselProps {
  onOpenBooking: () => void;
}

export default function HeroCarousel({ onOpenBooking }: HeroCarouselProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto-change pictures every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  return (
    <div className="relative h-[85vh] md:h-[90vh] min-h-[500px] w-full overflow-hidden bg-slate-900">
      {/* Background Slideshow Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0.7, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.7 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Subtle dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent z-10" />
          <img
            src={HERO_SLIDES[currentIdx].image}
            alt={HERO_SLIDES[currentIdx].title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Floating UI Elements: Slide Controls */}
      <div className="absolute inset-x-0 bottom-8 z-20 flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto">
        {/* Carousel indicators/dots */}
        <div className="flex gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIdx === idx ? 'w-8 bg-teal-500' : 'w-2 bg-white/40 hover:bg-white'
              }`}
              title={`View slide ${idx + 1}`}
              id={`carousel-dot-${idx}`}
            />
          ))}
        </div>

        {/* Manual navigation buttons */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-slate-900/50 hover:bg-teal-600/95 text-white/90 backdrop-blur-xs hover:text-white transition-all cursor-pointer"
            id="carousel-prev-btn"
            title="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-slate-900/50 hover:bg-teal-600/95 text-white/90 backdrop-blur-xs hover:text-white transition-all cursor-pointer"
            id="carousel-next-btn"
            title="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slide Captions & Interactive CTA */}
      <div className="absolute inset-0 flex items-center z-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl text-left text-white space-y-6">
          {/* Tagline */}
          <motion.div
            key={`tagline-${currentIdx}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block"
          >
            <span className="px-3 py-1 rounded-md bg-teal-500/15 border border-teal-500/35 text-teal-400 text-[10px] font-mono font-bold tracking-widest uppercase">
              {HERO_SLIDES[currentIdx].tagline}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            key={`title-${currentIdx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-sans tracking-tight leading-[1.1]"
          >
            {HERO_SLIDES[currentIdx].title}
          </motion.h1>

          {/* Subtitle description */}
          <motion.p
            key={`subtitle-${currentIdx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-200 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl"
          >
            {HERO_SLIDES[currentIdx].subtitle}
          </motion.p>

          {/* CTA Trigger */}
          <motion.div
            key={`cta-${currentIdx}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="pt-3 flex flex-wrap gap-4"
          >
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs tracking-wide uppercase rounded-xl transition-all shadow-lg hover:shadow-teal-500/20 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              id="hero-book-now-cta"
            >
              Book Consultation <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#about"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white font-semibold text-xs tracking-wide uppercase rounded-xl transition-all hover:shadow-md backdrop-blur-xs flex items-center justify-center cursor-pointer"
              id="hero-learn-more-cta"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
