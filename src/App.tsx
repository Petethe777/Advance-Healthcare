import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, HeartPulse, Heart, Phone, Mail, MapPin } from 'lucide-react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import PartnerPage from './components/PartnerPage';
import ProfessionalsPage from './components/ProfessionalsPage';
import FAQPage from './components/FAQPage';
import ContactPage from './components/ContactPage';
import BookingModal from './components/BookingModal';
import BookedAppointments from './components/BookedAppointments';
import { Booking } from './types';
import logo from './assets/images/advance_logo.png';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBookingsPanelOpen, setIsBookingsPanelOpen] = useState(false);
  const [preSelectedProfessional, setPreSelectedProfessional] = useState<string | undefined>(undefined);
  const [preSelectedService, setPreSelectedService] = useState<string | undefined>(undefined);
  const [bookingCount, setBookingCount] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync initial booking count
  const updateBookingCount = () => {
    try {
      const stored = localStorage.getItem('advance_health_bookings');
      if (stored) {
        const bookings: Booking[] = JSON.parse(stored);
        setBookingCount(bookings.length);
      } else {
        setBookingCount(0);
      }
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    updateBookingCount();
  }, []);

  // Monitor scroll height to show/hide "Scroll to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenBookingWithProfessional = (professionalId: string) => {
    setPreSelectedProfessional(professionalId);
    setPreSelectedService(undefined);
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingWithService = (serviceId: string) => {
    setPreSelectedService(serviceId);
    setPreSelectedProfessional(undefined);
    setIsBookingModalOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    setPreSelectedProfessional(undefined);
    setPreSelectedService(undefined);
    setIsBookingModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch which page to display
  const renderActivePage = () => {
    switch (activeSection) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenGeneralBooking}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'partner':
        return <PartnerPage />;
      case 'professionals':
        return <ProfessionalsPage onBookProfessional={handleOpenBookingWithProfessional} />;
      case 'faq':
        return <FAQPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenGeneralBooking}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/20 text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-teal-600 selection:text-white flex flex-col justify-between pt-[74px]">
      {/* Navigation Header */}
      <Navbar
        onOpenBooking={handleOpenGeneralBooking}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        bookingCount={bookingCount}
        onOpenBookingsPanel={() => setIsBookingsPanelOpen(true)}
      />

      {/* Main Pages Wrapper */}
      <main className="w-full flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modern Medical Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center">
              <div className="bg-white p-2.5 rounded-xl shadow-xs inline-block">
                <img
                  src={logo}
                  alt="Advance Health Logo"
                  className="h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed font-sans">
              Empowering individuals with clinical, specialized diagnostics and compassionate outpatient medicine. Registered healthcare specialists dedicated to customized preventive therapeutics.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-teal-400 font-mono">
              <Heart className="w-4 h-4 animate-pulse text-rose-500" />
              <span>Certified Healthcare Network &bull; Hillcrest</span>
            </div>
          </div>

          {/* Col 2: Navigation map */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider">
              Partnership Options
            </h4>
            <div className="grid grid-cols-1 gap-2 text-xs text-slate-400">
              <button onClick={() => handleNavigate('partner')} className="text-left hover:text-white transition-colors cursor-pointer">
                &bull; Specialist Consultation Suites
              </button>
              <button onClick={() => handleNavigate('partner')} className="text-left hover:text-white transition-colors cursor-pointer">
                &bull; High-Spec Sleep & EEG Labs
              </button>
              <button onClick={() => handleNavigate('partner')} className="text-left hover:text-white transition-colors cursor-pointer">
                &bull; Clinical Dental Operatories
              </button>
              <button onClick={() => handleNavigate('partner')} className="text-left hover:text-white transition-colors cursor-pointer">
                &bull; Diagnostic Support & Billing
              </button>
              <button onClick={() => handleNavigate('partner')} className="text-left hover:text-white transition-colors cursor-pointer">
                &bull; HPCSA Partner Registration
              </button>
            </div>
          </div>

          {/* Col 3: Contact quick links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider">
              Quick Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-400 font-sans">
              <div className="flex gap-2 items-start">
                <Phone className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span>+27 (0) 31 765 1234</span>
              </div>
              <div className="flex gap-2 items-start">
                <Mail className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span>support@advancehealth.co.za</span>
              </div>
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span>Hillcrest Medical Centre, Hillcrest, KZN</span>
              </div>
            </div>
          </div>

          {/* Col 4: Operations */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider">
              Legal
            </h4>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <span className="hover:text-white transition-colors">POPIA Compliance</span>
              <span className="hover:text-white transition-colors">Privacy Policy</span>
              <span className="hover:text-white transition-colors">Terms of Use</span>
              <span className="hover:text-white transition-colors">Triage Protocols</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4 font-sans">
          <p>© {new Date().getFullYear()} Advance Health. All rights reserved.</p>
          <p className="font-mono text-[10px]">DESIGNED WITH COMPASSIONATE CARE &bull; POPIA & HPCSA COMPLIANT</p>
        </div>
      </footer>

      {/* Booking Modal flow */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preSelectedProfessionalId={preSelectedProfessional}
        preSelectedServiceId={preSelectedService}
        onBookingSuccess={updateBookingCount}
      />

      {/* Booked Appointments Tray/Panel */}
      <BookedAppointments
        isOpen={isBookingsPanelOpen}
        onClose={() => setIsBookingsPanelOpen(false)}
        onUpdateBookings={updateBookingCount}
        triggerRefresh={refreshTrigger}
      />

      {/* Scroll-to-Top Float action */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 p-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-teal-600/30 hover:-translate-y-1 transition-all cursor-pointer"
          title="Scroll to Top"
          id="scroll-to-top-btn"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
