import moment from "moment";
import React, { useEffect } from "react";
import { trpc } from "../../utils/trpc";
import JobCard from "./JobCard";
import Loader from "./Loader";

const RecommendedJobs: React.FC = () => {
  const { data, error, status } = trpc.auth.getRecommendedJobs.useQuery();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="rec-jobs-wrap">
      <h1 className="text-3xl font-bold">Jobs for you</h1>
      <br />
      <hr className="border-rose-300" />
      <br />
      <div className="job-wrap mb-24 flex flex-wrap">
        {data?.length===0 && "No data"}
        {status === "loading" && <Loader/>}
        {data?.map((post: any) => {
          const postedOn = moment(post.createdAt.toISOString()).format(
            "YYYYMMDD"
          );
          return <JobCard key={post.id} {...{ ...post, postedOn: postedOn }} />;
        })}
      </div>
    </div>
  );
};

export default RecommendedJobs;
