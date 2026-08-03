'use client';
import { useState, useEffect } from 'react';
import ServiceCard from '../../../components/ServiceCard';
import { fetchAPI, fallbackServices } from '../../../lib/api';
import { Layers } from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    fetchAPI('/services?status=true')
      .then((data) => {
        if (data && data.length > 0) setServices(data);
      })
      .catch(() => setServices(fallbackServices));
  }, []);

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/30 px-4 py-1.5 rounded-full text-brand-500 text-xs font-bold mb-4">
            <Layers className="w-4 h-4" />
            <span>Industrial Printing & Signage Catalog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Our Printing Services
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            From heavy-duty highway flex banners and 3D backlit LED glow signs to precision laser cut acrylic lettering — explore our full line of commercial branding solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id || service.slug} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
