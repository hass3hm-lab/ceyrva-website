import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createConsultationRequest, getConsultationRequests, updateConsultationStatus } from "./db";
import { sendEmail, getConsultationNotificationEmail, getClientConfirmationEmail } from "./email";
import { checkRateLimit, getRemainingSubmissions } from "./rateLimit";
import { TRPCError } from "@trpc/server";

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
      .mutation(async ({ input, ctx }) => {
        try {
          // Get client IP address
          const clientIp = (ctx.req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
                          ctx.req.socket?.remoteAddress || 
                          'unknown';

          // Check rate limit
          if (!checkRateLimit(clientIp)) {
            const remaining = getRemainingSubmissions(clientIp);
            throw new TRPCError({
              code: 'TOO_MANY_REQUESTS',
              message: `Too many submission attempts. Please try again later. Remaining: ${remaining}`,
            });
          }

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
          if (error instanceof TRPCError) {
            throw error;
          }
          console.error('[Consultation] Submission error:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to submit consultation request. Please try again.',
          });
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

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['new', 'contacted', 'archived']),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          // Only admins can update status
          if (ctx.user?.role !== 'admin') {
            throw new TRPCError({
              code: 'FORBIDDEN',
              message: 'Only administrators can update consultation status',
            });
          }

          await updateConsultationStatus(input.id, input.status);

          return {
            success: true,
            message: `Consultation marked as ${input.status}`,
          };
        } catch (error) {
          if (error instanceof TRPCError) {
            throw error;
          }
          console.error('[Consultation] Update status error:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to update consultation status',
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
