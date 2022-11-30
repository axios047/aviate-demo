import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div
        className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-zinc-400 border-r-transparent"
        role="status"
      ></div>
    </div>
  );
};

export default Loader;
