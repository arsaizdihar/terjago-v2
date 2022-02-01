import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Major } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import hardSVG from "~/assets/hard.svg";
import peopleSVG from "~/assets/people.svg";
import storageSVG from "~/assets/storage.svg";
import universitySVG from "~/assets/university.svg";
import LoadingModal from "~/components/common/LoadingModal";
import { usePageData } from "~/core/pageData";
import db from "~/core/Prisma";
import useMe from "~/hooks/useMe";
import DashboardLayout from "~/layouts/DashboardLayout";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session)
    return {
      redirect: {
        destination: "/login?callbackUrl=/dashboard/profile",
        permanent: false,
      },
    };
  if (session.user.major1 && session.user.major2) {
    const majors = await db.major.findMany({
      where: { id: { in: [session.user.major1.id, session.user.major2.id] } },
      include: { university: { select: { name: true } } },
    });
    return {
      props: {
        session,
        data: majors.sort((a, b) =>
          a.id === session.user.major1!.id ? -1 : 1
        ),
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

const Profile = () => {
  const { user } = useMe();
  const majors = usePageData<
    Array<Major & { university: { name: string } }> | undefined
  >();
  return (
    <>
      {user ? (
        <>
          <div className="mt-4 flex justify-center">
            <div className="bg-light p-4 md:p-8 rounded-3xl shadow-lg">
              <h1 className="font-bold text-2xl mb-4">Profil</h1>
              <div className="flex items-center flex-col md:flex-row">
                <div>
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="w-24 mx-auto text-indigo-500"
                  />
                </div>
                <div>
                  <h2 className="text-md text-xl text-center md:text-left md:pl-12 font-bold text-indigo-500">
                    {user.name ?? user.email}
                  </h2>
                  <table className="table-auto md:ml-12 text-gray-600">
                    <tbody>
                      <tr>
                        <td>Email</td>
                        <td>{user.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {majors ? (
            <div className="mt-4 flex justify-center">
              <div className="bg-light py-4 md:py-8 rounded-3xl shadow-lg">
                <h2 className="font-bold text-xl text-center mb-4 md:text-2xl">
                  Pilihan Jurusan Kamu
                </h2>
                <div className="grid md:grid-cols-2 gap-x-2 px-4">
                  {majors.map((major, idx) => (
                    <div key={idx} className="p-4 rounded-md">
                      <h3 className="font-bold text-lg text-gray-800">{`Pilihan ${
                        idx ? "Kedua" : "Pertama"
                      }`}</h3>
                      <div className="flex">
                        <div className="w-16 md:w-36 flex items-center flex-shrink-0">
                          <Image src={universitySVG} alt="university" />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-bold text-gray-700">
                            {major?.university.name}
                          </h4>
                          <p className="">{major?.name}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 mt-2">
                        <div className="border-2 border-gray-300 p-2">
                          <div className="flex justify-center items-center space-x-2">
                            <div className="w-8">
                              <Image src={storageSVG} alt="daya tampung" />
                            </div>
                            <p className="font-bold text-lg">
                              {major.dayaTampung}
                            </p>
                          </div>
                          <div className="text-center italic text-sm">
                            Daya Tampung
                          </div>
                        </div>
                        <div className="border-2 border-gray-300 p-2">
                          <div className="flex justify-center items-center space-x-2">
                            <div className="w-8">
                              <Image src={peopleSVG} alt="daya tampung" />
                            </div>
                            <p className="font-bold text-lg">{major.peminat}</p>
                          </div>
                          <div className="text-center italic text-sm">
                            Peminat
                          </div>
                        </div>
                        <div className="border-2 border-gray-300 p-2">
                          <div className="flex justify-center items-center space-x-2">
                            <div className="w-8">
                              <Image src={hardSVG} alt="daya tampung" />
                            </div>
                            <p className="font-bold text-lg">
                              {(
                                (major.dayaTampung / major.peminat) *
                                100
                              ).toFixed(1)}
                              %
                            </p>
                          </div>
                          <div className="text-center italic text-sm">
                            Keketatan
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <LoadingModal isLoading />
      )}
    </>
  );
};
Profile.Layout = DashboardLayout;

export default Profile;
