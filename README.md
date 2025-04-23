# <img src="/Logo.png" width="150" alt="JobNest Logo" /> JobNest

**JobNest** is a full-featured, modern job portal built with performance, security, and user experience in mind. It provides a seamless platform for organizations to post jobs and for job seekers to apply with ease. Built with the latest technologies in the Next.js ecosystem, JobNest is optimized for speed, scalability, and maintainability.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI**: [TailwindCSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Authentication**: [Auth.js](https://authjs.dev/) with Google & GitHub OAuth
- **Payments**: [Stripe](https://stripe.com/)
- **Security**: [Arcjet](https://arcjet.com/) (XSS, SQL injection, and more)
- **Background Jobs**: [Inngest](https://www.inngest.com/)
- **Rich Text Editor**: [Tiptap](https://tiptap.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🔑 Key Features

### 👥 Role-Based Onboarding
- **Organizations**: Upload logo, set company details.
- **Job Seekers**: Provide personal info, upload a PDF CV.

### 📝 Job Posting System
- Beautiful Tiptap-powered rich text editor
- Salary range slider
- Image uploads
- Choose duration: 30 / 60 / 90 days

### ⏳ Expiration & Reminders
- Automated job expiration logic
- Background job summary email every 2 days for 30 days (Inngest)

### 💳 Stripe Integration
- Secure payment system for job posts
- Webhook-based activation and expiration

### 🔐 Enhanced Security
- Arcjet protection against common vulnerabilities
- Custom rate limiting for authenticated users vs bots

### 🌍 Job Index Page
- Filtering
- Pagination
- Suspense-based loading

### ⭐ Additional Features
- Save jobs to favorites
- Job detail pages with Apply button
- Full CRUD for job posts
- Responsive & mobile-friendly
- Clean, scalable codebase

---
 
## 🧑‍💻 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/jobnest.git
   cd jobnest
