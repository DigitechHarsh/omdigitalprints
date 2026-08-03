# Master Prompt: Om Digital Prints — Website + Admin Panel

## 0. Purpose of This Document
This is a master build prompt for developing a full-stack business website with an
admin panel for **Om Digital Prints**, a printing & signage business. Use this as the
single source of truth when generating code, scaffolding the project, or briefing a
developer / AI coding agent (e.g. Claude Code).

---

## 1. Business Context

- **Business Name:** Om Digital Prints
- **Industry:** Printing, Signage & Branding Solutions
- **Logo:** Provided directly in the project directory at `/public/assets/logo.png`
  (and `/public/assets/logo-white.png` for dark backgrounds). Do NOT generate a
  placeholder logo — reference the provided file.
- **Services Offered:**
  1. Banner Flex Printing
  2. LED Board Creation
  3. Acrylic Letter (3D/backlit acrylic signage)
  4. Rollup Standee
  5. Laser Cutting
  6. Sunpack Sheet Printing
  7. *(Services list must be dynamic/extensible — admin can add more via "Manage Service")*

---

## 2. Tech Stack (Mandatory)

| Layer | Technology |
|---|---|
| Frontend | Next.js (React 18, App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Backend | Node.js + Express.js (REST API) |
| Database | MySQL (hosted on Hostinger) |
| ORM | Prisma or Sequelize (Prisma preferred, MySQL provider) |
| Image Uploads | Multer (server-side) → stored in `/uploads` or Hostinger file storage, path saved in DB |
| Auth (Admin) | JWT-based auth, stored in httpOnly cookie |
| Charts (Admin Dashboard) | Recharts or Chart.js |
| Deployment | Frontend + Backend on Hostinger (Node.js hosting), MySQL via Hostinger DB |

**Project structure (monorepo style):**
```
om-digital-prints/
├── client/                 # Next.js app (public site + admin panel)
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.jsx              → Home
│   │   │   ├── services/[slug]/page.jsx
│   │   │   ├── projects/page.jsx
│   │   │   ├── projects/[id]/page.jsx
│   │   │   ├── about/page.jsx
│   │   │   └── contact/page.jsx
│   │   └── admin/
│   │       ├── login/page.jsx
│   │       ├── dashboard/page.jsx
│   │       ├── slider/page.jsx
│   │       ├── services/page.jsx
│   │       ├── projects/page.jsx
│   │       └── leads/page.jsx
│   ├── components/
│   ├── public/assets/logo.png
│   └── ...
├── server/                 # Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/ (Prisma schema)
│   │   ├── middleware/ (auth, upload)
│   │   └── index.js
│   └── prisma/schema.prisma
└── README.md
```

---

## 3. Public Website — Pages & UX Requirements

### 3.1 Global
- Sticky/transparent-on-scroll header with logo (left), nav links (center/right),
  and a prominent **"Get a Quote" / "Contact Us"** CTA button.
- Footer with logo, services quick-links, contact info, social icons, Google Maps
  embed (optional), and copyright.
- Mobile-first, fully responsive (breakpoints: sm/md/lg/xl via Tailwind).
- Framer Motion for: fade/slide-in on scroll (sections), hover scale on cards,
  smooth page transitions.
- Consistent color system derived from brand (suggest a bold primary — e.g. deep
  blue/orange print-industry palette) + neutral grays. Define as Tailwind theme
  tokens (`primary`, `secondary`, `accent`, `dark`, `light`).

### 3.2 Hero / Header Banner — **Slider (Critical Requirement)**
This is the most important UI element on the homepage. Build a **two-column hero
slider**, NOT a full-bleed image slider.

**Layout spec:**
- Full-width hero section, split into **2 neighboring divs**:
  - **Left div (≈50%):** Large product/project image (banner, LED board, acrylic
    letters, etc.), rounded corners, subtle shadow, Framer Motion slide-in from left.
  - **Right div (≈50%):** Text content — headline, short description, 1–2 CTA
    buttons ("View Services", "Get Free Quote"), Framer Motion slide-in from right.
- The **entire pair (image + text) auto-rotates as a slide** — i.e., each slide has
  its own image AND matching text (not just the image changing). Example slides:
  1. Banner Flex Printing — image + "High-Quality Flex Banners for Every Occasion"
  2. LED Board Creation — image + "Illuminate Your Brand with Custom LED Boards"
  3. Acrylic Letters — image + "Premium 3D Acrylic Signage"
- Auto-play every 4–5 seconds, pause on hover, manual arrows + dot indicators.
- On mobile: stack vertically (image on top, text below), maintain animation.
- Slide content must be **fully manageable from the admin panel** ("Manage Slider")
  — image, headline, subtext, button text/link, per slide.

### 3.3 Home Page Sections (in order)
1. Hero Slider (as above)
2. "Why Choose Us" strip (icons: quality, turnaround time, pricing, experience)
3. Services grid (cards for each service — icon/image, name, short desc, "Learn
   More" → service detail page). Pulled dynamically from DB.
4. Featured Projects (recent uploads from admin, filterable by service category,
   image grid/masonry with hover overlay + lightbox)
5. Stats counter (projects completed, years of experience, clients — animated count-up)
6. Testimonials (optional, carousel)
7. CTA banner ("Ready to start your project?" + contact button)
8. Contact form + map + business details (footer-adjacent section)

### 3.4 Services Page / Service Detail Page
- `/services` — grid of all services (from DB).
- `/services/[slug]` — service detail: banner image, description, related
  projects (filtered by that service), specifications/features list, CTA.

### 3.5 Projects / Portfolio Page
- `/projects` — masonry/grid gallery, filter by service category (tabs/dropdown),
  each project card shows thumbnail, title, service tag.
- `/projects/[id]` — full project detail: image gallery/carousel, description,
  service used, date completed.

### 3.6 Contact Page
- Contact form: Name, Phone, Email, Service Interested In (dropdown from DB
  services), Message.
- On submit → POST to `/api/leads` → stored in DB → visible in admin "Contact Leads".
- Also show business address, phone (click-to-call), WhatsApp button (floating,
  fixed bottom-right on all pages), email, embedded Google Map.

---

## 4. Admin Panel — Requirements

### 4.1 Access
- `/admin/login` — email + password, JWT auth, protected routes via middleware.
- Single admin role is sufficient (unless multiple staff logins are needed later).

### 4.2 Layout
- Sidebar navigation (collapsible) with icons + labels:
  - Dashboard
  - Manage Slider
  - Manage Service
  - Manage Projects
  - Contact Leads
  - (Settings — optional, for business info/logo/social links)
- Topbar: page title (left), admin profile/logout (right).
- **Every "Manage" screen (Slider, Service, Projects) must have a "+ Add New"
  button fixed at the top-right of the page**, opening a modal or side-drawer
  form for creation. Same pattern for Edit (pencil icon) and Delete (trash icon,
  with confirmation dialog) on each list item/row.
- Use a consistent data table component: search bar, pagination, status badges
  (e.g., Active/Inactive), sortable columns.

### 4.3 Dashboard (`/admin/dashboard`)
- KPI cards: Total Projects, Total Services, Total Leads (this month), New Leads
  (unread).
- Charts (Recharts/Chart.js):
  - Bar/Line chart: Leads received per month (last 6–12 months).
  - Pie/Donut chart: Projects distribution by service category.
  - Bar chart: Most requested services (based on lead form "service interested"
    field).
- Recent activity list: last 5 leads, last 5 projects added.

### 4.4 Manage Slider (`/admin/slider`)
- Table: thumbnail, headline, order/position, status (active/inactive), actions.
- "+ Add New" → form: Image upload, Headline, Subtext, Button Text, Button Link,
  Display Order, Status toggle.
- Drag-to-reorder (nice-to-have) or numeric order field (must-have).

### 4.5 Manage Service (`/admin/services`)
- Table: icon/image, service name, slug, status, actions.
- "+ Add New" → form: Service Name, Slug (auto-generate, editable), Icon/Image
  upload, Short Description, Full Description (rich text), Status toggle.
- This list feeds the dropdown used in "Manage Projects" (service selection) and
  the public site's service filter and contact form dropdown.

### 4.6 Manage Projects (`/admin/projects`)
- Table: thumbnail, project title, linked service, date, status, actions.
- "+ Add New" → form:
  - Project Title
  - **Service (dropdown, populated from Manage Service list — required field)**
  - **Photo Upload (multi-image upload supported — main image + gallery images)**
  - Description
  - Date Completed
  - Status toggle (Published/Draft)
- Image upload component: drag-and-drop or click-to-browse, image preview
  thumbnails before submit, progress indicator, validation (file type/size).

### 4.7 Contact Leads (`/admin/leads`)
- Table: name, phone, email, service interested, message (truncated, click to
  expand), date submitted, status (New/Contacted/Closed).
- Actions: mark status, delete, click-to-call/email icons.
- Filter/search by name, service, status, date range.
- Export to CSV (nice-to-have).

---

## 5. Database Schema (MySQL — via Prisma)

```prisma
model Service {
  id          Int       @id @default(autoincrement())
  name        String
  slug        String    @unique
  icon        String?
  shortDesc   String?
  fullDesc    String?   @db.Text
  status      Boolean   @default(true)
  createdAt   DateTime  @default(now())
  projects    Project[]
}

model Project {
  id          Int       @id @default(autoincrement())
  title       String
  serviceId   Int
  service     Service   @relation(fields: [serviceId], references: [id])
  mainImage   String
  gallery     ProjectImage[]
  description String?   @db.Text
  completedAt DateTime?
  status      Boolean   @default(true)
  createdAt   DateTime  @default(now())
}

model ProjectImage {
  id         Int      @id @default(autoincrement())
  projectId  Int
  project    Project  @relation(fields: [projectId], references: [id])
  imageUrl   String
}

model Slide {
  id          Int      @id @default(autoincrement())
  image       String
  headline    String
  subtext     String?
  btnText     String?
  btnLink     String?
  order       Int      @default(0)
  status      Boolean  @default(true)
}

model Lead {
  id          Int      @id @default(autoincrement())
  name        String
  phone       String
  email       String?
  serviceId   Int?
  message     String?  @db.Text
  status      String   @default("New") // New, Contacted, Closed
  createdAt   DateTime @default(now())
}

model Admin {
  id          Int      @id @default(autoincrement())
  email       String   @unique
  password    String   // hashed with bcrypt
  name        String?
}
```

---

## 6. API Endpoints (Express)

```
Auth
POST   /api/auth/login

Public
GET    /api/services
GET    /api/services/:slug
GET    /api/projects
GET    /api/projects/:id
GET    /api/slides
POST   /api/leads

Admin (JWT protected)
GET|POST|PUT|DELETE  /api/admin/services
GET|POST|PUT|DELETE  /api/admin/projects
POST                  /api/admin/projects/upload   (multer, multi-image)
GET|POST|PUT|DELETE  /api/admin/slides
POST                  /api/admin/slides/upload
GET|PUT|DELETE        /api/admin/leads
GET                    /api/admin/dashboard/stats
```

---

## 7. UI/UX Design Guidelines

- **Design tone:** modern, clean, trustworthy, slightly bold (print/signage
  industry — use strong color accents and crisp imagery over generic stock
  templates).
- Typography: one distinctive display font for headings, clean sans-serif for
  body (e.g. via `next/font`).
- Generous white space, consistent 8px spacing scale via Tailwind.
- Buttons: clear primary/secondary/ghost variants, hover + active states,
  rounded-lg, subtle shadow on primary CTA.
- All images lazy-loaded (`next/image`), optimized, with graceful loading
  skeletons.
- Admin panel: neutral, functional, data-dense but readable — avoid the public
  site's marketing styling; use a dashboard-style design system (cards, tables,
  soft shadows, muted background).
- Accessibility: proper alt text on images, sufficient color contrast, keyboard-
  navigable forms and modals.
- Animations should enhance, not delay — keep Framer Motion durations short
  (0.3–0.6s), avoid blocking interaction.

---

## 8. Deployment Notes (Hostinger)

- MySQL database created via Hostinger hPanel; connection string in `.env`
  (`DATABASE_URL`).
- Node.js app (Express API) deployed via Hostinger Node.js hosting or VPS.
- Next.js frontend deployed as a Node app (SSR) or exported/static where
  possible, served via Hostinger.
- Uploaded images stored in a persistent `/uploads` directory on the server (or
  moved to Hostinger's file manager path); ensure this path is backed up and
  excluded from build artifacts.
- Environment variables required: `DATABASE_URL`, `JWT_SECRET`, `PORT`,
  `NEXT_PUBLIC_API_URL`, `UPLOAD_DIR`.

---

## 9. Build Priority Order (Suggested)

1. Scaffold monorepo (client + server), set up Tailwind, Prisma + MySQL connection.
2. Build DB schema + seed with the 6 real services.
3. Build Express API (public + admin routes, auth, upload middleware).
4. Build public site: layout, header/nav, footer, homepage hero slider, services,
   projects, contact.
5. Build admin panel: login, layout/sidebar, dashboard, then Manage Slider →
   Manage Service → Manage Projects → Contact Leads.
6. Wire admin CRUD to public site (slider, services, projects all pull live data).
7. Polish: Framer Motion pass, responsive QA, image optimization, SEO
   (meta tags, sitemap, robots.txt).
8. Deploy to Hostinger, connect production MySQL, test end-to-end.

---

## 10. Notes for the AI Coding Agent

- Always use the actual logo file provided in `/public/assets/logo.png` — never
  generate or invent a logo.
- Keep the 6 listed services as seed/default data, but the system must treat
  services as fully dynamic (admin-manageable), not hardcoded.
- Every "Manage" page in the admin panel must follow the same **+ Add New (top
  right) → modal/drawer form → table list below** pattern for consistency.
- The hero slider's 2-column (image-left, text-right) layout is a hard
  requirement — do not substitute a plain full-width image carousel.
- Prioritize a working end-to-end flow (DB → API → admin CRUD → public display)
  over exhaustive styling on the first pass; polish UI after functionality is
  confirmed.
