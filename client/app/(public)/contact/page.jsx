'use client';
import { useState, useEffect } from 'react';
import { fetchAPI, fallbackServices } from '../../../lib/api';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [services, setServices] = useState(fallbackServices);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', serviceId: '', message: '' });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchAPI('/services?status=true')
      .then((data) => {
        if (data && data.length > 0) setServices(data);
      })
      .catch(() => setServices(fallbackServices));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await fetchAPI('/leads', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', serviceId: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-500 font-bold text-xs uppercase tracking-widest block mb-2">
            Contact Om Digital Prints
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Let's Build Your Signage Project
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Have questions about dimensions, material specs, or factory pricing? Send us your requirement or drop by our facility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Details & Map */}
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Headquarters & Printing Hub</h3>

              <div className="flex items-start space-x-4 text-slate-600">
                <MapPin className="w-6 h-6 text-brand-500 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Main Office & Factory</h4>
                  <p className="text-sm text-slate-500 mt-0.5">Shop No. 12, Main Commercial Market, Printing Hub Zone, City, Pin 110001</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-slate-600">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Phone Lines</h4>
                  <a href="tel:+919825983623" className="text-sm text-brand-400 hover:underline">+91 98259 83623</a>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-slate-600">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Email Inquiry</h4>
                  <a href="mailto:info@omdigitalprints.com" className="text-sm text-brand-400 hover:underline">info@omdigitalprints.com</a>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-slate-600">
                <Clock className="w-5 h-5 text-brand-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Working Hours</h4>
                  <p className="text-sm text-slate-500">Monday – Saturday: 9:30 AM – 8:30 PM</p>
                </div>
              </div>
            </div>

            {/* Google Map Embed Placeholder */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden h-64 relative">
              <iframe
                title="Om Digital Prints Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2612767098485!2d77.2140!3d28.6328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjg8NDMnNTguMSJOIDc3wrAxMic1MC40IkU!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter opacity-80 invert shadow-inner"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send an Inquiry</h3>

            {status === 'success' ? (
              <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 mx-auto" />
                <h4 className="font-bold text-xl">Inquiry Sent Successfully!</h4>
                <p className="text-sm text-slate-600">Our customer team will call you back within 2 business hours with quote estimates.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-100 border border-slate-200 focus:border-brand-500 text-slate-900 rounded-xl px-4 py-3 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-100 border border-slate-200 focus:border-brand-500 text-slate-900 rounded-xl px-4 py-3 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Service Interested In</label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full bg-slate-100 border border-slate-200 focus:border-brand-500 text-slate-600 rounded-xl px-4 py-3 text-sm outline-none"
                  >
                    <option value="">Select Service</option>
                    {services.map((s) => (
                      <option key={s.id || s.slug} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Message / Detailed Requirement</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your design, quantity, size measurements, or turn-around requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-100 border border-slate-200 focus:border-brand-500 text-slate-900 rounded-xl px-4 py-3 text-sm outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-brand-500/25 flex items-center justify-center space-x-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? 'Sending Request...' : 'Send Inquiry Now'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
