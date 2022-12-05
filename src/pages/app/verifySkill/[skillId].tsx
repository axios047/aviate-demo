import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../client/Ui/Layout";
import Loader from "../../../client/Ui/Loader";
import { trpc } from "../../../utils/trpc";

const verifySkill: React.FC = () => {
  const router = useRouter();
  const { skillId } = router.query;
  const verify = trpc.auth.verifySkill.useMutation();
  const handleVerify = () => {
    skillId &&
      verify.mutate({
        id: skillId.toString(),
      });
    router.push("/app/myProfile");
  };
  return (
    <Layout title="verify skill">
      <>
        <div className="header my-12 text-2xl">
          <h1>Take the test here for skill id:&nbsp;{skillId}</h1>
        </div>
        <button
          onClick={handleVerify}
          className="bg-rose-400 px-4 py-2 text-xl text-white"
          disabled={verify.isLoading}
        >
          {verify.isLoading ? <Loader /> : "Verify Skill"}
        </button>
      </>
    </Layout>
  );
};

export default verifySkill;
