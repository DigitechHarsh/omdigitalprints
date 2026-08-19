'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import { fetchAPI } from '../../../lib/api';

export default function AdminSEOPage() {
  const [seo, setSeo] = useState({
    metaTitle: 'Om Digital Prints | Commercial Printing & Signage',
    metaDescription: 'Best commercial printing, banner flex, LED boards and acrylic signage services in Mumbai.',
    metaKeywords: 'printing, flex banner, led board, acrylic letters',
    ogImage: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAPI('/settings')
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          // Only pick SEO related fields if they exist
          setSeo((prev) => ({
            ...prev,
            metaTitle: data.metaTitle || prev.metaTitle,
            metaDescription: data.metaDescription || prev.metaDescription,
            metaKeywords: data.metaKeywords || prev.metaKeywords,
            ogImage: data.ogImage || prev.ogImage,
          }));
        }
      })
      .catch((err) => console.log('Failed to fetch SEO settings'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const token = localStorage.getItem('token');
    try {
      await fetchAPI('/admin/settings', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(seo)
      });
      alert('SEO Settings saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save SEO settings: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Search Engine Optimization (SEO)</h1>
            <p className="text-xs text-slate-500 mt-1">Manage global meta tags and indexing properties for higher search rankings</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden max-w-3xl">
          <form onSubmit={handleSave} className="p-6 space-y-6">
            
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Global Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                value={seo.metaTitle || ''}
                onChange={handleChange}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-1">Keep it under 60 characters for best results in Google.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Global Meta Description</label>
              <textarea
                name="metaDescription"
                rows="3"
                value={seo.metaDescription || ''}
                onChange={handleChange}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-1">A brief summary of your website. Keep it between 150-160 characters.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Meta Keywords (Comma separated)</label>
              <input
                type="text"
                name="metaKeywords"
                value={seo.metaKeywords || ''}
                onChange={handleChange}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Open Graph (OG) Image URL</label>
              <input
                type="text"
                name="ogImage"
                value={seo.ogImage || ''}
                onChange={handleChange}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-1">This image appears when your website link is shared on WhatsApp, Facebook, etc.</p>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save SEO Settings'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
