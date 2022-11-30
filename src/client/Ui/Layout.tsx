import Head from "next/head";
import React, { ReactElement } from "react";

const Layout: React.FC<{ title: string; children: ReactElement }> = ({
  title,
  children,
}) => {
  return (
    <main className="grid bg-rose-100 min-h-screen grid-cols-[1fr_minmax(960px,96rem)_1fr]">
      <div className="wrap col-[2]">
        <Head>
          <title>{title}</title>
          <meta name="description" content="Find a job for yourself" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
      </div>
    </main>
  );
};

export default Layout;
