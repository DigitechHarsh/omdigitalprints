'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const sliderVariants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 },
      scale: { duration: 0.5 },
    },
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    };
  },
};

const textVariants = {
  hidden: (direction) => ({
    opacity: 0,
    y: 40,
    x: direction > 0 ? 40 : -40,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: (direction) => ({
    opacity: 0,
    y: -40,
    x: direction < 0 ? 40 : -40,
    transition: { duration: 0.3 },
  }),
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function HeroSlider({ slides = [] }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const activeSlides = slides && slides.length > 0 ? slides : [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=1200&q=80',
      headline: 'High-Quality Flex Banners for Every Occasion',
      subtext: 'Get ultra-vibrant, weather-durable banner printing tailored for outdoor campaigns, corporate events & exhibitions with 24-hour delivery.',
      btnText: 'Explore Flex Printing',
      btnLink: '/services/banner-flex-printing'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      headline: 'Illuminate Your Brand with Custom LED Boards',
      subtext: 'Command attention day & night with energy-efficient 3D backlit LED glow signboards built for modern retail storefronts.',
      btnText: 'View LED Signage',
      btnLink: '/services/led-board-creation'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      headline: 'Premium 3D Acrylic & Laser Cut Signage',
      subtext: 'Elevate your office reception and storefront frontage with high-precision laser-machined 3D acrylic lettering.',
      btnText: 'Discover Acrylic Signs',
      btnLink: '/services/acrylic-letter-signage'
    }
  ];

  const currentIndex = Math.abs(page % activeSlides.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 2000); // 2 seconds per slide
    return () => clearInterval(timer);
  }, [isPaused, activeSlides.length, page]);

  const currentSlide = activeSlides[currentIndex];

  return (
    <section
      className="relative min-h-[95vh] bg-slate-900 pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50) paginate(1);
        if (diff < -50) paginate(-1);
      }}
    >
      {/* Dynamic Background Image Overlay for Immersion */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.15, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <img
            src={currentSlide.image}
            alt="Background blur"
            className="w-full h-full object-cover filter blur-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT DIV: Headline, Subtext, CTAs */}
          <div className="order-2 lg:order-1 flex flex-col justify-center space-y-6 lg:pr-8 min-h-[300px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col space-y-6"
              >
                <motion.div variants={childVariants} className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/30 px-4 py-2 rounded-full text-brand-500 text-xs font-bold w-fit backdrop-blur-md">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="tracking-wide uppercase">Premium Print Solution</span>
                </motion.div>

                <motion.h1 
                  variants={childVariants}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight"
                >
                  {currentSlide.headline}
                </motion.h1>

                <motion.p 
                  variants={childVariants}
                  className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-xl"
                >
                  {currentSlide.subtext}
                </motion.p>

                <motion.div variants={childVariants} className="pt-4 flex flex-wrap items-center gap-5">
                  <Link
                    href={currentSlide.btnLink || '/services'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-600 px-8 py-4 font-bold text-white shadow-xl shadow-brand-500/30 transition-transform hover:scale-105 active:scale-95"
                  >
                    <span className="absolute inset-0 h-full w-full bg-gradient-to-tr from-brand-700 to-brand-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="relative flex items-center space-x-2">
                      <span>{currentSlide.btnText || 'Explore Services'}</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <span>Get Custom Quote</span>
                  </Link>
                </motion.div>
                
                <motion.div variants={childVariants} className="flex items-center space-x-4 pt-6">
                   <div className="flex -space-x-3">
                     {[1,2,3,4].map((i) => (
                       <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-300 flex items-center justify-center overflow-hidden z-[${4-i}]`}>
                         <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Client" className="w-full h-full object-cover"/>
                       </div>
                     ))}
                   </div>
                   <div className="flex flex-col">
                     <div className="flex items-center space-x-1 text-yellow-400">
                       {[...Array(5)].map((_,i) => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                     </div>
                     <span className="text-xs text-slate-400 font-medium mt-0.5">Trusted by 2500+ Clients</span>
                   </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT DIV: Product/Project Image */}
          <div className="order-1 lg:order-2 relative group flex justify-center lg:justify-end items-center h-[350px] sm:h-[450px] lg:h-[600px] w-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex justify-center items-center"
              >
                <div className="relative w-full max-w-[600px] aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-700/50 shadow-2xl shadow-brand-500/20 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <motion.img
                    src={currentSlide.image}
                    alt={currentSlide.headline}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  
                  {/* Floating Badge inside Image */}
                  <div className="absolute bottom-6 right-6 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-3 rounded-2xl flex items-center space-x-3 shadow-2xl">
                     <div className="bg-brand-500 p-2 rounded-xl">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                     </div>
                    <div className="flex flex-col pr-2">
                       <span className="text-white font-bold text-sm">#1 Experts</span>
                       <span className="text-slate-400 text-xs font-medium">In Printing & Signage</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Custom Progress & Controls at Bottom */}
        <div className="mt-16 lg:mt-10 flex flex-col sm:flex-row items-center justify-between border-t border-slate-800 pt-6 gap-6">
          <div className="flex items-center space-x-4">
            <div className="text-slate-400 font-mono text-sm font-bold tracking-widest">
              0{currentIndex + 1}
            </div>
            <div className="flex space-x-2">
              {activeSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                     const newDirection = idx > currentIndex ? 1 : -1;
                     setPage([page + (idx - currentIndex), newDirection]);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="group relative h-2 flex items-center"
                >
                  <div className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                    currentIndex === idx
                      ? 'w-12 bg-brand-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]'
                      : 'w-4 bg-slate-700 group-hover:bg-slate-500 group-hover:w-6'
                  }`} />
                </button>
              ))}
            </div>
            <div className="text-slate-600 font-mono text-sm font-bold tracking-widest">
              0{activeSlides.length}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous Slide"
              className="p-4 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 hover:text-white hover:border-brand-500 hover:bg-slate-800 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 group"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next Slide"
              className="p-4 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 hover:text-white hover:border-brand-500 hover:bg-slate-800 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 group"
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
