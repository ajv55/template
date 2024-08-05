import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import bcrypt from 'bcrypt';

// Define the User type to match NextAuth's expectations
interface User {
  id: string; // Change to string
  email: string;
  hashedPassword: string;
  role: string;
}

// Mock user data
const mockUser: User = {
  id: '1', // Change to string
  email: 'test@test.com',
  hashedPassword: bcrypt.hashSync('123123', 10),
  role: 'user',
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@mail.com' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter Password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Please enter an email and password.');
        }

        // Use mock data for development
        const user = mockUser;

        // Check email and password
        if (user.email !== credentials.email) {
          return null; // Return null if no user found
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!passwordMatch) {
          return null; // Return null if password does not match
        }

        // Return the user object
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/',
  },
  debug: process.env.NODE_ENV === 'development',
};
