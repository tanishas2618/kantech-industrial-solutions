# KANTECH INDUSTRIAL SOLUTIONS — Website

Premium recruitment consultancy website built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **MongoDB Atlas**.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up MongoDB Atlas
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new **Cluster** (free M0 tier)
3. Under **Database Access** → Add a new user with read/write permission
4. Under **Network Access** → Allow access from anywhere (`0.0.0.0/0`) for development
5. Under **Clusters** → Click **Connect** → **Connect your application** → Copy the URI

### 3. Configure environment
Edit `.env.local` and replace the MongoDB URI:
```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/kantech_db?retryWrites=true&w=majority
JWT_SECRET=kantech_jwt_super_secret_2025
ADMIN_USERNAME=admin
ADMIN_PASSWORD=kantech2024
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
kantech-industrial-solutions/
├── app/
│   ├── page.tsx              # Home page
│   ├── about/page.tsx        # About Us
│   ├── services/page.tsx     # Services
│   ├── industries/page.tsx   # Industries (11 sectors)
│   ├── employers/page.tsx    # Employer inquiry form
│   ├── candidates/page.tsx   # Candidate resume upload
│   ├── contact/page.tsx      # Contact page + map
│   ├── admin/
│   │   ├── layout.tsx        # Admin-specific layout
│   │   └── page.tsx          # Admin dashboard (login + dashboard)
│   ├── api/
│   │   ├── employers/route.ts          # POST employer inquiry
│   │   ├── candidates/route.ts         # POST candidate (with file upload)
│   │   └── admin/
│   │       ├── login/route.ts          # Admin login (sets JWT cookie)
│   │       ├── logout/route.ts         # Admin logout
│   │       ├── employers/route.ts      # GET / PATCH employers
│   │       └── candidates/route.ts     # GET / PATCH / download resume
│   ├── layout.tsx            # Root layout with Navbar/Footer
│   └── globals.css           # Global styles + CSS variables
├── components/
│   ├── Navbar.tsx            # Sticky nav with real logo
│   ├── Footer.tsx            # Footer with links
│   ├── Ticker.tsx            # Scrolling industry ticker
│   └── WhatsAppFloat.tsx     # Floating WhatsApp button
├── lib/
│   ├── mongodb.ts            # Mongoose connection with caching
│   └── auth.ts               # JWT sign/verify helpers
├── models/
│   ├── Employer.ts           # Employer MongoDB model
│   └── Candidate.ts          # Candidate MongoDB model (with resume buffer)
├── public/
│   └── logo.png              # Company logo (exact file)
├── .env.local                # Environment variables (edit this!)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🔐 Admin Dashboard

URL: [http://localhost:3000/admin](http://localhost:3000/admin)

**Default credentials:**
- Username: `admin`
- Password: `kantech2024`

> Change these in `.env.local` before deploying to production.

**Features:**
- View all employer inquiries with search & status filter
- View all candidate profiles with search & status filter
- Download candidate resumes directly
- Update status of employers (new → reviewed → contacted → closed)
- Update status of candidates (new → shortlisted → placed → rejected)
- Click any row to see full details in a modal
- JWT cookie-based authentication (8-hour session)

---

## 🌐 Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, stats, why us, services preview, industries preview, process |
| About Us | `/about` | Company story, vision/mission, values, timeline |
| Services | `/services` | All 10 services with images |
| Industries | `/industries` | All 11 sectors with hover effects |
| Employers | `/employers` | Inquiry form → saved to MongoDB |
| Candidates | `/candidates` | Resume upload form → saved to MongoDB |
| Contact | `/contact` | Contact details, map, WhatsApp, contact form |
| Admin | `/admin` | Login + full dashboard |

---

## 🏭 Industries Covered (11 Sectors)
1. Industrial Engineering & Manufacturing
2. Information Technology & Telecommunications
3. IT Enabled Services (ITeS / BPO)
4. Banking & Financial Services
5. Textiles & Garments
6. Human Resources & Industrial Relations
7. Supply Chain & Logistics
8. Education Institutions
9. Chemical Industry *(new)*
10. Packaging Industry *(new)*
11. Pharma & Life Sciences *(new)*

---

## 🚀 Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Add the environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## 📞 Company Contact

- **Mobile:** +91 97896 80187
- **Office:** +91 96773 33184
- **Email:** premkkantech@yahoo.com
- **Address:** #58/A, 18, 2nd Floor, K.P Complex, Near Agarwal Hospital, Bangalore Bye-Pass Road, Hosur – 635109
- **LinkedIn:** https://www.linkedin.com/company/kantech-industrial-solutions/
- **Facebook:** https://www.facebook.com/surendar.nair
