import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  try {
    const res = await resend.emails.send({
      from: "JobNest <onboarding@resend.dev>",
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
}

