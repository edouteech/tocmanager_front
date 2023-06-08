import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { User } from "@/types/user";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/login",
            {
              email: email,
              password: password,
            }
          );

          const data = response.data;
          console.log(data.data.original.user.compagnies[0].id);
          // console.log(data.data);


          if (response.status !== 200) {
            throw new Error("Invalid credentials");
          }

          const user: User = {
            id: data.data.original.user.id,
            name: data.data.original.user.name,
            email: data.data.original.user.email,
            compagnie_id:data.data.original.user.compagnies[0].id,
            accessToken: data.data.original.access_token,
          };

          return user;
        } catch (error) {
          console.log(error);
          throw new Error("An error occurred during authorization");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User ;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
