import { Professional, Service, FAQItem } from './types';
import lobbyImage from './assets/images/modern_hq_clinic_1785154308673.jpg';
import drNaidooImage from './assets/images/dr_naidoo.png';
import oceanNaidooImage from './assets/images/ocean_naidoo.png';
import wellnessImage from './assets/images/wellness_lifestyle_1783946675009.jpg';
import neurologyImage from './assets/images/neurology_brain_health_1782959199623.jpg';
import pediatricianImage from './assets/images/pediatrician_caring_1782959211815.jpg';
import sithabileImage from './assets/images/sithabile.png';

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    image: lobbyImage,
    title: 'Advance Health & Wellness, Designed for You',
    subtitle: 'Leading-edge clinical medicine delivered with personal, compassionate care at Advance Health & Wellness.',
    tagline: 'STATE-OF-THE-ART CLINIC IN HILLCREST'
  },
  {
    id: 'slide-2',
    image: wellnessImage,
    title: 'Nurturing Longevity & Preventative Health',
    subtitle: 'Tailored physiological guidance and evidence-based therapeutic care to optimize your vitality.',
    tagline: 'PROACTIVE WELLNESS PATHWAYS'
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
    description: 'Specialised diagnostic tracking and medical intervention for brain, spine, and nervous system health, centered around long-term functionality.',
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
    title: 'Paediatrics & Neonatal Care',
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
      'Lifestyle & nutritional counselling'
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
  },
  {
    id: 'service-psychology',
    title: 'Clinical Psychology & Psychotherapy',
    description: 'Evidence-based individual psychotherapy, psychological assessments, trauma counselling, and couples therapy delivered in a compassionate, confidential environment.',
    iconName: 'User',
    features: [
      'Individual psychotherapy for adolescents & adults',
      'Anxiety, depression, & stress management',
      'Trauma & grief counselling',
      'Relationship & couples therapy'
    ],
    image: sithabileImage
  }
];

export const PROFESSIONALS: Professional[] = [
  {
    id: 'prof-sithabile-mncwango',
    name: 'Sithabile Mncwango',
    role: 'Clinical Psychologist',
    specialty: 'Clinical Psychology & Psychotherapy',
    bio: 'Sithabile Mncwango is an HPCSA-registered Clinical Psychologist offering evidence-based psychotherapy and psychological assessments for adolescents, adults, and couples facing anxiety, trauma, and stress.',
    image: sithabileImage,
    education: 'M.Soc.Sci in Clinical Psychology (UKZN) | B.Soc.Sci (Hons) | PhD Candidate',
    experience: 'HPCSA PS0134503 | Practice No. 0725544',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    coreSpecializations: [
      'Anxiety & Stress Disorders',
      'Trauma & Resilience',
      'Depression & Wellbeing',
      'Couples & Family Therapy',
      'Burnout & Healthcare Mental Health'
    ],
    degreesAndCredentials: [
      'Master of Social Science in Clinical Psychology (UKZN)',
      'Bachelor of Social Science Honours (UKZN)',
      'Bachelor of Social Science (UKZN)',
      'PhD Candidate (University of KwaZulu-Natal)',
      'Registered Clinical Psychologist — HPCSA (PS0134503)',
      'Practice Number: 0725544'
    ],
    rotations: [
      'Individual Psychotherapy (Adolescents & Adults)',
      'Psychological Assessments & Diagnostics',
      'Trauma & Grief Counselling',
      'Relationship & Couples Therapy',
      'Corporate & Healthcare Professional Burnout Workshops'
    ],
    extendedBio: 'Sithabile Mncwango is a Clinical Psychologist registered with the Health Professions Council of South Africa (HPCSA). She holds a Master of Social Science in Clinical Psychology and is currently completing her PhD at the University of KwaZulu-Natal, researching stress and psychological help-seeking in the South African public healthcare sector.\n\nShe provides psychological assessment and evidence-based therapy to adolescents and adults facing anxiety, depression, trauma, stress, and adjustment challenges, with particular interests in stress management, trauma, resilience, and mental health promotion. Her therapeutic approach is collaborative, compassionate, and client-centred.\n\nMessage to Patients:\n"Thank you for considering me as part of your mental health journey. Seeking support is a courageous first step, and I am committed to providing a safe, compassionate, and confidential space where we can work together towards your goals. My aim is to help you develop the insight, skills, and resilience needed to improve your wellbeing and lead a more fulfilling life."'
  },
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
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I schedule an appointment with a specialist?',
    answer: 'You can easily book online using our live Appointment Flow by selecting "Schedule Consultation" on specific services/professionals. Alternatively, call our clinical desk at +27 (0) 31 765 1234.',
    category: 'Appointments'
  },
  {
    id: 'faq-2',
    question: 'What health insurance networks do you accept?',
    answer: 'Advance Health & Wellness is currently credentialed with most major South African medical aids, including Discovery Health, Bonitas, Momentum, Medshield, Fedhealth, and GEMS (Government Employees Medical Scheme). Please verify benefits with your specific plan option beforehand.',
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
