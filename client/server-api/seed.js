const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for Om Digital Prints...');

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@omdigitalprints.com' },
    update: { password: hashedPassword, name: 'Admin Manager' },
    create: {
      email: 'admin@omdigitalprints.com',
      password: hashedPassword,
      name: 'Admin Manager'
    }
  });
  console.log('✅ Admin user created:', admin.email);

  // Seed 6 services from Master Prompt specification
  const initialServices = [
    {
      name: 'Banner Flex Printing',
      slug: 'banner-flex-printing',
      icon: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Vibrant, weather-resistant flex banners for events, outdoor ads & brand promotions.',
      fullDesc: 'High-definition digital flex printing available in star flex, back-lit flex, and front-lit flex finishes. Optimized for UV resistance, vibrant color reproduction, and high outdoor durability.',
      status: true
    },
    {
      name: 'LED Board Creation',
      slug: 'led-board-creation',
      icon: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Custom 3D backlit LED glow sign boards engineered for maximum nighttime visibility.',
      fullDesc: 'Custom LED glow signboards crafted with energy-efficient modules, waterproof power drivers, and premium acrylic facings. Gives your retail storefront a high-end illuminated aesthetic.',
      status: true
    },
    {
      name: 'Acrylic Letter Signage',
      slug: 'acrylic-letter-signage',
      icon: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Laser-cut 3D acrylic letters with optional backlighting for sleek corporate branding.',
      fullDesc: 'Precision laser-machined acrylic block lettering. Available in solid colors, mirror chrome, rose gold, and backlit halo glow styles for interior reception walls and exterior facades.',
      status: true
    },
    {
      name: 'Rollup Standee',
      slug: 'rollup-standee',
      icon: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Portable aluminum roll-up banner standees for exhibitions, trade shows & retail desks.',
      fullDesc: 'Lightweight, durable aluminum roll-up standees equipped with high-resolution non-tearable PVC vinyl prints. Quick assembly with convenient carrying case included.',
      status: true
    },
    {
      name: 'Laser Cutting',
      slug: 'laser-cutting',
      icon: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'High-precision CNC laser cutting on Acrylic, MDF, Wood & Metal sheets.',
      fullDesc: 'Industrial CNC fiber and CO2 laser cutting for complex architectural patterns, decorative partitions, stencil lettering, and custom promotional items with hair-thin precision.',
      status: true
    },
    {
      name: 'Sunpack Sheet Printing',
      slug: 'sunpack-sheet-printing',
      icon: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Cost-effective corrugated sunpack board prints for pole ads, real estate & notices.',
      fullDesc: 'Multi-color screen and UV digital printing on lightweight corrugated plastic Sunpack sheets. Ideal for outdoor pole advertising, political campaigns, and directional signs.',
      status: true
    }
  ];

  for (const s of initialServices) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s
    });
  }
  console.log('✅ Services seeded successfully');

  // Seed 2-column Hero Slides (matching master prompt specification)
  const countSlides = await prisma.slide.count();
  if (countSlides === 0) {
    const slides = [
      {
        image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=1200&q=80',
        headline: 'High-Quality Flex Banners for Every Occasion',
        subtext: 'Get ultra-vibrant, weather-durable banner printing tailored for outdoor campaigns and corporate events with fastest 24-hour turnaround.',
        btnText: 'View Banner Services',
        btnLink: '/services/banner-flex-printing',
        order: 1,
        status: true
      },
      {
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
        headline: 'Illuminate Your Brand with Custom LED Boards',
        subtext: 'Command attention day & night with energy-efficient 3D backlit LED glow signboards built for modern storefronts.',
        btnText: 'Explore LED Signage',
        btnLink: '/services/led-board-creation',
        order: 2,
        status: true
      },
      {
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        headline: 'Premium 3D Acrylic & Laser Cut Signage',
        subtext: 'Elevate your office reception and outdoor frontage with high-precision laser cut acrylic lettering.',
        btnText: 'Discover Acrylic Signs',
        btnLink: '/services/acrylic-letter-signage',
        order: 3,
        status: true
      }
    ];

    for (const slide of slides) {
      await prisma.slide.create({ data: slide });
    }
    console.log('✅ Hero slides seeded successfully');
  }

  // Seed Sample Portfolio Projects linked to Services
  const countProjects = await prisma.project.count();
  if (countProjects === 0) {
    const flexService = await prisma.service.findUnique({ where: { slug: 'banner-flex-printing' } });
    const ledService = await prisma.service.findUnique({ where: { slug: 'led-board-creation' } });
    const acrylicService = await prisma.service.findUnique({ where: { slug: 'acrylic-letter-signage' } });

    if (flexService && ledService && acrylicService) {
      await prisma.project.create({
        data: {
          title: 'Mega City Mall Grand Opening Highway Banner',
          serviceId: flexService.id,
          mainImage: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=1000&q=80',
          description: 'A 50ft x 20ft outdoor star flex banner with reinforced eyelets and UV-resistant color inks.',
          completedAt: new Date(),
          status: true
        }
      });

      await prisma.project.create({
        data: {
          title: 'Apex Tech Park 3D Backlit LED Frontage',
          serviceId: ledService.id,
          mainImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
          description: 'Custom Samsung LED module powered waterproof acrylic letter signboard with 3-year warranty.',
          completedAt: new Date(),
          status: true
        }
      });

      await prisma.project.create({
        data: {
          title: 'Horizon Corporate HQ Lobby Acrylic Logo',
          serviceId: acrylicService.id,
          mainImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
          description: '12mm clear acrylic floating plaque with golden mirror cut acrylic lettering.',
          completedAt: new Date(),
          status: true
        }
      });

      console.log('✅ Sample portfolio projects seeded successfully');
    }
  }

  console.log('✨ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
