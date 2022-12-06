import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import AppLayout from "../../client/Ui/AppLayout";
import InterviewCard from "../../client/Ui/InterviewCard";
import LevelCard from "../../client/Ui/LevelCard";
import Loader from "../../client/Ui/Loader";
import OnboardCard from "../../client/Ui/OnboardCard";
import Overview from "../../client/Ui/Overview";
import RecommendedJobs from "../../client/Ui/RecommendedJobs";
import { trpc } from "../../utils/trpc";

const Dashboard: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data: onboarding, status } = trpc.onboard.getStatus.useQuery();
  const [completion, setCompletion] = useState(0);
  useEffect(() => {
    if (onboarding?.completed !== undefined) {
      setCompletion(onboarding?.completed);
    }
  }, [onboarding]);
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
        {status === "loading" && <Loader />}
        <div className="widgets-row flex flex-wrap">
          {completion < 100 && <OnboardCard />}
          {completion >= 100 && <Overview />}
          <InterviewCard />
          <LevelCard />
        </div>
        <div className="rec-jobs my-6">
          <RecommendedJobs />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
