import "next-auth";

declare module "next-auth" {
  interface User {
    realToken: string;
  }

  interface Session {
    user: {
      name?: string;
      email?: string;
      realToken: string;
      id:string;
      role:string
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    realToken: string;
  }
}