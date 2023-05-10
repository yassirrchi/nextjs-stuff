
import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
 
const adminEmails=["7sudoo@gmail.com"]
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // Passwordless / email sign in
     
  ],
  adapter:MongoDBAdapter(clientPromise),
  callbacks:{
    session:({session,token,user})=>{
      console.log({session,token,user})
      if(adminEmails.includes(session?.user?.email)){
        return session
      }
      else return false;

    }
  }
})