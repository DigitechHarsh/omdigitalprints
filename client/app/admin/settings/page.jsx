'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import { fetchAPI } from '../../../lib/api';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'Om Digital Prints',
    contactEmail: 'contact@omdigitalprints.com',
    contactPhone: '+91 9876543210',
    address: 'Mumbai, Maharashtra',
    whatsappNumber: '+91 9876543210',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAPI('/settings')
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch((err) => console.log('Failed to fetch settings'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const token = localStorage.getItem('token');
    try {
      await fetchAPI('/admin/settings', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(settings)
      });
      alert('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings: ' + err.message);
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
            <h1 className="text-2xl font-black text-slate-900">Global Settings</h1>
            <p className="text-xs text-slate-500 mt-1">Manage your company's core contact details and information</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden max-w-3xl">
          <form onSubmit={handleSave} className="p-6 space-y-6">
            
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={settings.companyName || ''}
                onChange={handleChange}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={settings.contactEmail || ''}
                  onChange={handleChange}
                  className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Contact Phone</label>
                <input
                  type="text"
                  name="contactPhone"
                  value={settings.contactPhone || ''}
                  onChange={handleChange}
                  className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Physical Address</label>
              <textarea
                name="address"
                rows="2"
                value={settings.address || ''}
                onChange={handleChange}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">WhatsApp Number (For floating button)</label>
              <input
                type="text"
                name="whatsappNumber"
                value={settings.whatsappNumber || ''}
                onChange={handleChange}
                className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
