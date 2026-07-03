import { Professional, Service, FAQItem } from './types';
import lobbyImage from './assets/images/medical_center_lobby_1782959169482.jpg';
import drNaidooImage from './assets/images/dr_naidoo.png';
import oceanNaidooImage from './assets/images/ocean_naidoo.png';
import doctorsImage from './assets/images/doctors_team_1782959185361.jpg';
import neurologyImage from './assets/images/neurology_brain_health_1782959199623.jpg';
import pediatricianImage from './assets/images/pediatrician_caring_1782959211815.jpg';

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    image: lobbyImage,
    title: 'Advance Healthcare, Designed for You',
    subtitle: 'Leading-edge clinical medicine delivered with personal, compassionate care at Advance Health.',
    tagline: 'STATE-OF-THE-ART CLINIC'
  },
  {
    id: 'slide-2',
    image: doctorsImage,
    title: 'Empathetic Professionals You Can Trust',
    subtitle: 'Our world-class specialists are dedicated to your long-term health and preventive wellness.',
    tagline: 'EXPERT CLINICAL TEAM'
  },
  {
    id: 'slide-3',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1600&q=80',
    title: 'Innovative Medical Diagnostics',
    subtitle: 'Utilizing modern medical technology and rapid diagnostics to formulate highly precise care plans.',
    tagline: 'LEADING DIAGNOSTIC TECH'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'service-cardiology',
    title: 'Cardiology & Vascular Care',
    description: 'Comprehensive evaluation and management of cardiovascular conditions utilizing state-of-the-art diagnostic imaging and custom therapeutic plans.',
    iconName: 'Heart',
    features: [
      'Advanced ECG and Echocardiography',
      'Preventive cardiology profiling',
      'Hypertension & arrhythmia management',
      'Vascular health assessments'
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'service-neurology',
    title: 'Neurology & Brain Health',
    description: 'Specialized diagnostic tracking and medical intervention for brain, spine, and nervous system health, centered around long-term functionality.',
    iconName: 'Activity',
    features: [
      'Comprehensive neurological evaluations',
      'Migraine & chronic headache management',
      'Cognitive and memory assessment',
      'Neuromuscular disorder therapy'
    ],
    image: neurologyImage
  },
  {
    id: 'service-pediatrics',
    title: 'Pediatrics & Neonatal Care',
    description: 'Gentle, attentive healthcare services tracking child development from infancy through adolescence, emphasizing developmental health.',
    iconName: 'Baby',
    features: [
      'Newborn and infant physical evaluations',
      'Immunization & preventive medicine',
      'Developmental milestone monitoring',
      'Acute childhood illness care'
    ],
    image: pediatricianImage
  },
  {
    id: 'service-general',
    title: 'Comprehensive Primary Care',
    description: 'Holistic day-to-day wellness monitoring, continuous acute care, preventative physical testing, and streamlined multi-specialty coordination.',
    iconName: 'Stethoscope',
    features: [
      'Annual wellness physical exams',
      'Chronic disease therapy management',
      'On-site basic laboratory diagnostics',
      'Lifestyle & nutritional counseling'
    ],
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'service-dermatology',
    title: 'Clinical Dermatology & Skin Renewal',
    description: 'Specialist medical evaluation and therapy of skin, hair, and nail pathology to treat both medical and cosmetic concerns, focusing on collagen integrity.',
    iconName: 'Sparkles',
    features: [
      'Full-body skin cancer screening',
      'Clinical cellular collagen treatment',
      'Acne and rosacea therapeutics',
      'Minor laser and surgical excisions'
    ],
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'service-hormone',
    title: 'Hormone Optimization & TRT',
    description: 'Tailored clinical assessment and safe replacement of essential regulatory hormones to combat metabolic slow-down, chronic physical exhaustion, and loss of vigor.',
    iconName: 'Activity',
    features: [
      'Custom Hormone Replacement Therapy (HRT/TRT)',
      'Thyroid & endocrine balance',
      'Andropause & menopause specialist regimens',
      'On-site compound laboratory formulation'
    ],
    image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'service-metabolic',
    title: 'Cellular IV & NAD+ Infusions',
    description: 'Direct intravenous delivery of critical cellular coenzymes and trace elements to speed up mitochondrial ATP output, boost sleep depth, and repair DNA pathways.',
    iconName: 'Sparkles',
    features: [
      'High-dose premium NAD+ cell infusions',
      'Mitochondrial ATP cocktails',
      'Sleep cycle architecture tracking',
      'Anti-inflammatory peptide infusions'
    ],
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80'
  }
];

export const PROFESSIONALS: Professional[] = [
  {
    id: 'prof-ocean-naidoo',
    name: 'Mr. Ocean Lesley Naidoo',
    role: 'Lead Neurophysiologist & Visionary',
    specialty: 'Neurophysiology & Sleep Science',
    bio: 'Mr. Ocean Lesley Naidoo is a highly skilled Clinical Neurophysiologist who qualified at the Bloemfontein Sleep Laboratory and has completed extensive rotations across public and private academic hospitals.',
    image: oceanNaidooImage,
    education: 'Specialized Clinical Neurophysiology Training — Bloemfontein Sleep Laboratory',
    experience: 'Founder & Director of Neurowave, locum practitioner across South Africa',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    coreSpecializations: ['Neurophysiology', 'Diagnostics', 'Sleep Science'],
    degreesAndCredentials: [
      'Clinical Neurophysiologist Specialist',
      'Polysomnography & CPAP Titration Lead',
      'Founder & Director of Neurowave',
      'Universal Sleep Lab Certified (Free State)'
    ],
    rotations: [
      'The Bloemfontein Sleep Laboratory',
      'Universitas Academic Hospital (Free State)',
      'Greys Hospital (Pietermaritzburg)',
      'Inkosi Albert Luthuli Hospital (Durban)'
    ],
    extendedBio: '4 years worth of clinical neurophysiology procedures performed at The Bloemfontein Sleep Laboratory (qualified to perform Nerve Conduction Studies, Evoked Potentials, Electroencephalography, Polysomnography). Currently working Locum for various Neurophysiologists in South Africa within different modalities. In 2026, Ocean started Neurowave, which currently provides Polysomnography and CPAP titration services to referring doctors.'
  },
  {
    id: 'prof-lesley-naidoo',
    name: 'Lesley Naidoo',
    role: 'Senior Healthcare Executive & Policy Director',
    specialty: 'Public Health & Clinical Dentistry',
    bio: 'Experienced healthcare executive and director with an outstanding track record in clinical dentistry, strategic leadership, policy development, and national health agenda formulation.',
    image: drNaidooImage,
    education: 'Primary Degree in Dental Therapy (UDW), MBA, MPH (UWC), M.Med.Sci (UKZN), PhD Candidate (UKZN)',
    experience: 'Presidential Health Summit Delegate & NHI Advisor',
    availability: ['Monday', 'Wednesday', 'Friday'],
    coreSpecializations: ['Public Health', 'Clinical Dentistry', 'Advocate'],
    degreesAndCredentials: [
      'PhD Candidate in Public Health Research (UKZN)',
      'Master of Public Health (UWC)',
      'Master of Medical Science in Dentistry (UKZN)',
      'Master of Business Administration (MBA)',
      'Bachelor of Theology & Counselling (SATS)',
      'Primary Degree in Dental Therapy (UDW)'
    ],
    rotations: [
      'Presidential Health Summit Policy Delegate (2019–2023)',
      'Universal Healthcare & National Health Insurance (NHI) Designer',
      'Primary Healthcare Transformation & Disease Burden Reduction Lead'
    ],
    extendedBio: 'Demonstrates a strong foundation in clinical dentistry alongside extensive expertise in strategic leadership, policy development, and team empowerment. Renowned for advancing national and continental health agendas through collaborative policy development, including direct involvement in the Presidential Health Summit (2019–2023) and shaping the pillars of Universal Healthcare - the National Health Insurance (NHI). Committed to primary healthcare transformation, disease burden reduction, and equitable access to care across South South Africa, Africa, and the global health community.'
  },
  {
    id: 'prof-jenkins',
    name: 'Dr. Sarah Jenkins',
    role: 'Chief Medical Director & Senior Cardiologist',
    specialty: 'Cardiology',
    bio: 'Dr. Jenkins has spent over 15 years pioneering non-invasive cardiac diagnostic procedures. She believes that the foundation of great cardiovascular health lies in combining clinical precision with active, health-centered lifestyle modifications.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    education: 'MBChB — University of Cape Town (UCT) Faculty of Health Sciences',
    experience: '16+ Years Clinical Practice',
    availability: ['Monday', 'Wednesday', 'Friday'],
    coreSpecializations: ['Preventive Cardiology', 'Vascular Medicine', 'Echocardiography'],
    degreesAndCredentials: [
      'MBChB (UCT Faculty of Health Sciences)',
      'Board Certified in Clinical Cardiology',
      'Fellow of the South African Heart Association'
    ]
  },
  {
    id: 'prof-vance',
    name: 'Dr. Marcus Vance',
    role: 'Attending Neurologist & Brain Specialist',
    specialty: 'Neurology',
    bio: 'Dr. Vance focuses on neuropathology and cognitive rehabilitation. He employs a patient-first ethos, dedicating his expertise to treating neurological challenges while maximizing quality of life for every single patient.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    education: 'MBChB — University of the Witwatersrand (Wits) School of Clinical Medicine',
    experience: '12 Years Clinical Practice',
    availability: ['Tuesday', 'Thursday', 'Friday'],
    coreSpecializations: ['Neuropathology', 'Cognitive Rehabilitation', 'Memory Disorders'],
    degreesAndCredentials: [
      'MBChB (Wits School of Clinical Medicine)',
      'Specialist Neurologist Board Certification (HPCSA)',
      'Neuro-Rehabilitation Lead'
    ]
  },
  {
    id: 'prof-sterling',
    name: 'Dr. Keith Sterling',
    role: 'Senior Orthopedic Specialist',
    specialty: 'Orthopedics',
    bio: 'Dr. Sterling is a highly skilled specialist in joint reconstruction and active sports injury restoration. He is dedicated to helping patients recover full physical motion, regardless of their current athletic tier.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    education: 'MBChB — University of KwaZulu-Natal (UKZN) Nelson R. Mandela School of Medicine',
    experience: '14+ Years Clinical Practice',
    availability: ['Wednesday', 'Thursday', 'Friday'],
    coreSpecializations: ['Joint Reconstruction', 'Sports Traumatology', 'Rehabilitative Orthopedics'],
    degreesAndCredentials: [
      'MBChB (UKZN Nelson R. Mandela School of Medicine)',
      'Fellow of the College of Orthopaedic Surgeons of South Africa',
      'Advanced Sports Medicine Specialist'
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I schedule an appointment with a specialist?',
    answer: 'You can easily book online using our live Appointment Flow by clicking the "Book Appointment" button on our menu or on specific services/professionals. Alternatively, call our clinical desk at +27 (0) 31 765 1234.',
    category: 'Appointments'
  },
  {
    id: 'faq-2',
    question: 'What health insurance networks do you accept?',
    answer: 'Advance Health is currently credentialed with most major South African medical aids, including Discovery Health, Bonitas, Momentum, Medshield, Fedhealth, and GEMS (Government Employees Medical Scheme). Please verify benefits with your specific plan option beforehand.',
    category: 'Billing'
  },
  {
    id: 'faq-3',
    question: 'What should I bring to my first clinical consultation?',
    answer: 'For your first visit, please arrive 15 minutes early and bring your physical government photo ID, active medical insurance card, list of any current prescription medications, and copies of recent laboratory results or diagnostic imaging.',
    category: 'Appointments'
  },
  {
    id: 'faq-4',
    question: 'Are telehealth or virtual diagnostic appointments available?',
    answer: 'Yes! We offer secure, POPIA-compliant telehealth consultations for primary care follow-ups, diagnostic reviews, mental wellness sessions, and minor clinical prescription updates.',
    category: 'Services'
  },
  {
    id: 'faq-5',
    question: 'How long does it take to receive laboratory or scan results?',
    answer: 'Most standard screening panels and blood diagnostics are processed within 24 to 48 business hours. Advanced imaging like MRIs, CT scans, or pathological biopsies may take 3 to 5 business days, and are loaded directly into your secure patient chart.',
    category: 'Services'
  }
];
