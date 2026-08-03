'use client';
import Link from 'next/link';
import { Award, ShieldCheck, Cpu, Users, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-500 font-bold text-xs uppercase tracking-widest block mb-2">
            About Om Digital Prints
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
            Pioneering Printing & Signage Excellence
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            With over a decade of industry expertise, Om Digital Prints delivers end-to-end commercial printing, backlit LED glow boards, laser cut acrylic signage, and outdoor advertising.
          </p>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl text-center">
            <Award className="w-10 h-10 text-brand-500 mx-auto mb-4" />
            <h3 className="text-3xl font-black text-slate-900 mb-1">10+</h3>
            <p className="text-slate-500 text-sm font-semibold">Years of Industry Leadership</p>
          </div>
          <div className="bg-white border border-slate-200 p-8 rounded-3xl text-center">
            <Users className="w-10 h-10 text-brand-500 mx-auto mb-4" />
            <h3 className="text-3xl font-black text-slate-900 mb-1">2,500+</h3>
            <p className="text-slate-500 text-sm font-semibold">Corporate & Retail Clients</p>
          </div>
          <div className="bg-white border border-slate-200 p-8 rounded-3xl text-center">
            <Cpu className="w-10 h-10 text-brand-500 mx-auto mb-4" />
            <h3 className="text-3xl font-black text-slate-900 mb-1">High Tech</h3>
            <p className="text-slate-500 text-sm font-semibold">CNC Fiber & CO2 Lasers</p>
          </div>
          <div className="bg-white border border-slate-200 p-8 rounded-3xl text-center">
            <ShieldCheck className="w-10 h-10 text-brand-500 mx-auto mb-4" />
            <h3 className="text-3xl font-black text-slate-900 mb-1">100%</h3>
            <p className="text-slate-500 text-sm font-semibold">Quality & Delivery Guarantee</p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white/60 border border-slate-200 rounded-3xl p-8 lg:p-12 mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission & Infrastructure</h2>
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              At Om Digital Prints, we believe high-impact signage turns passing traffic into loyal customers. Our state-of-the-art facility houses high-speed Japanese digital flex printers, precision CNC acrylic routers, and automatic letter benders.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              We handle every step in-house: site measurement, structural design, fabrication, wiring, color calibration, and professional installation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg transition-all"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
              alt="Laser cutting machinery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Meet the Founder Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Meet Our Founder</h2>
          
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
                alt="Prashant Patel - Owner"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none border border-slate-200/50"></div>
            </div>
            
            <div>
              <h3 className="text-2xl font-black text-slate-900">Prashant Patel</h3>
              <p className="text-brand-500 font-bold uppercase tracking-widest text-sm mt-1">Founder & Owner</p>
            </div>
            
            <p className="text-slate-600 max-w-2xl text-center leading-relaxed">
              "My vision for Om Digital Prints has always been simple: combine the latest printing technology with uncompromising quality and rapid turnaround. We don't just create signs; we build your brand's physical presence and visibility."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
