'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import Modal from '../../../components/Modal';
import { fetchAPI, fallbackSlides } from '../../../lib/api';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminSliderPage() {
  const [slides, setSlides] = useState(fallbackSlides);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [formData, setFormData] = useState({
    headline: '',
    subtext: '',
    btnText: 'Explore Services',
    btnLink: '/services',
    image: '',
    order: 0,
    status: true,
  });

  useEffect(() => {
    fetchAPI('/slides')
      .then((data) => {
        if (data && data.length > 0) setSlides(data);
      })
      .catch(() => setSlides(fallbackSlides));
  }, []);

  const handleOpenAdd = () => {
    setEditingSlide(null);
    setFormData({
      headline: '',
      subtext: '',
      btnText: 'Explore Services',
      btnLink: '/services',
      image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=1200&q=80',
      order: slides.length + 1,
      status: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (slide) => {
    setEditingSlide(slide);
    setFormData({
      headline: slide.headline,
      subtext: slide.subtext || '',
      btnText: slide.btnText || 'Explore Services',
      btnLink: slide.btnLink || '/services',
      image: slide.image || '',
      order: slide.order || 0,
      status: slide.status ?? true,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      setSlides(slides.filter((s) => s.id !== id));
      fetchAPI(`/admin/slides/${id}`, { method: 'DELETE' }).catch(() => {});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const form = new FormData();
    form.append('headline', formData.headline);
    form.append('subtext', formData.subtext);
    form.append('btnText', formData.btnText);
    form.append('btnLink', formData.btnLink);
    form.append('order', formData.order);
    form.append('status', formData.status);
    
    if (formData.imageFile) {
      form.append('image', formData.imageFile);
    } else if (formData.image) {
      form.append('image', formData.image);
    }

    if (formData.bgImageFile) {
      form.append('bgImage', formData.bgImageFile);
    } else if (formData.bgImage) {
      form.append('bgImage', formData.bgImage);
    }

    try {
      if (editingSlide) {
        const res = await fetchAPI(`/admin/slides/${editingSlide.id}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });
        setSlides(slides.map((s) => (s.id === editingSlide.id ? res : s)));
      } else {
        const res = await fetchAPI('/admin/slides', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });
        setSlides([...slides, res]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save slide');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header with "+ Add New" fixed top right pattern */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Manage Hero Slider</h1>
            <p className="text-xs text-slate-500 mt-1">Configure homepage 2-column split slides (card image + bg image + headline + CTA)</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-brand-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Slide</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-100 text-xs uppercase text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Card Image</th>
                <th className="px-6 py-4">Background Image</th>
                <th className="px-6 py-4">Headline & Subtext</th>
                <th className="px-6 py-4">Button Link</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {slides.map((slide) => (
                <tr key={slide.id} className="hover:bg-slate-100/40">
                  <td className="px-6 py-4">
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                      <img src={slide.image} alt="Card Thumbnail" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-24 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                      <img src={slide.bgImage || slide.image} alt="BG Thumbnail" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 max-w-xs truncate">{slide.headline}</div>
                    <div className="text-xs text-slate-500 max-w-xs truncate">{slide.subtext}</div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">{slide.btnLink}</td>
                  <td className="px-6 py-4 font-bold text-brand-500">{slide.order}</td>
                  <td className="px-6 py-4">
                    {slide.status ? (
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
                      onClick={() => handleOpenEdit(slide)}
                      className="p-2 text-slate-500 hover:text-brand-500 bg-slate-100 rounded-lg border border-slate-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(slide.id)}
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
          title={editingSlide ? 'Edit Hero Slide' : '+ Add New Hero Slide'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Headline *</label>
              <input
                type="text"
                required
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Subtext / Description</label>
              <textarea
                rows={2}
                value={formData.subtext}
                onChange={(e) => setFormData({ ...formData, subtext: e.target.value })}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Button Label</label>
                <input
                  type="text"
                  value={formData.btnText}
                  onChange={(e) => setFormData({ ...formData, btnText: e.target.value })}
                  className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Button URL Link</label>
                <input
                  type="text"
                  value={formData.btnLink}
                  onChange={(e) => setFormData({ ...formData, btnLink: e.target.value })}
                  className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Front Card Image (File)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })}
                  className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2 text-sm outline-none"
                />
                {!formData.imageFile && formData.image && (
                  <p className="text-[10px] text-slate-500 mt-1 truncate">Current: {formData.image}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Background Image (File)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, bgImageFile: e.target.files[0] })}
                  className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2 text-sm outline-none"
                />
                {!formData.bgImageFile && formData.bgImage && (
                  <p className="text-[10px] text-slate-500 mt-1 truncate">Current: {formData.bgImage}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Status</label>
                <select
                  value={formData.status ? 'true' : 'false'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
                  className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
                >
                  <option value="true">Active</option>
                  <option value="false">Draft / Inactive</option>
                </select>
              </div>
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
                Save Slide
              </button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}
