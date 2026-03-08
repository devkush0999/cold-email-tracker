"use client"

import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Login(){

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const login = async () => {

   const { error } = await supabase.auth.signInWithPassword({
     email,
     password
   })

   if(error) alert(error.message)
   else window.location.href="/"
 }

 return(
   <div className="p-10 flex flex-col gap-3">

     <input
     placeholder="email"
     onChange={(e)=>setEmail(e.target.value)}
     />

     <input
     type="password"
     placeholder="password"
     onChange={(e)=>setPassword(e.target.value)}
     />

     <button onClick={login}>
       Login
     </button>

   </div>
 )
}