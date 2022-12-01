import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import AppLayout from "../../client/Ui/AppLayout";
import OnboardCard from "../../client/Ui/OnboardCard";

const Dashboard: React.FC = () => {
  const { data: sessionData } = useSession();

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
        <OnboardCard/>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
