import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { ArrowLeft } from "react-feather";

const FormLayout: React.FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div className="form-layout flex h-screen flex-col items-center justify-center bg-rose-100">
      <div className="w-2/5">
        <div className="header flex items-center py-4 text-3xl">
          <button
            onClick={goBack}
            className="rounded-full transition-all hover:bg-rose-300 hover:p-4"
          >
            <ArrowLeft />
          </button>
          &ensp; {title}
        </div>
        <div className="modal w-full rounded-xl bg-white p-4 shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
