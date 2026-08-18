'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, LayoutGroup } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, CheckCircle2, X, Send } from 'lucide-react';

const sliderVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 800 : -800,
    opacity: 0,
    scale: 0.8,
    rotateY: direction > 0 ? 45 : -45,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      x: { type: 'spring', stiffness: 200, damping: 25 },
      opacity: { duration: 0.5 },
      rotateY: { duration: 0.6, ease: "easeOut" }
    },
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 800 : -800,
    opacity: 0,
    scale: 0.8,
    rotateY: direction < 0 ? 45 : -45,
    transition: {
      x: { type: 'spring', stiffness: 200, damping: 25 },
      opacity: { duration: 0.5 },
      rotateY: { duration: 0.6 }
    },
  }),
};

const textVariants = {
  hidden: (direction) => ({ opacity: 0, y: 40, x: direction > 0 ? 40 : -40 }),
  visible: { 
    opacity: 1, y: 0, x: 0, 
    transition: { type: 'spring', stiffness: 300, damping: 24, staggerChildren: 0.1, delayChildren: 0.2 }
  },
  exit: (direction) => ({ opacity: 0, y: -40, x: direction < 0 ? 40 : -40, transition: { duration: 0.3 } }),
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function HeroSlider({ slides = [] }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [leadStatus, setLeadStatus] = useState('idle');
  const touchStartX = useRef(0);

  // Mouse tracking for Spotlight & 3D Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax transforms based on mouse position
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const translateX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);

  // We map the incoming slides or use our highly curated fallback
  // with distinct background (Service) and card (Project) images.
  const activeSlides = slides && slides.length > 0 && slides[0].bgImage ? slides : [
    {
      id: 1,
      // Background Image: Represents the core SERVICE (e.g. large printing machine or factory setting)
      bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=80',
      // Card Image: Represents the ACTUAL PROJECT DONE (e.g. finished glowing sign in a mall)
      cardImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      headline: 'Illuminate Your Brand with Custom LED Boards',
      subtext: 'Command attention day & night with energy-efficient 3D backlit LED glow signboards built for modern storefronts.',
      btnText: 'View LED Signage',
      btnLink: '/services/led-board-creation'
    },
    {
      id: 2,
      bgImage: 'https://images.unsplash.com/photo-1596522354195-e84ae3c98731?auto=format&fit=crop&w=2000&q=80',
      cardImage: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=1200&q=80',
      headline: 'High-Quality Flex Banners for Every Occasion',
      subtext: 'Get ultra-vibrant, weather-durable banner printing tailored for outdoor campaigns & corporate events.',
      btnText: 'Explore Flex Printing',
      btnLink: '/services/banner-flex-printing'
    },
    {
      id: 3,
      bgImage: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?auto=format&fit=crop&w=2000&q=80',
      cardImage: 'https://images.unsplash.com/photo-1559163499-413811fb2344?auto=format&fit=crop&w=1200&q=80',
      headline: 'Premium 3D Acrylic & Laser Cut Signage',
      subtext: 'Elevate your office reception with high-precision laser-machined 3D acrylic lettering.',
      btnText: 'Discover Acrylic Signs',
      btnLink: '/services/acrylic-letter-signage'
    }
  ];

  const currentIndex = Math.abs(page % activeSlides.length);
  const currentSlide = activeSlides[currentIndex];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (isPaused || isFormOpen || activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 4000); 
    return () => clearInterval(timer);
  }, [isPaused, isFormOpen, activeSlides.length, page]);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
    
    spotlightX.set(clientX - left);
    spotlightY.set(clientY - top);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLeadStatus('submitting');
    setTimeout(() => {
      setLeadStatus('success');
      setTimeout(() => {
        setIsFormOpen(false);
        setLeadStatus('idle');
      }, 2500);
    }, 1000);
  };

  return (
    <section
      className="relative min-h-[95vh] bg-black pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50) paginate(1);
        if (diff < -50) paginate(-1);
      }}
    >
      {/* BACKGROUND: Service Image with Opacity over Black */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          {/* Using bgImage for the Service Background */}
          <img 
            src={currentSlide.bgImage || currentSlide.image} 
            alt="Service Background" 
            className="w-full h-full object-cover" 
          />
          {/* Uniform black opacity overlay to showcase the service image beautifully behind the text */}
          <div className="absolute inset-0 bg-black/75" />
        </motion.div>
      </AnimatePresence>

      {/* THE SPOTLIGHT GLOW REVEAL */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(249, 115, 22, 0.15), transparent 60%)`
          )
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 perspective-[1000px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[500px]">
          
          {/* RIGHT DIV (now order-2): Text & CTA Morph */}
          <div className="order-2 lg:order-2 flex flex-col justify-center space-y-6 lg:pl-8">
            <LayoutGroup>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={`text-${page}`}
                  custom={direction}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col space-y-6"
                >
                  <motion.div variants={childVariants} className="inline-flex items-center space-x-2 bg-brand-500/20 border border-brand-500/30 px-4 py-2 rounded-full text-brand-400 text-xs font-bold w-fit backdrop-blur-md shadow-[0_0_15px_rgba(234,88,12,0.2)]">
                    <Sparkles className="w-4 h-4 animate-pulse text-brand-500" />
                    <span className="tracking-widest uppercase">Premium Signage Masters</span>
                  </motion.div>

                  <motion.h1 variants={childVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                    {currentSlide.headline}
                  </motion.h1>

                  <motion.p variants={childVariants} className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-xl">
                    {currentSlide.subtext}
                  </motion.p>

                  <motion.div variants={childVariants} className="pt-4 flex flex-wrap items-center gap-5 relative h-16 w-full">
                    
                    {/* ZERO-FRICTION MORPHING LEAD FORM */}
                    <AnimatePresence>
                      {!isFormOpen ? (
                        <motion.button
                          layoutId="morph-cta"
                          onClick={() => setIsFormOpen(true)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="absolute left-0 top-0 inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold px-8 py-4 rounded-full shadow-[0_0_40px_rgba(234,88,12,0.3)] border border-brand-400/50 overflow-hidden group"
                        >
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-brand-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span className="relative">Get Your Free 3D Design Mockup</span>
                          <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      ) : (
                        <motion.div
                          layoutId="morph-cta"
                          className="absolute left-0 top-0 w-full sm:w-[450px] bg-black/90 backdrop-blur-xl border border-brand-500/50 rounded-3xl p-6 shadow-2xl shadow-brand-500/20 z-50 overflow-hidden"
                        >
                          <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-900 p-1.5 rounded-full">
                            <X className="w-4 h-4" />
                          </button>
                          
                          {leadStatus === 'success' ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-6 space-y-4 text-center">
                              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-2">
                                <CheckCircle2 className="w-8 h-8" />
                              </div>
                              <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
                              <p className="text-slate-300 text-sm">Our design team will contact you within 15 minutes.</p>
                            </motion.div>
                          ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                              <div>
                                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                                  <Sparkles className="w-5 h-5 text-brand-500" />
                                  <span>Instant Quote & Mockup</span>
                                </h3>
                                <p className="text-slate-400 text-xs mt-1">Lock in the best factory rates today.</p>
                              </div>
                              <div className="space-y-3 pt-2">
                                <input type="text" required placeholder="Your Name" className="w-full bg-slate-900 border border-slate-700 focus:border-brand-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors" />
                                <input type="tel" required placeholder="Phone Number" className="w-full bg-slate-900 border border-slate-700 focus:border-brand-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors" />
                              </div>
                              <button type="submit" disabled={leadStatus === 'submitting'} className="w-full bg-brand-500 hover:bg-brand-400 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.4)] flex items-center justify-center space-x-2 transition-all mt-2">
                                {leadStatus === 'submitting' ? (
                                  <span className="animate-pulse">Processing...</span>
                                ) : (
                                  <><span>Claim My Free Mockup</span><Send className="w-4 h-4" /></>
                                )}
                              </button>
                            </form>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </LayoutGroup>
          </div>

          {/* LEFT DIV (now order-1): FLOATING 3D PARALLAX PROJECT IMAGE */}
          <div className="order-1 lg:order-1 relative group flex justify-center lg:justify-start items-center h-[350px] sm:h-[450px] lg:h-[600px] w-full transform-gpu">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex justify-center items-center"
                style={{ rotateX, rotateY, x: translateX, y: translateY }}
              >
                {/* Main floating card showing the PROJECT DONE */}
                <div className="relative w-full max-w-[550px] aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-slate-700/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] shadow-brand-500/10">
                  <motion.img
                    src={currentSlide.cardImage || currentSlide.image}
                    alt="Project Done for this Service"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Internal Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
                  
                  {/* Floating Badge indicating this is a Completed Project */}
                  <motion.div 
                    className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-xl border border-slate-700/50 p-4 rounded-3xl flex flex-col shadow-2xl"
                    style={{ x: useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]), y: useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]) }}
                  >
                     <div className="flex items-center space-x-3 mb-2">
                       <div className="bg-brand-500/20 p-2 rounded-xl border border-brand-500/30">
                          <CheckCircle2 className="w-5 h-5 text-brand-400" />
                       </div>
                       <span className="text-white font-bold text-sm">Recent Project</span>
                     </div>
                     <span className="text-slate-400 text-xs font-medium pl-1">Delivered & Installed</span>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Custom Progress & Controls */}
        <div className="mt-20 lg:mt-6 flex flex-col sm:flex-row items-center justify-between border-t border-slate-800/60 pt-6 gap-6 relative z-0">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {activeSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                     const newDirection = idx > currentIndex ? 1 : -1;
                     setPage([page + (idx - currentIndex), newDirection]);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="group relative h-2 flex items-center px-1"
                >
                  <div className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                    currentIndex === idx
                      ? 'w-16 bg-brand-500 shadow-[0_0_15px_rgba(249,115,22,0.8)]'
                      : 'w-6 bg-slate-800 group-hover:bg-slate-600'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button onClick={() => paginate(-1)} className="p-4 rounded-full bg-black/50 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-500 transition-all duration-300 hover:scale-110">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => paginate(1)} className="p-4 rounded-full bg-black/50 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-500 transition-all duration-300 hover:scale-110">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
