# JobNest

JobNest is a modern, full-featured job portal designed to simplify the job posting and application process for both organizations and job seekers. Built with Next.js 15 and powered by modern web technologies, JobNest focuses on performance, security, and user experience, providing a seamless platform for employers to post jobs and for candidates to apply effortlessly.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI**: [TailwindCSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Authentication**: [Auth.js](https://authjs.dev/) with Google & GitHub OAuth
- **Payments**: [Stripe](https://stripe.com/)
- **Security**: [Arcjet](https://arcjet.com/) (Protection against XSS, SQL injection, and other common vulnerabilities)
- **Background Jobs**: [Inngest](https://www.inngest.com/) for background workflows and reminders
- **Rich Text Editor**: [Tiptap](https://tiptap.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🔑 Key Features

### 👥 Role-Based Onboarding
- **Organizations**: Organizations can easily set up their profile, upload a logo, and provide necessary details to attract candidates.
- **Job Seekers**: Job seekers can create their profile, upload a PDF CV, and apply for jobs directly through the platform.

### 📝 Job Posting System
- **Rich Text Editor**: Post detailed job descriptions using Tiptap, a customizable and feature-rich text editor.
- **Salary Range Slider**: Employers can set a custom salary range using a user-friendly slider.
- **Image Upload**: Employers can upload images (e.g., company logos or job-related images) for job postings.
- **Job Duration**: Employers can specify the job listing duration (30, 60, or 90 days).

### ⏳ Expiration & Reminder System
- **Automatic Job Expiration**: Jobs are automatically marked as expired after the specified duration.
- **Reminder Emails**: Inngest handles a background workflow that sends a summary of new job postings every two days for 30 days to keep candidates engaged.

### 💳 Stripe Payment Integration
- **Job Post Payments**: Secure payment integration with Stripe for job post activation.
- **Webhook-based Activation**: Payment completion triggers job post activation and expiration via webhooks.

### 🔐 Enhanced Security
- **Arcjet Protection**: Guard against common web vulnerabilities such as XSS, SQL injection, and more.
- **Custom Rate Limiting**: Higher API rate limits for authenticated users and bot protection.

### 🌍 Job Index Page
- **Filtering**: Users can filter job posts based on specific criteria such as role, location, and salary range.
- **Pagination**: Paginated job posts for a smooth browsing experience.
- **Suspense-based Loading**: Optimized loading states for a better user experience.

### ⭐ Additional Features
- **Favorites Route**: Users can save jobs they are interested in to their favorites list.
- **Job Detail Pages**: Detailed view of individual job posts with an "Apply" button for easy application submission.
- **CRUD Functionality**: Full Create, Read, Update, Delete capabilities for managing job posts.
- **Responsive Design**: Fully responsive layout ensuring compatibility across devices.
- **Performance-Optimized**: Designed for fast load times and high scalability.

---

## 🧑‍💻 Getting Started

To get started with the project, clone the repository and follow the setup instructions:

### 1. Clone the repository
```bash
git clone https://github.com/Rupesh-khadka/jobnest.git
cd jobnest
