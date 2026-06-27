import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, useMotionValue, useMotionTemplate } from 'motion/react';
import {
  Zap,
  ArrowRight,
  Play,
  Check,
  CheckCircle2,
  Globe,
  Users,
  Menu as MenuIcon,
  X as XIcon,
  Sparkles,
  Dumbbell,
  Leaf,
  Brain,
  RefreshCw,
  ChevronDown,
  Instagram,
  Youtube,
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, HERO_SLIDES, COHORT_LEARNINGS, FEATURES, RESULTS, PRICING, FAQ, STATS } from '../constants';
import ContactModal from '../components/ContactModal';
import AnimatedBeamsBackground from '../components/AnimatedBeamsBackground';
import PreRegisterModal from '../components/PreRegisterModal';
import CursorSparkTrail from '../components/CursorSparkTrail';
import HeadlineReveal from '../components/HeadlineReveal';
import WhatsAppButton from '../components/WhatsAppButton';
import WallOfFameCard from '../components/WallOfFameCard';
import { useAuth } from '../context/AuthContext';
import MagneticButton from '../components/MagneticButton';
import AtmosphericFog from '../components/AtmosphericFog';
import ScrambleText from '../components/ScrambleText';
import { publicUrl } from '../utils/publicUrl';
import {
  VIEWPORT,
  VIEWPORT_TIGHT,
  TRANSITION_IN,
  TRANSITION_SPRING_UI,
  TRANSITION_SPRING_CTA,
  TRANSITION_TWEEN_SNAPPY,
  staggerContainer,
  staggerItem,
  staggerItemScale,
} from '../motionPresets';

/** User-provided fitness backgrounds (see `public/images/hero-bg/`). */
const USER_HERO_BACKGROUNDS = [1, 2, 4, 3].map((n) => publicUrl(`/images/hero-bg/${n}.png`)) as readonly string[];

/** All transformation images for Wall of Fame */
const ALL_TRANSFORMATIONS = [
  { id: 1, image: publicUrl('/images/1.png'), cutoutImage: publicUrl('/images/cutout_1.png'), label: 'Client Transformation' },
  { id: 2, image: publicUrl('/images/2.png'), cutoutImage: publicUrl('/images/cutout_2.png'), label: 'Client Transformation' },
  { id: 3, image: publicUrl('/images/9.png'), cutoutImage: publicUrl('/images/cutout_9.png'), label: 'Elite Transformation' },
  { id: 4, image: publicUrl('/images/4.png'), cutoutImage: publicUrl('/images/cutout_4.png'), label: 'Client Transformation' },
  { id: 5, image: publicUrl('/images/5.PNG'), cutoutImage: publicUrl('/images/cutout_5.png'), label: 'Elite Transformation' },
  { id: 6, image: publicUrl('/images/6.JPEG'), cutoutImage: publicUrl('/images/cutout_6.png'), label: 'Client Transformation' },
  { id: 7, image: publicUrl('/images/7.PNG'), cutoutImage: publicUrl('/images/cutout_7.png'), label: 'Elite Transformation' },
  { id: 8, image: publicUrl('/images/8.png'), cutoutImage: publicUrl('/images/cutout_8.png'), label: 'Client Transformation' },
  { id: 9, image: publicUrl('/images/9.png'), cutoutImage: publicUrl('/images/cutout_9.png'), label: 'Elite Transformation' }
] as const;

/** Opacity of the full hero photo strip (0–1). Tuned so background faces and physiques are crisp and clearly visible. */
const USER_HERO_BG_OPACITY = 0.75;

const SmartImage = ({ src, alt, className, ...props }: any) => {
  const isLocalBase = src.startsWith('/') && !src.includes('.');
  const extensions = ['.png', '.jpg', '.jpeg', '.webp'];
  const [extIdx, setExtIdx] = useState(0);

  const currentSrc = isLocalBase ? `${src}${extensions[extIdx]}` : src;

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (isLocalBase && extIdx < extensions.length - 1) {
          setExtIdx(extIdx + 1);
        }
      }}
      {...props}
    />
  );
};

const LearningCard = ({ learning, isFullWidth, openPreRegister }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8 }}
      transition={TRANSITION_IN}
      className={`${isFullWidth ? 'md:col-span-3 flex-col md:flex-row' : 'flex-col'} card-depth card-hover-lift contain-[paint] bg-surface-container border border-white/10 rounded-[2.5rem] p-5 sm:p-8 md:p-12 flex gap-8 md:gap-12 relative overflow-hidden group duration-700 hover:border-yellow-400/40`}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,215,0,0.08), transparent 80%)`
        }}
      />
      
      <div className="flex-1 relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 font-bold group-hover:bg-yellow-400 group-hover:text-black transition-colors">{learning.id}</div>
          {learning.badge && (
            <div className="bg-yellow-400/10 text-yellow-400 text-[10px] font-black px-3 py-1 rounded-full border border-yellow-400/20 uppercase tracking-widest flex items-center gap-1">
              <Sparkles size={10} /> {learning.badge}
            </div>
          )}
        </div>
        <h3 className={`${isFullWidth ? 'text-2xl sm:text-3xl md:text-6xl' : 'text-xl sm:text-2xl'} font-headline font-black mb-4 md:mb-6 leading-tight group-hover:text-yellow-400 transition-colors`}>
          {learning.title}
        </h3>
        {learning.description && <p className="text-gray-400 text-base sm:text-lg max-w-md mb-10 leading-relaxed">{learning.description}</p>}
        {learning.id === 1 && (
          <button
            onClick={() => scrollToSection('pricing')}
            className="bg-white text-black px-8 py-3 rounded-full font-headline font-bold uppercase text-sm tracking-widest hover:bg-yellow-400 transition-colors"
          >
            Join now
          </button>
        )}
      </div>

      <div className={`${isFullWidth ? 'flex-1' : 'mt-auto'} bg-surface-container-lowest/40 rounded-3xl p-5 md:p-8 border border-white/5 relative z-10 backdrop-blur-sm`}>
        {learning.icons && (
           <div className="flex gap-4 mb-8">
             {learning.icons.map((icon: string, i: number) => (
               <div key={i} className="w-14 h-14 bg-surface-container-high rounded-2xl flex items-center justify-center text-yellow-400 font-black text-sm border border-white/5 shadow-xl group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 0.1}s` }}>{icon}</div>
             ))}
           </div>
        )}
        <ul className={`${learning.id === 5 ? 'grid grid-cols-1 sm:grid-cols-2 gap-6' : 'space-y-4'} ${learning.id === 4 ? 'mb-8' : ''}`}>
          {learning.topics?.map((topic: string, i: number) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_TIGHT}
              transition={{ ...TRANSITION_IN, delay: 0.12 + i * 0.04 }}
              className="flex items-start gap-3 text-gray-400"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 shrink-0"></div>
              <span className="text-sm md:text-base font-medium">{topic}</span>
            </motion.li>
          ))}
        </ul>
        

      </div>
    </motion.div>
  );
};

const PricingCard = ({ plan, openPreRegister }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      whileHover={{ y: -8, scale: plan.recommended ? 1.05 : 1.025 }}
      transition={TRANSITION_IN}
      className={`glass-monolith card-hover-lift contain-[paint] p-6 md:p-10 rounded-xl flex flex-col border-white/5 relative overflow-hidden group ${
        plan.recommended
          ? 'border-yellow-500/50 shadow-[0_0_50px_rgba(255,215,0,0.15)] md:scale-105 z-10'
          : ''
      }`}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,215,0,0.07), transparent 70%)`
        }}
      />
      <motion.div
        className="absolute inset-x-0 -top-px h-px"
        style={{
          background: useMotionTemplate`linear-gradient(90deg, transparent, rgba(255,215,0,0.5) ${mouseX}px, transparent)`
        }}
      />

      {plan.recommended && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-black px-6 py-1 text-[10px] font-black uppercase tracking-tighter border border-yellow-200/80 border-glow-animate shadow-[0_0_18px_rgba(255,215,0,0.35)]">
          Recommended
        </div>
      )}

      <h3 className={`font-headline font-bold text-xl mb-2 relative z-10 ${plan.recommended ? 'text-yellow-400' : 'text-white'}`}>
        {plan.title}
      </h3>
      <p className="text-gray-500 text-xs mb-8 uppercase tracking-widest relative z-10">{plan.subtitle}</p>

      <div className="mb-10 flex items-center justify-center gap-3 relative z-10">
        <motion.span
          className={`text-4xl font-headline font-black ${plan.recommended ? 'text-yellow-400' : 'text-white'}`}
          animate={plan.recommended ? {
            textShadow: ['0 0 8px rgba(255,215,0,0.2)', '0 0 25px rgba(255,215,0,0.7)', '0 0 8px rgba(255,215,0,0.2)']
          } : {}}
          transition={{ duration: 2.85, repeat: Infinity, ease: 'easeInOut' }}
        >
          {plan.price}
        </motion.span>
        <span className="text-gray-500 text-sm">{plan.period}</span>
      </div>

      <ul className="text-left space-y-4 mb-12 flex-grow relative z-10">
        {plan.features.map((feature: string) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
            {plan.recommended ? <CheckCircle2 className="text-yellow-400 w-4 h-4 shrink-0" /> : <Check className="text-yellow-400 w-4 h-4 shrink-0" />}
            {feature}
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-auto">
        <MagneticButton
          strength={0.3}
          onClick={() => openPreRegister(plan)}
          className="relative group/btn w-full"
        >
          <div className={`absolute -inset-1 rounded-xl blur opacity-0 group-hover/btn:opacity-70 transition-all duration-500 ${plan.recommended ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
          <motion.button
            onClick={() => openPreRegister(plan)}
            whileHover={{ scale: 1.02, boxShadow: plan.recommended ? '0 0 50px rgba(255,215,0,0.6)' : '0 10px 30px rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.98 }}
            transition={plan.recommended ? TRANSITION_SPRING_CTA : TRANSITION_TWEEN_SNAPPY}
            className={`relative w-full px-8 py-4 rounded-md font-headline font-bold uppercase text-xs tracking-widest transition-all text-center block duration-300 ${
              plan.recommended
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-on-primary-fixed shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)]'
                : 'bg-black/40 border border-white/20 hover:bg-white/8 hover:border-yellow-400/40'
            }`}
          >
            {plan.cta}
          </motion.button>
        </MagneticButton>
      </div>
    </motion.div>
  );
};

export default function Home() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const { isAuthenticated, signOut } = useAuth();
  const handleLogout = () => signOut();

  const [isPreRegisterOpen, setIsPreRegisterOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<typeof PRICING[0] | null>(null);

  const openPreRegister = (plan: typeof PRICING[0]) => {
    setSelectedPlanForModal(plan);
    setIsPreRegisterOpen(true);
  };

  useEffect(() => {
    const onScroll = () => {
      document.documentElement.toggleAttribute('data-nav-elevated', window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.documentElement.removeAttribute('data-nav-elevated');
    };
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroMouseX = useMotionValue(0);
  const heroMouseY = useMotionValue(0);
  const heroRotateX = useTransform(heroMouseY, [-300, 300], [4, -4]);
  const heroRotateY = useTransform(heroMouseX, [-300, 300], [-4, 4]);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    heroMouseX.set(e.clientX - rect.left - rect.width / 2);
    heroMouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleHeroMouseLeave = () => {
    heroMouseX.set(0);
    heroMouseY.set(0);
  };

  const { scrollYProgress } = useScroll();
  const scrollMaskOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [0, 0.5, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Counter = ({ value, label }: { value: string, label: string; key?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);
    const target = parseInt(value.replace(/\D/g, ''));
    const suffix = value.replace(/\d/g, '');

    useEffect(() => {
      if (isInView) {
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, [isInView, target]);

    return (
      <div ref={ref} className="text-center">
        <div className="text-3xl sm:text-4xl md:text-6xl font-headline font-black text-yellow-400 mb-2">
          {count}{suffix}
        </div>
        <div className="text-xs md:text-sm font-headline font-bold uppercase tracking-widest text-gray-400">
          {label}
        </div>
      </div>
    );
  };

  const GlowCounter = ({ value, label }: { value: string, label: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);
    const target = parseInt(value.replace(/\D/g, ''));
    const suffix = value.replace(/\d/g, '');

    useEffect(() => {
      if (isInView) {
        let start = 0;
        const duration = 2200;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, [isInView, target]);

    return (
      <motion.div
        ref={ref}
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={TRANSITION_IN}
      >
        <motion.div
          className="text-3xl sm:text-4xl md:text-6xl font-headline font-black text-yellow-400 mb-2"
          animate={isInView ? {
            textShadow: [
              '0 0 10px rgba(255,215,0,0.3)',
              '0 0 30px rgba(255,215,0,0.8)',
              '0 0 10px rgba(255,215,0,0.3)',
            ]
          } : {}}
          transition={{ duration: 2.85, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          {count}{suffix}
        </motion.div>
        <div className="text-xs md:text-sm font-headline font-bold uppercase tracking-widest text-gray-400">
          {label}
        </div>
      </motion.div>
    );
  };

  const { scrollYProgress: pageProgress } = useScroll();
  const scaleX = useSpring(pageProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div id="home" className="min-h-screen bg-surface-container-lowest text-white font-body selection:bg-primary-container selection:text-on-primary-fixed overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 z-[60] origin-left progress-glow"
        style={{ scaleX }}
      />
      <nav className="site-nav fixed top-0 w-full z-50 bg-transparent transition-[box-shadow,backdrop-filter,background-color,border-color] duration-500">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center px-4 md:px-8 py-4">
          <div
            onClick={() => scrollToSection('home')}
            className="text-xl md:text-2xl font-black italic text-yellow-400 font-headline cursor-pointer"
          >
            FlexWithDhruvil
          </div>

          <div className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    scrollToSection(link.href.substring(1));
                  }
                }}
                className={`font-headline uppercase tracking-wider text-sm font-bold transition-colors text-gray-300 hover:text-white`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {!isAuthenticated ? (
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-yellow-400 rounded-full blur opacity-0 group-hover:opacity-50 group-active:opacity-100 transition-all duration-300"></div>
                <motion.button
                  onClick={() => scrollToSection('pricing')}
                  whileHover={{ boxShadow: '0 0 30px rgba(255,215,0,0.4)' }}
                  transition={TRANSITION_SPRING_UI}
                  className="relative bg-primary-container text-on-primary-fixed px-5 py-2.5 md:px-6 md:py-2 rounded-full font-headline font-extrabold uppercase text-[10px] md:text-xs tracking-widest block transition-all duration-300 min-h-[40px] md:min-h-0 flex items-center"
                >
                  Join Now
                </motion.button>
              </motion.div>
            ) : (
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            )}
            <button
              className="md:hidden text-white w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={TRANSITION_IN}
              className="md:hidden mobile-menu-panel bg-surface-container-lowest/98 border-b border-yellow-900/20 px-5 sm:px-8 py-4"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="mobile-menu-link font-headline uppercase tracking-wider text-base font-bold text-gray-200 hover:text-yellow-400 active:text-yellow-400 transition-colors px-2 border-b border-white/5 last:border-0"
                    style={{ animationDelay: `${100 + i * 70}ms` }}
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        scrollToSection(link.href.substring(1));
                      }
                    }}
                  >
                    {link.label}
                  </a>
                ))}
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="mobile-menu-link font-headline uppercase tracking-wider text-base font-bold text-gray-300 hover:text-yellow-400 text-left flex items-center gap-2 px-2"
                    style={{ animationDelay: `${100 + NAV_LINKS.length * 70}ms` }}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                )}
                <div className="pt-3 pb-1 mobile-menu-link" style={{ animationDelay: `${100 + (NAV_LINKS.length + (isAuthenticated ? 1 : 0)) * 70}ms` }}>
                  {!isAuthenticated ? (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group"
                    >
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          scrollToSection('pricing');
                        }}
                        className="relative bg-yellow-400 text-black rounded-2xl font-headline font-black uppercase text-sm tracking-widest block text-center w-full min-h-[52px] flex items-center justify-center shadow-[0_0_24px_rgba(255,215,0,0.3)]"
                      >
                        Join now — Get Started
                      </button>
                    </motion.div>
                  ) : (
                    <div className="text-center text-yellow-400 font-headline font-black uppercase text-sm tracking-widest py-3">
                      Welcome Back! 💪
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative">
        <AtmosphericFog />
        <div className="fixed top-[60px] md:top-[64px] inset-x-0 bottom-0 pointer-events-none z-[-1] overflow-hidden">
          <AnimatedBeamsBackground />

          <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]"></div>

          <div
            className="absolute inset-0 pointer-events-none hero-bg-scroll-parallax"
            style={{ opacity: USER_HERO_BG_OPACITY }}
          >
            <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 h-full w-full">
              {USER_HERO_BACKGROUNDS.map((src, i) => (
                <div key={i} className="relative min-h-0 min-w-0 overflow-hidden">
                  <img
                    src={src}
                    alt=""
                    className="absolute inset-0 size-full object-cover object-[center_15%] scale-[1.02] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
            <div className="hero-readability-vignette" aria-hidden />
          </div>
        </div>

        <section
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 sm:pt-32 pb-12 sm:pb-20 relative text-center"
          style={{ perspective: '1000px' }}
        >
          <CursorSparkTrail />
          <motion.div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: useMotionTemplate`radial-gradient(ellipse 60% 40% at 50% 60%, rgba(255,215,0,${scrollMaskOpacity}), transparent 70%)`
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 sm:mb-8 relative z-10"
          >
            <ScrambleText text="FLEXWITHDHRUVIL PRESENTS" className="text-[8px] md:text-[10px] font-headline font-bold tracking-widest text-gray-300" delay={0.5} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mb-8 sm:mb-12 relative z-10"
            style={{ rotateX: heroRotateX, rotateY: heroRotateY, transformStyle: 'preserve-3d' }}
          >
            <HeadlineReveal />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="text-sm sm:text-sm md:text-base font-headline font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 leading-relaxed"
            >
              The Only Fitness Cohort That Actually{' '}
              <span className="subhead-gold-underline">Forces You to Grow.</span>
            </motion.p>
          </motion.div>

          <div className="w-full mb-10 sm:mb-16 relative overflow-hidden group/slider h-[280px] sm:h-[380px] md:h-[480px]">
            <div
              className="flex gap-3 sm:gap-4 px-4 py-4 sm:py-8 h-full animate-marquee marquee-track"
              style={{ width: "max-content" }}
            >
              {[...HERO_SLIDES, ...HERO_SLIDES].map((slide, idx) => (
                <div
                  key={`${slide.id}-${idx}`}
                  className="flex-shrink-0 w-[180px] sm:w-[280px] md:w-[400px] h-full rounded-2xl overflow-hidden relative group cursor-pointer border border-white/5 transition-all duration-500 hover:border-yellow-400/50 hover:shadow-[0_0_40px_rgba(255,215,0,0.2)] hover:z-10 bg-black/40"
                  style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <SmartImage
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-top scale-[1.02] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="text-yellow-400 text-[10px] md:text-xs font-headline font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                      <Sparkles size={12} />
                      Verified Transformation
                    </div>
                    <h3 className="text-white font-headline font-black text-lg md:text-xl">{slide.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
            <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto mb-8 sm:mb-12 px-2"
          >
            <p className="text-gray-400 text-base font-body leading-relaxed sm:leading-loose">
              The ultimate beginner-friendly transformation cohort,{' '}
              now powered with the most insane performance tools ever.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10"
          >
            {!isAuthenticated ? (
              <MagneticButton
                strength={0.5}
                onClick={() => openPreRegister(PRICING[1])}
                className="relative group"
              >
                <div className="absolute -inset-2 bg-yellow-400 rounded-full blur-lg opacity-40 group-hover:opacity-80 transition duration-700"></div>
                <motion.div
                  className="absolute -inset-6 bg-yellow-400/30 rounded-full blur-2xl opacity-0 group-active:opacity-100 transition-opacity duration-200"
                  initial={false}
                />
                <motion.button
                  onClick={() => scrollToSection('pricing')}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(255,215,0,0.7)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={TRANSITION_SPRING_CTA}
                  className="relative bg-yellow-400 text-black px-10 py-[14px] sm:px-14 sm:py-5 rounded-full font-headline font-black uppercase text-base sm:text-lg tracking-widest shadow-[0_0_40px_rgba(255,215,0,0.4)] transition-all duration-300 min-h-[52px] flex items-center justify-center"
                >
                  Join now
                </motion.button>
              </MagneticButton>
            ) : (
              <MagneticButton
                strength={0.5}
                onClick={() => scrollToSection('pricing')}
                className="relative group"
              >
                <div className="absolute -inset-2 bg-yellow-400 rounded-full blur-lg opacity-40 group-hover:opacity-80 transition-all duration-500"></div>
                <motion.button
                  onClick={() => scrollToSection('pricing')}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(255,215,0,0.7)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={TRANSITION_SPRING_CTA}
                  className="relative bg-yellow-400 text-black px-10 py-[14px] sm:px-14 sm:py-5 rounded-full font-headline font-black uppercase text-base sm:text-lg tracking-widest shadow-[0_0_40px_rgba(255,215,0,0.4)] transition-all duration-300 min-h-[52px] flex items-center justify-center"
                >
                  Explore Programs
                </motion.button>
              </MagneticButton>
            )}
          </motion.div>

          <div className="mt-16 sm:mt-24 w-full max-w-4xl mx-auto relative z-10 px-2">
            <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-16">
              {STATS.map((stat, idx) => (
                <GlowCounter key={idx} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-20 md:py-24 px-5 sm:px-8 bg-surface-container-lowest relative overflow-hidden border-y border-white/5">
          <div className="max-w-[900px] mx-auto text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ delay: 0.1 }}
              className="text-xl sm:text-xl md:text-3xl font-headline font-extrabold mb-6 tracking-tighter leading-tight uppercase italic"
            >
              Teaching my 4 YEARS of experience in <span className="relative inline-flex items-center justify-center px-6 sm:px-8 py-2 mx-1 sm:mx-2 not-italic">
                <span className="absolute inset-0 bg-yellow-400 rounded-[100px_100px_80px_80px] shadow-[0_10px_30px_rgba(255,215,0,0.3)] transform -rotate-2 scale-y-110"></span>
                <span className="relative text-black font-black text-xl sm:text-2xl md:text-4xl tracking-tighter flex items-baseline gap-1 transform -rotate-1">
                  69 <span className="text-[8px] sm:text-[10px] uppercase tracking-widest opacity-80">days</span>
                </span>
              </span>!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-sm md:text-xs max-w-xl mx-auto mb-10 font-body leading-relaxed tracking-[0.1em] md:tracking-[0.2em] uppercase font-bold"
            >
              With years of proven success in natural bodybuilding, high-performance vegetarian nutrition, and building a global fitness tribe, Dhruvil will reveal the powerful secrets that can help you dominate your physique goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ delay: 0.3 }}
              className="relative inline-block group"
            >
              <div className="absolute -inset-1 bg-yellow-400 rounded-full blur opacity-10 group-hover:opacity-40 transition-all duration-500"></div>
              <motion.button
                onClick={() => scrollToSection('pricing')}
                whileHover={{ scale: 1.08, boxShadow: '0 0 40px rgba(255,215,0,0.5)' }}
                whileTap={{ scale: 0.95 }}
                transition={TRANSITION_SPRING_CTA}
                className="relative bg-yellow-400 text-black px-10 py-[14px] rounded-full font-headline font-black uppercase text-sm tracking-widest transition-all duration-300 min-h-[52px] flex items-center justify-center"
              >
                Join now
              </motion.button>
            </motion.div>
          </div>

          <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none opacity-50"></div>
        </section>

        <section id="learn" className="py-12 sm:py-20 md:py-32 px-5 sm:px-8 bg-surface-container-lowest scroll-mt-24">
          <div className="max-w-[1200px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              className="text-[1.75rem] sm:text-3xl md:text-5xl font-headline font-black text-center mb-4 sm:mb-6 leading-tight"
            >
              What you'll learn in this <span className="text-yellow-400">Cohort</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-center max-w-2xl mx-auto mb-10 sm:mb-16 md:mb-20 text-base leading-relaxed"
            >
              The Flex Protocol is a comprehensive 69-day system designed to rebuild your body and mind from the ground up. Here's exactly what you'll master.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {COHORT_LEARNINGS.map((learning) => {
                const isFullWidth = learning.id === 1 || learning.id === 5;
                return (
                  <LearningCard 
                    key={learning.id} 
                    learning={learning} 
                    isFullWidth={isFullWidth}
                    openPreRegister={openPreRegister}
                  />
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 sm:py-20 md:py-32">
          <div className="mb-12 sm:mb-20">
            <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl font-headline font-black mb-4 leading-tight">What happens inside <br /><span className="text-primary-container">the 69 days?</span></h2>
            <div className="w-24 h-1 bg-primary-container"></div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={feature.title}
                variants={staggerItemScale}
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } }}
                className="glass-monolith card-depth card-hover-lift contain-[paint] p-6 sm:p-8 rounded-2xl border-white/5 hover:border-yellow-500/40 duration-500 group relative overflow-hidden cursor-pointer"
              >
                <motion.div 
                  className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/8 transition-colors duration-500"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity }}
                />

                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.22
                  }}
                  className="w-12 h-12 bg-yellow-400/10 rounded-lg flex items-center justify-center mb-6 relative z-10"
                >
                  {feature.icon === 'Dumbbell' && <Dumbbell className="text-yellow-400" />}
                  {feature.icon === 'Leaf' && <Leaf className="text-yellow-400" />}
                  {feature.icon === 'Brain' && <Brain className="text-yellow-400" />}
                  {feature.icon === 'Zap' && <RefreshCw className="text-yellow-400" />}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-headline font-bold mb-3 relative z-10 group-hover:text-yellow-400 transition-colors">{feature.title}</h3>
                <p className="text-base text-gray-400 font-body leading-relaxed relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="why-us" className="bg-surface-container-low py-12 sm:py-20 md:py-32 px-5 sm:px-8 scroll-mt-24">
          <div className="max-w-[1000px] mx-auto text-center">
            <h2 className="text-[1.75rem] sm:text-3xl md:text-4xl font-headline font-black mb-8 sm:mb-16 md:mb-20 tracking-tight uppercase leading-tight">WHY THE <span className="text-primary-container">FLEX PROTOCOL?</span></h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
              <div className="flex-1 flex flex-col items-center w-full">
                <div className="glass-monolith w-full p-6 rounded-xl border-white/10 border-dashed border-2">
                  <span className="text-xs uppercase font-bold text-gray-400 mb-2 block">Foundations</span>
                  <p className="font-headline font-bold text-sm">Learn the Skills + Eat Real Food + Train Anywhere</p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="text-yellow-500 w-10 h-10 rotate-90 md:rotate-0" />
              </div>

              <div className="flex-1 flex flex-col items-center w-full">
                <div className="bg-surface-container-highest p-6 rounded-xl w-full border-l-4 border-yellow-400">
                  <span className="text-xs uppercase font-bold text-yellow-500 mb-2 block">Outcome 01</span>
                  <p className="font-headline font-bold text-sm">Aesthetic Physique</p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="text-yellow-500 w-10 h-10 rotate-90 md:rotate-0" />
              </div>

              <div className="flex-1 flex flex-col items-center w-full">
                <div className="bg-primary-container p-6 rounded-xl w-full shadow-2xl shadow-yellow-500/30 transform scale-100 md:scale-110">
                  <span className="text-xs uppercase font-bold text-on-primary-fixed mb-2 block">The Goal</span>
                  <p className="font-headline font-black text-on-primary-fixed text-sm uppercase">UNBREAKABLE CONFIDENCE & COMMANDING RESPECT</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="transformations" className="max-w-[1000px] mx-auto px-5 sm:px-8 pt-12 sm:pt-0 pb-12 sm:pb-20 md:pb-32 scroll-mt-24">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl font-headline font-black mb-4 tracking-tighter uppercase relative inline-block group leading-tight">
              Wall of <span className="text-yellow-400">Fame</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto font-body text-base leading-relaxed">Real results from the Flex Protocol. These transformations are the direct outcome of discipline, pure aesthetics, and the 69-day protocol.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {ALL_TRANSFORMATIONS.slice(0, 3).map((hero, idx) => (
              <WallOfFameCard key={hero.id} hero={hero} index={idx} />
            ))}
          </div>
          <div className="text-center mt-10 sm:mt-12 pb-8 sm:pb-10 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
            <Link
              to="/transformations"
              className="font-headline font-bold uppercase text-xs tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors border-b border-cyan-600 hover:border-cyan-400 pb-1 min-h-[44px] flex items-center"
            >
              More Transformations →
            </Link>
            <button onClick={() => openPreRegister(PRICING[1])} className="font-headline font-bold uppercase text-xs tracking-widest text-gray-400 hover:text-yellow-400 transition-colors border-b border-gray-600 hover:border-yellow-400 pb-1 min-h-[44px] flex items-center">
              Start Your Transformation →
            </button>
          </div>
        </section>

        <section id="pricing" className="bg-surface-container-lowest py-12 sm:py-20 md:py-32 px-5 sm:px-8 scroll-mt-24 relative overflow-hidden">

          <div className="max-w-[1200px] mx-auto text-center relative z-10">
            <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl font-headline font-black mb-4 leading-tight">The Best Prices Ever. <br /><span className="text-primary-container">Pick Your Plan.</span></h2>
            <p className="text-gray-400 mb-10 sm:mb-16 md:mb-20 max-w-xl mx-auto text-base leading-relaxed">Choose the level of immersion you need to reach your goals. All plans include the core Vegetarian Protocol.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 items-stretch">
              {PRICING.map((plan) => (
                <PricingCard key={plan.title} plan={plan} openPreRegister={openPreRegister} />
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-[800px] mx-auto px-5 sm:px-8 py-12 sm:py-20 md:py-32">
          <h2 className="text-[1.75rem] sm:text-3xl md:text-4xl font-headline font-black text-center mb-8 sm:mb-16 md:mb-20 uppercase italic leading-tight">Got Questions?</h2>
          <div className="space-y-4">
            {FAQ.map((item, idx) => (
              <div
                key={idx}
                className="glass-monolith p-6 rounded-xl cursor-pointer hover:border-yellow-500/30 transition-all group"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="flex justify-between items-start gap-3">
                  <h4 className="font-headline font-bold text-base sm:text-lg flex-1 leading-snug">{item.question}</h4>
                  <ChevronDown className={`text-yellow-400 transition-transform duration-300 shrink-0 mt-0.5 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </div>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-gray-400 text-base leading-relaxed">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        <section className="relative py-12 sm:py-20 md:py-32 px-5 sm:px-8 overflow-hidden bg-surface-container-lowest">
          <div className="absolute inset-0 bg-primary-container/5 mix-blend-overlay"></div>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255,215,0,0.08), transparent)' }}
          />
          <div className="max-w-[1000px] mx-auto text-center relative z-10">
            <motion.h2
              className="text-[1.75rem] sm:text-4xl md:text-6xl font-headline font-black mb-6 sm:mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
            >
              Stop delaying your <br />
              <span className="text-yellow-400 neon-glow">transformation.</span>
            </motion.h2>
            <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-12 max-w-xl mx-auto font-body leading-relaxed">The world respects progress. The only person stopping you from becoming the best version of yourself is the one in the mirror.</p>
            <div className="flex justify-center">
              {!isAuthenticated ? (
                <MagneticButton strength={0.6} onClick={() => openPreRegister(PRICING[1])}>
                  <div className="absolute -inset-3 bg-yellow-400 rounded-full blur-xl opacity-30 animate-pulse pointer-events-none"></div>
                  <button
                    onClick={() => openPreRegister(PRICING[1])}
                    className="relative bg-primary-container text-on-primary-fixed px-8 py-4 sm:px-16 sm:py-6 rounded-full font-headline font-black uppercase text-sm sm:text-xl tracking-widest shadow-[0_0_50px_rgba(255,215,0,0.4)] hover:shadow-[0_0_80px_rgba(255,215,0,0.8)] transition-shadow duration-500 border-glow-animate border w-full sm:w-auto text-center"
                  >
                    LET'S GET TO WORK
                  </button>
                </MagneticButton>
              ) : (
                <MagneticButton strength={0.6} onClick={() => scrollToSection('pricing')}>
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className="relative bg-primary-container text-on-primary-fixed px-8 py-4 sm:px-16 sm:py-6 rounded-full font-headline font-black uppercase text-sm sm:text-xl tracking-widest shadow-[0_0_50px_rgba(255,215,0,0.4)] hover:shadow-[0_0_80px_rgba(255,215,0,0.8)] transition-shadow duration-500 w-full sm:w-auto text-center"
                  >
                    UPGRADE YOUR PLAN
                  </button>
                </MagneticButton>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-lowest py-12 sm:py-20 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-10">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-xl font-bold text-gray-300 font-headline mb-4">FlexWithDhruvil</div>
            <p className="text-xs text-gray-400 font-body tracking-tight max-w-xs text-center md:text-left">
              © 2024 FlexWithDhruvil. All Rights Reserved. <br /> Built for the Elite.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/privacy-policy" className="text-xs text-gray-600 hover:text-yellow-400 transition-colors uppercase font-bold tracking-widest">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="text-xs text-gray-600 hover:text-yellow-400 transition-colors uppercase font-bold tracking-widest">Terms & Conditions</Link>
            <a
              href="https://wa.me/8200012647"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-600 hover:text-yellow-400 transition-colors uppercase font-bold tracking-widest"
            >
              Contact
            </a>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <a
              href="https://www.instagram.com/flexwithdhruvil?igsh=YTc4NWE1cGJkMjNp&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors cursor-pointer"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.youtube.com/@flexwithdhruvilp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors cursor-pointer"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </footer>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      {selectedPlanForModal && (
        <PreRegisterModal
          isOpen={isPreRegisterOpen}
          onClose={() => setIsPreRegisterOpen(false)}
          selectedPlan={selectedPlanForModal.title}
          planPrice={selectedPlanForModal.price}
        />
      )}

      <WhatsAppButton />

      {/* Sticky mobile CTA — visible only on mobile, hides after pricing section is visible */}
      {!isAuthenticated && (
        <div className="mobile-sticky-cta">
          <button
            onClick={() => openPreRegister(PRICING[1])}
            className="flex-1 bg-yellow-400 text-black rounded-2xl font-headline font-black uppercase text-sm tracking-widest min-h-[52px] flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.4)] active:scale-[0.98] transition-transform"
          >
            🔥 Join Now — Limited Spots
          </button>
        </div>
      )}
    </div>
  );
}
