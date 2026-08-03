# Om Digital Prints — Web Application & Admin Panel

Full-stack production web application built for **Om Digital Prints** (Printing, Signage & Branding Solutions).

---

## 🌟 Key Features

### Public Website
- **Two-Column Split Hero Slider (Hard Requirement)**: Left column showcase image + right column headline, subtext, and custom CTA button. Smooth auto-play every 4.5s, hover pause, swipe gestures, manual arrows & dot indicators. Responsive vertical stack on mobile.
- **Dynamic Services Showcase**: 6 core commercial services (Banner Flex Printing, LED Board Creation, Acrylic Letter Signage, Rollup Standee, Laser Cutting, Sunpack Sheet Printing).
- **Portfolio Gallery**: Filterable category grid for completed signage projects with high-res modal previews.
- **Lead Inquiry System**: Quick quote form sending entries directly to DB and Admin Panel.
- **Contact Details & Floating WhatsApp Button**: Direct click-to-call and WhatsApp quick chat integration.

### Admin Management Panel (`/admin/login`)
- **Authentication**: JWT-based auth with secure login. Default credentials: `admin@omdigitalprints.com` / `admin123`.
- **Analytics Dashboard**: Interactive KPI metrics and chart visualization of monthly lead inquiries.
- **Manage Slider (`/admin/slider`)**: "+ Add New" modal form to add/edit/reorder homepage hero slides dynamically.
- **Manage Service (`/admin/services`)**: Dynamic service CRUD management.
- **Manage Projects (`/admin/projects`)**: Upload project photos linked with service dropdown categories.
- **Contact Leads (`/admin/leads`)**: Track customer quote requests with status management (New, Contacted, Closed).

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, Framer Motion, Lucide Icons, Recharts.
- **Backend**: Express.js (Node.js REST API).
- **Database & ORM**: MySQL / SQLite via Prisma ORM.
- **File Uploads**: Multer server-side image upload handler.

---

## 🚀 Local Development Setup

### 1. Install Dependencies
From the root folder, run:
```bash
npm run install:all
```

### 2. Seed Initial Database
Initialize the Prisma database schema and seed default data (admin user + 6 services + hero slides + sample projects):
```bash
cd server
npm run db:push
npm run db:seed
```

### 3. Run Development Servers
From the root directory:
```bash
npm run dev
```
- **Public Site & Admin**: `http://localhost:3000`
- **Express API**: `http://localhost:5000`

---

## 🌐 Hostinger Deployment Guide

### 1. Database Setup on Hostinger hPanel
1. Log into **Hostinger hPanel** -> **MySQL Databases**.
2. Create database name: `u123456789_omdigital`, user: `u123456789_admin`, and password.
3. Update `server/.env` and `server/prisma/schema.prisma`:
   - In `schema.prisma`: change `provider = "sqlite"` to `provider = "mysql"`.
   - In `server/.env`: set `DATABASE_URL="mysql://u123456789_admin:YOUR_PASSWORD@localhost:3306/u123456789_omdigital"`.
4. Run `npx prisma db push` and `npx prisma db seed`.

### 2. GoDaddy Domain Connection
1. In Hostinger hPanel, locate your Hostinger Nameservers (e.g. `ns1.dns-parking.com` / `ns2.dns-parking.com`).
2. Log in to GoDaddy -> Domains -> DNS -> Change Nameservers to Hostinger's custom nameservers.
3. In Hostinger hPanel, click **Add Website** and select your domain name.

### 3. Node.js App Deployment
1. Upload `/client` and `/server` code to your Hostinger Node.js hosting instance.
2. Set environment variables: `PORT=5000`, `NODE_ENV=production`, `JWT_SECRET`, `NEXT_PUBLIC_API_URL`.
3. Run `npm run build` in `client` and start the server using `npm start`.
