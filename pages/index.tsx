import {
  faBookOpen,
  faChalkboardTeacher,
  faClipboardCheck,
  faIdCardAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CountUp from "~/components/common/CountUp";
import { isServer } from "~/core/isServer";
import { withSession } from "~/core/ServerSide";
import useMe from "~/hooks/useMe";
import LandingPageLayout from "~/layouts/LandingPageLayout";
import Maskot from "../public/maskot_nobg2.png";

export const getServerSideProps = withSession({});

const Home = () => {
  return (
    <>
      <Title />
    </>
  );
};

const Title = () => {
  const [show, setShow] = useState(isServer);
  const { user } = useMe();

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <div className="flex justify-center items-center bg-yellow-50 p-4 font-poppins cursor-default">
      <Transition
        show={show}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="sm:flex space-x-4 justify-center items-center">
          <div className="flex justify-center sm:block flex-shrink-0">
            <div className="w-40 md:w-52 select-none">
              <Image src={Maskot} alt="maskot" />
            </div>
          </div>
          <div className="sm:flex-grow max-w-lg xl:max-w-2xl">
            <div>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl sm:text-left text-center">
                Pada tahun 2021, hanya <span className="font-bold">23,75%</span>{" "}
                siswa <span className="font-bold">lulus</span> seleksi SBMPTN
              </h1>
            </div>
            <div>
              <p className="my-2 text-sm lg:text-base xl:text-lg sm:text-left text-center">
                Jika kamu bisa mempersiapkannya dari awal, kamu bisa menjadi
                salah satunya. Yuk, belajar dan ikuti Tryout di Terjago
                Education
              </p>
              {!user && (
                <Link href="/login">
                  <a className="bg-black rounded-full text-white bg-opacity-80 py-2 px-2 sm:px-4 hover:shadow-lg hover:bg-opacity-100 duration-300 inline-block mt-2">
                    Login Sekarang
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 md:text-lg gap-4 my-8 max-w-5xl mx-auto justify-items-center">
          <div className="text-center rounded-md p-4 bg-yellow-500 bg-opacity-20 w-full flex flex-col">
            <p>Lebih Dari</p>
            <FontAwesomeIcon
              icon={faChalkboardTeacher}
              className="h-20 mx-auto text-secondary my-2"
            />
            <CountUp end={20} duration={2} className="text-4xl font-bold" />
            <div className="flex items-center justify-center flex-grow">
              <p className="">Tutor-tutor yang berpengalaman</p>
            </div>
          </div>
          <div className="text-center rounded-md p-4 bg-yellow-500 bg-opacity-20 w-full flex flex-col">
            <p>Lebih Dari</p>
            <FontAwesomeIcon
              icon={faIdCardAlt}
              className="h-20 mx-auto text-secondary my-2"
            />
            <CountUp
              end={21}
              duration={2}
              suffix="k"
              className="text-4xl font-bold"
            />
            <div className="flex items-center justify-center flex-grow">
              <p className="">Pengikut di sosial media</p>
            </div>
          </div>
          <div className="text-center rounded-md p-4 bg-yellow-500 bg-opacity-20 w-full flex flex-col">
            <p>Lebih Dari</p>
            <FontAwesomeIcon
              icon={faBookOpen}
              className="h-20 mx-auto text-secondary my-2"
            />
            <CountUp end={100} duration={2} className="text-4xl font-bold" />
            <div className="flex items-center justify-center flex-grow">
              <p className="">
                Modul pembelajaran yang dapat diakses tanpa biaya
              </p>
            </div>
          </div>
          <div className="text-center rounded-md p-4 bg-yellow-500 bg-opacity-20 w-full flex flex-col">
            <p>Lebih Dari</p>
            <FontAwesomeIcon
              icon={faClipboardCheck}
              className="h-20 mx-auto text-secondary my-2 w-full"
            />
            <CountUp end={5000} duration={2} className="text-4xl font-bold" />
            <div className="flex items-center justify-center flex-grow">
              <p className="">Orang bergabung karena #SemuaBisaJago</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

Home.Layout = LandingPageLayout;

export default Home;
