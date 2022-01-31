import { useSession } from "next-auth/react";

const useMe = () => {
  const { data, status } = useSession();
  return {
    user: data?.user,
    isLoading: status === "loading",
    isError: status === "unauthenticated",
  };
};
export default useMe;
