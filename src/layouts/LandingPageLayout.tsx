import React, { FC } from "react";
import LandingFooter from "~/components/common/LandingFooter";
import NavBar from "~/components/common/NavBar";

const LandingPageLayout: FC = ({ children }) => {
  return (
    <main className="flex flex-col min-h-screen justify-between">
      <NavBar />
      <section className="pt-16 lg:pt-20 flex-grow flex flex-col flex-1">
        {children}
      </section>
      <LandingFooter />
    </main>
  );
};

export default LandingPageLayout;
