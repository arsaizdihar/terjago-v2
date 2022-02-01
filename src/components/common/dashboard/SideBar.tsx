import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import {
  adminMenu,
  mainMenu,
  materiMenu,
  tryoutMenu,
} from "~/constants/dashboard";
import useMe from "../../../hooks/useMe";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<Props> = ({ setOpen, open }) => {
  const { user } = useMe();
  const router = useRouter();
  const menuSelected = router.pathname;
  return (
    <nav
      className={`duration-500 transform max-w-[14rem] lg:max-w-[18rem] bg-light py-6 px-4 w-full text-sm shadow-lg text-black h-screen fixed left-0 top-0 pt-20 z-20 ${
        open ? "translate-x-0" : "translate-x-[-100%]"
      }`}
    >
      <div className="w-full h-full max-h-full overflow-y-auto">
        <Link href="/dashboard">
          <a
            className={`block duration-300 border-l-2 border-r-2 border-secondary px-2 md:px-4 text-lg mb-2 text-center ${
              menuSelected === "/dashboard"
                ? "font-bold bg-yellow-100"
                : "hover:bg-yellow-100"
            }`}
          >
            Dashboard
          </a>
        </Link>
        <div className="lg:hidden">
          {mainMenu.map((menu) => (
            <Menu
              key={menu.name}
              {...menu}
              menuSelected={menuSelected}
              setOpen={setOpen}
              exact={menu.exact}
            />
          ))}
        </div>
        <hr className="border border-secondary my-4 lg:hidden" />
        <h3 className="font-bold text-center mt-4 mb-2">Tryout</h3>
        {tryoutMenu.map((menu) => (
          <Menu
            key={menu.name}
            {...menu}
            menuSelected={menuSelected}
            setOpen={setOpen}
          />
        ))}
        {user?.is_staff && (
          <>
            <hr className="border border-secondary my-4" />
            <h3 className="font-bold text-center mt-4 mb-2">Admin</h3>
            {adminMenu.map((menu) => (
              <Menu
                key={menu.name}
                {...menu}
                menuSelected={menuSelected}
                setOpen={setOpen}
              />
            ))}
          </>
        )}
        <hr className="border border-secondary my-4" />
        <h3 className="font-bold text-center mt-4 mb-2">Materi</h3>
        {materiMenu.map((menu) => (
          <Menu
            key={menu.name}
            {...menu}
            menuSelected={menuSelected}
            setOpen={setOpen}
          />
        ))}
      </div>
    </nav>
  );
};

const Menu: React.FC<any> = ({
  href,
  icon,
  name,
  menuSelected,
  setOpen,
  exact,
}) => {
  return (
    <>
      <Link key={href} href={href}>
        <a
          onClick={() => {
            setOpen(false);
          }}
          className={`${
            menuSelected === href || (!exact && menuSelected.startsWith(href))
              ? "font-bold border-primary bg-yellow-100"
              : "hover:bg-yellow-100 border-transparent hover:border-primary"
          } duration-500 select-none w-full text-left px-2 md:px-4 py-1 md:py-2 text-md border-l-4 flex items-center`}
        >
          <div className="w-4 inline-block mr-2">
            <FontAwesomeIcon icon={icon} className="text-primary" />
          </div>
          {name}
        </a>
      </Link>
    </>
  );
};

export default SideBar;
