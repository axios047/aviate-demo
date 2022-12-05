import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Layout from "../client/Ui/Layout";
import Logo from "../client/Ui/Logo";
import {
  ArrowRight,
  ArrowRightCircle,
  Bookmark,
  Briefcase,
  MapPin,
  Search,
} from "react-feather";
import { useEffect } from "react";
import Image from "next/image";

import moment from "moment";
import JobCard from "../client/Ui/JobCard";

const Home: NextPage = () => {
  const { data, error, status } = trpc.general.getAllJobPost.useQuery();

  useEffect(() => {
    console.log(data, error, status);
  }, [error, status]);

  // const { data: sessionData } = useSession();

  return (
    <>
      <Layout title="Aviate app">
        <>
          <div className="flex h-[60vh] flex-col items-center justify-between rounded-b-3xl bg-gradient-to-t from-rose-200 to-fuchsia-400">
            <header className="flex w-full flex-row items-center justify-between px-8 py-6">
              <div className="branding flex flex-row items-center">
                <Logo color="white" w={12} h={12} />
                &ensp;
                <h1 className="text-center text-4xl text-white">aviate</h1>
              </div>
              <div className="actions flex items-center">
                <a className="mr-8 text-xl font-bold text-black" href="#">
                  for employers
                </a>
                <Link
                  className="flex items-center rounded-full bg-black px-6 py-2 text-xl font-bold uppercase text-white"
                  href="/login"
                >
                  Start &ensp;
                  <ArrowRight />
                </Link>
              </div>
            </header>
            <h1 className="w-1/2 text-center text-6xl font-bold text-white">
              Find your next dream job easily and quickly!
            </h1>
            <div className="search-bar my-8 flex flex-row py-4">
              <div className="title mx-4 flex flex-row items-center rounded-xl bg-white p-4 px-8 text-2xl text-fuchsia-500">
                <Briefcase className="mr-6" />
                <input
                  type="text"
                  className="bg-transparent focus:outline-none"
                  placeholder="enter a job title or skill"
                />
              </div>
              <div className="location mr-4 flex flex-row items-center rounded-xl bg-white p-4 px-8 text-2xl text-fuchsia-500">
                <MapPin className="mr-6" />
                <input
                  type="text"
                  className="bg-transparent focus:outline-none"
                  placeholder="location"
                />
              </div>
              <button className="flex items-center rounded-xl border border-black bg-violet-500 px-6 py-4 text-xl font-bold uppercase text-white transition-shadow hover:shadow-xl">
                <Search className="mr-6" />
                Search
              </button>
            </div>
          </div>
          <br />
          <br />
          <div className="job-board">
            <h1 className="w-1/2 text-6xl font-bold text-black">
              Trending Jobs
            </h1>
            <br />
            <div className="job-grid mb-24 flex flex-row flex-wrap">
              {data?.map((item) => {
                let postedOn = moment(item.createdAt.toISOString()).format(
                  "YYYYMMDD"
                );
                return <JobCard {...{ ...item, postedOn: postedOn }} />;
              })}
            </div>
          </div>
        </>
      </Layout>
    </>
  );
};

export default Home;
