import { CreateJobForm } from "@/components/forms/CreatJobForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArJectLogo from "@/public/arcjet.jpg";
import InngestLogo from "@/public/inngest.png";
import Image from "next/image";
import { quotelessJson } from "zod";

const companies = [
  { id: 0, name: "ArcJet", logo: ArJectLogo },
  { id: 1, name: "Inngest", logo: InngestLogo },
  { id: 2, name: "ArcJet", logo: ArJectLogo },
  { id: 3, name: "Inngest", logo: InngestLogo },
  { id: 4, name: "ArcJet", logo: ArJectLogo },
  { id: 5, name: "Inngest", logo: InngestLogo },
];

const testimonials = [
  {
    quote:
      "The resume they crafted landed me interviews within a week. Best investment I've made in my career.",
    author: "Jason Lee",
    company: "MarketingPro Inc.",
  },
  {
    quote:
      "I was overwhelmed with job applications, but their service simplified everything. I felt confident every step of the way.",
    author: "Sara Thompson",
    company: "Thompson & Co.",
  },
  {
    quote:
      "Professional, fast, and truly personalized. My LinkedIn has never looked better.",
    author: "Daniel Kim",
    company: "TechForward",
  },
  //   {
  //     quote:
  //       "From the resume to the cover letter, everything was tailored perfectly to my industry. Highly recommend!",
  //     author: "Amara Patel",
  //     company: "DesignScope Studio",
  //   },
  //   {
  //     quote:
  //       "They turned my messy job history into a compelling career story. I finally feel confident applying.",
  //     author: "Luis Martinez",
  //     company: "BrightPath Careers",
  //   },
];

const stats = [
  { value: "10k+", label: "Monthly active job seekers" },
  { value: "48h", label: "Average time to hire" },
  { value: "95%", label: "Employer satisfaction rate" },
  { value: "500+", label: "Companies hiring monthly" },
];

export default function PostJobPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
        
      <CreateJobForm />

      <div className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Trusted by Industry Leaders
            </CardTitle>
            <CardDescription>
              Join thousands of companies hiring top talent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Logo */}
            <div className="grid grid-cols-3 gap-4">
              {companies.map((company) => (
                <div key={company.id}>
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={80}
                    height={80}
                    className="rounded-lg opacity-75 transition-opacity hover:opacity-100"
                  />
                </div>
              ))}
            </div>
            {/* Testmonial */}
            <div className="space-y-4">
              {testimonials.map((testmonial, index) => (
                <blockquote
                  key={index}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="text-sm text-muted-foreground italic">
                    "{testmonial.quote}"
                  </p>
                  <footer className="mt-2 text-sm font-medium ">
                    - {testmonial.author} , {testmonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>
            {/* stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="rounded-lg bg-muted p-4 ">
                  <h4 className="text-2xl font-bold">{stat.value}</h4>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
