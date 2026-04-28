import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  TreePine, 
  Droplets, 
  Wind, 
  Trash2, 
  Flame, 
  ChevronDown, 
  Leaf, 
  Smartphone,
  Globe,
  ArrowRight,
  Menu,
  X,
  Zap,
  Bus,
  ShoppingBag,
  Instagram,
  Twitter,
  Users
} from 'lucide-react';

// --- Types ---
interface Habit {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  impact: string;
}

// --- Data ---
const HABITS: Habit[] = [
  { id: 'trees', title: 'Plant a tree', description: 'Restore forests and capture carbon.', icon: <TreePine />, impact: '22kg CO₂/yr' },
  { id: 'plastic', title: 'Zero Waste', description: 'Eliminate single-use plastics from your life.', icon: <Trash2 />, impact: '5kg CO₂/yr' },
  { id: 'water', title: 'Water Wisdom', description: 'Short showers and leak fixes save thousands of gallons.', icon: <Droplets />, impact: '3kg CO₂/yr' },
  { id: 'transport', title: 'Active Transit', description: 'Burn calories, not carbon. Walk, bike, or use transit.', icon: <Bus />, impact: '1.5t CO₂/yr' },
  { id: 'energy', title: 'Vampire Power', description: 'Unplug idle electronics to stop energy drain.', icon: <Zap />, impact: '50kg CO₂/yr' },
  { id: 'diet', title: 'Plate for Planet', description: 'Choose plant-based meals twice a week.', icon: <ShoppingBag />, impact: '400kg CO₂/yr' },
];

const CHALLENGE_STEPS = [
  { 
    title: 'Capture the Green', 
    desc: 'Take a photo of yourself taking a sustainable action—planting, cleaning, or recycling.', 
    icon: <Smartphone className="w-6 h-6" /> 
  },
  { 
    title: 'Post with Purpose', 
    desc: 'Share it with #ReconnectEarth. Tag 3 friends to challenge them to do the same.', 
    icon: <Users className="w-6 h-6" /> 
  },
  { 
    title: 'Watch the Ripple', 
    desc: 'Your action inspires others. Every post turns the digital world a little greener.', 
    icon: <Globe className="w-6 h-6" /> 
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-zinc-950/90 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center rotate-6 group-hover:rotate-0 transition-transform duration-500">
              <Leaf className="text-zinc-950 w-6 h-6" />
            </div>
            <div className="absolute -inset-1 border border-emerald-500/30 rounded-2xl animate-pulse" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-display font-black text-white tracking-widest uppercase">Reconnect</span>
            <span className="text-[10px] font-bold text-emerald-500 tracking-[0.3em] uppercase">Earth</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Problem', 'Impact', 'Solutions', 'Challenge'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              {item}
            </a>
          ))}
          <button 
            onClick={() => document.getElementById('challenge')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2 bg-white text-zinc-950 text-xs font-black uppercase tracking-widest rounded-full hover:bg-emerald-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Take Action
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-zinc-950 p-12 flex flex-col justify-center items-center gap-8 md:hidden"
          >
            {['Problem', 'Impact', 'Solutions', 'Challenge'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-display font-black text-white uppercase"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeader = ({ title, subtitle, light = false, align = 'left' }: { title: string; subtitle?: string; light?: boolean; align?: 'left' | 'center' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center mx-auto' : ''}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-4xl md:text-6xl font-display font-black leading-[0.9] tracking-tighter mb-6 uppercase ${light ? 'text-white' : 'text-zinc-900'}`}
    >
      <span dangerouslySetInnerHTML={{ __html: title }} />
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-lg md:text-xl max-w-2xl leading-relaxed ${light ? 'text-zinc-400' : 'text-zinc-600'} ${align === 'center' ? 'mx-auto' : ''}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="bg-white font-sans text-zinc-900 overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-emerald-500 z-[100] origin-left shadow-[0_0_15px_rgba(16,185,129,0.5)]"
        style={{ scaleX: scrollYProgress }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2560&auto=format&fit=crop" 
            alt="Vast green hillside"
            className="w-full h-full object-cover grayscale-[0.2]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto pt-48 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[clamp(2.5rem,10vw,8rem)] font-display font-black text-white leading-[1.05] tracking-tighter uppercase mb-12">
              We Borrow <br />
              <span className="text-emerald-400">The Earth.</span>
            </h1>
            <p className="text-lg md:text-2xl text-zinc-300 mb-16 max-w-3xl mx-auto font-light leading-relaxed px-4">
              Humanity has outpaced nature. It is time to slow down, listen, and reconnect before the silence becomes permanent.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-full font-black text-lg transition-all flex items-center gap-2"
              >
                Enter the Forest
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="mt-20 flex justify-center gap-8 md:gap-20">
               {[
                 { label: 'Pledges made', val: '4.2M' },
                 { label: 'CO2 Captured', val: '12K Tons' },
                 { label: 'Trees Planted', val: '580K' }
               ].map(stat => (
                 <div key={stat.label} className="text-left">
                   <div className="text-2xl md:text-4xl font-display font-black text-white">{stat.val}</div>
                   <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{stat.label}</div>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
           <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold">Scroll to discover</span>
           <div className="w-px h-12 bg-gradient-to-b from-emerald-500 to-transparent" />
        </div>
      </section>

      {/* The Problem */}
      <section id="problem" className="py-32 px-6 max-w-7xl mx-auto">
        <SectionHeader 
          title="The Breaking Point" 
          subtitle="Earth is reacting. Extreme heat, rising tides, and dying forests are not distant threats—they are current realities."
        />

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="grid gap-12">
            {[
              { color: 'bg-red-500', title: 'Heat Stress', desc: 'Fossil fuel combustion has trapped enough heat to destabilize every ecosystem.', icon: <Flame className="w-8 h-8 text-white" /> },
              { color: 'bg-blue-500', title: 'Ocean Acidification', desc: 'Absorbing CO2 makes oceans toxic, bleaching corals and killing marine life.', icon: <Droplets className="w-8 h-8 text-white" /> },
              { color: 'bg-purple-500', title: 'Atmospheric Poison', desc: 'Air pollution is now responsible for 1 in 9 deaths globally.', icon: <Wind className="w-8 h-8 text-white" /> }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex gap-8 p-10 bg-zinc-50 rounded-[3rem] hover:bg-zinc-100 transition-colors"
              >
                <div className={`w-20 h-20 shrink-0 ${item.color} rounded-3xl flex items-center justify-center rotate-6 group-hover:rotate-0 transition-transform`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-display font-black mb-4 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-zinc-500 leading-relaxed text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative aspect-square">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute inset-0 rounded-[4rem] overflow-hidden shadow-2xl bg-zinc-900"
            >
              <img 
                src="https://images.unsplash.com/photo-1473081556163-2a17de81fc97?q=80&w=1280&auto=format&fit=crop" 
                alt="Environmental crisis"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay" />
            </motion.div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-emerald-500 rounded-[2rem] p-8 flex flex-col justify-center text-white shadow-xl rotate-12">
               <span className="text-5xl font-black mb-1">1.5°</span>
               <p className="text-xs font-bold uppercase tracking-widest leading-tight">Critical Limit Approaching</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Context Section */}
      <section id="problem" className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <SectionHeader 
              title="The Science <br />of Warming" 
              subtitle="Behind the headlines is a complex physical reality. Understanding the mechanism of change is the first step toward reversing it."
            />
            <div className="space-y-6">
              {[
                { label: 'The Greenhouse Trap', value: '420ppm', desc: 'Current CO₂ concentration—the highest in over 3 million years, trapping solar radiation like a blanket.' },
                { label: 'Energy Imbalance', value: '0.8W/m²', desc: 'The Earth is currently taking in more energy than it radiates back to space, causing constant warming.' },
                { label: 'Thermal Inertia', value: '90%', desc: 'The amount of excess heat absorbed by our oceans, masking the full extent of surface warming.' }
              ].map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100"
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-display font-black uppercase text-xs tracking-widest text-zinc-400">{stat.label}</h4>
                    <span className="text-2xl font-black text-emerald-600 font-display">{stat.value}</span>
                  </div>
                  <p className="text-zinc-600 text-sm leading-relaxed">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="aspect-square bg-zinc-950 rounded-[4rem] p-12 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full" />
                <h3 className="text-3xl font-display font-black uppercase mb-8 relative z-10">The Feedback Loops</h3>
                <div className="space-y-8 relative z-10">
                   <div className="flex gap-6">
                      <div className="w-1 bg-emerald-500 rounded-full" />
                      <div>
                         <p className="font-bold text-lg mb-1">Albedo Effect</p>
                         <p className="text-zinc-400 text-sm">Ice melts → dark ocean absorbs more heat → more ice melts. A self-reinforcing cycle.</p>
                      </div>
                   </div>
                   <div className="flex gap-6">
                      <div className="w-1 bg-red-500 rounded-full" />
                      <div>
                         <p className="font-bold text-lg mb-1">Permafrost Thaw</p>
                         <p className="text-zinc-400 text-sm">Warming soil releases methane—a gas 80x more potent than CO₂, accelerating the trap.</p>
                      </div>
                   </div>
                </div>
                <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
                   <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Current Criticality</p>
                   <p className="text-sm font-medium text-emerald-400">System stability is currently declining by 1.2% annually.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Biome Bento Grid */}
      <section id="impact" className="py-32 bg-zinc-50 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader align="center" title="Ecosystems <br />Under Siege" subtitle="These aren't just landscapes—they are the vital organs of our planet. When one fails, the whole system weakens." />
          
          <div className="grid md:grid-cols-12 gap-6 auto-rows-[250px]">
            <motion.div 
               whileHover={{ scale: 0.98 }}
               className="md:col-span-8 bg-zinc-900 rounded-[3rem] overflow-hidden relative group"
            >
              <img src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=1280&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Coral Reef" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Oceanic Lungs</span>
                <h4 className="text-4xl font-display font-black text-white uppercase leading-none">The Great Barrier</h4>
                <p className="text-white/60 text-sm mt-4 max-w-sm">91% of the reef has experienced some level of bleaching. Our oceans are becoming a graveyard for biodiversity.</p>
              </div>
            </motion.div>

            <motion.div 
               whileHover={{ scale: 0.98 }}
               className="md:col-span-4 bg-emerald-600 rounded-[3rem] overflow-hidden relative p-12 flex flex-col justify-between"
            >
              <TreePine className="w-16 h-16 text-white/20" />
              <div>
                <h4 className="text-3xl font-display font-black text-white uppercase leading-tight">The Amazon Basin</h4>
                <p className="text-white/80 text-sm mt-4">Nearing a tipping point where it transforms from rainforest to dry savannah.</p>
              </div>
            </motion.div>

            <motion.div 
               whileHover={{ scale: 0.98 }}
               className="md:col-span-4 bg-zinc-300 rounded-[3rem] overflow-hidden relative group"
            >
              <img src="https://images.unsplash.com/photo-1414490929659-9a12b7e31907?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Arctic Landscapes" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 p-8 flex flex-col justify-end">
                <h4 className="text-2xl font-display font-black text-white uppercase">Arctic Summits</h4>
                <p className="text-white/80 text-xs mt-2">Warming 4x faster than the rest of the planet.</p>
              </div>
            </motion.div>

            <motion.div 
               whileHover={{ scale: 0.98 }}
               className="md:col-span-8 bg-zinc-950 rounded-[3rem] overflow-hidden relative p-12 flex items-center gap-12 border border-white/5 group"
            >
              <img src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1280&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity" alt="Earth from Space" referrerPolicy="no-referrer" />
              <div className="hidden lg:block w-40 h-40 shrink-0 bg-emerald-500 rounded-full blur-[80px] opacity-20 relative z-10" />
              <div className="relative z-10">
                <h4 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-4">Interconnected Survival</h4>
                <p className="text-zinc-500 leading-relaxed text-sm">Every breath you take is filtered by these biomes. Their survival isn't a charity—it's our primary health insurance policy.</p>
                <div className="mt-6 flex items-center gap-4">
                   <div className="w-12 h-1 bg-emerald-500 rounded-full" />
                   <span className="text-[10px] font-black uppercase text-white tracking-widest">System Integrated</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Habits Expanded */}
      <section id="solutions" className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-emerald-600 mb-4 block">The Practical Path</span>
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-zinc-950 leading-none">
                Small Acts. <br />Collective Power.
              </h2>
            </div>
            <p className="text-zinc-500 max-w-sm text-sm leading-relaxed pb-2">
              Systemic change starts at home. These are the highest-leverage actions you can take today to reduce your environmental footprint.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {HABITS.map((habit, idx) => (
              <motion.div 
                key={habit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100 hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm mb-8 group-hover:scale-110 transition-transform">
                  {habit.icon}
                </div>
                <h3 className="text-2xl font-display font-black text-zinc-950 uppercase mb-4">{habit.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed mb-8">{habit.description}</p>
                <div className="pt-6 border-t border-zinc-200 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Est. Impact</span>
                  <span className="text-xs font-black text-emerald-600">{habit.impact}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices of Resilience */}
      <section className="py-32 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.05)_20px,rgba(255,255,255,0.05)_40px)]" />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
           <span className="text-emerald-500 text-6xl font-serif">"</span>
           <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-3xl md:text-5xl font-display font-black uppercase leading-tight italic mb-12"
           >
             The Earth is what we all have in common. It is not a inheritance from our ancestors, but a loan from our children.
           </motion.p>
           <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" alt="Wendell Berry" className="w-full h-full object-cover" />
              </div>
              <div>
                 <p className="font-display font-black uppercase text-sm tracking-widest">Wendell Berry</p>
                 <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.2em]">Poet & Activist</p>
              </div>
           </div>
        </div>
      </section>

      {/* CHALLENGE SECTION */}
      <section id="challenge" className="py-32 bg-emerald-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <span className="inline-block px-4 py-2 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-10">
              Viral Challenge
            </span>
            <h2 className="text-6xl md:text-8xl font-display font-black text-zinc-950 leading-[0.9] tracking-tighter uppercase mb-8">
              The #Reconnect <br />Earth Challenge
            </h2>
            <p className="text-xl text-emerald-950 font-medium mb-12 leading-relaxed opacity-80">
              One post alone is a pixel. Millions are a global movement. Share your green journey and let’s turn the digital landscape into a thriving forest.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => alert('Redirecting to Instagram to share with #ReconnectEarth...')}
                className="flex items-center gap-3 px-8 py-4 bg-zinc-950 text-white rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition"
              >
                <Instagram className="w-5 h-5" /> Share on Instagram
              </button>
              <button 
                onClick={() => alert('Redirecting to X to post with #ReconnectEarth...')}
                className="flex items-center gap-3 px-8 py-4 bg-white text-zinc-950 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition"
              >
                <Twitter className="w-5 h-5" /> Post on X
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-8">
            {CHALLENGE_STEPS.map((step, idx) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex items-center gap-8 bg-zinc-950 p-8 rounded-full text-white"
              >
                <div className="w-16 h-16 shrink-0 bg-emerald-500 rounded-full flex items-center justify-center text-zinc-950">
                  {step.icon}
                </div>
                <div>
                  <h4 className="text-xl font-display font-black uppercase mb-1">{step.title}</h4>
                  <p className="text-emerald-400 text-sm font-medium">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* World Progress - Green Impact */}
      <section className="py-32 px-6 text-center bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHeader align="center" light title="Turning the World Green" subtitle="Our target: 1 Billion Pledges for the Earth. Each social share brings us closer to a collective global impact score." />
          
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-8">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '42%' }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute h-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
            />
          </div>
          <div className="flex justify-between text-xs font-black uppercase tracking-widest text-zinc-500">
            <span>423M IMPACT SCORE</span>
            <span>1B TARGET</span>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-40 px-6 text-center bg-white">
        <div className="max-w-5xl mx-auto">
          <Globe className="w-20 h-20 text-emerald-500 mx-auto mb-12 animate-pulse" />
          <h2 className="text-5xl md:text-8xl font-display font-black text-zinc-950 leading-[0.85] tracking-tighter uppercase mb-12">
            Love <br /> Nature <br /> 
            <span className="text-zinc-200">Before It's</span> <br /> 
            Too Late.
          </h2>
          <button 
            onClick={() => document.getElementById('challenge')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-16 py-8 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-full font-black text-2xl uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(16,185,129,0.3)]"
          >
            Join the Resistance
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-md">
             <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <Leaf className="text-zinc-950 w-6 h-6" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-display font-black text-white uppercase tracking-tight">Reconnect</span>
                  <span className="text-[8px] font-bold text-emerald-500 tracking-[0.3em] uppercase">Earth</span>
                </div>
             </div>
             <p className="text-zinc-500 leading-relaxed font-light">
               We believe that storytelling combined with action is the only cure for climate apathy. Reconnect Earth is a global platform for preservation.
             </p>
          </div>
          
          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-6">
               <Instagram className="text-emerald-500 cursor-pointer hover:scale-110 transition" />
               <Twitter className="text-emerald-500 cursor-pointer hover:scale-110 transition" />
            </div>
            <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.4em]">© 2026 RECONNECT EARTH • PRX GLOBAL</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
