import { type NextPage } from "next";
import Head from "next/head";
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

const Home: NextPage = () => {
  const { data, error, status } = trpc.general.getAllJobPost.useQuery();

  useEffect(() => {
    console.log(data, error, status);
  }, [error, status]);

  const { data: sessionData } = useSession();

  return (
    <>
      <Layout title="Aviate app">
        <>
          <div className="flex h-[60vh] flex-col items-center justify-between rounded-b-3xl bg-gradient-to-t from-rose-200 to-fuchsia-400">
            <header className="flex w-full flex-row items-center justify-between px-8 py-6">
              <div className="branding flex flex-row items-center">
                <Logo color="white" />
                <h1 className="text-center text-4xl text-white">aviate</h1>
              </div>
              <div className="actions flex items-center">
                <a className="mr-8 text-xl font-bold text-black" href="#">
                  for employers
                </a>
                <Link
                  className="rounded-full flex items-center bg-black px-6 py-2 text-xl font-bold uppercase text-white"
                  href="/login"
                >
                  Start &ensp;
                  <ArrowRight/>
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
              {data?.map(({ id, skills, title, postedBy, createdAt }) => {
                let postedOn = moment(createdAt.toISOString()).format(
                  "YYYYMMDD"
                );
                return (
                  <div key={id} className="w-1/3 p-2">
                    <div className="job-card rounded-xl bg-white p-4">
                      <div className="flex">
                        <div className="image relative">
                          <Image
                            // TODO - fix type
                            // @ts-ignore
                            src={postedBy.logoUrl}
                            width={75}
                            height={75}
                            className="h-16 w-16 overflow-hidden rounded-full"
                          />
                        </div>
                        <div className="ml-6 flex flex-col">
                          <h1 className="text-2xl font-bold">{title}</h1>
                          <h3 className="text-xl text-zinc-400">
                            @ {postedBy.name}
                          </h3>
                        </div>
                      </div>
                      <div className="skills mt-8">
                        <p className="block text-zinc-400">Skills required</p>
                        <br />
                        <div className="flex flex-wrap">
                          {skills.map(({ name, id }) => {
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
              })}
            </div>
          </div>
        </>
      </Layout>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
