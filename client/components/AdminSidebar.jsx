'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import BrandLogo from './BrandLogo';
import {
  LayoutDashboard,
  SlidersHorizontal,
  Layers,
  FolderKanban,
  Users,
  LogOut,
  ChevronRight
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Slider', href: '/admin/slider', icon: SlidersHorizontal },
    { name: 'Manage Service', href: '/admin/services', icon: Layers },
    { name: 'Manage Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Contact Leads', href: '/admin/leads', icon: Users },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.warn('Logout API failed:', e);
    }
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 text-slate-600 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Header Logo */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <BrandLogo isDark={false} />
        </div>

        {/* Admin Navigation */}
        <nav className="p-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold tracking-wider uppercase text-slate-500">
            Admin Management
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <div className="p-4 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
