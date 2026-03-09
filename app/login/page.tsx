"use client"

import { useEffect,useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function Login(){

 const router = useRouter()

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 useEffect(()=>{

  const checkUser = async () => {

   const { data } = await supabase.auth.getUser()

   if(data.user){
     router.push("/dashboard")
   }

  }

  checkUser()

 },[])

 const login = async () => {

  const { error } = await supabase.auth.signInWithPassword({
   email,
   password
  })

  if(error){
   alert(error.message)
  }else{
   router.push("/dashboard")
  }

 }

 return(

  <div className="flex flex-col gap-4 p-10 max-w-sm">

   <h2 className="text-xl font-bold">
    Login
   </h2>

   <input
   placeholder="Email"
   className="border p-2"
   onChange={(e)=>setEmail(e.target.value)}
   />

   <input
   type="password"
   placeholder="Password"
   className="border p-2"
   onChange={(e)=>setPassword(e.target.value)}
   />

   <button
   className="bg-black text-white p-2"
   onClick={login}
   >
    Login
   </button>

  </div>

 )
}