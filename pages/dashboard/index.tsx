import Image from "next/image";
import Link from "next/link";
import React from "react";
import learningSVG from "~/assets/learningRed.svg";
import useMe from "~/hooks/useMe";
import DashboardLayout from "~/layouts/DashboardLayout";

const DashboardMain = () => {
  const { user } = useMe();
  return (
    <>
      <div className="w-full font-bold">
        <div className="w-full p-4 text-center">
          <h2 className="text-2xl py-2 my-2 bg-light max-w-screen-sm mx-auto shadow-md rounded-md">
            {user && `Hello, ${user.name || user.email}`}
          </h2>
          <div className="flex justify-center">
            <div className="max-w-sm">
              <Image src={learningSVG} alt="learning" />
            </div>
          </div>
        </div>
        <div className="flex justify-center font-bold">
          <div className="mx-4 bg-light my-4 p-4 shadow-md rounded-md">
            <div className="flex justify-center text-sm flex-wrap">
              <Link href="/dashboard/tryout/tersedia">
                <a className="w-52 block p-2 text-center bg-primary hover:bg-yellow-200 duration-300 m-2 rounded">
                  Tryout
                </a>
              </Link>
              <Link href="/dashboard/materi">
                <a className="w-52 block p-2 text-center bg-primary hover:bg-yellow-200 duration-300 m-2 rounded">
                  Materi
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

DashboardMain.Layout = DashboardLayout;

export default DashboardMain;
