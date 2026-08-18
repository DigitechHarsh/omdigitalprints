const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchAPI(endpoint, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'omit', // or 'include' if sending auth cookies across origins
  };

  if (options.body && options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, config);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`API call failed for ${endpoint}:`, error.message);
    throw error;
  }
}

// Fallback Mock Data for instant client SSR/prerendering resilience
export const fallbackServices = [
  {
    id: 1,
    name: 'Banner Flex Printing',
    slug: 'banner-flex-printing',
    icon: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Vibrant, weather-resistant flex banners for events, outdoor ads & brand promotions.',
    fullDesc: 'High-definition digital flex printing available in star flex, back-lit flex, and front-lit flex finishes. Optimized for UV resistance, vibrant color reproduction, and high outdoor durability.',
    status: true
  },
  {
    id: 2,
    name: 'LED Board Creation',
    slug: 'led-board-creation',
    icon: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Custom 3D backlit LED glow sign boards engineered for maximum nighttime visibility.',
    fullDesc: 'Custom LED glow signboards crafted with energy-efficient modules, waterproof power drivers, and premium acrylic facings. Gives your retail storefront a high-end illuminated aesthetic.',
    status: true
  },
  {
    id: 3,
    name: 'Acrylic Letter Signage',
    slug: 'acrylic-letter-signage',
    icon: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Laser-cut 3D acrylic letters with optional backlighting for sleek corporate branding.',
    fullDesc: 'Precision laser-machined acrylic block lettering. Available in solid colors, mirror chrome, rose gold, and backlit halo glow styles for interior reception walls and exterior facades.',
    status: true
  },
  {
    id: 4,
    name: 'Rollup Standee',
    slug: 'rollup-standee',
    icon: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Portable aluminum roll-up banner standees for exhibitions, trade shows & retail desks.',
    fullDesc: 'Lightweight, durable aluminum roll-up standees equipped with high-resolution non-tearable PVC vinyl prints. Quick assembly with convenient carrying case included.',
    status: true
  },
  {
    id: 5,
    name: 'Laser Cutting',
    slug: 'laser-cutting',
    icon: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'High-precision CNC laser cutting on Acrylic, MDF, Wood & Metal sheets.',
    fullDesc: 'Industrial CNC fiber and CO2 laser cutting for complex architectural patterns, decorative partitions, stencil lettering, and custom promotional items with hair-thin precision.',
    status: true
  },
  {
    id: 6,
    name: 'Sunpack Sheet Printing',
    slug: 'sunpack-sheet-printing',
    icon: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Cost-effective corrugated sunpack board prints for pole ads, real estate & notices.',
    fullDesc: 'Multi-color screen and UV digital printing on lightweight corrugated plastic Sunpack sheets. Ideal for outdoor pole advertising, political campaigns, and directional signs.',
    status: true
  }
];

export const fallbackSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=1200&q=80',
    bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=80',
    headline: 'High-Quality Flex Banners for Every Occasion',
    subtext: 'Get ultra-vibrant, weather-durable banner printing tailored for outdoor campaigns and corporate events with fastest 24-hour turnaround.',
    btnText: 'View Banner Services',
    btnLink: '/services/banner-flex-printing',
    order: 1,
    status: true
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    bgImage: 'https://images.unsplash.com/photo-1596522354195-e84ae3c98731?auto=format&fit=crop&w=2000&q=80',
    headline: 'Illuminate Your Brand with Custom LED Boards',
    subtext: 'Command attention day & night with energy-efficient 3D backlit LED glow signboards built for modern storefronts.',
    btnText: 'Explore LED Signage',
    btnLink: '/services/led-board-creation',
    order: 2,
    status: true
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    bgImage: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?auto=format&fit=crop&w=2000&q=80',
    headline: 'Premium 3D Acrylic & Laser Cut Signage',
    subtext: 'Elevate your office reception and outdoor frontage with high-precision laser cut acrylic lettering.',
    btnText: 'Discover Acrylic Signs',
    btnLink: '/services/acrylic-letter-signage',
    order: 3,
    status: true
  }
];

export const fallbackProjects = [
  {
    id: 1,
    title: 'Mega City Mall Grand Opening Highway Banner',
    serviceId: 1,
    service: { id: 1, name: 'Banner Flex Printing', slug: 'banner-flex-printing' },
    mainImage: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=1000&q=80',
    description: 'A 50ft x 20ft outdoor star flex banner with reinforced eyelets and UV-resistant color inks.',
    completedAt: '2026-07-15T00:00:00.000Z',
    status: true,
    gallery: []
  },
  {
    id: 2,
    title: 'Apex Tech Park 3D Backlit LED Frontage',
    serviceId: 2,
    service: { id: 2, name: 'LED Board Creation', slug: 'led-board-creation' },
    mainImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
    description: 'Custom Samsung LED module powered waterproof acrylic letter signboard with 3-year warranty.',
    completedAt: '2026-07-20T00:00:00.000Z',
    status: true,
    gallery: []
  },
  {
    id: 3,
    title: 'Horizon Corporate HQ Lobby Acrylic Logo',
    serviceId: 3,
    service: { id: 3, name: 'Acrylic Letter Signage', slug: 'acrylic-letter-signage' },
    mainImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    description: '12mm clear acrylic floating plaque with golden mirror cut acrylic lettering.',
    completedAt: '2026-07-28T00:00:00.000Z',
    status: true,
    gallery: []
  }
];
