import { Session } from "next-auth";
import { useSession } from "next-auth/react";

function useMe(options: { required?: boolean; optimist: true }): {
  user: Session["user"];
  isLoading: false;
  isError: false;
};

function useMe(options?: { required?: boolean; optimist?: boolean }): {
  user: Session["user"] | undefined;
  isLoading: boolean;
  isError: boolean;
};

function useMe({ required = false, optimist = false } = {}) {
  const { data, status } = useSession({ required });
  return {
    user: data?.user,
    isLoading: status === "loading",
    isError: status === "unauthenticated",
  };
}
export default useMe;
