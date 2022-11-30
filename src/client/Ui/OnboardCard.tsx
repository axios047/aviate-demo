import React from "react";

const OnboardCard: React.FC<{ steps: any }> = ({ steps }) => { 
  console.log(steps,"<?<?<?");
   
  return (
    <div className="onboard-card w-1/2 rounded-xl bg-fuchsia-400">
      <div className="p-4">
        <div className="status-bar"></div>
        <h1 className="text-2xl font-bold text-white">Complete your profile</h1>
        <p className="text-zinc-100">Here's what to do next</p>
      </div>
      <div className="next-steps">
        {steps?.map((step: any) => (
          <>{step.name}</>
        ))}
      </div>
    </div>
  );
};

export default OnboardCard;
