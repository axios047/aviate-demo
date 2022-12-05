import moment from "moment";
import Image from "next/image";
import React from "react";
import { ArrowRightCircle, Bookmark } from "react-feather";

const JobCard: React.FC<{
  id: string;
  postedBy: any;
  title: string;
  skills: any;
  postedOn: string;
}> = ({ id, postedBy, title, skills, postedOn }) => {
  return (
    <div key={id} className="w-1/3 p-2">
      <div className="job-card rounded-xl bg-white p-4">
        <div className="flex">
          <div className="image relative">
            <Image
              // TODO - fix type
              alt="logo"
              src={postedBy.logoUrl}
              width={75}
              height={75}
              className="h-16 w-16 overflow-hidden rounded-full"
            />
          </div>
          <div className="ml-6 flex flex-col">
            <h1 className="text-2xl font-bold">{title}</h1>
            <h3 className="text-xl text-zinc-400">@ {postedBy.name}</h3>
          </div>
        </div>
        <div className="skills mt-8">
          <p className="block text-zinc-400">Skills required</p>
          <br />
          <div className="flex flex-wrap">
            {skills.map(({ name, id }: { name: string; id: string }) => {
              return (
                <button
                  key={id}
                  className="skill-tag mr-2 rounded-full border border-rose-400 bg-rose-100 px-4 py-2"
                >
                  {name}
                </button>
              );
            })}
          </div>
          <br />
          <hr />
          <div className="post-foot flex items-center justify-between pt-4">
            <div className="posted">
              {moment(postedOn, "YYYYMMDD").fromNow()}
            </div>
            <div className="actions flex">
              <button className="mr-2 flex rounded-xl border border-violet-500 px-4 py-2 uppercase text-violet-500">
                <Bookmark />
                &ensp;
                <span>Save</span>
              </button>
              <button className="mr-2 flex rounded-xl bg-violet-500 px-4 py-2 uppercase text-white">
                <span>Apply</span>
                &ensp;
                <ArrowRightCircle />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
