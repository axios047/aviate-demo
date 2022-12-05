import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Briefcase,
  ChevronDown,
  Compass,
  Layout,
  LogOut,
  MapPin,
  Search,
} from "react-feather";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";

// navigation items
const nav = [
  {
    href: "/app/dashboard",
    title: "Dashboard",
    icon: <Layout />,
  },
  {
    href: "/app/myjobs",
    title: "My Jobs",
    icon: <Briefcase />,
  },
  {
    href: "/app/jobSearch",
    title: "Browse Jobs",
    icon: <Search />,
  },
  {
    href: "/app/companies",
    title: "Companies",
    icon: <Compass />,
  },
];

const NavItem: React.FC<{
  href: string;
  title: string;
  icon: ReactNode;
}> = ({ href, title, icon }) => {
  const router = useRouter();
  let isActive = router.pathname === href;
  return (
    <Link
      href={href}
      className={`navitem flex w-11/12 flex-row items-center rounded-r-xl text-2xl ${
        isActive && "bg-black text-white"
      } mb-2 p-4`}
    >
      <div className="icon mr-4">{icon}</div>
      <span>{title}</span>
    </Link>
  );
};

const ProfileStub: React.FC = () => {
  const { data: sessionData } = useSession();
  let email = sessionData?.user?.email;
  const [isDrop, toggleDrop] = useState(false);
  const router = useRouter();
  // go to login if logged out
  useEffect(() => {
    if (!sessionData?.user) {
      router.push("/login");
    }
  }, [sessionData]);
  return (
    <div
      onClick={() => toggleDrop(!isDrop)}
      className="profile-stub relative flex cursor-pointer items-center rounded-r-xl border-l border-rose-300 p-4 transition-all hover:text-rose-400"
    >
      <div className="dp mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-fuchsia-400 text-2xl font-bold uppercase text-white">
        {email?.toString()[0]}
      </div>
      <span>{email}</span>
      &ensp;
      <ChevronDown />
      {isDrop && (
        <div className="dropdown absolute inset-x-0 top-full w-full rounded-xl bg-white p-4">
          <button
            onClick={() => router.push("/app/myProfile")}
            className="flex w-full justify-between p-4 text-black hover:bg-zinc-200 rounded-md"
          >
            My Profile
          </button>
          <button
            onClick={() => signOut()}
            className="flex w-full justify-between p-4 text-red-400 hover:bg-zinc-200 rounded-md"
          >
            Log out
            <LogOut />
          </button>
        </div>
      )}
    </div>
  );
};

const AppHeader: React.FC = () => {
  return (
    <div className="app-header mb-12 flex w-full justify-between rounded-xl border border-rose-300">
      <div className="search flex">
        <div className="title mx-4 flex flex-row items-center border-r border-rose-300 p-4 text-2xl text-zinc-500">
          <Briefcase className="mr-6" />
          <input
            type="text"
            className="bg-transparent focus:outline-none"
            placeholder="enter a job title or skill"
          />
        </div>
        <div className="location mr-4 flex flex-row items-center p-4 text-2xl text-zinc-500">
          <MapPin className="mr-6" />
          <input
            type="text"
            className="bg-transparent focus:outline-none"
            placeholder="location"
          />
        </div>
        <button className="mr-4 flex flex-row items-center border-r border-l border-rose-300 p-4 text-2xl text-zinc-500 transition-all hover:bg-rose-400 hover:text-white">
          <Search />
          &ensp; Search
        </button>
      </div>
      <div className="profile">
        <ProfileStub />
      </div>
    </div>
  );
};

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="app-layout flex h-screen flex-row bg-rose-100 p-4">
      <div className="sidebar h-full w-2/12 rounded-xl bg-gradient-to-tl from-rose-200 to-fuchsia-400">
        <div className="branding mb-10 flex items-center p-6">
          <Logo color="#fff" w={12} h={12} />
          <span className="ml-4 text-4xl text-white">Aviate</span>
        </div>
        <div className="page-links">
          {nav.map((link) => (
            <NavItem {...link} />
          ))}
        </div>
      </div>
      <div className="content ml-4 w-10/12">
        <AppHeader />
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
