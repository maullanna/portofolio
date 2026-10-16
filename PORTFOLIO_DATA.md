# Yusuf Maulana — Portfolio Data Context

> File ini dibaca oleh AI (Cursor/Claude) untuk mengisi konten portfolio secara akurat.
> Jangan ubah struktur file ini tanpa update semua referensi.

---

## 1. IDENTITY

```
Full Name    : Yusuf Maulana
Role         : Fullstack Developer | Backend Developer | IT Project Coordinator
Location     : Karawang, West Java, Indonesia
Status       : Open to opportunities
Tagline      : I build systems that actually work in production.
```

---

## 2. CONTACT

```
Email        : maullanna35@gmail.com
Phone        : 085814113634
LinkedIn     : linkedin.com/in/yusuf-maulana-a3888736a
GitHub       : github.com/maullanna
Portfolio    : maullanna.github.io/Portofolio
```

---

## 3. EDUCATION

```
Degree       : S1 Informatika (Bachelor of Informatics) — Ongoing, 7th Semester
University   : Horizon University, Karawang
Period       : 2022 – Present (Target graduation: June 2027)

High School  : SMK Walang Jaya, Bandung
Major        : Light Vehicle Engineering
Graduated    : June 2019
```

### Campus Activities

- Coordinator — Web Club (C3)
- Coordinator — Networking Club (Netify)
- Leader — HorizonU Exhibition Event
- Managed team of 4+ Work Program staff

---

## 4. WORK EXPERIENCE

### Current — Fullstack Developer

```
Company  : PT ATS (Andika Teguh Setya) — display as "PT ATS" only
Period   : 21 September 2026 – Present
```

### A. IT Staff, Backend Developer & IT Project Coordinator — Intern

```
Company  : Akademi Komunitas Toyota Indonesia (AKTI)
Type     : Internship
Period   : June 2025 – September 2026
Location : Karawang, West Java
```

- Built full-featured HRIS using Laravel 12 + Node.js
- Integrated fingerprint device via SOAP/XML API — real-time sync every 60s
- Built CBT Exam Platform — 2,000+ participants — anti-cheating via OpenCV
- Deployed e-library SLiMS to Cloud VPS
- Set up CI/CD pipeline using GitHub Actions
- UAT Lead for Rp250M SIS vendor project (sakti.akti.ac.id)
- Configured UniFi, Ubiquiti, Mikrotik — LAN/WAN, SD-WAN
- Managed CyberPanel — VPS, domain, SSL, backup
- IT budgeting, asset management, vendor coordination
- Applied Kaizen, JKK, 5R in daily IT operations
- Multimedia Operator at AKTI 1st Decade Anniversary (attended by Mr. Mitsuru Kawai, TMC Executive Fellow, Toyota Motor Corporation)

### B. Fullstack Developer — Freelance

```
Type   : Self-Employed
Period : January 2023 – Present
```

- JalanKu/Hibuzz Dashboard — HubSpot CRM API — 1,800+ leads — 3 weeks
- FazTech CCTV Website — CodeIgniter 3 — solo 2 months
- Payroll & Cooperative Management App — CodeIgniter 3
- KUA West Karawang Web App — full cycle ISAD to deployment
- GDSC HackFest 2024 — Team Arthemis — Telkom Indonesia — UN 17 SDGs

### C. IT Support Intern

```
Company : HorizonU Campus, Karawang
Period  : 2023 – 2024
```

- IT infrastructure and network support
- Computer lab and network maintenance

---

## 5. PROJECTS & PROJECT DETAIL STRUCTURE

> Setiap project detail window memiliki 5 tab:
> Overview | Journey | Features | Tech Stack | Screenshots
> Bottom bar: [Open Repository] [Live Demo]

---

### PROJECT 1: CBT — Computer-Based Test Platform

```
URL         : https://exam.akti.ac.id
GitHub      : https://github.com/maullanna/exam.akti.ac.id
Status      : DONE
Client      : AKTI Karawang (Toyota-affiliated institution)
Role        : Solo Developer — zero to production
Started     : 01 Aug 2025
Released    : 15 Sep 2025
Duration    : 45 days
Screenshots : cbt-login.png, cbt-online.png
```

**Tech Stack:**

- Backend : Laravel 12, PHP 8.2
- Frontend : Vue.js, Blade
- Database : MySQL
- Tools : OpenCV, Cloud VPS, GitHub Actions

**Tab Overview — Description:**
Platform ujian online untuk seleksi mahasiswa baru (TPA) Akademi Komunitas Toyota Indonesia,
yang sebelumnya menggunakan platform berbayar dan rentan kecurangan. Dibangun dari nol
secara mandiri dengan sistem anti-cheating berlapis dan manajemen peserta massal.

**Tab Overview — Problem:**
Bayar Rp3M/bulan untuk platform pihak ketiga, sering down, zero anti-cheating, staff 7 jam/hari input data manual.

**Tab Overview — Solution:**
Bangun dari nol — anti-cheating berlapis (OpenCV, secure browser, audio monitoring), bulk import Excel, live dashboard.

**Tab Overview — Result & Impact:**

- Platform cost: 100% eliminated (Rp3M/month to Rp0)
- Staff data management: ~98% reduction (7 hrs/day to 10 minutes)
- Average score dropped ~18% after launch (proof anti-cheating works)
- 2,000+ participants served across multiple sessions

**Tab Journey — Milestones:**

- 01 Aug 2025 19:00 — Project started
- 05 Aug 2025 20:30 — Database design
- 12 Aug 2025 21:15 — Exam system core
- 20 Aug 2025 22:00 — Anti-cheating engine
- 01 Sep 2025 19:45 — Testing with real users
- 15 Sep 2025 10:00 — Go live (Release)

**Tab Features:**

- Secure browser lockdown (auto-submit on violation)
- Real-time webcam monitoring via OpenCV face detection
- Audio monitoring — multiple voice detection
- Tab-switch detection & activity logging
- Bulk participant import via Excel
- Live monitoring dashboard
- One-click result export (name, score, cheat count, cheat type)
- Multi-batch exam session management
- Role-based access (Admin, Staff, Participant)
- Auto-submit on time expiry

---

### PROJECT 2: HRIS — Human Resource Information System

```
URL         : https://hris.akti.ac.id
GitHub      : https://github.com/maullanna/HRSAKTI
Status      : DONE
Client      : AKTI Karawang
Role        : Backend Developer (under Project Manager supervision)
Started     : 04 Jun 2025
Released    : 02 Jul 2025
Duration    : 28 days
Screenshots : hris-1.png, hris-2.png
```

**Tech Stack:**

- Backend : Laravel 12, Node.js, Python
- Frontend : Vue.js, Blade, Bootstrap 5
- Database : MySQL
- Tools : Git, Docker, Composer, CyberPanel, GitHub Actions

**Tab Overview — Description:**
Sistem informasi SDM berbasis web untuk AKTI Karawang yang menggantikan proses manual
berbasis kertas dan software fingerprint usang. Terintegrasi langsung dengan perangkat
fingerprint via custom API untuk sinkronisasi absensi real-time.

**Tab Overview — Problem:**
Software fingerprint jadul pre-2019, semua manual (kertas, Google Sheets), HR 20 jam/bulan olah data.

**Tab Overview — Solution:**
HRIS web terintegrasi fingerprint via Node.js SOAP/XML real-time, payroll, overtime, leave, payslip massal.

**Tab Overview — Result & Impact:**

- HR processing time: ~99% reduction (20 hrs/month to under 10 minutes)
- 100% paperless workflow
- Zero manual attendance entry
- Payslip distribution: from one-by-one to bulk in seconds

**Tab Journey — Milestones:**

- 04 Jun 2025 20:15 — Project started
- 06 Jun 2025 19:32 — Database architecture
- 10 Jun 2025 21:08 — Fingerprint API integration
- 15 Jun 2025 20:43 — Backend development
- 22 Jun 2025 18:20 — Frontend integration
- 27 Jun 2025 22:11 — Testing & bug fixing
- 02 Jul 2025 16:45 — Go live (Release)

**Tab Features:**

- Absensi terintegrasi fingerprint (SOAP/XML real-time sync every 60s)
- Manajemen karyawan & departemen
- Payroll calculation dengan auto-deductions
- Overtime tracking & management
- Leave request & approval workflow
- Payslip generation & bulk distribution
- Role & permission management
- Dashboard analytics & reporting
- Mobile-accessible (responsive)

---

### PROJECT 3: JalanKu/Hibuzz — Student Prospecting Dashboard

```
URL         : https://jalanku.horizon.ac.id
Status      : DONE
Client      : Horizon University (Freelance)
Role        : Project Manager + Backend Developer
Started     : 01 Mar 2025
Released    : 22 Mar 2025
Duration    : 21 days (3 weeks)
Screenshots : jalanku-1.jpeg, jalanku-2.jpeg, jalanku-3.jpeg
```

**Tech Stack:**

- Backend : Laravel, PHP
- Frontend : Vue.js, TypeScript
- Database : MySQL
- Tools : HubSpot API, REST API

**Tab Overview — Description:**
Dashboard terpusat untuk tim marketing Horizon University dalam mengelola data prospek
mahasiswa dari platform Hibuzz. Terintegrasi dengan HubSpot CRM via API untuk manajemen
leads otomatis. Guru dapat melihat hasil test kepribadian muridnya masing-masing.

**Tab Overview — Problem:**
Data prospek mahasiswa berserakan di spreadsheet, guru tidak bisa lihat hasil test muridnya, backend dashboard tidak selesai dibuat developer sebelumnya.

**Tab Overview — Solution:**
Dashboard terpusat + HubSpot CRM API + teacher portal.

**Tab Overview — Result & Impact:**

- 1,800+ student leads collected and organized
- ~90% of SMK/SMA in West Java & Jabodetabek mapped
- Marketing lead processing time reduced by ~85%
- Delivered zero to production in 3 weeks

**Tab Journey — Milestones:**

- 01 Mar 2025 20:00 — Project started
- 05 Mar 2025 21:00 — HubSpot API integration
- 10 Mar 2025 20:00 — Backend API development
- 12 Mar 2025 19:30 — Dashboard UI development
- 18 Mar 2025 20:00 — Testing & QA
- 22 Mar 2025 09:00 — Go live (Release)

**Tab Features:**

- Centralized student lead dashboard
- HubSpot CRM integration via API (automated lead sync)
- Teacher portal — filtered by school and region
- Regional mapping — West Java & Jabodetabek coverage
- Lead filtering by batch, school type, region
- Data export for marketing team
- REST API integration with main Hibuzz website

---

### PROJECT 4: SIS Vendor Project — UAT Lead

```
URL         : https://sakti.akti.ac.id
Status      : WIP (ongoing)
Value       : Rp250,000,000
Role        : UAT Lead & IT Project Coordinator
Started     : Oct 2025
Duration    : 10 months (ongoing)
Screenshots : Sakti1.PNG, Sakti2.PNG, SAKTI UAT 2.PNG
GitHub      : —
```

**Tech Stack:**

- Tools : UAT methodology, JKK, bug tracking, project documentation

**Tab Overview — Description:**
Koordinasi dan UAT untuk proyek Student Information System (SIS) senilai Rp250 juta
yang dikerjakan vendor eksternal untuk AKTI Karawang. Mencakup seluruh proses akademik
dari pendaftaran mahasiswa hingga wisuda.

**Tab Overview — Problem:**
Butuh SIS lengkap, vendor eksternal berisiko misalignment.

**Tab Overview — Solution:**
UAT Lead — testing, koordinasi vendor, laporan ke Direktur.

**Tab Overview — Result & Impact:**

- Rp250 million project successfully coordinated
- System live and actively used
- Direct stakeholder reporting to Director level
- Mentored by Manager and Unit Head in project coordination

**Tab Journey — Milestones:**

- Oct 2025 — UAT planning & test case preparation
- Nov 2025 — First round UAT — bug identification
- Dec 2025 — Vendor fix cycle coordination round 1
- Feb 2026 — Second round UAT
- Apr 2026 — System partial go live
- Aug 2026 — Ongoing — remaining features in progress

**Tab Features:**

- Student registration & data management
- Attendance management (student)
- Academic records & grading
- Scholarship management
- Graduation management
- Reporting & analytics
- Staff & lecturer portal
- Admin dashboard

---

### PROJECT 5: FazTech — Company Profile & CCTV Website

```
URL         : https://faztechcctv.com
GitHub      : https://github.com/maullanna/faztech-main
Status      : DONE
Client      : FazTech Solution (Freelance)
Role        : Solo Developer & UI Designer
Started     : 01 Jan 2025
Released    : 28 Feb 2025
Duration    : 58 days (2 months)
Screenshots : faztech-1.png, faztech-2.png, faztech-3.png, faztech-4.png
```

**Tech Stack:**

- Backend : CodeIgniter 3, PHP
- Frontend : HTML, CSS, JavaScript, Bootstrap
- Database : MySQL
- Tools : Git

**Tab Overview — Description:**
Website company profile dan katalog layanan untuk bisnis CCTV dan sistem keamanan FazTech.
Dirancang dan dibangun dari nol secara mandiri — mulai dari desain UI/UX, frontend, backend,
database, hingga deployment. Klien dapat mengelola konten secara mandiri melalui admin panel.

**Tab Overview — Problem:**
Zero kehadiran digital, 100% leads dari mulut ke mulut.

**Tab Overview — Solution:**
Website lengkap dari scratch — katalog, order, gallery, admin panel.

**Tab Overview — Result & Impact:**

- Online presence: 0% to 100%
- Client fully independent post-handover (no developer needed)
- Delivered solo in 2 months — design to deployment
- No templates used — built from scratch

**Tab Journey — Milestones:**

- 01 Jan 2025 10:00 — Project started & requirements gathering
- 10 Jan 2025 20:00 — UI/UX design
- 20 Jan 2025 21:00 — Frontend development
- 05 Feb 2025 19:00 — Backend & admin panel
- 20 Feb 2025 20:00 — Testing & revisions
- 28 Feb 2025 15:00 — Go live (Release)

**Tab Features:**

- Company profile & hero section
- Product catalog — 5 categories (CCTV, WiFi CCTV, Access Control, Barrier Gate, Smart Solutions)
- Order inquiry form with property type selection
- Portfolio gallery — completed installation projects
- Customer testimonials (dynamic)
- FAQ section (dynamic)
- Full admin panel — manage products, orders, gallery, testimonials, FAQ
- WhatsApp floating button — instant consultation
- Mobile responsive design

---

### PROJECT 6: Payroll & Cooperative Management App

```
URL         : https://payrolkopkarsejahtera.com
GitHub      : https://github.com/maullanna/koperasi
Status      : DONE
Client      : Company Cooperative (Freelance)
Role        : Solo Developer
Screenshots : koperasi-1.png
```

**Tech Stack:**

- Backend : CodeIgniter 3, PHP
- Frontend : HTML, CSS, Bootstrap, JavaScript
- Database : MySQL
- Tools : Git

**Tab Overview — Description:**
Aplikasi manajemen koperasi karyawan perusahaan yang menggantikan seluruh proses manual
berbasis Excel. Mencakup pengelolaan anggota, simpan pinjam, cicilan, penggajian otomatis,
dan laporan keuangan dengan sistem akses berbasis role.

**Tab Overview — Problem:**
Semua di Excel, satu file corrupt = data hilang, zero audit trail.

**Tab Overview — Solution:**
Sistem lengkap — simpan pinjam, cicilan, payroll auto-deduct, 3 role akses.

**Tab Overview — Result & Impact:**

- Data loss risk: 100% eliminated (full audit trail)
- Financial consolidation time: ~90% reduced
- Full audit trail on every transaction
- Replaced error-prone Excel workflow entirely

**Tab Journey — Milestones:**

- 01 Jun 2023 09:00 — Project started
- 15 Jun 2023 20:00 — Database design & normalization
- 01 Jul 2023 21:00 — Core modules (member, savings)
- 15 Jul 2023 19:00 — Loan & installment module
- 20 Jul 2023 20:00 — Payroll & reports
- 10 Aug 2023 14:00 — Testing & QA
- 30 Aug 2023 14:00 — Go live (Release)

**Tab Features:**

- Member management (profile, savings balance, loan history)
- Savings management (mandatory & voluntary)
- Loan application with multi-level approval workflow
- Automatic installment schedule generation
- Overdue installment detection & flagging
- Payroll calculation with auto-deduction of loan installments
- Payslip generation
- Real-time financial reports — filterable by period, exportable
- 3 role access: Employee (own data) | Staff (operations) | Super Admin (full)
- Full audit trail on all transactions

---

### PROJECT 7: WaterSense — IoT Early Flood Detection

```
URL         : https://tinyurl.com/WaterSense-App
Status      : DONE
Event       : Innovation Festival (Innofest) 2026 — Horizon University
Result      : 2nd Place Winner
Certificate : No. 074/IFI/V/31/2026
Role        : Fullstack Developer & Project Coordinator
Screenshots : coming soon
GitHub      : —
```

**Tech Stack:**

- Hardware : Arduino, Raspberry Pi, IoT sensors
- Backend : Laravel, Python
- Frontend : (mobile + web dashboard)
- Tools : Push notification system

**Tab Overview — Description:**
Sistem deteksi dini banjir berbasis IoT untuk daerah rawan banjir seperti Sungai Citarum.
Sensor air level dipasang di titik kritis dan terhubung ke dashboard web dan mobile
untuk monitoring real-time dan peringatan otomatis.

**Tab Overview — Problem:**
Tidak ada sistem peringatan dini banjir, monitoring manual.

**Tab Overview — Solution:**
IoT sensor + dashboard web & mobile + push notification otomatis.

**Tab Overview — Result & Impact:**

- 2nd Place Winner at Innofest 2026
- Real-time flood early warning system
- Automated push notifications and audio alerts
- Team project — Yusuf as Fullstack Developer & Project Coordinator

**Tab Journey — Milestones:**

- Mar 2026 — Project concept & team formation
- Apr 2026 — Hardware setup (Arduino + Raspberry Pi)
- Apr 2026 — IoT sensor integration & data pipeline
- May 2026 — Backend API & dashboard development
- May 2026 — Testing & demo preparation
- 31 May 2026 — Innofest 2026 presentation — 2nd Place

**Tab Features:**

- IoT water-level sensor integration (Arduino + Raspberry Pi)
- Real-time river level monitoring (Citarum River)
- Rainfall data analysis
- Automated flood risk detection
- Push notification alerts
- Audio alerts for high-risk conditions
- Web dashboard — real-time data visualization
- Mobile dashboard
- Historical data logging

---

### PROJECT 8: E-Library System

```
URL         : https://e-library.akti.ac.id
Status      : DONE
Client      : AKTI Karawang
Role        : Open Source Implementer & System Administrator
Screenshots : elibrary-1.png
GitHub      : —
```

**Tech Stack:**

- Platform : SLiMS (Open Source Library Management System)
- Server : Cloud VPS, Linux, Nginx
- Database : MySQL
- Tools : CyberPanel

**Tab Overview — Description:**
Implementasi sistem perpustakaan digital open-source (SLiMS) untuk AKTI Karawang.
Mencakup seluruh proses dari instalasi, konfigurasi, migrasi database, hingga go live
di Cloud VPS institusi.

**Tab Overview — Problem:**
Tidak ada sistem perpustakaan digital.

**Tab Overview — Solution:**
Deploy SLiMS open source ke Cloud VPS AKTI.

**Tab Overview — Result & Impact:**

- Institution now has fully functional digital library
- Full database migration from legacy system
- Zero to production — requirements to live

**Tab Journey — Milestones:**

- Requirements gathering & SLiMS evaluation
- Server setup & VPS configuration
- SLiMS installation & configuration
- Database migration (.sql) from legacy system
- Testing & staff training
- Go live

**Tab Features:**

- Digital book catalog
- Book search & advanced filtering
- Member management
- Book loan & return tracking
- Overdue management
- Librarian admin panel
- Report generation

---

## 6. SCREENSHOT MAPPING

```
Project      | Files (in /public/screenshot/)
-------------|--------------------------------------------------
CBT Platform | cbt-login.png, cbt-online.png
HRIS AKTI    | hris-1.png, hris-2.png
JalanKu      | jalanku-1.jpeg, jalanku-2.jpeg, jalanku-3.jpeg
FazTech      | faztech-1.png, faztech-2.png, faztech-3.png, faztech-4.png
E-Library    | elibrary-1.png
Koperasi     | koperasi-1.png
WaterSense   | coming soon
SIS Vendor   | Sakti1.PNG, Sakti2.PNG, SAKTI UAT 2.PNG
```

> Note: File names do NOT need to be renamed. Use original filenames as-is.

---

## 7. PROJECT DETAIL WINDOW — LAYOUT SPEC

### Window Header (always visible, above tabs)

```
[folder icon] PROJECT NAME          Status: [DONE/WIP badge]
              Short description     Started: DD Mon YYYY
              [tech tag] [tag]...   Released: DD Mon YYYY
                                    Duration: X days
```

### Tab 1 — Overview

- Paragraph description (2-3 sentences)
- Problem block (what was broken/missing before)
- Solution block (what was built to fix it)
- Result & Impact block (bullet points with numbers)

### Tab 2 — Journey

- Horizontal milestone timeline with dots
- Each milestone: date + time + activity label
- NO graph, NO commit statistics

### Tab 3 — Features

- Grid checklist 2 columns
- Checkmark icon + feature name
- NO description needed, just the feature name

### Tab 4 — Tech Stack

- Grouped by category: Backend | Frontend | Database | Tools
- Each item as a badge/tag

### Tab 5 — Screenshots

- Image gallery grid
- Click to enlarge

### Bottom Action Bar

- [Open Repository] button — show only if GitHub URL exists
- [Live Demo] button — show only if URL exists

---

## 8. TECHNICAL SKILLS

### Backend & Frameworks

| Skill            | Proficiency |
| ---------------- | ----------- |
| PHP 8.2          | 90%         |
| Laravel 12       | 90%         |
| CodeIgniter 3    | 82%         |
| Node.js          | 78%         |
| Python           | 70%         |
| Livewire 3.6     | 72%         |
| Go (in progress) | 35%         |

### Frontend & Build Tools

| Skill        | Proficiency |
| ------------ | ----------- |
| Vue.js       | 82%         |
| React.js     | 72%         |
| TypeScript   | 68%         |
| Tailwind CSS | 85%         |
| Alpine.js    | 70%         |
| Vite         | 72%         |
| UI/UX Design | 70%         |

### Database

| Skill      | Proficiency |
| ---------- | ----------- |
| MySQL      | 88%         |
| PostgreSQL | 75%         |
| SQLite     | 70%         |
| Firebase   | 65%         |

### Security

- CSRF Protection, XSS Prevention, SQL Injection Prevention
- Secure Browser Implementation, Anti-Cheating (OpenCV)
- JWT Authentication, Role-based Access Control

### Infrastructure & DevOps

| Skill                | Proficiency |
| -------------------- | ----------- |
| Git & GitHub         | 88%         |
| GitHub Actions CI/CD | 72%         |
| Cloud VPS            | 82%         |
| Linux / Ubuntu       | 80%         |
| Nginx                | 75%         |
| CyberPanel           | 78%         |
| Docker               | 55%         |
| Alibaba Cloud OSS    | 65%         |

### Networking

- UniFi & Ubiquiti, Mikrotik, LAN/WAN, SD-WAN, Network Policy

### Integrations

- REST API, Fingerprint API (SOAP/XML), HubSpot API, Gmail API, WhatsApp API, OpenCV

### Hardware & IoT

- Arduino, Raspberry Pi, CCTV Integration (Hikvision HACE & HCSA)

### AI Tools (Vibe Engineer)

- Cursor, Claude AI

### Toyota Work Principles

- Kaizen, JKK, 5R, 3T, Ownership Mindset

---

## 9. CERTIFICATIONS

| Certification                                  | Issuer                       | Date        | ID                  |
| ---------------------------------------------- | ---------------------------- | ----------- | ------------------- |
| Database Programming with SQL                  | Oracle Academy               | 18 Nov 2024 | —                   |
| Using OSS to Publish a Static Website          | Alibaba Cloud Academy        | Aug 2024    | ACFW240240800131103 |
| Operate and Manage Object Storage on the Cloud | Alibaba Cloud Academy        | Aug 2024    | ACFC05240800131071  |
| Hikvision HACE & HCSA                          | Hikvision Digital Technology | 2025–2026   | —                   |
| Belajar Dasar Manajemen Proyek                 | Dicoding                     | 25 May 2026 | 07Z67D3VYPQR        |
| Belajar Dasar Pemrograman JavaScript           | Dicoding                     | —           | MZVOL5RNXN9         |
| Belajar Membuat Front-End Web untuk Pemula     | Dicoding                     | —           | 72ZDJM3L6ZYW        |
| English for Intermediate & TOEFL               | —                            | —           | Score: 448          |
| Cyber Security Webinar                         | UPI & HorizonU               | 2023        | —                   |
| Alibaba Cloud Learning: Intro to Advanced      | HorizonU                     | 2023        | —                   |

---

## 10. ACHIEVEMENTS

| Achievement                                  | Issuer                  | Year |
| -------------------------------------------- | ----------------------- | ---- |
| 2nd Place — Innofest 2026                    | Horizon University      | 2026 |
| Certificate of Participation — HackFest 2024 | GDSC Indonesia (Telkom) | 2024 |
| Winner — Best Video IT Exhibition            | KUA Simara Project      | —    |
| 2nd Place — Simara Project Presentation      | Horizon University      | —    |
| Participant — Apple Exhibition BSD           | Apple                   | 2023 |

---

## 11. KEY STATS (Hero Section)

```
Experience      : 3+ years
Projects        : 10+ production projects
Users served    : 2,000+
Leads collected : 1,800+
Vendor project  : Rp250,000,000
Cost saved      : Rp3,000,000/month
Time saved      : ~99% HR processing time
```

---

## 12. PORTFOLIO WINDOW STYLE SPEC

```
Title bar    : gradient #000080 to #1084d0 (Windows XP blue)
Controls     : [_][□][X] text style — NOT macOS colored circles
Menu bar     : File | Edit | View | Help (below title bar)
Status bar   : at bottom of every window
Font         : monospace throughout (VT323 + Share Tech Mono)
Sidebar      : always visible, 80px fixed, never collapses
Background   : Navy #0F172A
Accent       : Teal #0F766E
Window border: 2px bevel (lighter top-left, darker bottom-right)
```

### Project Display Order

1. CBT Platform (2,000+ users — most impressive)
2. HRIS AKTI (fingerprint integration — most technical)
3. JalanKu Dashboard (1,800+ leads — business impact)
4. SIS Vendor Project (Rp250M — project management)
5. FazTech Website (solo design + delivery)
6. Payroll Koperasi (system replacement)
7. WaterSense IoT (competition 2nd place)
8. E-Library (open source deployment)

### Avatar

- Photo : /public/images/yusuf.jpg (upload manually)
- Fallback : https://api.dicebear.com/7.x/pixel-art/svg?seed=yusuf&backgroundColor=0F766E
