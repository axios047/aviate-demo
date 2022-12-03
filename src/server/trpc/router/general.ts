import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const generalRouter = router({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string().nullish() }).nullish())
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input?.text ?? "world"}`,
  //     };
  //   }),
  getAllJobPost: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.jobPost.findMany({
      include: {
        postedBy: true,
        skills: true,
      },
    });
  }),
  searchForSkills: publicProcedure
    .input(z.object({ searchTerm: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.skills.findMany({
        where: {
          name: {
            contains: input.searchTerm || undefined,
          },
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
