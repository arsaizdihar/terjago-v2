import { Disclosure, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import useMe from "~/hooks/useMe";

const NavBar = () => {
  const disButton = useRef<HTMLButtonElement>(null);
  const { user, isLoading } = useMe();
  const [onTop, setOnTop] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setOnTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <Disclosure
      as="header"
      className={`fixed px-4 w-full z-30 font-poppins duration-300 shadow-md ${
        onTop ? "bg-primary" : "bg-primary"
      }`}
    >
      {({ open }) => (
        <nav className="container px-4 mx-auto lg:py-2">
          <>
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center lg:hidden text-gray-500">
                {/* <SearchBarPop />
                <Link href="/">
                  <a className="rounded-full w-6 h-6 flex justify-center items-center text-sm mx-1">
                    <FontAwesomeIcon icon={faSignInAlt} transform="shrink-6" />
                  </a>
                </Link>
                <Link href="/">
                  <a className="rounded-full w-6 h-6 flex justify-center items-center text-sm mx-1">
                    <FontAwesomeIcon icon={faUserPlus} transform="shrink-6" />
                  </a>
                </Link> */}
                <Disclosure.Button
                  className="relative inline-flex items-center justify-center p-4 text-gray-800 focus:outline-none"
                  ref={disButton}
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
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center h-full">
                <div className="flex-shrink-0 flex items-center text-xl font-bold select-none lg:text-2xl pr-8 h-full">
                  <Link href="/">
                    <a className="mx-4">terjago.id</a>
                  </Link>
                  {/* <Link href="/dashboard/materi">
                    <a className="hidden md:block mx-4 text-sm font-normal py-2 px-2 sm:px-4 hover:shadow-lg hover:bg-opacity-100 duration-300">
                      Materi
                    </a>
                  </Link> */}
                  {/* <Link href="/dashboard/tryout/tersedia">
                    <a className="hidden md:block mx-4 text-sm font-normal py-2 px-2 sm:px-4 hover:shadow-lg hover:bg-opacity-100 duration-300">
                      Tryout
                    </a>
                  </Link> */}
                  <Link href="https://blog.terjago.id/">
                    <a
                      className="hidden md:block mx-4 text-sm font-normal py-2 px-2 sm:px-4 hover:shadow-lg hover:bg-opacity-100 duration-300"
                      target="_blank"
                    >
                      Blog
                    </a>
                  </Link>
                  <Link href="https://blog.terjago.id/about/">
                    <a
                      className="hidden md:block mx-4 text-sm font-normal py-2 px-2 sm:px-4 hover:shadow-lg hover:bg-opacity-100 duration-300"
                      target="_blank"
                    >
                      About
                    </a>
                  </Link>
                </div>
                {/* <div className="flex-grow hidden lg:flex h-full text-gray-600 space-x-2 items-center mr-4">
                  <KelasPop />
                  <div className="border-2 border-gray-200 rounded flex-grow max-w-md py-2 px-4 flex items-center space-x-2 focus-within:border-blue-400 focus-within:shadow-md duration-300">
                    <div className="text-sm h-4 w-4">
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <form className="flex-grow">
                      <input
                        className="outline-none text-sm w-full"
                        placeholder="Mencari kelas"
                      />
                    </form>
                  </div>
                </div> */}
                <div className="flex-grow flex justify-end space-x-4 text-sm sm:text-base font-bold text-black">
                  {/* <Link href="/fitur">
                    <a
                      className={`py-2 px-2 sm:px-4 hover:shadow-lg border-b-2 duration-300 ${
                        !onTop
                          ? "hover:bg-primary text-white border-white hover:border-transparent"
                          : "border-transparent"
                      }`}
                    >
                      Fitur
                    </a>
                  </Link> */}
                  {!isLoading && (
                    <>
                      {user && (
                        <Link href="/dashboard">
                          <a className="bg-gray-100 rounded-full bg-opacity-80 py-2 px-2 sm:px-4 hover:shadow-lg hover:bg-opacity-100 duration-300">
                            Dashboard
                          </a>
                        </Link>
                      )}
                      {!user && (
                        <Link href="/login">
                          <a className="bg-black rounded-full text-white bg-opacity-80 py-2 px-2 sm:px-4 hover:shadow-lg hover:bg-opacity-100 duration-300">
                            Login
                          </a>
                        </Link>
                      )}
                    </>
                  )}
                </div>
                {/* navigation
                <div className="hidden lg:block lg:ml-6">
                  <div className="flex space-x-4"></div>
                </div> */}
              </div>
            </div>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="lg:hidden pb-4">
                <Link href="/dashboard/materi">
                  <a className=" block mx-4 text-sm font-normal py-2 px-2 sm:px-4 hover:shadow-lg hover:bg-opacity-100 duration-300">
                    Materi
                  </a>
                </Link>
                <Link href="/dashboard/tryout/tersedia">
                  <a className="block mx-4 text-sm font-normal py-2 px-2 sm:px-4 hover:shadow-lg hover:bg-opacity-100 duration-300">
                    Tryout
                  </a>
                </Link>
                <Link href="https://blog.terjago.id/">
                  <a
                    className="block mx-4 text-sm font-normal py-2 px-2 sm:px-4 hover:shadow-lg hover:bg-opacity-100 duration-300"
                    target="_blank"
                  >
                    Blog
                  </a>
                </Link>
                <Link href="https://blog.terjago.id/about/">
                  <a
                    className="block mx-4 text-sm font-normal py-2 px-2 sm:px-4 hover:shadow-lg hover:bg-opacity-100 duration-300"
                    target="_blank"
                  >
                    About
                  </a>
                </Link>
              </Disclosure.Panel>
            </Transition>
          </>
        </nav>
      )}
    </Disclosure>
  );
};

export default NavBar;
