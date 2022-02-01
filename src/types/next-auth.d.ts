import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      majorType: "SAINTEK" | "SOSHUM";
      role: "ADMIN" | "USER";
      name?: string;
      major1?: {
        id: number;
        name: string;
        university: {
          id: number;
          name: string;
          link?: string;
        };
      };
      major2?: {
        id: number;
        name: string;
        university: {
          id: number;
          name: string;
          link?: string;
        };
      };
    };
  }
}
