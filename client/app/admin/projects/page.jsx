'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import Modal from '../../../components/Modal';
import { fetchAPI, fallbackProjects, fallbackServices } from '../../../lib/api';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Image as ImageIcon } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [services, setServices] = useState(fallbackServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    serviceId: '',
    description: '',
    mainImage: '',
    status: true,
  });

  useEffect(() => {
    Promise.all([
      fetchAPI('/projects').catch(() => fallbackProjects),
      fetchAPI('/services').catch(() => fallbackServices)
    ]).then(([projData, servData]) => {
      if (projData && projData.length > 0) setProjects(projData);
      if (servData && servData.length > 0) setServices(servData);
    });
  }, []);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      serviceId: services[0]?.id || 1,
      description: '',
      mainImage: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=1000&q=80',
      status: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      serviceId: project.serviceId || services[0]?.id || 1,
      description: project.description || '',
      mainImage: project.mainImage || '',
      status: project.status ?? true,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const token = localStorage.getItem('token');
      try {
        await fetchAPI(`/admin/projects/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        setProjects(projects.filter((p) => p.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('serviceId', formData.serviceId);
    payload.append('description', formData.description);
    payload.append('status', formData.status);
    
    // Check for the file input
    const fileInput = document.getElementById('mainImageFile');
    if (fileInput && fileInput.files[0]) {
      payload.append('mainImage', fileInput.files[0]);
    }

    try {
      if (editingProject) {
        const updated = await fetchAPI(`/admin/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: payload
        });
        const selectedService = services.find((s) => String(s.id) === String(formData.serviceId)) || services[0];
        setProjects(projects.map((p) => (p.id === editingProject.id ? { ...updated, service: selectedService } : p)));
      } else {
        const created = await fetchAPI(`/admin/projects`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: payload
        });
        const selectedService = services.find((s) => String(s.id) === String(formData.serviceId)) || services[0];
        setProjects([...projects, { ...created, service: selectedService }]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save project: ' + err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header with "+ Add New" fixed top right pattern */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Manage Portfolio Projects</h1>
            <p className="text-xs text-slate-500 mt-1">Upload client work, linked service tags, and project image galleries</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-brand-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Project</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-100 text-xs uppercase text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Thumbnail</th>
                <th className="px-6 py-4">Project Title</th>
                <th className="px-6 py-4">Linked Service Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-100/40">
                  <td className="px-6 py-4">
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs">
                      {project.mainImage ? (
                        <img src={project.mainImage} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        'No IMG'
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 max-w-xs truncate">{project.title}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold rounded-full">
                      {project.service?.name || 'Commercial Signage'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {project.status ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-bold">
                        <XCircle className="w-4 h-4" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(project)}
                      className="p-2 text-slate-500 hover:text-brand-500 bg-slate-100 rounded-lg border border-slate-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 bg-slate-100 rounded-lg border border-slate-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Form */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProject ? 'Edit Project' : '+ Add New Portfolio Project'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Project Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Linked Service (Required Dropdown)</label>
              <select
                required
                value={formData.serviceId}
                onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              >
                {services.map((s) => (
                  <option key={s.id || s.slug} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Main Cover Photo</label>
              <input
                type="file"
                id="mainImageFile"
                accept="image/*"
                className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl px-4 py-2 text-sm outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-600 hover:file:bg-brand-100"
              />
              {editingProject && editingProject.mainImage && (
                <div className="mt-2 text-xs text-slate-500">
                  Current image: <a href={editingProject.mainImage} target="_blank" className="text-brand-500 underline">View</a>. Uploading a new file will replace it.
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Project Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Publish Status</label>
              <select
                value={formData.status ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              >
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 font-semibold text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md"
              >
                Save Project
              </button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}
