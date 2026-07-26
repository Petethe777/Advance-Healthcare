import { useState, SVGProps } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import EditableText from './EditableText';

// Import local images
import lobbyImage from '../assets/images/medical_center_lobby_1782959169482.jpg';
import wellnessImage from '../assets/images/wellness_lifestyle_1783946675009.jpg';

interface HomePageProps {
  onNavigate: (pageId: string) => void;
  onOpenBooking: () => void;
}

const revealVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

// Classical SVG Line Icons for Section 3 (Holistic Approach)
function ClassicalUrnIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 10h20" />
      <path d="M24 10v4c0 3-4 6-4 10 0 10 6 18 12 18s12-8 12-18c0-4-4-7-4-10v-4" />
      <path d="M26 42v10" />
      <path d="M38 42v10" />
      <path d="M20 52h24" />
      <path d="M18 20c-4 0-6 3-6 7 0 5 4 8 8 8" />
      <path d="M46 20c4 0 6 3 6 7 0 5-4 8-8 8" />
    </svg>
  );
}

function ClassicalColumnIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 12h36" />
      <path d="M18 16h28" />
      <path d="M20 16v32" />
      <path d="M28 16v32" />
      <path d="M36 16v32" />
      <path d="M44 16v32" />
      <path d="M18 48h28" />
      <path d="M14 52h36" />
      <path d="M18 12c0-3 2-4 4-4s4 1 4 4" />
      <path d="M38 12c0-3 2-4 4-4s4 1 4 4" />
    </svg>
  );
}

function ClassicalLyreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 12c-4 0-8 6-8 14 0 10 8 18 20 18s20-8 20-18c0-8-4-14-8-14" />
      <path d="M22 12h20" />
      <path d="M26 12v30" />
      <path d="M32 12v32" />
      <path d="M38 12v30" />
      <path d="M24 44v8" />
      <path d="M40 44v8" />
      <path d="M18 52h28" />
    </svg>
  );
}

function ClassicalAmphoraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M24 8h16" />
      <path d="M26 8v6c-4 4-8 10-8 18 0 8 6 16 14 16s14-8 14-16c0-8-4-14-8-18V8" />
      <path d="M24 48v6" />
      <path d="M40 48v6" />
      <path d="M20 54h24" />
      <path d="M18 18c-5 0-8 4-8 9 0 6 5 9 8 9" />
      <path d="M46 18c5 0 8 4 8 9 0 6-5 9-8 9" />
    </svg>
  );
}

function GoogleLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function HomePage({ onNavigate, onOpenBooking }: HomePageProps) {
  const [selectedGoal, setSelectedGoal] = useState<string>('Popular');

  const goalTabs = [
    { id: 'Popular', label: 'Popular' },
    { id: 'Look Your Best', label: 'Look Your Best' },
    { id: 'Energize', label: 'Energize' },
    { id: 'De-Stress', label: 'De-Stress' },
    { id: 'Think Clearer', label: 'Think Clearer' },
    { id: 'Better Sex', label: 'Better Sex' }
  ];

  const allTreatments = [
    {
      id: 'aging-assessment',
      tag: 'Start Here',
      tagBg: 'bg-[#E2F738] text-slate-950',
      title: 'Aging Wellness Assessment',
      image: wellnessImage,
      goals: ['Popular', 'Energize', 'Think Clearer'],
      actionText: 'LEARN MORE'
    },
    {
      id: 'hydrafacial',
      tag: 'Skin Treatment',
      tagBg: 'bg-[#E2F738] text-slate-950',
      title: 'HydraFacial',
      image: 'https://images.unsplash.com/photo-1512290900673-700200411986?auto=format&fit=crop&w=600&q=80',
      goals: ['Popular', 'Look Your Best'],
      actionText: 'LEARN MORE'
    },
    {
      id: 'botox-daxxify',
      tag: 'Wrinkle Relaxers',
      tagBg: 'bg-[#E2F738] text-slate-950',
      title: 'Botox & Daxxify',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      goals: ['Look Your Best', 'Popular'],
      actionText: 'LEARN MORE'
    },
    {
      id: 'weight-loss',
      tag: 'Rx',
      tagBg: 'bg-[#F7D6B8] text-slate-950',
      title: 'Weight Loss & Metabolic Care',
      image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=600&q=80',
      goals: ['Popular', 'Energize', 'De-Stress'],
      actionText: 'LEARN MORE'
    },
    {
      id: 'iv-drip',
      tag: '5 Options',
      tagBg: 'bg-[#E2F738] text-slate-950',
      title: 'IV Drip Therapy',
      image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80',
      goals: ['Energize', 'De-Stress', 'Better Sex'],
      actionText: 'LEARN MORE'
    }
  ];

  const filteredTreatments = allTreatments.filter(t => 
    selectedGoal === 'Popular' ? true : t.goals.includes(selectedGoal)
  );

  return (
    <div className="bg-[#FAF9F5] text-slate-900 font-sans-clean overflow-x-hidden">
      
      {/* SECTION 1: HERO & GOAL FILTERS (from input_file_4.png) */}
      <section className="relative w-full">
        {/* Full-bleed Hero Image Banner */}
        <div className="relative w-full h-[520px] md:h-[620px] lg:h-[680px] overflow-hidden bg-slate-900">
          <img
            src={wellnessImage}
            alt="Change the way you age"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-90 scale-102 transition-transform duration-1000"
          />
          {/* Subtle gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-start text-white">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="max-w-xl space-y-6"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif-display font-normal tracking-tight text-white leading-[1.08]">
                <EditableText
                  id="home.hero.title"
                  defaultText="Change the way you age"
                  label="Hero Main Title"
                />
              </h1>

              <p className="text-slate-100 font-sans-clean font-light text-sm md:text-base lg:text-lg leading-relaxed max-w-lg">
                <EditableText
                  id="home.hero.subtitle"
                  defaultText="Advance Health is the first longevity-focused health clinic designed to proactively slow down aging both inside and out."
                  label="Hero Subtitle"
                  as="p"
                />
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-8 py-4 bg-[#E2F738] hover:bg-[#d4ea2a] text-slate-950 font-bold font-sans-clean text-xs tracking-widest uppercase transition-all shadow-lg hover:shadow-xl cursor-pointer hover:scale-102 active:scale-98"
                  id="hero-get-started-btn"
                >
                  GET STARTED
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 1 SUB: "Optimize your health at every age" & Filter Pills */}
        <div className="bg-[#FAF9F5] py-16 px-6 md:px-12 border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif-display font-normal text-slate-900 tracking-tight">
              Optimize your health at every age
            </h2>

            {/* Horizontal Filter Pill Tabs */}
            <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap max-w-4xl mx-auto">
              {goalTabs.map((tab) => {
                const isActive = selectedGoal === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedGoal(tab.id)}
                    className={`px-5 py-2.5 text-xs md:text-sm font-semibold tracking-wide transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-[#2B5266] text-white border-[#2B5266] shadow-sm'
                        : 'bg-transparent text-[#2B5266] border-[#2B5266]/40 hover:border-[#2B5266] hover:bg-[#2B5266]/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TREATMENTS CAROUSEL / CARDS ROW (from input_file_3.png) */}
      <section className="bg-[#FAF9F5] py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Horizontal Grid / Scroll Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {filteredTreatments.map((item) => (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={revealVariants}
                className="flex flex-col justify-between group bg-[#FAF9F5] border border-slate-200/80 p-3 rounded-none shadow-xs hover:shadow-md transition-all"
              >
                {/* Image Box */}
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Badge & Title */}
                  <div className="space-y-2 px-1">
                    <span className={`inline-block px-2.5 py-1 text-[10px] font-sans-clean font-extrabold uppercase tracking-wider ${item.tagBg}`}>
                      {item.tag}
                    </span>

                    <h3 className="text-xl font-serif-display font-normal text-slate-900 leading-snug min-h-[56px] flex items-center">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Button */}
                <div className="pt-6 px-1">
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-3 bg-[#B8D8E6] hover:bg-[#a2cbdc] text-slate-900 font-bold font-sans-clean text-xs tracking-wider uppercase transition-colors cursor-pointer text-center"
                  >
                    {item.actionText}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: HOLISTIC APPROACH SPLIT SECTION (from input_file_2.png) */}
      <section className="bg-[#F6F5F0] border-t border-b border-slate-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          
          {/* Left Column: Classical 2x2 Pillars Grid */}
          <div className="lg:col-span-7 p-8 md:p-14 lg:p-20 flex flex-col justify-center space-y-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif-display font-normal text-slate-900 tracking-tight leading-tight">
                A HOLISTIC approach to aging
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12">
              
              {/* Pillar 1 */}
              <div className="space-y-3">
                <div className="text-slate-900 mb-4">
                  <ClassicalUrnIcon className="w-12 h-12 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl font-serif-display font-normal text-slate-900">
                  Skin & Hair Health
                </h3>
                <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                  The most visible signs of aging appear here first.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('services')}
                    className="px-5 py-2.5 border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold font-sans-clean text-[11px] tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    LEARN MORE
                  </button>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="space-y-3">
                <div className="text-slate-900 mb-4">
                  <ClassicalColumnIcon className="w-12 h-12 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl font-serif-display font-normal text-slate-900">
                  Hormone Health
                </h3>
                <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                  Hormonal shifts affect mood, energy, sleep and more.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('services')}
                    className="px-5 py-2.5 border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold font-sans-clean text-[11px] tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    LEARN MORE
                  </button>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="space-y-3">
                <div className="text-slate-900 mb-4">
                  <ClassicalLyreIcon className="w-12 h-12 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl font-serif-display font-normal text-slate-900">
                  Bone & Joint Health
                </h3>
                <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                  Maintain posture, joint resilience, and physical mobility.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('services')}
                    className="px-5 py-2.5 border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold font-sans-clean text-[11px] tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    LEARN MORE
                  </button>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="space-y-3">
                <div className="text-slate-900 mb-4">
                  <ClassicalAmphoraIcon className="w-12 h-12 stroke-[1.5]" />
                </div>
                <h3 className="text-2xl font-serif-display font-normal text-slate-900">
                  Brain & Metabolic
                </h3>
                <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                  Sharpen focus, memory pathways, and cellular vitality.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('services')}
                    className="px-5 py-2.5 border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold font-sans-clean text-[11px] tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    LEARN MORE
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Full Height Visual Banner */}
          <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full overflow-hidden bg-stone-300">
            <img
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80"
              alt="Holistic Wellness & Botanical Health"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

        </div>
      </section>

      {/* SECTION 4: OUR CLINIC LOCATION HIGHLIGHT (from input_file_0.png) */}
      <section className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          
          {/* Left Column: Archway / Clinic Interior Image */}
          <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-full bg-slate-900">
            <img
              src={lobbyImage}
              alt="Our Advance Health Clinic Archway"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right Column: Warm Amber/Mustard Container */}
          <div className="lg:col-span-6 bg-[#E89A3C] p-10 md:p-16 lg:p-24 flex flex-col justify-center text-slate-950 space-y-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={revealVariants}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-6xl font-serif-display font-normal text-slate-950 tracking-tight leading-[1.1]">
                <EditableText
                  id="home.clinic.title"
                  defaultText="Our Durban Clinic"
                  label="Clinic Location Title"
                />
              </h2>

              <p className="text-sm md:text-base font-serif-display font-normal tracking-widest uppercase text-slate-950">
                <EditableText
                  id="home.clinic.address"
                  defaultText="1296 3RD AVENUE | HILLCREST KZN"
                  label="Clinic Address"
                />
              </p>

              <p className="text-sm md:text-base font-sans-clean font-normal text-slate-900/90">
                <EditableText
                  id="home.clinic.hours"
                  defaultText="Mon-Fri: 9am-6pm | Sat-Sun: Closed"
                  label="Clinic Hours"
                />
              </p>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-3.5 bg-slate-950 hover:bg-slate-800 text-white font-bold font-sans-clean text-xs tracking-widest uppercase transition-colors cursor-pointer shadow-md"
                >
                  SCHEDULE A VISIT
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* SECTION 5: REVIEWS SECTION (from input_file_1.png) */}
      <section className="bg-[#EAE9E5] py-20 md:py-28 px-6 md:px-12 border-t border-slate-300/80">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <h2 className="text-4xl md:text-6xl font-serif-display font-normal text-slate-900 tracking-tight">
            Reviews
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            
            {/* Review 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={revealVariants}
              className="border-t border-slate-400 pt-6 flex flex-col justify-between space-y-6 h-full"
            >
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-serif-display font-normal text-slate-900">
                  Mollie C.
                </h3>

                <div className="flex items-center gap-1 text-slate-900">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-slate-900 stroke-none" />
                  ))}
                </div>

                <p className="text-xs md:text-sm text-slate-800 font-sans-clean leading-relaxed">
                  Such a delightful experience. The space is absolutely gorgeous and serene. My specialist made me feel completely comfortable throughout my first treatment. I felt great when I walked out and am excited to come back for a hormone panel and future skin treatments.
                </p>
              </div>

              <div className="pt-4">
                <GoogleLogo />
              </div>
            </motion.div>

            {/* Review 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={revealVariants}
              className="border-t border-slate-400 pt-6 flex flex-col justify-between space-y-6 h-full"
            >
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-serif-display font-normal text-slate-900">
                  Stacey H.
                </h3>

                <div className="flex items-center gap-1 text-slate-900">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-slate-900 stroke-none" />
                  ))}
                </div>

                <p className="text-xs md:text-sm text-slate-800 font-sans-clean leading-relaxed">
                  5 stars for my first visit! Enjoyed the website design and the option to book an appointment online. The service was excellent from start to finish. Staff were very friendly and accommodating. The doctor was very thorough when explaining the process. I will definitely be back in 3-4 months!
                </p>
              </div>

              <div className="pt-4">
                <GoogleLogo />
              </div>
            </motion.div>

            {/* Review 3 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={revealVariants}
              className="border-t border-slate-400 pt-6 flex flex-col justify-between space-y-6 h-full"
            >
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-serif-display font-normal text-slate-900">
                  Christina K.
                </h3>

                <div className="flex items-center gap-1 text-slate-900">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-slate-900 stroke-none" />
                  ))}
                </div>

                <p className="text-xs md:text-sm text-slate-800 font-sans-clean leading-relaxed">
                  Advance Health's approach to integrative health is truly one-of-a-kind. Wellness trends emerge daily & decision fatigue is real. "What's the best path for me?" has become a confusing question to answer, but Advance Health offers personalized mapping that ensures you're headed down the right path.
                </p>
              </div>

              <div className="pt-4">
                <GoogleLogo />
              </div>
            </motion.div>

            {/* Review 4 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={revealVariants}
              className="border-t border-slate-400 pt-6 flex flex-col justify-between space-y-6 h-full"
            >
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-serif-display font-normal text-slate-900">
                  Tanya M.
                </h3>

                <div className="flex items-center gap-1 text-slate-900">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-slate-900 stroke-none" />
                  ))}
                </div>

                <p className="text-xs md:text-sm text-slate-800 font-sans-clean leading-relaxed">
                  I had a great experience here. I have tried places like this in the past that felt pushy but Advance Health was not. The clinical staff here were extremely knowledgeable and kind. The space itself was beautiful and relaxing. Highly recommend!
                </p>
              </div>

              <div className="pt-4">
                <GoogleLogo />
              </div>
            </motion.div>

          </div>

        </div>
      </section>

    </div>
  );
}
