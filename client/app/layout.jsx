import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export const metadata = {
  title: 'Om Digital Prints | Premier Flex Banner, 3D LED Board & Acrylic Signage',
  description: 'Om Digital Prints offers high-definition banner flex printing, 3D backlit LED glow sign boards, laser cut acrylic letters, rollup standees & sunpack sheet printing with fast turnaround.',
  keywords: 'Flex banner printing, 3D LED board creation, Acrylic letters, Rollup standees, Laser cutting, Sunpack sheet printing, Om Digital Prints',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased selection:bg-brand-500 selection:text-white">
        <Header />
        <main className="flex-grow">{children}</main>

        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
