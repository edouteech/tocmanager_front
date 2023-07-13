// import { User } from "@/Models/User";
// import axios from "axios";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       type: "credentials",
//       credentials: {
//         email: { label: "email", type: "text" },
//         password: { label: "password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const { email, password } = credentials as {
//           email: string;
//           password: string;
//         };

//         try {
//           const response = await axios.post(
//             `${apiBaseUrl}/login`,
//             credentials,
//             {
//               headers: { "Content-Type": "application/json" },
//             }
//           );

//           const res = response.data;

//           if (response.status !== 200) {
//             throw new Error("Invalid credentials");
//           }

//           const user: User = {
//             id: res.data.original.user.id,
//             name: res.data.original.user.name,
//             email: res.data.original.user.email,
//             compagnies: res.data.original.user.compagnies,
//             access_token: res.data.original.access_token,
//             phone: res.data.original.user.phone,
//             address: res.data.original.user.address,
//             city: res.data.original.user.city,
//             country: res.data.original.user.city,
//             state: res.data.original.user.city,
//             email_verified_at: res.data.original.user.city,
//             deleted_at: res.data.original.user.city,
//             created_at: res.data.original.user.city,
//             updated_at: res.data.original.user.city,
//             is_virtual: res.data.original.user.city,
//             roles: res.data.original.user.city,
//           };

//           return user;
//         } catch (error) {
//           console.log(error);
//           throw new Error("An error occurred during authorization");
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = token.user as User;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "auth/login",
//   },
// });



import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default NextAuth({
  providers: [
    CredentialsProvider({
     
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch( `${apiBaseUrl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const response = await res.json();
        const user = response.data;

        if (user) {
          console.log(user);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
        signIn: "auth/login",
      },
});