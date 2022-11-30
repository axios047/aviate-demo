import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import AppLayout from "../../client/Ui/AppLayout";
import Loader from "../../client/Ui/Loader";
import OnboardCard from "../../client/Ui/OnboardCard";
import { trpc } from "../../utils/trpc";

const Dashboard: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data, error, status } = trpc.onboard.getRemainingTasks.useQuery();
  const { data: allTasks, status: taskStatus } =
    trpc.onboard.getAllTasks.useQuery(undefined, {
      enabled: status == "success" ? true : false,
    });

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (data == null && allTasks != undefined) {
      console.log(allTasks, data);
      setTasks(allTasks);
    } else {
      setTasks(data);
    }
    console.log(tasks, "<<<<<<<<");
  }, [tasks]);
  return (
    <AppLayout>
      <div className="header my-6">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-xl text-zinc-400">
          Take a look at your activities in the app
        </p>
        <br />
        <hr className="border-rose-300" />
      </div>
      <div className="widgets">
        {status != "loading" && taskStatus != "loading" ? (
          <OnboardCard steps={tasks} />
        ) : (
          <Loader />
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
