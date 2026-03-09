
'use client'
import { supabase } from "../lib/supabaseClient"

export default function Navbar(){

    const logout = async () => {

 await supabase.auth.signOut()

 window.location.href="/login"

}

 return(

  <div className="flex justify-between items-center
  border-b bg-white px-8 py-4">

   <h1 className="font-semibold">
    Dashboard
   </h1>

   <button className="border px-4 py-2 rounded" onClick={logout}>
     Logout
   </button>

  </div>

 )
}