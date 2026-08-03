'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProjectCard from '../../../../components/ProjectCard';
import { fetchAPI, fallbackServices, fallbackProjects } from '../../../../lib/api';
import { ArrowLeft, CheckCircle2, ArrowRight, PhoneCall } from 'lucide-react';

export default function ServiceDetailPage({ params }) {
  const { slug } = params;
  const [service, setService] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);

  useEffect(() => {
    fetchAPI(`/services/${slug}`)
      .then((data) => {
        setService(data);
        if (data.projects) setRelatedProjects(data.projects);
      })
      .catch(() => {
        const found = fallbackServices.find((s) => s.slug === slug) || fallbackServices[0];
        setService(found);
        setRelatedProjects(fallbackProjects.filter((p) => p.serviceId === found.id));
      });
  }, [slug]);

  if (!service) {
    return (
      <div className="pt-40 pb-24 text-center text-slate-500 bg-slate-50 min-h-screen">
        Loading service details...
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center space-x-2 text-slate-500 hover:text-brand-500 font-semibold text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>

        {/* Header Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="text-brand-500 font-bold text-xs uppercase tracking-widest block mb-2">
              Om Digital Prints • Service Detail
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
              {service.name}
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {service.fullDesc || service.shortDesc}
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3 text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Custom dimensions and color finishes tailored to your specification</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Weatherproof, anti-fading UV printing with high structural durability</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Fast express delivery & optional on-site installation</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white font-bold px-7 py-3.5 rounded-2xl shadow-xl shadow-brand-500/25"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center space-x-2 bg-white border border-slate-300 text-slate-200 font-semibold px-6 py-3.5 rounded-2xl hover:text-slate-900"
              >
                <PhoneCall className="w-4 h-4 text-brand-500" />
                <span>Call Specialist</span>
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
            <img
              src={service.icon || 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80'}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <div className="pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
              Related Projects Done for {service.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
