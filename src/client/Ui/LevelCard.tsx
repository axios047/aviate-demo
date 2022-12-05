import Link from "next/link";
import React from "react";
import { ArrowRight, Award } from "react-feather";

const LevelCard: React.FC = () => {
  return (
    <div className="w-1/5 p-2">
      <div className="wrap h-full flex flex-col justify-between rounded-xl bg-black p-4 text-white">
        <h1 className="text-xl font-bold uppercase text-white">
          Level
        </h1>
        <div className="lvl my-4 flex items-center justify-between rounded-full bg-zinc-700 p-2">
          <div className="lvl-icon flex h-12 w-12 items-center justify-center rounded-full bg-zinc-500 text-zinc-100">
            <Award />
          </div>
          <h1 className="mr-4 text-2xl font-bold uppercase text-white">
            IRON 1
          </h1>
        </div>
        <div className="actions">
          <a
            href="#"
            className="details flex items-center justify-between rounded-md text-xl transition-all hover:bg-zinc-700 hover:p-2"
          >
            <span>Details</span>
            <ArrowRight />
          </a>
          <Link
            href="/blog/levelUp"
            className="levelup text-zinc-500 underline"
          >
            How to Level Up?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LevelCard;
