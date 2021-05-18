import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Providers.Credentials({
      name: "Credential (as Test User)",
      credentials: {},
      authorize: async () => {
        const user = await prisma.user.findUnique({
          where: { email: "testuser@example.com" },
        });

        return user;
      },
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  session: {
    jwt: true,
    maxAge: 5 * 60,
  },
};

export default (req, res) => NextAuth(req, res, options);
