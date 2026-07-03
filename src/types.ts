export interface Professional {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
  education: string;
  experience: string;
  availability: string[];
  coreSpecializations?: string[];
  degreesAndCredentials?: string[];
  rotations?: string[];
  extendedBio?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  image?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Booking {
  id: string;
  professionalName: string;
  serviceTitle: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes?: string;
  status: 'Confirmed' | 'Cancelled';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
