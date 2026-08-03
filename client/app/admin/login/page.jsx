'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BrandLogo from '../../../components/BrandLogo';
import { Lock, Mail, ArrowRight, ShieldAlert } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@omdigitalprints.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.token) {
        localStorage.setItem('adminToken', data.token);
      }
      router.push('/admin/dashboard');
    } catch (err) {
      // Demo fallback bypass for offline client preview
      if (email === 'admin@omdigitalprints.com' && password === 'admin123') {
        localStorage.setItem('adminToken', 'mock-jwt-token-demo');
        router.push('/admin/dashboard');
      } else {
        setError(err.message || 'Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl space-y-8">
        
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <BrandLogo isDark={false} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight pt-2">Admin Portal Login</h2>
          <p className="text-xs text-slate-500">Sign in to manage homepage hero sliders, services, projects & customer leads.</p>
        </div>

        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center space-x-3 text-rose-400 text-xs">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Admin Email</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-100 border border-slate-200 focus:border-brand-500 text-slate-900 rounded-xl pl-11 pr-4 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-100 border border-slate-200 focus:border-brand-500 text-slate-900 rounded-xl pl-11 pr-4 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-brand-500/10 rounded-xl border border-brand-500/20 text-[11px] text-brand-400">
            <strong>Default Credentials:</strong> admin@omdigitalprints.com / admin123
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center space-x-2 transition-all"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
