import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRef } from "react";

const Home: NextPage = () => {
  const email = useRef<HTMLInputElement>(null);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn("email", {
            email: email.current!.value,
            redirect: false,
          }).then(
            () => {
              console.log("success");
            },
            (err) => {
              console.error(err);
            }
          );
        }}
      >
        <input type="email" name="email" ref={email} />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Home;
