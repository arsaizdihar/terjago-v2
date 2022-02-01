import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomHead from "~/components/common/CustomHead";
import FieldError from "~/components/common/form/FieldError";
import LoadingModal from "~/components/common/LoadingModal";
import LandingPageLayout from "~/layouts/LandingPageLayout";

type FormData = {
  email: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [status, setStatus] = useState<
    "idle" | "fetching" | "error" | "success"
  >("idle");

  const {
    query: { callbackUrl },
  } = useRouter();

  const onSubmit = handleSubmit((data) => {
    setStatus("fetching");
    signIn("email", {
      email: data.email,
      callbackUrl: typeof callbackUrl === "string" ? callbackUrl : "/dashboard",
      redirect: false,
    }).then(
      () => {
        setStatus("success");
        toast.success("A sign in link has been sent to your email address.");
      },
      (err) => {
        setStatus(err);
        console.error(err);
        toast.error("Error sending email.");
      }
    );
  });
  return (
    <>
      <LoadingModal isLoading={status === "fetching"} />
      <CustomHead title="Login" description="Login di terjago.id." />
      <div className="flex-grow flex justify-center items-center h-full">
        <div className="gap-x-4 md:px-8 grid place-items-center w-full max-w-md gap-y-2">
          <h1 className="text-4xl font-bold">Login</h1>
          {status === "success" ? (
            <p className="text-green-500 text-center mb-2 bg-white py-8">
              A sign in link has been sent to your email address.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="bg-white p-4 md:p-8 w-full text-black"
              noValidate
            >
              <>
                <label className="ml-2">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: {
                      message: "Email is required.",
                      value: true,
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="outline-none p-2 bg-white border-b-2 focus:bg-gray-100 duration-300 w-full border-black"
                />
                <FieldError error={errors.email?.message} />
                <button
                  type="submit"
                  className="mt-2 w-full p-2 text-white bg-black font-medium flex items-center justify-center hover:-translate-y-1 duration-300"
                >
                  LOG IN
                </button>
              </>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session?.user) {
    console.log(session.user);
    return {
      props: { session },
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return { props: { session } };
};

Login.Layout = LandingPageLayout;

export default Login;
