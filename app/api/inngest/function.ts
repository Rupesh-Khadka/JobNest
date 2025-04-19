import { prisma } from "@/app/utils/db";
import { sendEmail } from "@/app/utils/email";
import { inngest } from "@/app/utils/inngest/client";

export const handleJobExpiration = inngest.createFunction(
  { id: "job-expiration" },
  { event: "job/created" },

  async ({ event, step }) => {
    const { jobId, expirationDays } = event.data;

    // Wait for the specified duration
    await step.sleep("wait-for-expiration", `${expirationDays}d`);

    // Update job status to expired
    await step.run("update-job-status", async () => {
      await prisma.jobPost.update({
        where: { id: jobId },
        data: { status: "EXPIRED" },
      });
    });

    await step.run("send-expiration-email", async () => {
      const job = await prisma.jobPost.findUnique({
        where: {
          id: jobId,
        },
        include: {
          Company: {
            include: {
              user: true,
            },
          },
        },
      });

      const companyEmail = job?.Company.user.email;
      console.log(expirationDays);
      const emailSubject = "Your Job Posting has Expired";
      const emailText = `
                Hi ${job?.Company.user.name || "there"},
                This mail is here to notify you about,
                "${job?.jobTitle}" 
                Your job has expired after ${expirationDays} days.
                
                Please log in to manage or repost your job listing.
        
                Thanks,
                The JobNest Team
              `;

      // Send the emails
      await sendEmail({
        to: companyEmail as string,
        subject: emailSubject,
        text: emailText,
      });
    });

    return { jobId, message: "Job marked as expired" };
  }
);
