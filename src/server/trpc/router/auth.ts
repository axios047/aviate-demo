import { z } from "zod";
import { recommendJobs } from "../Dashboard/Dashboard";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getUser: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().nullish(),
        image: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      console.log(ctx.session, ctx.session.user.email, "<<<<<<<");
      return ctx.prisma.user.update({
        where: {
          email: ctx.session.user.email || undefined,
        },
        data: { ...input },
      });
    }),
  getUserProfile: protectedProcedure
    .input(z.object({ email: z.string().nullish() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          email: input.email || undefined,
        },
        include: {
          WorkEx: true,
          Education: true,
          UserSkills: {
            include: {
              skill: true,
            },
          },
        },
      });
    }),
  getRecommendedJobs: protectedProcedure.query(({ ctx }) =>
    recommendJobs(ctx.session, ctx.prisma)
  ),
  addUserWork: protectedProcedure
    .input(
      z.object({
        company: z.string(),
        role: z.string(),
        description: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.workEx.create({
        data: {
          company: input.company,
          role: input.role,
          description: input.description,
          user: {
            connect: {
              email: ctx.session.user.email || undefined,
            },
          },
        },
      });
    }),
  addUserEducation: protectedProcedure
    .input(
      z.object({
        institution: z.string(),
        description: z.string(),
        course: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.education.create({
        data: {
          institution: input.institution,
          description: input.description,
          course: input.course,
          user: {
            connect: {
              email: ctx.session.user.email || undefined,
            },
          },
        },
      });
    }),
  getUserSkills: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userSkills.findMany({
      where: {
        user: {
          email: ctx.session.user.email || undefined,
        },
      },
      include: {
        skill: true,
      },
    });
  }),
  addUserSkill: protectedProcedure
    .input(z.object({ skillId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userSkills.create({
        data: {
          skill: {
            connect: {
              id: input.skillId,
            },
          },
          user: {
            connect: {
              email: ctx.session.user.email || undefined,
            },
          },
          isVerified: false,
          verificationRank: 0,
        },
        include: {
          skill: true,
        },
      });
    }),
  verifySkill: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userSkills.update({
        where: {
          id: input.id,
        },
        data: {
          isVerified: true,
          verificationRank: Math.floor(Math.random() * 6),
        },
      });
    }),
});
