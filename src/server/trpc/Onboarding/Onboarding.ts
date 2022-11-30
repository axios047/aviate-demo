export const getRemainingTasksForUser = async (session: any, prisma: any) => {
  let user, userTask;
  console.log(session.user.email, "<<<<<<<<<<<");

  // get user from email
  try {
    user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
  } catch (error) {
    console.log("SERVER", error, "err");
  }
  // get user tasks for fetched user
  try {
    return (userTask = await prisma.userTasks.findUnique({
      where: {
        id: user.id,
      },
      include: {
        tasks: true,
      },
    }));
  } catch (error) {
    console.log("SERVER", error, "err");
  }

  console.log("SERVER", userTask, "task");
};

export const completeATask = async (
  taskId: string,
  userId: string,
  prisma: any
) => {
  // get the task
  const task = await prisma.onboardtask.findUnique({
    where: {
      id: taskId,
    },
  });
  // get current tasks
  const currentTasks = await getRemainingTasksForUser(userId, prisma);
  // remove task from usertask.tasks
  const userTask = await prisma.userTasks.upsert({
    where: {
      id: currentTasks?.id,
    },
    data: {
      tasks: {
        set: [...currentTasks, task],
      },
    },
  });
};
