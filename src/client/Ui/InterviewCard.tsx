import React from "react";

const InterviewCard: React.FC = () => {
  return (
    <div className="interview-card w-2/5 p-2">
      <div className="wrap rounded-xl border border-rose-300 p-4 h-full">
        <h1 className="text-xl font-bold uppercase text-rose-300">
          Scheduled Interviews
        </h1>
        <div className="interview-card flex items-center my-4 bg-white p-4 rounded-xl">
          <div className="date bg-zinc-200 p-4 rounded-md flex flex-col justify-center items-center">
            <span className="day text-2xl font bold">05</span>
            <span className="day">MON</span>
          </div>
          <div className="details ml-4">
            <div className="company text-2xl">Google - Software Engineer</div>
            <div className="time text-zinc-400">@5:00pm</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
