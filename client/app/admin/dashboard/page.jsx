'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import { fetchAPI, fallbackProjects, fallbackServices } from '../../../lib/api';
import { FolderKanban, Layers, Users, Bell, ArrowUpRight, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProjects: 3,
    totalServices: 6,
    totalLeads: 12,
    newLeads: 4,
    recentLeads: [
      { id: 1, name: 'Vikram Mehta', phone: '+91 98112 34567', service: 'LED Board Creation', status: 'New', createdAt: '2026-08-02' },
      { id: 2, name: 'Priya Sharma', phone: '+91 99554 11223', service: 'Banner Flex Printing', status: 'Contacted', createdAt: '2026-08-01' },
      { id: 3, name: 'Anil Gupta', phone: '+91 97788 99001', service: 'Acrylic Letter Signage', status: 'New', createdAt: '2026-07-31' },
    ],
    recentProjects: fallbackProjects
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchAPI('/admin/dashboard/stats', { headers: { Authorization: `Bearer ${token}` } })
      .then((data) => setStats(data))
      .catch(() => console.log('Using default client dashboard metrics'));
  }, []);

  const leadChartData = [
    { month: 'Mar', leads: 8 },
    { month: 'Apr', leads: 12 },
    { month: 'May', leads: 15 },
    { month: 'Jun', leads: 22 },
    { month: 'Jul', leads: 28 },
    { month: 'Aug', leads: 35 },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Topbar */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Dashboard Overview</h1>
            <p className="text-xs text-slate-500 mt-1">Welcome back, Admin Manager</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
            </button>
            <div className="flex items-center space-x-3 bg-white border border-slate-200 px-4 py-2 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center text-xs">
                AD
              </div>
              <span className="text-xs font-bold text-slate-200">Admin Staff</span>
            </div>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Projects</span>
              <FolderKanban className="w-5 h-5 text-brand-500" />
            </div>
            <div className="text-3xl font-black text-slate-900">{stats.totalProjects}</div>
            <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> +2 this week
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Services</span>
              <Layers className="w-5 h-5 text-accent-blue" />
            </div>
            <div className="text-3xl font-black text-slate-900">{stats.totalServices}</div>
            <p className="text-xs text-slate-500 mt-2 font-semibold">Dynamic & Extensible</p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Inquiries</span>
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-slate-900">{stats.totalLeads}</div>
            <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> +18% growth
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">New Leads</span>
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
            </div>
            <div className="text-3xl font-black text-amber-400">{stats.newLeads}</div>
            <p className="text-xs text-slate-500 mt-2 font-semibold">Requires Action</p>
          </div>
        </div>

        {/* Charts & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chart Col */}
          <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Customer Inquiries per Month</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadChartData}>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                  <Bar dataKey="leads" radius={[8, 8, 0, 0]}>
                    {leadChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 5 ? '#f97316' : '#0284c7'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity List */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Lead Inquiries</h3>
            <div className="space-y-3">
              {stats.recentLeads.map((lead) => (
                <div key={lead.id} className="p-3 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{lead.name}</h4>
                    <p className="text-[11px] text-slate-500">{lead.service || 'General Inquiry'}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                    lead.status === 'New' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
