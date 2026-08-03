'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from './BrandLogo';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-slate-50 text-slate-500 border-t border-slate-200/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <BrandLogo isDark={false} />
            <p className="text-sm text-slate-500 leading-relaxed pt-2">
              Om Digital Prints is your trusted partner for high-definition flex printing, custom 3D LED glow sign boards, laser cut acrylic letters, and premium outdoor marketing signage.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Follow Us:</span>
              <div className="flex space-x-2">
                <a href="#" className="w-8 h-8 rounded-lg bg-white hover:bg-brand-500 hover:text-slate-900 flex items-center justify-center transition-colors text-xs font-bold">FB</a>
                <a href="#" className="w-8 h-8 rounded-lg bg-white hover:bg-brand-500 hover:text-slate-900 flex items-center justify-center transition-colors text-xs font-bold">IG</a>
                <a href="#" className="w-8 h-8 rounded-lg bg-white hover:bg-brand-500 hover:text-slate-900 flex items-center justify-center transition-colors text-xs font-bold">WA</a>
              </div>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div>
            <h3 className="text-slate-900 font-bold text-base mb-4 tracking-wide uppercase">Our Services</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services/banner-flex-printing" className="hover:text-brand-500 transition-colors inline-flex items-center gap-1">
                  Banner Flex Printing <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link href="/services/led-board-creation" className="hover:text-brand-500 transition-colors inline-flex items-center gap-1">
                  LED Board Creation <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link href="/services/acrylic-letter-signage" className="hover:text-brand-500 transition-colors inline-flex items-center gap-1">
                  Acrylic Letter Signage <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link href="/services/rollup-standee" className="hover:text-brand-500 transition-colors inline-flex items-center gap-1">
                  Rollup Standee <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link href="/services/laser-cutting" className="hover:text-brand-500 transition-colors inline-flex items-center gap-1">
                  Laser Cutting <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
              <li>
                <Link href="/services/sunpack-sheet-printing" className="hover:text-brand-500 transition-colors inline-flex items-center gap-1">
                  Sunpack Sheet Printing <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h3 className="text-slate-900 font-bold text-base mb-4 tracking-wide uppercase">Get In Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <span>Shop No. 12, Main Commercial Market, Printing Hub Zone, City, Pin 110001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <a href="tel:+919825983623" className="hover:text-slate-900">+91 98259 83623</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <a href="mailto:info@omdigitalprints.com" className="hover:text-slate-900">info@omdigitalprints.com</a>
              </li>
              <li className="flex items-center space-x-3 text-xs text-slate-500">
                <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                <span>Mon - Sat: 9:30 AM - 8:30 PM (Sun Closed)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Admin Access */}
          <div>
            <h3 className="text-slate-900 font-bold text-base mb-4 tracking-wide uppercase">Quick Links</h3>
            <ul className="space-y-2.5 text-sm mb-6">
              <li><Link href="/" className="hover:text-brand-500 transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-brand-500 transition-colors">All Services</Link></li>
              <li><Link href="/projects" className="hover:text-brand-500 transition-colors">Portfolio / Projects</Link></li>
              <li><Link href="/about" className="hover:text-brand-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-brand-500 transition-colors">Contact Us</Link></li>
            </ul>

            <div className="pt-4 border-t border-slate-200">
              <Link
                href="/admin/login"
                className="text-xs text-slate-500 hover:text-brand-500 transition-colors inline-flex items-center gap-1 font-semibold"
              >
                🔐 Staff / Admin Portal Login
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Om Digital Prints. All Rights Reserved.</p>
          <p className="flex items-center space-x-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
