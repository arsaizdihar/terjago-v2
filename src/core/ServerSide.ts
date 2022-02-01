import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

type Handler = (
  ctx: GetServerSidePropsContext,
  session: Session | null
) => Promise<GetServerSidePropsResult<any>>;

type WithSessionConfig = {
  force?: boolean;
  handler?: Handler;
};

export const withSession =
  ({ force = false, handler }: WithSessionConfig): GetServerSideProps =>
  async (ctx) => {
    const session = await getSession(ctx);
    if (!session && force) {
      return {
        redirect: {
          destination: `/login${
            ctx.req.url ? "?callbackUrl=" + ctx.req.url : ""
          }`,
          permanent: false,
        },
      };
    }
    if (handler) {
      const result = await handler(ctx, session);
      if ("props" in result) {
        const props = await result.props;
        return {
          ...result,
          props: {
            session,
            ...props,
          },
        };
      } else return result;
    }

    return { props: { session } };
  };
