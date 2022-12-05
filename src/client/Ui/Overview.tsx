import React from "react";

const Overview: React.FC = () => {
  const mockData = [
    {
      name: "Jobs applied in past month",
      value: "4",
    },
    {
      name: "Interviewed Companies",
      value: "2",
    },
    {
      name: "Times appeared in search, last week",
      value: "16",
    },
  ];
  return (
    <div className="overview w-2/5 p-2">
      <div className="wrap h-full rounded-xl bg-white p-4">
        <h1 className="text-xl font-bold uppercase text-fuchsia-400">
          Overview
        </h1>
        <div className="statuses my-4 flex">
          {mockData.map(({ name, value }, index) => {
            return (
              <div
                key={index}
                className="status-card flex w-1/3 flex-col justify-between p-4 hover:bg-zinc-100"
              >
                <h1 className="text-5xl font-bold">{value}</h1>
                <p className="mt-4 text-zinc-500">{name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Overview;
