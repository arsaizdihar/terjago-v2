import { useSession } from "next-auth/react";

const useMe = (required = false) => {
  const { data, status } = useSession({ required });
  return {
    user: data?.user,
    isLoading: status === "loading",
    isError: status === "unauthenticated",
  };
};
export default useMe;
