import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { safeParse } from "valibot";

import { db } from "./database";
import { LoginSchema } from "./schemas/auth";
import { getUserByEmail } from "./services/get_user_by_email";

export const { signIn, signOut, auth, handlers } = NextAuth({
  pages: {
    signIn: "/login",
  },
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = safeParse(LoginSchema, credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.output;

          const user = await getUserByEmail(email);
          console.log(user);

          if (!user || !user?.hashedPassword) {
            return null;
          }

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.hashedPassword
          );

          if (isPasswordMatched) return user;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
