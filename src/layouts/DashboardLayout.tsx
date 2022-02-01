import React, { useState } from "react";
import CustomHead from "~/components/common/CustomHead";
import NavBar from "~/components/common/dashboard/NavBar";
import SideBar from "~/components/common/dashboard/SideBar";
import useMe from "~/hooks/useMe";

const DashboardLayout: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const {} = useMe(true);
  return (
    <div className="bg-pape">
      <CustomHead
        title="Dashboard"
        description="Dashboard tryout dari Terjago Education."
      />
      <NavBar open={open} setOpen={setOpen} />
      <main className="flex">
        <SideBar open={open} setOpen={setOpen} />
        <div className="w-full flex flex-col justify-between pt-20 min-h-screen bg-white">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
