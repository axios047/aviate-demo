import { z } from "zod";
import { completeATask, getOnboardingStatus } from "../Onboarding/Onboarding";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const onboardRouter = router({
  getAllTasks: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.onboardtask.findMany();
  }),
  getStatus: protectedProcedure.query(({ ctx }) =>
    getOnboardingStatus(ctx.session, ctx.prisma)
  ),
  completeTask: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .mutation(({ ctx, input }) =>
      completeATask(input.taskId, ctx.session, ctx.prisma)
    ),
});
