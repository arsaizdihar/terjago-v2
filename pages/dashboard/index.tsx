import { signOut } from "next-auth/react";
import React from "react";

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

export default DashboardMain;
