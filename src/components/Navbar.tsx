import { useState, useEffect } from 'react';
import { Menu, X, HeartPulse, CalendarCheck } from 'lucide-react';
import logo from '../assets/images/advance_logo.png';
import EditableText from './EditableText';

interface NavbarProps {
  onOpenBooking: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  bookingCount: number;
  onOpenBookingsPanel: () => void;
}

export default function Navbar({
  onOpenBooking,
  activeSection,
  onNavigate,
  bookingCount,
  onOpenBookingsPanel
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Partner.', id: 'partner' },
    { name: 'Professionals', id: 'professionals' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md shadow-xs py-3 border-slate-100'
          : 'bg-transparent py-5 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo / Brand Name */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center hover:opacity-90 cursor-pointer"
          id="navbar-brand-logo"
        >
          <img
            src={logo}
            alt="Advance Health Logo"
            className="h-10 md:h-12 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </button>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex items-center gap-8 text-[13px] font-mono tracking-wide uppercase font-medium">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`hover:text-teal-600 transition-colors cursor-pointer relative py-1 ${
                activeSection === link.id
                  ? 'text-teal-600 font-bold'
                  : 'text-slate-600'
              }`}
              id={`nav-link-${link.id}`}
            >
              <EditableText id={`nav.menu.${link.id}`} defaultText={link.name} label={`Menu Link: ${link.name}`} />
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          {bookingCount > 0 && (
            <button
              onClick={onOpenBookingsPanel}
              className="relative p-2 text-slate-600 hover:text-teal-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border border-slate-100"
              title="My Booked Appointments"
              id="navbar-my-bookings-btn"
            >
              <CalendarCheck className="w-4 h-4" />
              <span className="text-xs font-semibold font-mono">{bookingCount}</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
            </button>
          )}

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs tracking-wide uppercase shadow-xs hover:shadow-md transition-all cursor-pointer"
            id="navbar-book-cta"
          >
            <EditableText id="nav.cta" defaultText="Book Appointment" label="Nav Book CTA Button" />
          </button>
        </div>

        {/* Mobile Menu Actions */}
        <div className="flex items-center gap-3 md:hidden">
          {bookingCount > 0 && (
            <button
              onClick={onOpenBookingsPanel}
              className="p-2 text-slate-600 hover:text-teal-600 hover:bg-slate-50 rounded-xl transition-all relative"
              id="navbar-mobile-bookings-btn"
            >
              <CalendarCheck className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-[9px] text-white rounded-full flex items-center justify-center font-bold font-mono">
                {bookingCount}
              </span>
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg px-6 py-5 space-y-4 flex flex-col">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-left text-sm font-semibold py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors ${
                activeSection === link.id ? 'text-teal-600 bg-teal-50/50' : 'text-slate-600'
              }`}
              id={`nav-link-mobile-${link.id}`}
            >
              <EditableText id={`nav.menu.mobile.${link.id}`} defaultText={link.name} label={`Mobile Menu Link: ${link.name}`} />
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-center text-sm shadow-xs transition-colors cursor-pointer"
              id="navbar-mobile-book-cta"
            >
              <EditableText id="nav.cta.mobile" defaultText="Book Appointment" label="Mobile Nav Book CTA Button" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
