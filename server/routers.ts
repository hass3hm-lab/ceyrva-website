import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createConsultationRequest, getConsultationRequests } from "./db";
import { sendEmail, getConsultationNotificationEmail, getClientConfirmationEmail } from "./email";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  consultation: router({
    submit: publicProcedure
      .input(z.object({
        fullName: z.string().min(2),
        company: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(10),
        message: z.string().min(10),
      }))
      .mutation(async ({ input }) => {
        try {
          await createConsultationRequest({
            fullName: input.fullName,
            company: input.company,
            email: input.email,
            phone: input.phone,
            message: input.message,
            status: 'new',
          });

          // Send notification email to adam@ceyrva.com
          const notificationEmail = getConsultationNotificationEmail(input);
          await sendEmail(notificationEmail);

          // Send confirmation email to client
          const confirmationEmail = getClientConfirmationEmail({
            fullName: input.fullName,
            email: input.email,
          });
          await sendEmail(confirmationEmail);

          return {
            success: true,
            message: 'Your consultation request has been submitted successfully. You will receive a confirmation email shortly.',
          };
        } catch (error) {
          console.error('[Consultation] Submission error:', error);
          return {
            success: false,
            message: 'Failed to submit consultation request. Please try again.',
          };
        }
      }),

    list: publicProcedure
      .query(async () => {
        try {
          const requests = await getConsultationRequests();
          return requests;
        } catch (error) {
          console.error('[Consultation] List error:', error);
          return [];
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
