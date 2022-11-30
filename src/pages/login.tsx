import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InputField from "../client/Ui/InputField";
import Logo from "../client/Ui/Logo";

import coverpic from "../../public/images/logincover.png";
import Layout from "../client/Ui/Layout";
import { ArrowRightCircle, CheckCircle } from "react-feather";
import { useRouter } from "next/router";
import Loader from "../client/Ui/Loader";
import { spawn } from "child_process";

const login: React.FC = () => {
  const { data: sessionData } = useSession();

  const router = useRouter();

  // go to app if user is logged in
  useEffect(() => {
    console.log(sessionData);
    if (sessionData?.user) {
      router.push("/app/dashboard");
    }
  }, [sessionData]);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("false");
  const handleSignIn = async () => {
    try {
      setStatus("loading");
      const res = await signIn("email", { email: email, redirect: false });
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <Layout title="Login page">
      <div className="relative flex h-screen flex-row items-center gap-4 bg-rose-100">
        {/* <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p> */}
        <div className="image relative h-full w-8/12">
          <Image alt="---" src={coverpic} fill objectFit="contain" />
        </div>
        <div className="form flex w-3/12 flex-col items-center justify-center rounded-xl border border-zinc-400 bg-gradient-to-b from-rose-200 to-fuchsia-400 p-6">
          <Logo color="#fff" />
          <InputField
            type="text"
            label="email"
            placeholder="Enter your email"
            onChangeValue={(val: string) => setEmail(val)}
          />
          <button
            className="w-full rounded-full bg-white px-6 py-4 font-bold uppercase text-black no-underline transition-all hover:bg-black hover:text-white disabled:opacity-50"
            onClick={handleSignIn}
            disabled={status != "false"}
          >
            {status === "loading" ? (
              <Loader />
            ) : status === "success" ? (
              <span className="flex justify-between">
                Check your email
                <CheckCircle/>
              </span>
            ) : (
              <span className="flex justify-between">
                Get Magic link
                <ArrowRightCircle/>
              </span>
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default login;
