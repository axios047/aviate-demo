import { z } from "zod";
import { getRemainingTasksForUser } from "../Onboarding/Onboarding";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const onboardRouter = router({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string().nullish() }).nullish())
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input?.text ?? "world"}`,
  //     };
  //   }),
  getAllTasks: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.onboardtask.findMany();
  }),
  getRemainingTasks: protectedProcedure.query(({ ctx }) =>
    getRemainingTasksForUser(ctx.session, ctx.prisma)
  ),
  completeTask: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.jobPost.findMany({
      include: {
        postedBy: true,
        skills: true,
      },
    });
  }),
  // addJobPOst: publicProcedure
  //   .input(
  //     z.object({
  //       title: z.string(),
  //       description: z.string(),
  //       companyId: z.string(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     try {
  //       await ctx.prisma.jobPost.create({
  //         data: {
  //           title: input.title,
  //           description: input.description,
  //           companyId: input.companyId,
  //         },
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }),
});
