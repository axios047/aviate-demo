import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

export const recommendJobs = async (session: Session, prisma: PrismaClient) => {
  // get user skills
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || undefined,
    },
  });
  const userskills = await prisma.userSkills.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      skill: true,
    },
  });
  // gets skills from user skills
  const skills = userskills.map((item) => item.skill.name);
  // get jobs with relevant skills
  const jobs = await prisma.jobPost.findMany({
    where: {
      skills: {
        some: {
          name: {
            in: skills,
          },
        },
      },
    },
    include: {
      skills: true,
      postedBy: true,
    },
  });
  return jobs;
};
