"use client"

import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Signup() {

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const signup = async () => {

   const { error } = await supabase.auth.signUp({
     email,
     password
   })

   if(error) alert(error.message)
   else alert("Check your email")
 }

 return (
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

    <button onClick={signup}>
      Signup
    </button>

   </div>
 )
}