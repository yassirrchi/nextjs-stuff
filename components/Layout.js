import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {
  const { data: session } = useSession()
  if(!session) {
    return <>
      <div className='bg-blue-900 w-screen h-screen flex items-center'>
    <div className='text-center w-full'>
      <button onClick={()=>signIn('google')} className='bg-white p-2 rounded-lg px-4'>Login with Google</button>

    </div>

  </div>
    </>
  }
  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav/>
      
       <div className="bg-white flex-grow mt-1 mr-2 mb-2 rounded-lg p-4"> {children}</div>

     
    </div>
  
    
  )
}
