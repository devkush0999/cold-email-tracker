"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { Menu } from "lucide-react"

export default function Layout({ children }: { children: React.ReactNode }) {

 const [open,setOpen] = useState(false)

 return (

  <div className="flex h-screen overflow-hidden">

   {/* Desktop Sidebar */}

   <div className="hidden md:flex">
    <Sidebar/>
   </div>

   {/* Mobile Sidebar */}

   {open && (
    <div className="fixed inset-0 z-40 flex md:hidden">

      <div
       className="fixed inset-0 bg-black/40"
       onClick={()=>setOpen(false)}
      />

      <div className="relative w-64 bg-white shadow-lg">

        <Sidebar/>

      </div>

    </div>
   )}

   {/* Main */}

   <div className="flex flex-col flex-1">

    {/* Navbar */}

    <div className="flex items-center justify-between border-b px-4 py-3 bg-white">

     <button
      className="md:hidden"
      onClick={()=>setOpen(true)}
     >
      <Menu size={22}/>
     </button>

     <Navbar/>

    </div>

    {/* Content */}

    <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">

     {children}

    </main>

   </div>

  </div>

 )
}