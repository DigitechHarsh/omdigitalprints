'use client';
import Link from 'next/link';
import { ExternalLink, Tag } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <div className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={project.mainImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {project.service?.name && (
          <div className="absolute top-4 left-4 bg-brand-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
            <Tag className="w-3.5 h-3.5" />
            <span>{project.service.name}</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-500 transition-colors line-clamp-1 mb-2">
          {project.title}
        </h3>
        <p className="text-slate-500 text-xs line-clamp-2 mb-4">
          {project.description}
        </p>

        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center space-x-1.5 text-slate-600 hover:text-slate-900 font-semibold text-xs transition-colors"
        >
          <span>View Project Details</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
