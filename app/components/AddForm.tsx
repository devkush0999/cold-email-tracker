"use client"

import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function AddCompanyForm(){

 const [company,setCompany] = useState("")
 const [email,setEmail] = useState("")
 const [description,setDescription] = useState("")
 const [priority,setPriority] = useState("low")
 const [phone,setPhone] = useState("")

 const save = async () => {

   const { error } = await supabase
   .from("companies")
   .insert([{
     company_name:company,
     email,
     description,
     priority,
     phone
   }])

   if(error) alert(error.message)
   else location.reload()
 }

 return(

   <div className="flex flex-col gap-3 mb-10">

    <input placeholder="Company"
    onChange={(e)=>setCompany(e.target.value)} />

    <input placeholder="Email"
    onChange={(e)=>setEmail(e.target.value)} />

    <input placeholder="Description"
    onChange={(e)=>setDescription(e.target.value)} />

    <select
    onChange={(e)=>setPriority(e.target.value)}>

      <option>low</option>
      <option>medium</option>
      <option>high</option>

    </select>

    <input placeholder="Phone"
    onChange={(e)=>setPhone(e.target.value)} />

    <button onClick={save}>
      Add Company
    </button>

   </div>

 )
}