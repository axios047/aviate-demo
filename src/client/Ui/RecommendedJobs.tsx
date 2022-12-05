import moment from "moment";
import React, { useEffect } from "react";
import { trpc } from "../../utils/trpc";
import JobCard from "./JobCard";

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
      <div className="job-wrap flex flex-wrap mb-24">
        {data?.map((post:any)=>{
          let postedOn = moment(post.createdAt.toISOString()).format(
            "YYYYMMDD"
          );         
          return <JobCard {...{ ...post, postedOn: postedOn }}/>
        })}
      </div>
    </div>
  );
};

export default RecommendedJobs;
