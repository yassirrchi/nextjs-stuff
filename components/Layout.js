import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"
import { Inter } from 'next/font/google'
import { useState } from "react"
import Logo from "./Logo"


const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {
  const [showNav,setShowNav]=useState(false)
  const { data: session } = useSession()
  if(!session) {
    return <>
      <div className='bg-gray-200 w-screen h-screen flex' >
    <div className='text-center w-full'>
      <button onClick={()=>signIn('google')} className='bg-white p-2 rounded-lg px-4'>Login with Google</button>

    </div>

  </div>
    </>
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={()=>setShowNav(true)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
</button>

<div className="flex grow justify-center mr-6">
  <Logo/>
</div>
      </div>
      
      <div className=" flex">
        
      <Nav show={showNav}/>
      
       <div className="  flex-grow  p-4"> {children}</div>

     
    </div>
    </div>
    
  
    
  )
}
