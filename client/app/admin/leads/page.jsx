'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import { fetchAPI } from '../../../lib/api';
import { Users, Search, Phone, Mail, Trash2, CheckCircle2 } from 'lucide-react';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([
    { id: 1, name: 'Vikram Mehta', phone: '+91 98112 34567', email: 'vikram@techpark.com', service: 'LED Board Creation', message: 'Need 3D backlit LED board for main entrance, size 15ft x 4ft.', status: 'New', createdAt: '2026-08-02' },
    { id: 2, name: 'Priya Sharma', phone: '+91 99554 11223', email: 'priya@events.com', service: 'Banner Flex Printing', message: 'Urgent requirement of 5 highway star flex banners.', status: 'Contacted', createdAt: '2026-08-01' },
    { id: 3, name: 'Anil Gupta', phone: '+91 97788 99001', email: 'anil@decor.com', service: 'Acrylic Letter Signage', message: 'Reception floating plaque requirement.', status: 'Closed', createdAt: '2026-07-31' },
  ]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAPI('/admin/leads')
      .then((data) => {
        if (data && data.length > 0) setLeads(data);
      })
      .catch(() => console.log('Using initial sample lead data'));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    fetchAPI(`/admin/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus }),
    }).catch(() => {});
  };

  const handleDelete = (id) => {
    if (confirm('Delete lead record permanently?')) {
      setLeads(leads.filter((l) => l.id !== id));
      fetchAPI(`/admin/leads/${id}`, { method: 'DELETE' }).catch(() => {});
    }
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      (l.email && l.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Contact Leads</h1>
            <p className="text-xs text-slate-500 mt-1">Review incoming customer quote requests and update follow-up statuses</p>
          </div>

          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search leads by name/phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 focus:border-brand-500 text-slate-900 rounded-xl pl-10 pr-4 py-2 text-xs outline-none"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-100 text-xs uppercase text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Inquiry Message</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-100/40">
                  <td className="px-6 py-4 font-bold text-slate-900">{lead.name}</td>
                  <td className="px-6 py-4 space-y-1">
                    <a href={`tel:${lead.phone}`} className="text-xs text-brand-400 font-semibold flex items-center gap-1 hover:underline">
                      <Phone className="w-3.5 h-3.5" /> {lead.phone}
                    </a>
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="text-xs text-slate-500 flex items-center gap-1 hover:underline">
                        <Mail className="w-3.5 h-3.5" /> {lead.email}
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600 max-w-sm">
                    {lead.message || 'No additional details provided'}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1 rounded-xl outline-none border border-slate-200 bg-slate-100 ${
                        lead.status === 'New'
                          ? 'text-amber-400 border-amber-500/30'
                          : lead.status === 'Contacted'
                          ? 'text-accent-blue border-accent-blue/30'
                          : 'text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(lead.id)}
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
      </main>
    </div>
  );
}
