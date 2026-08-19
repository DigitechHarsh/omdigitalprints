'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import Modal from '../../../components/Modal';
import { fetchAPI, fallbackServices } from '../../../lib/api';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState(fallbackServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    shortDesc: '',
    fullDesc: '',
    icon: '',
    status: true,
  });

  useEffect(() => {
    fetchAPI('/services')
      .then((data) => {
        if (data && data.length > 0) setServices(data);
      })
      .catch(() => setServices(fallbackServices));
  }, []);

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      name: '',
      slug: '',
      shortDesc: '',
      fullDesc: '',
      status: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      slug: service.slug,
      shortDesc: service.shortDesc || '',
      fullDesc: service.fullDesc || '',
      status: service.status ?? true,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const token = localStorage.getItem('token');
      try {
        await fetchAPI(`/admin/services/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        setServices(services.filter((s) => s.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleNameChange = (name) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData({ ...formData, name, slug });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('slug', formData.slug);
    payload.append('shortDesc', formData.shortDesc);
    payload.append('fullDesc', formData.fullDesc);
    payload.append('status', formData.status);
    
    // Check for the file input
    const fileInput = document.getElementById('iconFile');
    if (fileInput && fileInput.files[0]) {
      payload.append('icon', fileInput.files[0]);
    }

    try {
      if (editingService) {
        const updated = await fetchAPI(`/admin/services/${editingService.id}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: payload
        });
        setServices(services.map((s) => (s.id === editingService.id ? updated : s)));
      } else {
        const created = await fetchAPI(`/admin/services`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: payload
        });
        setServices([...services, created]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save service: ' + err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header with "+ Add New" fixed top right pattern */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Manage Service Catalog</h1>
            <p className="text-xs text-slate-500 mt-1">Add or update commercial printing & signage services dynamically</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-brand-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Service</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-100 text-xs uppercase text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Icon / Image</th>
                <th className="px-6 py-4">Service Name</th>
                <th className="px-6 py-4">URL Slug</th>
                <th className="px-6 py-4">Short Summary</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {services.map((service) => (
                <tr key={service.id || service.slug} className="hover:bg-slate-100/40">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs">
                      {service.icon ? (
                        <img src={service.icon} alt={service.name} className="w-full h-full object-cover" />
                      ) : (
                        'No IMG'
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">{service.name}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">/services/{service.slug}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 max-w-xs truncate">{service.shortDesc}</td>
                  <td className="px-6 py-4">
                    {service.status ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-bold">
                        <XCircle className="w-4 h-4" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(service)}
                      className="p-2 text-slate-500 hover:text-brand-500 bg-slate-100 rounded-lg border border-slate-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
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

        {/* Modal Drawer Form */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingService ? 'Edit Service' : '+ Add New Service'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Service Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">URL Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Short Description</label>
              <textarea
                rows={2}
                value={formData.shortDesc}
                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Full Specifications / Description</label>
              <textarea
                rows={4}
                value={formData.fullDesc}
                onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Icon / Thumbnail Image</label>
              <input
                type="file"
                id="iconFile"
                accept="image/*"
                className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl px-4 py-2 text-sm outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-600 hover:file:bg-brand-100"
              />
              {editingService && editingService.icon && (
                <div className="mt-2 text-xs text-slate-500">
                  Current image: <a href={editingService.icon} target="_blank" className="text-brand-500 underline">View</a>. Uploading a new file will replace it.
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Status</label>
              <select
                value={formData.status ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              >
                <option value="true">Active (Visible on public site)</option>
                <option value="false">Draft / Hidden</option>
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
                Save Service
              </button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}
