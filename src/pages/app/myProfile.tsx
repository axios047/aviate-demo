import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { ArrowLeft, ArrowRight, ChevronRight, Edit, Star } from "react-feather";
import Layout from "../../client/Ui/Layout";
import { trpc } from "../../utils/trpc";

const Stars = ({ rank }: { rank: number }) => {
  return (
    <div className="stars text-rose-300 flex">
      {Array.from({ length: 5 }).map((_item, index) => {
        return (
          <div className={`star ${index >= rank && "opacity-50"}`}>
            <Star fill="#fda4af"/>
          </div>
        );
      })}
    </div>
  );
};

const myProfile: React.FC = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  const { data: session } = useSession();
  console.log(session);
  const {
    data: profile,
    error,
    status,
  } = trpc.auth.getUserProfile.useQuery({
    email: session?.user?.email,
  });
  return (
    <Layout title="my profile">
      <>
        <div className="header my-12 flex items-center">
          <button
            onClick={goBack}
            className="rounded-full transition-all hover:bg-rose-300 hover:p-4"
          >
            <ArrowLeft />
          </button>
          &ensp;&ensp;
          <h1 className="text-4xl">My Profile</h1>
        </div>
        <hr className="border-rose-300" />
        <div className="details my-12 flex">
          <div className="general mx-4 w-1/3 rounded-xl border border-rose-300 p-4">
            <h1 className="flex justify-between text-xl font-bold uppercase text-rose-300">
              Personal Details
              <button onClick={() => router.push("/app/editProfile")}>
                <Edit />
              </button>
            </h1>
            <div className="fields py-6">
              <div className="img relative my-4 h-24 w-24 overflow-hidden rounded-full border border-fuchsia-400 p-2">
                {session?.user?.image && (
                  <Image
                    src={session?.user?.image}
                    layout="fill"
                    alt="profile pic"
                  />
                )}
              </div>
              <div className="text-display relative rounded-xl p-4">
                <span className="label font-bold text-rose-300">Name</span>
                <div className="value text-xl">{session?.user?.name}</div>
              </div>
              <div className="text-display relative rounded-xl p-4">
                <span className="label font-bold text-rose-300">Email</span>
                <div className="value text-xl">{session?.user?.email}</div>
              </div>
            </div>
          </div>
          <div className="work mx-4 w-1/3 rounded-xl border border-rose-300 p-4">
            <h1 className="flex justify-between text-xl font-bold uppercase text-rose-300">
              Work Experience
              <button onClick={() => router.push("/app/addWork")}>
                <Edit />
              </button>
            </h1>
            <div className="work-cards my-4">
              {profile?.WorkEx.map(({ role, company, description }) => {
                return (
                  <div className="work-card rounded-xl bg-white p-4">
                    <h1 className="text-2xl font-bold">{role}</h1>
                    <h2 className="text-xl">{company}</h2>
                    <br />
                    <p className="text-zinc-400">{description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="education mx-4 w-1/3 rounded-xl border border-rose-300 p-4">
            <h1 className="flex justify-between text-xl font-bold uppercase text-rose-300">
              Education
              <button onClick={() => router.push("/app/addEducation")}>
                <Edit />
              </button>
            </h1>
            <div className="work-cards my-4">
              {profile?.Education.map(
                ({ course, institution, description }) => {
                  return (
                    <div className="ed-card rounded-xl bg-white p-4">
                      <h1 className="text-2xl font-bold">{course}</h1>
                      <h2 className="text-xl">{institution}</h2>
                      <p className="text-zinc-400">{description}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <div className="skills mx-4 rounded-xl border border-rose-300 p-4">
          <h1 className="flex justify-between text-xl font-bold uppercase text-rose-300">
            Skills
            <button onClick={() => router.push("/app/editSkills")}>
              <Edit />
            </button>
          </h1>
          <div className="skill-cards mt-6 flex flex-wrap">
            {profile?.UserSkills.map(
              ({ skill, isVerified, verificationRank, id }) => {
                return (
                  <div
                    key={id}
                    className="skill-card mb-2 mr-2 flex flex-col justify-between rounded-full bg-white py-4 px-6"
                  >
                    <h1 className="mr-12 text-xl font-bold">{skill.name}</h1>
                    <span>
                      {isVerified && verificationRank ? (
                        <Stars rank={verificationRank} />
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="mr-12 text-zinc-400">
                            Not Verified
                          </span>
                          <button
                            onClick={() =>
                              router.push(`/app/verifySkill/${id}`)
                            }
                            className="flex items-center text-xl text-rose-400"
                          >
                            Take Test&ensp;
                            <ChevronRight />
                          </button>
                        </div>
                      )}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </>
    </Layout>
  );
};

export default myProfile;
