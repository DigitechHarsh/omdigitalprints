'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchAPI, fallbackProjects } from '../../../../lib/api';
import { ArrowLeft, Tag, Calendar, CheckCircle2, PhoneCall } from 'lucide-react';

export default function ProjectDetailPage({ params }) {
  const { id } = params;
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetchAPI(`/projects/${id}`)
      .then((data) => setProject(data))
      .catch(() => {
        const found = fallbackProjects.find((p) => String(p.id) === String(id)) || fallbackProjects[0];
        setProject(found);
      });
  }, [id]);

  if (!project) {
    return (
      <div className="pt-40 pb-24 text-center text-slate-500 bg-slate-50 min-h-screen">
        Loading project details...
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link
          href="/projects"
          className="inline-flex items-center space-x-2 text-slate-500 hover:text-brand-500 font-semibold text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects Gallery</span>
        </Link>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl p-8 mb-12">
          {project.service?.name && (
            <div className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/30 px-3.5 py-1.5 rounded-full text-brand-500 text-xs font-bold mb-4">
              <Tag className="w-4 h-4" />
              <span>{project.service.name}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 leading-tight">
            {project.title}
          </h1>

          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 bg-slate-100 border border-slate-200">
            <img
              src={project.mainImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-slate-600 text-sm">
            <div>
              <span className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Service Used</span>
              <span className="font-bold text-slate-900">{project.service?.name || 'Commercial Signage'}</span>
            </div>
            <div>
              <span className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Completion Date</span>
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-500" />
                {project.completedAt ? new Date(project.completedAt).toLocaleDateString() : 'Recent Project'}
              </span>
            </div>
            <div>
              <span className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Status</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Completed & Installed
              </span>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Project Description</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              {project.description || 'This commercial installation featured full site survey, structural metal framework, high-resolution printing, and electrical wiring.'}
            </p>
          </div>
        </div>

        {/* Gallery grid if multi-image */}
        {project.gallery && project.gallery.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Additional Project Photos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {project.gallery.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200">
                  <img src={img.imageUrl} alt="Gallery" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
