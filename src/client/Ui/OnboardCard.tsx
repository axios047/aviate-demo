import { useRouter } from "next/router";
import React from "react";
import { ArrowRight, Zap } from "react-feather";
import { trpc } from "../../utils/trpc";
import Loader from "./Loader";

const OnboardCard: React.FC = () => {
  const { data, error, status } = trpc.onboard.getStatus.useQuery();
  const onCompleteTask = trpc.onboard.completeTask.useMutation();
  const router = useRouter();
  const handleClick = () => {
    onCompleteTask.mutate({ taskId: data?.next?.id });
    router.push(data?.next.callbackUrl);
  };
  return (
    <div className="onboard-card w-2/5 overflow-hidden p-2 ">
      <div className="wrap h-full rounded-xl border border-black bg-fuchsia-400 p-4">
        {status == "loading" && <Loader />}
        <div className="status px-4 pt-4">
          <div className="status-bar w-full rounded-full bg-fuchsia-600 p-2">
            <div
              style={{
                width: data?.completed + "%",
              }}
              className={`completed h-4 rounded-full bg-gradient-to-l from-rose-300 to-fuchsia-400`}
            ></div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="txt">
            <h1 className="text-2xl font-bold text-white">
              Complete your onboarding
            </h1>
            <p className="text-zinc-100">Here's what to do next</p>
          </div>
          <div className="status text-4xl text-fuchsia-600">
            {data?.completed?.toPrecision(2)}%
          </div>
        </div>
        <div className="next-steps bg-fuchsia-300 p-4">
          <div className="mb-2 flex items-center justify-between rounded-xl bg-fuchsia-400 text-xl text-white shadow-md hover:bg-fuchsia-500">
            <div className="flex p-4">
              <Zap />
              &ensp;
              {data?.next?.name}
            </div>
            <button
              onClick={handleClick}
              className="flex items-center rounded-r-xl bg-white p-4 text-fuchsia-400"
            >
              Go &ensp; <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardCard;
