import { prisma } from "@/app/utils/db";
import { sendEmail } from "@/app/utils/email";
import { inngest } from "@/app/utils/inngest/client";

export const handleJobExpiration = inngest.createFunction(
  {
    id: "job-expiration",
    cancelOn: [
      {
        event: "job/cancle.expiration",
        if: "event.data.jobId == async.data.jobId",
      },
    ],
  },
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

export const sendPeriodicJobListings = inngest.createFunction(
  { id: "send-jobseeker-job-listings" },
  { cron: "0 9 */2 * *" },

  async ({ step }) => {
    // Step 1: Fetch 5 most recent job posts
    const recentJobs = await step.run("fetch-latest-jobs", async () => {
      return await prisma.jobPost.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        where: {
          status: "ACTIVE",
        },
      });
    });

    if (!recentJobs || recentJobs.length === 0)
      return { message: "No active job posts found." };

    // Step 2: Fetch all JobSeekers with associated user emails
    const jobSeekers = await step.run("fetch-jobseekers", async () => {
      return await prisma.jobSeeker.findMany({
        where: {
          user: {
            userType: "JOB_SEEKER",
          },
        },
        include: {
          user: true,
        },
      });
    });

    // Step 3: Format email content
    const jobListText = recentJobs
      .map(
        (job, idx) =>
          `${idx + 1}. ${job.jobTitle} - ${job.employmentType} in ${job.location}\nSalary: $${job.salaryFrom} - $${job.salaryTo}\n\n`
      )
      .join("");

    const emailSubject = "🔥 Check Out These Fresh Job Listings!";
    const emailBody = `
Hey there,

Here are 5 new job opportunities you might be interested in:

${jobListText}

Log in to JobNest to apply or explore more.

Cheers,  
The JobNest Team
`;

    // Step 4: Email all JobSeekers
    await step.run("send-emails", async () => {
      const sendEmailPromises = jobSeekers.map((seeker) =>
        sendEmail({
          to: seeker.user.email,
          subject: emailSubject,
          text: emailBody,
        })
      );

      await Promise.all(sendEmailPromises);
    });

    return { sentTo: jobSeekers.length, jobsIncluded: recentJobs.length };
  }
);

// export const sendPeriodicJobListings = inngest.createFunction(
//   { id: "send-job-listings" },
//   { event: "jobseekers/created" },

//   async ({ event, step }) => {
//     const { userId, email } = event.data;

//     const totalDays = 30;
//     const intervalDays = 2;
//     let currentDate = 0;

//     while (currentDate < totalDays) {
//       await step.sleep("wait-interval", `1m`);

//       currentDate += intervalDays;

//       const recentJobs = await step.run("fetch-recent-job", async () => {
//         return await prisma.jobPost.findMany({
//           where: {
//             status: "ACTIVE",
//           },
//           orderBy: {
//             createdAt: "desc",
//           },
//           take: 5,
//           include: {
//             Company: {
//               select: {
//                 name: true,
//               },
//             },
//           },
//         });
//       });

//       if (recentJobs.length > 0) {
//         await step.run("send-email", async () => {
//           const jobListingHtml = recentJobs
//             .map(
//               (job) => `
//             <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 5px;">
//             <h3 style="margin: 0;">${job.jobTitle}</h3>
//             ${job.Company.name} • ${job.location}
//             <p style="margin: 5px 0;">
//             <p style="margin: 5px 0;">
//             $${job.salaryFrom.toLocaleString()} - $${job.salaryTo.toLocaleString()}
//             </p>
//             </div>
//             </p>
//             `
//             )
//             .join("");
//           const text = `
// <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
// <h2 style="color: #333;">Latest Job Opportunities</h2>
// ${jobListingHtml}
// <div style="margin-top: 30px; text-align: center;">
// <a href="${process.env.NEXT_PUBLIC_URL}"
// style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
// View More Jobs
// </a>
// </div>
// </div>
// `;
//           await sendEmail({
//             to: "rynx000@gmail.com",
//             subject: `Latest Job Opportunities for you`,
//             text: text,
//           });
//         });
//       }
//     }
//     return { userId, message: "Completed 30 days jobs listing notification" };
//   }
// );
