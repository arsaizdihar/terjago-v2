import { signOut } from "next-auth/react";
import React from "react";
import DashboardLayout from "~/layouts/DashboardLayout";

const DashboardMain = () => {
  return (
    <div>
      <h1>Dashbord</h1>
      <button onClick={() => signOut({ callbackUrl: "/login" })}>
        Sign Out
      </button>
    </div>
  );
};

DashboardMain.Layout = DashboardLayout;

export default DashboardMain;
