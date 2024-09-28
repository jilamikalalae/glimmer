import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

// export const validateSession = () => {
//   const { data: session } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (!session) {
//       router.push("/auth/login");
//     }
//   }, [session, router]);
// };

// export const getUserId = () => {
//   const { data: session } = useSession();
//   if (!session) {
//     router.push("/auth/login");
//   }

//   return session.user.id;
// };

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "auth/login",
  },
  debug: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};
