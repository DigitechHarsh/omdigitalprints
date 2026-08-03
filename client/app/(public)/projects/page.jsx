'use client';
import { useState, useEffect } from 'react';
import ProjectCard from '../../../components/ProjectCard';
import { fetchAPI, fallbackProjects, fallbackServices } from '../../../lib/api';
import { FolderKanban, Filter } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [services, setServices] = useState(fallbackServices);
  const [activeServiceId, setActiveServiceId] = useState('all');

  useEffect(() => {
    Promise.all([
      fetchAPI('/projects?status=true').catch(() => fallbackProjects),
      fetchAPI('/services?status=true').catch(() => fallbackServices)
    ]).then(([projData, servData]) => {
      if (projData && projData.length > 0) setProjects(projData);
      if (servData && servData.length > 0) setServices(servData);
    });
  }, []);

  const filteredProjects = activeServiceId === 'all'
    ? projects
    : projects.filter((p) => String(p.serviceId) === String(activeServiceId));

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/30 px-4 py-1.5 rounded-full text-brand-500 text-xs font-bold mb-4">
            <FolderKanban className="w-4 h-4" />
            <span>Showcase Gallery</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Our Work & Installations
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Browse our completed signage installations, backlit LED glow boards, highway banners, and architectural laser-cut projects.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveServiceId('all')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeServiceId === 'all'
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900'
            }`}
          >
            All Work ({projects.length})
          </button>
          {services.map((s) => (
            <button
              key={s.id || s.slug}
              onClick={() => setActiveServiceId(String(s.id))}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                String(activeServiceId) === String(s.id)
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                  : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Projects Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            No projects found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
