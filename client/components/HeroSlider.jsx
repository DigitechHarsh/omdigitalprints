'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HeroSlider({ slides = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  // If slides array is empty, we provide a fallback inside the component or just use fallbackSlides if imported.
  // We'll use the 'slides' prop if it has items.
  const activeSlides = slides && slides.length > 0 ? slides : [];

  // Auto-play interval
  useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, activeSlides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const currentSlide = activeSlides[currentIndex];

  if (!currentSlide) return null;

  return (
    <section
      className="relative min-h-[90vh] bg-black pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50) handleNext();
        if (diff < -50) handlePrev();
      }}
    >
      {/* 1. Full-Width Background Image with Black Opacity (As requested in Image 2) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={currentSlide.bgImage || currentSlide.image} 
            alt="Service Background" 
            className="w-full h-full object-cover" 
          />
          {/* Black Opacity Overlay */}
          <div className="absolute inset-0 bg-black/75" />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <AnimatePresence mode="wait">
          <div key={currentIndex} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* LEFT DIV: Product/Project Image (Card) */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="order-1 lg:order-1 relative group"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-slate-700 shadow-2xl shadow-brand-500/10">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.headline}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md border border-slate-700 px-4 py-2.5 rounded-2xl flex items-center space-x-3 shadow-lg">
                  <Sparkles className="w-5 h-5 text-brand-500 animate-pulse" />
                  <span className="text-xs font-bold text-white tracking-wide">
                    Premium Print Solution
                  </span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT DIV: Headline, Subtext, CTAs */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="order-2 lg:order-2 flex flex-col justify-center space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-brand-500/20 border border-brand-500/40 px-3.5 py-1.5 rounded-full text-brand-400 text-xs font-bold w-fit">
                <CheckCircle2 className="w-4 h-4" />
                <span>#1 Printing & Signage Experts</span>
              </div>

              {/* Text changed to white to be visible on the dark background */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {currentSlide.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                {currentSlide.subtext}
              </p>

              {/* Action CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={currentSlide.btnLink || '/services'}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white font-bold text-base px-7 py-3.5 rounded-2xl shadow-xl shadow-brand-500/30 hover:scale-105 transition-all duration-300"
                >
                  <span>{currentSlide.btnText || 'Explore Services'}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-slate-600 text-white font-semibold text-base px-6 py-3.5 rounded-2xl transition-all duration-200"
                >
                  <span>Get Custom Quote</span>
                </Link>
              </div>
            </motion.div>

          </div>
        </AnimatePresence>

        {/* Controls: Prev/Next Manual Arrows & Dot Indicators */}
        <div className="mt-12 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-2">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-10 bg-brand-500 shadow-md shadow-brand-500/50'
                    : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="p-3 rounded-full bg-black/50 border border-slate-700 text-slate-300 hover:text-white hover:border-brand-500 transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="p-3 rounded-full bg-black/50 border border-slate-700 text-slate-300 hover:text-white hover:border-brand-500 transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
