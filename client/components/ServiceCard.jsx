'use client';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function ServiceCard({ service }) {
  return (
    <div className="group relative bg-white/90 border border-slate-200/80 hover:border-brand-500/50 rounded-3xl overflow-hidden p-6 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1.5 flex flex-col justify-between">
      <div>
        <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6 bg-slate-100">
          <img
            src={service.icon || 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80'}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-500 transition-colors mb-2">
          {service.name}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6">
          {service.shortDesc}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
          <Check className="w-3.5 h-3.5 text-emerald-400" /> Premium Quality
        </span>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center space-x-1.5 text-brand-500 font-bold text-sm hover:text-brand-400 group/btn"
        >
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
