import { Prisma } from "@prisma/client";

// given user id return {%completed,next step}
export const getOnboardingStatus = async (session: any, prisma: any) => {
  // get user from email
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    console.log("SERVER", user, "usr");
  } catch (error) {
    console.log("SERVER", error, "err");
  }

  let currentTasks = await prisma.userTasks.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      tasks: true,
    },
  });
  let totalCount = 7;
  if (currentTasks == null) {
    // if tasks for user not init then add all tasks
    // get all tasks
    let allTasks = await prisma.onboardtask.findMany({
      orderBy: { order: "asc" },
    });
    currentTasks = await prisma.userTasks.create({
      data: {
        userId: user.id,
        tasks: {
          connect: allTasks.map(({ id }: { id: string }) => ({ id: id })),
        },
      },
      include: {
        tasks: true,
      },
    });
  }
  let completion = totalCount - currentTasks.tasks.length;
  let pcent = ((completion / totalCount) * 100);
  // get next step for user
  let nextStep = currentTasks.tasks[0];
  return { completed: pcent, next: nextStep };
};

export const completeATask = async (
  taskId: string,
  session: any,
  prisma: any
) => {
  console.log("SERVER", taskId, session, "keys");
  // get user id
  let user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  // get current tasks
  let currentTasks = await prisma.userTasks.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      tasks: true,
    },
  });
  // remove task from usertask.tasks
  const userTask = await prisma.userTasks.update({
    where: {
      id: currentTasks?.id,
    },
    data: {
      tasks: {
        disconnect: [{ id: taskId }],
      },
    },
  });
  return userTask;
};
