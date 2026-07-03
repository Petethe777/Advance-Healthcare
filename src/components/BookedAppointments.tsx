import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CalendarCheck, Clock, Trash2, Calendar, AlertTriangle } from 'lucide-react';
import { Booking } from '../types';

interface BookedAppointmentsProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateBookings: () => void;
  triggerRefresh: number;
}

export default function BookedAppointments({
  isOpen,
  onClose,
  onUpdateBookings,
  triggerRefresh
}: BookedAppointmentsProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  // Load bookings from localStorage
  const loadBookings = () => {
    try {
      const stored = localStorage.getItem('advance_health_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error('Error loading bookings:', err);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [isOpen, triggerRefresh]);

  if (!isOpen) return null;

  const handleCancelBooking = (id: string) => {
    try {
      const stored = localStorage.getItem('advance_health_bookings');
      if (stored) {
        const parsed: Booking[] = JSON.parse(stored);
        const filtered = parsed.filter(b => b.id !== id);
        localStorage.setItem('advance_health_bookings', JSON.stringify(filtered));
        setBookings(filtered);
        setConfirmCancelId(null);
        onUpdateBookings();
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
      />

      {/* Drawer Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10 border-l border-slate-100"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight">
                Your Scheduled Sessions
              </h3>
              <p className="text-[10px] text-slate-500 font-mono">
                LOCAL PORTAL STORAGE
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors cursor-pointer"
            id="close-bookings-panel-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <AnimatePresence mode="popLayout">
            {bookings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 space-y-4"
              >
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <CalendarCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-slate-800">No active appointments</h4>
                  <p className="text-xs text-slate-500 max-w-[240px] mx-auto">
                    You have not registered any appointments on this browser session yet.
                  </p>
                </div>
              </motion.div>
            ) : (
              bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-4 space-y-3 relative overflow-hidden"
                  id={`patient-booking-ticket-${booking.id}`}
                >
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-teal-600" />

                  {/* Top info row */}
                  <div className="flex justify-between items-start pl-2">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase text-slate-400">Appointment ID</span>
                      <p className="text-xs font-mono font-bold text-slate-800">{booking.id}</p>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-150">
                      CONFIRMED
                    </span>
                  </div>

                  {/* Core parameters */}
                  <div className="pl-2 grid grid-cols-2 gap-3 border-t border-b border-slate-200/40 py-2.5 text-xs">
                    <div>
                      <p className="text-slate-400 text-[10px]">Specialist</p>
                      <p className="font-semibold text-slate-800">
                        {booking.professionalName || (booking as any).doctorName}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px]">Service Area</p>
                      <p className="font-semibold text-slate-800">{booking.serviceTitle.split('&')[0]}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px]">Date</p>
                      <p className="font-semibold text-slate-800 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> {booking.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px]">Time Slot</p>
                      <p className="font-semibold text-slate-800 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> {booking.timeSlot}
                      </p>
                    </div>
                  </div>

                  {/* Patient detail summary & cancel trigger */}
                  <div className="pl-2 flex items-center justify-between text-xs pt-1">
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400">Patient</p>
                      <p className="font-semibold text-slate-800 truncate">{booking.patientName}</p>
                    </div>

                    {confirmCancelId === booking.id ? (
                      <div className="flex items-center gap-1 bg-red-50 p-1.5 rounded-xl border border-red-150 animate-fadeIn">
                        <span className="text-[10px] text-red-600 font-bold px-1 flex items-center gap-0.5">
                          <AlertTriangle className="w-3 h-3 shrink-0" /> Confirm?
                        </span>
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-2 py-1 bg-red-600 text-white font-semibold text-[10px] rounded-lg hover:bg-red-700 cursor-pointer"
                          id={`confirm-cancel-btn-${booking.id}`}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmCancelId(null)}
                          className="px-2 py-1 bg-slate-200 text-slate-700 font-semibold text-[10px] rounded-lg hover:bg-slate-300 cursor-pointer"
                          id={`cancel-cancel-btn-${booking.id}`}
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmCancelId(booking.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        title="Cancel Scheduled Appointment"
                        id={`cancel-appt-trigger-${booking.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 font-sans leading-relaxed text-center">
          Appointments listed here are cached securely in your local browser state. Show them to the reception clerk upon arrival.
        </div>
      </motion.div>
    </div>
  );
}
