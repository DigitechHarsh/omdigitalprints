'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroSlider from '../../components/HeroSlider';
import ServiceCard from '../../components/ServiceCard';
import ProjectCard from '../../components/ProjectCard';
import { fetchAPI, fallbackServices, fallbackSlides, fallbackProjects } from '../../lib/api';
import { ShieldCheck, Clock, Tag, Award, ArrowRight, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const [slides, setSlides] = useState(fallbackSlides);
  const [services, setServices] = useState(fallbackServices);
  const [projects, setProjects] = useState(fallbackProjects);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', email: '', serviceId: '', message: '' });
  const [leadStatus, setLeadStatus] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [slidesData, servicesData, projectsData] = await Promise.all([
          fetchAPI('/slides?status=true').catch(() => fallbackSlides),
          fetchAPI('/services?status=true').catch(() => fallbackServices),
          fetchAPI('/projects?status=true').catch(() => fallbackProjects)
        ]);

        if (slidesData && slidesData.length > 0) setSlides(slidesData);
        if (servicesData && servicesData.length > 0) setServices(servicesData);
        if (projectsData && projectsData.length > 0) setProjects(projectsData);
      } catch (err) {
        console.warn('API loading fallback activated:', err);
      }
    }
    loadData();
  }, []);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setLeadStatus('submitting');
    try {
      await fetchAPI('/leads', {
        method: 'POST',
        body: JSON.stringify(leadForm)
      });
      setLeadStatus('success');
      setLeadForm({ name: '', phone: '', email: '', serviceId: '', message: '' });
    } catch (err) {
      setLeadStatus('error');
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero Slider (Critical 2-Column Split Component) */}
      <HeroSlider slides={slides} />

      {/* 2. "Why Choose Us" Strip */}
      <section className="bg-white border-y border-slate-200 py-12 shadow-sm overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <div className="flex items-center space-x-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="p-3.5 bg-brand-500/10 border border-brand-500/30 rounded-xl text-brand-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Top Quality Guarantee</h4>
                <p className="text-slate-500 text-xs mt-0.5">UV-resistant inks & premium grade materials</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="p-3.5 bg-brand-500/10 border border-brand-500/30 rounded-xl text-brand-500">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">24-Hour Turnaround</h4>
                <p className="text-slate-500 text-xs mt-0.5">Rapid production for urgent marketing events</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="p-3.5 bg-brand-500/10 border border-brand-500/30 rounded-xl text-brand-500">
                <Tag className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Best Market Rates</h4>
                <p className="text-slate-500 text-xs mt-0.5">Direct factory pricing with bulk discounts</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="p-3.5 bg-brand-500/10 border border-brand-500/30 rounded-xl text-brand-500">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">10+ Years Experience</h4>
                <p className="text-slate-500 text-xs mt-0.5">Trusted by 2,500+ corporate clients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Services Grid Section */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14"
          >
            <div>
              <div className="inline-flex items-center space-x-2 text-brand-500 text-xs font-bold uppercase tracking-widest mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Our Master Crafts</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Comprehensive Printing & Signage Solutions
              </h2>
            </div>
            <Link
              href="/services"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-slate-600 hover:text-brand-500 font-bold text-sm"
            >
              <span>View All 6 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id || service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Projects Gallery */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Featured Portfolio Projects
            </h2>
            <p className="text-slate-500 text-base">
              Explore our recent installations of 3D LED glow boards, highway flex banners, and precision laser acrylic letterings.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 bg-white border border-slate-300 hover:border-brand-500 text-slate-900 font-bold px-8 py-3.5 rounded-2xl hover:scale-105 transition-all"
            >
              <span>Explore Complete Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Animated Stats Counter */}
      <section className="py-16 bg-gradient-to-r from-brand-600 to-brand-500 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <div className="text-4xl sm:text-5xl font-black mb-2">5,000+</div>
              <div className="text-brand-100 text-sm font-semibold uppercase tracking-wider">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black mb-2">2,500+</div>
              <div className="text-brand-100 text-sm font-semibold uppercase tracking-wider">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black mb-2">10+</div>
              <div className="text-brand-100 text-sm font-semibold uppercase tracking-wider">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black mb-2">24 Hours</div>
              <div className="text-brand-100 text-sm font-semibold uppercase tracking-wider">Express Turnaround</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. Quick Contact Inquiry Form Section */}
      <section id="contact-section" className="py-20 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/30 px-3.5 py-1.5 rounded-full text-brand-500 text-xs font-bold mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>Instant Consultation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Ready to Boost Your Brand Visibility?
              </h2>
              <p className="text-slate-600 text-base mb-8 leading-relaxed">
                Fill out the quick quote form and our senior signage engineers will provide you with custom measurements, design mockups, and best factory rates within 2 hours.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-slate-600">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-sm font-medium">Free site visit & design measurement</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-sm font-medium">High-resolution print proofs before production</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-sm font-medium">Professional on-site installation team</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-slate-200 p-8 rounded-3xl shadow-2xl"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Get a Free Instant Quote</h3>

              {leadStatus === 'success' ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 mx-auto" />
                  <h4 className="font-bold text-lg">Thank You!</h4>
                  <p className="text-sm">Your inquiry has been submitted. Our manager will call you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prashant Patel"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full bg-slate-100 border border-slate-200 focus:border-brand-500 text-slate-900 rounded-xl px-4 py-3 text-sm outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98259 83623"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className="w-full bg-slate-100 border border-slate-200 focus:border-brand-500 text-slate-900 rounded-xl px-4 py-3 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Service Required</label>
                      <select
                        value={leadForm.serviceId}
                        onChange={(e) => setLeadForm({ ...leadForm, serviceId: e.target.value })}
                        className="w-full bg-slate-100 border border-slate-200 focus:border-brand-500 text-slate-600 rounded-xl px-4 py-3 text-sm outline-none"
                      >
                        <option value="">Select Service</option>
                        {services.map((s) => (
                          <option key={s.id || s.slug} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Project Details / Message</label>
                    <textarea
                      rows={3}
                      placeholder="Mention dimensions, banner quantity, LED board size..."
                      value={leadForm.message}
                      onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                      className="w-full bg-slate-100 border border-slate-200 focus:border-brand-500 text-slate-900 rounded-xl px-4 py-3 text-sm outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={leadStatus === 'submitting'}
                    className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center space-x-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{leadStatus === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}</span>
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
