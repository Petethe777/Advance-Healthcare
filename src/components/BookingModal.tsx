import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, ArrowRight, ArrowLeft, Heart, Activity, Baby, Bone, Stethoscope, Sparkles, AlertCircle } from 'lucide-react';
import { Professional, Service, Booking } from '../types';
import { PROFESSIONALS, SERVICES } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedProfessionalId?: string;
  preSelectedServiceId?: string;
  onBookingSuccess: () => void;
}

export function MedicalIcon({ name, className = "w-6 h-6" }: { name: string; className?: string }) {
  switch (name) {
    case 'Heart': return <Heart className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Baby': return <Baby className={className} />;
    case 'Bone': return <Bone className={className} />;
    case 'Stethoscope': return <Stethoscope className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    default: return <Stethoscope className={className} />;
  }
}

export default function BookingModal({
  isOpen,
  onClose,
  preSelectedProfessionalId,
  preSelectedServiceId,
  onBookingSuccess
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookedReceipt, setBookedReceipt] = useState<Booking | null>(null);

  // Load pre-selections when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setBookedReceipt(null);
      setErrors({});

      if (preSelectedServiceId) {
        const foundSvc = SERVICES.find(s => s.id === preSelectedServiceId);
        if (foundSvc) setSelectedService(foundSvc);
      } else {
        setSelectedService(null);
      }

      if (preSelectedProfessionalId) {
        const foundProf = PROFESSIONALS.find(p => p.id === preSelectedProfessionalId);
        if (foundProf) {
          setSelectedProfessional(foundProf);
          // If both are pre-selected, go straight to step 3 (Date/Time)
          if (preSelectedServiceId) {
            setStep(3);
          } else {
            setStep(2);
          }
        }
      } else {
        setSelectedProfessional(null);
      }
    }
  }, [isOpen, preSelectedProfessionalId, preSelectedServiceId]);

  if (!isOpen) return null;

  const timeSlots = [
    '08:30 AM', '09:15 AM', '10:00 AM', '10:45 AM',
    '01:15 PM', '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM'
  ];

  // Helper to get matching professionals for selected service/specialty
  const getFilteredProfessionals = () => {
    if (!selectedService) return PROFESSIONALS;
    let filtered = PROFESSIONALS;
    if (selectedService.id.includes('cardiology')) {
      filtered = PROFESSIONALS.filter(p => p.specialty.includes('Cardiology'));
    } else if (selectedService.id.includes('neurology')) {
      filtered = PROFESSIONALS.filter(p => p.specialty.includes('Neurology') || p.specialty.includes('Neurophysiology'));
    } else if (selectedService.id.includes('pediatrics')) {
      filtered = PROFESSIONALS.filter(p => p.specialty.includes('Pediatrics') || p.specialty.includes('Cardiology') || p.specialty.includes('Neurophysiology'));
    } else if (selectedService.id.includes('orthopedics')) {
      filtered = PROFESSIONALS.filter(p => p.specialty.includes('Orthopedics'));
    } else if (selectedService.id.includes('hormone') || selectedService.id.includes('metabolic')) {
      filtered = PROFESSIONALS.filter(p => p.specialty.includes('Longevity Medicine') || p.specialty.includes('Neurology') || p.specialty.includes('Neurophysiology') || p.specialty.includes('Public Health'));
    }
    return filtered.length > 0 ? filtered : PROFESSIONALS;
  };

  const handleNextStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1 && !selectedService) {
      newErrors.service = 'Please choose a primary healthcare service.';
    } else if (step === 2 && !selectedProfessional) {
      newErrors.professional = 'Please select your medical professional.';
    } else if (step === 3) {
      if (!selectedDate) newErrors.date = 'Please pick a consultation date.';
      if (!selectedTime) newErrors.time = 'Please pick an available time slot.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setErrors({});
    setStep(prev => prev - 1);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!patientName.trim()) newErrors.name = 'Patient name is required.';
    if (!patientEmail.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(patientEmail)) {
      newErrors.email = 'Please provide a valid email.';
    }
    if (!patientPhone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(patientPhone)) {
      newErrors.phone = 'Please provide a valid phone number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate real booking
    const newBooking: Booking = {
      id: 'apt-' + Math.random().toString(36).substr(2, 9),
      professionalName: selectedProfessional?.name || 'Any Available Specialist',
      serviceTitle: selectedService?.title || 'General Consultation',
      date: selectedDate,
      timeSlot: selectedTime,
      patientName,
      patientEmail,
      patientPhone,
      notes,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    // Save to local storage
    const currentBookings: Booking[] = JSON.parse(localStorage.getItem('advance_health_bookings') || '[]');
    currentBookings.push(newBooking);
    localStorage.setItem('advance_health_bookings', JSON.stringify(currentBookings));

    setBookedReceipt(newBooking);
    setStep(5); // Success step
    onBookingSuccess();
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 font-sans tracking-tight">
              Book Appointment
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-1">
              ADVANCE HEALTH PORTAL
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors cursor-pointer"
            id="close-booking-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Step Indicators */}
        {step < 5 && (
          <div className="bg-white px-6 py-4 border-b border-slate-100 flex justify-between items-center text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 md:gap-3 w-full justify-between">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-1.5 flex-1 justify-center first:justify-start last:justify-end">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      step === s
                        ? 'bg-teal-600 text-white shadow-sm ring-4 ring-teal-50'
                        : step > s
                        ? 'bg-teal-50 text-teal-600 border border-teal-200'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {s}
                  </span>
                  <span className={`hidden md:inline text-[11px] ${step === s ? 'text-slate-800 font-semibold' : 'text-slate-400'}`}>
                    {s === 1 ? 'Service' : s === 2 ? 'Professional' : s === 3 ? 'Schedule' : 'Details'}
                  </span>
                  {s < 4 && <div className="hidden md:block h-[1px] bg-slate-100 flex-1 mx-2" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {errors.service && step === 1 && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> {errors.service}
            </div>
          )}
          {errors.professional && step === 2 && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> {errors.professional}
            </div>
          )}
          {(errors.date || errors.time) && step === 3 && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex flex-col gap-1">
              {errors.date && <div className="flex items-center gap-2"><AlertCircle className="w-4 h-4 shrink-0" /> {errors.date}</div>}
              {errors.time && <div className="flex items-center gap-2"><AlertCircle className="w-4 h-4 shrink-0" /> {errors.time}</div>}
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="mb-2">
                  <h4 className="text-base font-semibold text-slate-800">Select Medical Service</h4>
                  <p className="text-sm text-slate-500">Choose the appropriate clinic category for your consultation.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => {
                        setSelectedService(svc);
                        setErrors({});
                      }}
                      className={`text-left p-4 rounded-xl border-2 transition-all flex gap-3 cursor-pointer ${
                        selectedService?.id === svc.id
                          ? 'border-teal-600 bg-teal-50/40 text-slate-900 shadow-sm'
                          : 'border-slate-100 hover:border-slate-300 bg-white text-slate-600'
                      }`}
                      id={`select-service-${svc.id}`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${
                        selectedService?.id === svc.id ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-600'
                      }`}>
                        <MedicalIcon name={svc.iconName} className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-slate-900">{svc.title}</h5>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{svc.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="mb-2">
                  <h4 className="text-base font-semibold text-slate-800">Select Medical Professional</h4>
                  <p className="text-sm text-slate-500">
                    {selectedService ? `Showing specialists in ${selectedService.title.split('&')[0].trim()}` : 'Select a clinical specialist.'}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {getFilteredProfessionals().map((prof) => (
                    <button
                      key={prof.id}
                      onClick={() => {
                        setSelectedProfessional(prof);
                        setErrors({});
                      }}
                      className={`text-left p-3 rounded-xl border-2 transition-all flex gap-3 items-center cursor-pointer ${
                        selectedProfessional?.id === prof.id
                          ? 'border-teal-600 bg-teal-50/40 text-slate-900 shadow-sm'
                          : 'border-slate-100 hover:border-slate-300 bg-white text-slate-600'
                      }`}
                      id={`select-professional-${prof.id}`}
                    >
                      <img
                        src={prof.image}
                        alt={prof.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-100"
                      />
                      <div className="min-w-0">
                        <h5 className="font-semibold text-sm text-slate-900 truncate">{prof.name}</h5>
                        <p className="text-xs text-teal-600 font-medium truncate">{prof.role}</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">Avail: {prof.availability.join(', ')}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-base font-semibold text-slate-800">Select Date & Time</h4>
                  <p className="text-sm text-slate-500">
                    Consultation with <strong className="text-slate-950 font-semibold">{selectedProfessional?.name}</strong> for {selectedService?.title}.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                      Choose Consultation Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400 pointer-events-none" />
                      <input
                        type="date"
                        min={todayStr}
                        value={selectedDate}
                        onChange={(e) => {
                          setSelectedDate(e.target.value);
                          setErrors({});
                        }}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-white shadow-xs font-sans cursor-pointer"
                        id="booking-date-input"
                      />
                    </div>
                    {selectedProfessional && (
                      <div className="mt-3 p-3 bg-slate-50 rounded-lg text-xs text-slate-600">
                        <span className="font-semibold text-slate-800 block mb-1">Professional Availability:</span>
                        Weekly scheduled slots on <span className="font-medium text-teal-700">{selectedProfessional.availability.join(', ')}</span>. Please select a matching day if possible for faster approval.
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                      Select Available Time Slot
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setSelectedTime(slot);
                            setErrors({});
                          }}
                          className={`py-2 px-1 rounded-lg text-center font-mono text-xs transition-all cursor-pointer ${
                            selectedTime === slot
                              ? 'bg-teal-600 text-white shadow-sm font-semibold'
                              : 'bg-slate-50 hover:bg-slate-200/50 text-slate-700 hover:text-slate-900 border border-slate-100'
                          }`}
                          id={`select-time-${slot.replace(/[:\s]/g, '-')}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-base font-semibold text-slate-800">Verify Patient Information</h4>
                  <p className="text-sm text-slate-500">Provide registration details to finalize your appointment booking.</p>
                </div>

                <form onSubmit={handleSubmitBooking} className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Patient Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. Eleanor Vance"
                          value={patientName}
                          onChange={(e) => {
                            setPatientName(e.target.value);
                            setErrors({});
                          }}
                          className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent ${
                            errors.name ? 'border-red-300' : 'border-slate-200'
                          }`}
                          id="patient-name-field"
                        />
                      </div>
                      {errors.name && <p className="text-[11px] text-red-500 mt-0.5">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Contact Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="tel"
                          placeholder="e.g. +1 (555) 489-0120"
                          value={patientPhone}
                          onChange={(e) => {
                            setPatientPhone(e.target.value);
                            setErrors({});
                          }}
                          className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent ${
                            errors.phone ? 'border-red-300' : 'border-slate-200'
                          }`}
                          id="patient-phone-field"
                        />
                      </div>
                      {errors.phone && <p className="text-[11px] text-red-500 mt-0.5">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="email"
                        placeholder="e.g. eleanor.vance@example.com"
                        value={patientEmail}
                        onChange={(e) => {
                          setPatientEmail(e.target.value);
                          setErrors({});
                        }}
                        className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent ${
                          errors.email ? 'border-red-300' : 'border-slate-200'
                        }`}
                        id="patient-email-field"
                      />
                    </div>
                    {errors.email && <p className="text-[11px] text-red-500 mt-0.5">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Medical Notes / Symptoms (Optional)
                    </label>
                    <textarea
                      placeholder="Specify any symptoms, allergies, or context for the clinician..."
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                      id="patient-notes-field"
                    />
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex gap-3 text-xs text-slate-600 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800">Booking Summary:</span> {selectedService?.title} consultation with {selectedProfessional?.name} scheduled on {selectedDate} at {selectedTime}.
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 5 && bookedReceipt && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 px-4 space-y-5"
              >
                <div className="mx-auto w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 shadow-xs ring-8 ring-teal-50/50">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
                    Appointment Confirmed!
                  </h4>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    Your appointment has been registered in the Advance Health portal. A confirmation email has been sent.
                  </p>
                </div>

                {/* Ticket Receipt design */}
                <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left divide-y divide-slate-200/60 font-sans relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-teal-600" />
                  
                  <div className="pb-3.5 flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Appointment ID</p>
                      <p className="font-mono text-sm font-semibold text-slate-800">{bookedReceipt.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Status</p>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        CONFIRMED
                      </span>
                    </div>
                  </div>

                  <div className="py-3.5 space-y-2.5">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-slate-400 font-medium">Professional</p>
                        <p className="font-semibold text-slate-800">{bookedReceipt.professionalName}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-medium">Specialty Service</p>
                        <p className="font-semibold text-slate-800">{bookedReceipt.serviceTitle}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-slate-400 font-medium">Date</p>
                        <p className="font-semibold text-slate-800 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" /> {bookedReceipt.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-medium">Time Slot</p>
                        <p className="font-semibold text-slate-800 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> {bookedReceipt.timeSlot}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3.5 text-xs space-y-1">
                    <p className="text-slate-400 font-medium">Patient Details</p>
                    <p className="font-semibold text-slate-800">{bookedReceipt.patientName}</p>
                    <p className="text-slate-500 text-[11px] font-mono">{bookedReceipt.patientEmail} &bull; {bookedReceipt.patientPhone}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-white text-sm font-semibold transition-all hover:shadow-md cursor-pointer"
                    id="finish-booking-success"
                  >
                    Return to Clinic Home
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer controls */}
        {step < 5 && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <div>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1.5 font-medium hover:bg-slate-200/30 rounded-lg cursor-pointer transition-colors"
                  id="booking-prev-btn"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}
            </div>

            <div>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs hover:shadow-md transition-all"
                  id="booking-next-btn"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitBooking}
                  className="px-6 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
                  id="booking-submit-btn"
                >
                  Confirm Appointment
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
