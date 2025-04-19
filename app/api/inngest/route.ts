import { inngest } from "@/app/utils/inngest/client";
import { serve } from "inngest/next";
import { handleJobExpiration } from "./function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [handleJobExpiration],
});
