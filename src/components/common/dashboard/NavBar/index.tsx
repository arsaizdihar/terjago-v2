import Link from "next/link";
import React, { useRef } from "react";
import ProfileMenu from "./ProfileMenu";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<Props> = ({ open, setOpen }) => {
  const disButton = useRef<HTMLButtonElement>(null);

  return (
    <>
      <header className="fixed top-0 left-0 px-4 w-full z-30 font-poppins duration-300 border-b-2 border-primary bg-primary">
        <nav className="container lg:px-4 mx-auto">
          <>
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute lg:static lg:mr-4 inset-y-0 left-0 flex items-center text-gray-500">
                <button
                  className="relative inline-flex items-center justify-center p-4 text-gray-800 focus:outline-none"
                  ref={disButton}
                  onClick={() => setOpen(!open)}
                >
                  <span className="sr-only">Open main menu</span>
                  <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {open ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out rotate-45"
                        ></span>
                        <span
                          aria-hidden="true"
                          className="block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out opacity-0"
                        ></span>
                        <span
                          aria-hidden="true"
                          className="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out -rotate-45"
                        ></span>
                      </>
                    ) : (
                      <>
                        <span
                          aria-hidden="true"
                          className="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out -translate-y-1.5"
                        ></span>
                        <span
                          aria-hidden="true"
                          className="block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out"
                        ></span>
                        <span
                          aria-hidden="true"
                          className="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out translate-y-1.5"
                        ></span>
                      </>
                    )}
                  </div>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center lg:justify-between h-full">
                <div className="flex-shrink-0 flex items-center text-xl font-bold select-none lg:text-2xl h-full">
                  <Link href="/">
                    <a>terjago.id</a>
                  </Link>
                </div>
                <div className="hidden lg:block flex-shrink-0">
                  <ProfileMenu />
                </div>
              </div>
            </div>
          </>
        </nav>
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-4 lg:hidden h-full flex items-center"
        >
          <ProfileMenu />
        </div>
      </header>
    </>
  );
};

export default React.memo(NavBar);
