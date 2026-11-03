import { Profile } from "@/types";

export const profile: Profile = {
  name: "Yusuf Maulana",
  role: "Backend & Fullstack Developer",
  tagline: "I build systems that actually work in production.",
  status: "Open to opportunities",
  location: "DKI Jakarta, Indonesia",
  email: "maullanna35@gmail.com",
  phone: "085814113634",
  linkedin: "linkedin.com/in/yusuf-maulana-a3888736a",
  github: "github.com/maullanna",
  portfolio: "maullanna.github.io/Portofolio",
  photoPath: "/images/yusuf.png",
  photoPosition: "50% 14%",
  cvPath: "/cv/Yusuf_Maulana_CV.pdf",
  experience: "3+ years",
  passion: "Backend systems, integrations & automation",
  about:
    "I'm a backend-focused fullstack developer who builds systems people actually rely on, and makes sure the data inside them is accurate enough to support real decisions.\n\n" +
    "Most of my work sits in the backend: database design, REST APIs, service integration, and business logic for HR and payroll. I also handle the frontend, so I build APIs that are clear and easy for other teams to use.\n\n" +
    "Highlights:\n" +
    "▸ Built an HRIS (payroll, overtime, leave) with Laravel 12 and Node.js, including a custom SOAP/XML service that syncs fingerprint devices, cutting HR processing time by ~99% (20 hours/month to under 10 minutes).\n" +
    "▸ Built a CBT exam platform for 2,000+ participants with pretrained OpenCV webcam monitoring and secure browser lockdown.\n" +
    "▸ Built a payroll and cooperative app with savings & loans and a full audit trail.\n\n" +
    "Informatics student at Horizon University (expected graduation: June 2027). Based in Jakarta.",
  education: [
    {
      school: "Horizon University, Karawang",
      degree: "S1 Informatika (Bachelor of Informatics), Ongoing, 7th Semester",
      period: "2022 - Present (target graduation: June 2027)",
    },
    {
      school: "SMK Walang Jaya, Bandung",
      degree: "Light Vehicle Engineering",
      period: "Graduated June 2019",
    },
  ],
  campusActivities: [
    "Coordinator | Web Club (C3)",
    "Coordinator | Networking Club (Netify)",
    "Leader | HorizonU Exhibition Event",
    "Managed team of 4+ Work Program staff",
  ],
  workExperience: [
    {
      role: "Fullstack Developer",
      company: "PT Andhika Teguhsetya",
      period: "Sep 2026 - Present",
      location: "Jakarta",
      highlights: [
        "Refactored ~90% of AIMS, a legacy native PHP asset management system, resolving critical errors and stabilizing it for daily production use",
        "Enhanced existing features and shipped new modules for Asset PIC and Admin teams",
      ],
    },
    {
      role: "IT Staff (Fullstack Developer), Contract",
      company: "Akademi Komunitas Toyota Indonesia (AKTI)",
      period: "Jan 2026 - Sep 2026",
      location: "Karawang",
      highlights: [
        "Led end-to-end development of an HRIS (attendance, payroll, overtime, leave) with Laravel 12 and Node.js (hris.akti.ac.id)",
        "Built a custom Node.js SOAP/XML API bridging fingerprint devices, reducing HR processing time by ~99%",
        "Built a CBT exam platform for 2,000+ participants (exam.akti.ac.id); results were used for scholarship selection",
        "Built a dormitory student attendance system (asrama.akti.ac.id): [ISI: fungsi utama, teknologi, jumlah pengguna]",
        "Led UAT for a Rp250M vendor-built Student Information System, mapping 72 menus and 252 sub-features (sakti.akti.ac.id)",
        "Led data recovery after a critical database deletion across 13 recovery phases",
        "Set up CI/CD with GitHub Actions and deployed SLiMS e-library (elibrary.akti.ac.id)",
      ],
    },
    {
      role: "IT Staff Intern",
      company: "AKTI",
      period: "Jun 2025 - Dec 2025",
      location: "Karawang",
      highlights: [],
    },
    {
      role: "Fullstack Developer, Freelance",
      company: "Self-Employed",
      period: "Jan 2023 - Present",
      location: "Remote",
      highlights: [
        "JalanKu/Hibuzz: student lead collection system with HubSpot CRM, 1,800+ leads, delivered solo in 3 weeks (jalanku.horizon.ac.id)",
        "Payroll & Cooperative Management App (CodeIgniter 3): payroll, member management, savings & loans, full audit trail (payrolkopkarsejahtera.com)",
        "FazTech CCTV company website with catalog and admin panel (faztechcctv.com)",
        "KUA West Karawang web application, from system analysis to deployment",
      ],
    },
    {
      role: "IT Support Intern",
      company: "HorizonU Campus",
      period: "2023 - 2024",
      location: "Karawang",
      highlights: ["IT infrastructure and network technical support", "Computer lab and network maintenance"],
    },
  ],
  certifications: [
    { name: "Database Programming with SQL", issuer: "Oracle Academy", date: "18 Nov 2024" },
    { name: "Using OSS to Publish a Static Website", issuer: "Alibaba Cloud Academy", date: "Aug 2024" },
    { name: "Operate and Manage Object Storage on the Cloud", issuer: "Alibaba Cloud Academy", date: "Aug 2024" },
    { name: "Hikvision Access Control Expert (HACE) & HCSA", issuer: "Hikvision Digital Technology", date: "2025–2026" },
    { name: "Belajar Dasar Manajemen Proyek", issuer: "Dicoding", date: "25 May 2026" },
    { name: "Belajar Dasar Pemrograman JavaScript", issuer: "Dicoding" },
    { name: "Belajar Membuat Front-End Web untuk Pemula", issuer: "Dicoding" },
    { name: "English for Intermediate & TOEFL (Score: 448)", issuer: "TOEFL" },
    { name: "Cyber Security Webinar", issuer: "UPI & HorizonU", date: "2023" },
    { name: "Alibaba Cloud Learning: Introductory to Advanced", issuer: "HorizonU", date: "2023" },
  ],
  achievements: [
    { title: "2nd Place, Innovation Festival (Innofest) 2026", issuer: "Horizon University", year: "2026" },
    { title: "Certificate of Participation, HackFest 2024", issuer: "GDSC Indonesia (Telkom Indonesia)", year: "2024" },
    { title: "Winner, Best Video IT Exhibition", issuer: "KUA Simara Project" },
    { title: "2nd Place, Simara Project Presentation", issuer: "Horizon University" },
    { title: "Participant, Apple Exhibition BSD", issuer: "Apple", year: "2023" },
  ],
  stats: [
    { label: "Experience", value: "3+ years" },
    { label: "Production Projects", value: "10+" },
    { label: "Users Served", value: "2,000+" },
    { label: "Vendor Project Coordinated", value: "Rp250M" },
  ],
};
