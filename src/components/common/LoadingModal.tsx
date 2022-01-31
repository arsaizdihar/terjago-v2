import { Portal } from "@headlessui/react";
import React from "react";
import { isServer } from "~/core/isServer";

const LoadingModal: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading || isServer) return null;
  return (
    <Portal refName={"#__next"}>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-[999] overflow-hidden bg-gray-700 bg-opacity-75 flex flex-col items-center justify-center">
        {/* <Loader disableBg /> */}
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-white text-xl font-semibold">
          Loading...
        </h2>
        {/* <p className="w-1/3 text-center text-white">Mohon menunggu</p> */}
      </div>
    </Portal>
  );
};

export default LoadingModal;
