import {
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const LandingFooter = () => {
  return (
    <footer>
      <div className="bg-black flex justify-center py-2 text-white text-sm">
        <div className="container px-5 max-w-screen-md py-4">
          <div className="text-xs">
            <div>
              Customer service:{" "}
              <Link href="mailto:support@terjago.id">
                <a className="hover:underline font-bold">support@terjago.id</a>
              </Link>
            </div>
          </div>
          <div className="my-4 text-xs">
            <p>Info kerja sama</p>
            <p>
              Email kerja sama:{" "}
              <Link href="mailto:partnership@terjago.id">
                <a className="hover:underline font-bold">
                  partnership@terjago.id
                </a>
              </Link>
            </p>
            <p>
              Whatsapp:{" "}
              <Link href="https://wa.me/+628561788377">
                <a className="hover:underline font-bold">
                  +62-856-1788-377 (Chat Only)
                </a>
              </Link>
            </p>
          </div>
          <div className="flex space-x-4 mt-2 md:mt-0 justify-center flex-wrap text-xs">
            <SocmedLink
              name="Instagram"
              icon={faInstagram}
              className="text-red-400"
              href="https://instagram.com/terjago.id"
            />
            <SocmedLink
              name="Twitter"
              className="text-blue-400"
              icon={faTwitter}
              href="https://twitter.com/terjagoedu"
            />
            <SocmedLink
              name="YouTube"
              icon={faYoutube}
              className="text-red-600"
              href="https://www.youtube.com/channel/UCy_96_JxCjjsR35LCU8KMYw"
            />
            <SocmedLink
              name="LinkedIn"
              icon={faLinkedinIn}
              className="text-blue-400"
              href="https://www.linkedin.com/company/terjago-education/"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-black text-white text-xs">
        <a href="https://www.freepik.com/vectors/data">
          Data vector created by stories - www.freepik.com
        </a>
      </div>
      <div className="flex justify-center bg-black text-xs text-white py-2">
        ©{new Date().getFullYear()} by Terjago Education All Rights Reserved
      </div>
    </footer>
  );
};

const SocmedLink: React.FC<{
  icon: IconDefinition;
  className?: string;
  href: string;
  name: string;
}> = ({ icon, className, href, name }) => {
  return (
    <a
      className={`block shadow hover:bg-gray-200 duration-300 p-2 rounded group ${className}`}
      href={href}
      target={"_blank"}
      rel="noreferrer"
    >
      <FontAwesomeIcon icon={icon} className="w-4 h-4 inline-block" />{" "}
      <span className="text-white group-hover:text-current">{name}</span>
    </a>
  );
};

export default LandingFooter;
