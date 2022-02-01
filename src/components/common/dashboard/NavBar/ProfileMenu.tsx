import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCog,
  faSignOutAlt,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { Fragment } from "react";
import useMe from "~/hooks/useMe";

const ProfileMenu = () => {
  const { user } = useMe();
  if (!user) return null;
  return (
    <div className="flex">
      <div className="items-center hidden md:flex">
        <p className="text-xs lg:text-sm text-gray-600 font-semibold cursor-default">
          {user?.email}
        </p>
      </div>
      <Menu as="div" className="ml-1 lg:ml-2 relative">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="flex text-xs rounded-full outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-secondary">
                <span className="sr-only">Open user menu</span>
                <div className="h-12 w-12 text-secondary hover:text-secondary-light duration-300 rounded-full">
                  <FontAwesomeIcon icon={faUserCircle} className="" />
                </div>
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="block px-4 py-2 w-full text-black text-center select-none">
                  {user?.name ?? user.email}
                </div>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/dashboard/profile">
                      <a
                        className={`${
                          active ? "bg-gray-200" : ""
                        } hover:bg-gray-200 block px-4 py-2 text-sm text-black w-full text-left`}
                      >
                        <span className="w-4 h-4">
                          <FontAwesomeIcon
                            icon={faUserAlt}
                            size="1x"
                            className="w-4 h-4 inline-block"
                          />
                        </span>
                        &nbsp;&nbsp;Profil
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/dashboard/profile/settings">
                      <a
                        className={`${
                          active ? "bg-gray-200" : ""
                        } hover:bg-gray-200 block px-4 py-2 text-sm text-black w-full text-left`}
                      >
                        <span className="w-4 h-4">
                          <FontAwesomeIcon
                            icon={faCog}
                            size="1x"
                            className="w-4 h-4 inline-block"
                          />
                        </span>
                        &nbsp;&nbsp;Settings
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className={`${
                        active ? "bg-gray-200" : ""
                      } block px-4 py-2 text-sm text-black w-full text-left`}
                    >
                      <span className="w-4 h-4">
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          size="1x"
                          className="w-4 h-4 inline-block"
                        />
                      </span>
                      &nbsp;&nbsp;Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default React.memo(ProfileMenu);
