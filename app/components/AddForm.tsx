"use client"

import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function AddCompanyForm(){

 const [company,setCompany] = useState("")
 const [email,setEmail] = useState("")
 const [description,setDescription] = useState("")
 const [priority,setPriority] = useState("low")
 const [phone,setPhone] = useState("")
 const [loading,setLoading] = useState(false)

 const save = async () => {


  setLoading(true)
  if(!company || !email){
   alert("Company name and email are required")
   setLoading(false)
   return
  }

  const { data:userData } = await supabase.auth.getUser()
  const userId = userData.user?.id

  const { error } = await supabase
  .from("companies")
  .insert([{
   user_id:userId,
   company_name:company,
   email,
   description,
   priority,
   phone
  }])

  setLoading(false)

  if(error){
   alert(error.message)
  } else {
   location.reload()
  }
 }

 return(

 <div className="bg-white shadow rounded-lg p-6 mb-10 max-w-xl">

  <h2 className="text-lg font-semibold mb-5">
   Add New Company
  </h2>

  <div className="flex flex-col gap-4">

   {/* Company */}
   <div>
    <label className="text-sm text-gray-600">
     Company Name
    </label>

    <input
     className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
     placeholder="Google"
     onChange={(e)=>setCompany(e.target.value)}
    />
   </div>

   {/* Email */}
   <div>
    <label className="text-sm text-gray-600">
     HR Email
    </label>

    <input
     className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
     placeholder="hr@company.com"
     onChange={(e)=>setEmail(e.target.value)}
    />
   </div>

   {/* Description */}
   <div>
    <label className="text-sm text-gray-600">
     Notes / Role
    </label>

    <input
     className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
     placeholder="Frontend React role"
     onChange={(e)=>setDescription(e.target.value)}
    />
   </div>

   {/* Priority */}
   <div>
    <label className="text-sm text-gray-600">
     Priority
    </label>

    <select
     className="w-full border rounded p-2 mt-1 focus:outline-none"
     onChange={(e)=>setPriority(e.target.value)}
    >
     <option value="low">Low</option>
     <option value="medium">Medium</option>
     <option value="high">High</option>
    </select>
   </div>

   {/* Phone */}
   <div>
    <label className="text-sm text-gray-600">
     Phone Number
    </label>

    <input
     className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
     placeholder="+91 9876543210"
     onChange={(e)=>setPhone(e.target.value)}
    />
   </div>

   {/* Button */}
   <button
    onClick={save}
    disabled={loading}
    className="bg-black text-white rounded p-2 mt-2 hover:bg-gray-800 transition"
   >
    {loading ? "Saving..." : "Add Company"}
   </button>

  </div>

 </div>

 )
}