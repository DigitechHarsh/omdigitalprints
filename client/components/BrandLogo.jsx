'use client';
import Link from 'next/link';

export default function BrandLogo({ isDark = false, className = '' }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-accent-blue p-0.5 shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
        <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center font-black text-xl text-slate-900">
          <span className="bg-gradient-to-tr from-brand-500 via-amber-400 to-accent-cyan bg-clip-text text-transparent">
            OM
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`font-extrabold text-xl tracking-tight leading-none ${isDark ? 'text-slate-900' : 'text-slate-900'}`}>
          OM <span className="text-brand-500">DIGITAL</span>
        </span>
        <span className={`text-[10px] font-semibold tracking-widest uppercase mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
          PRINTS & SIGNAGE
        </span>
      </div>
    </Link>
  );
}
