// "use client"

// import { useEffect,useState } from "react"
// import { supabase } from "../lib/supabaseClient"

// export default function CompanyTable(){

//  const [companies,setCompanies] = useState([])

//  const fetchCompanies = async () => {

//  const { data } = await supabase
//  .from("companies")
//  .select("*")
//  .order("created_at",{ascending:false})

//  setCompanies(data || [])
// }

//  useEffect(()=>{
//    fetchCompanies()
//  },[])

//  const deleteCompany = async(id:string)=>{

//   await supabase
//   .from("companies")
//   .delete()
//   .eq("id",id)

//   fetchCompanies()
//  }

//  return(

//  <table className="w-full border">

//   <thead>
//    <tr>
//     <th>Company</th>
//     <th>Email</th>
//     <th>Description</th>
//     <th>Priority</th>
//     <th>Phone</th>
//     <th>Follow</th>
//     <th>Action</th>
//    </tr>
//   </thead>

//   <tbody>

//    {companies.map((c:any)=>(
//      <tr key={c.id}>

//       <td>{c.company_name}</td>
//       <td>{c.email}</td>
//       <td>{c.description}</td>
//       <td>{c.priority}</td>
//       <td>{c.phone}</td>
//       <td>{c.follow_up ? "Yes":"No"}</td>

//       <td>
//         <button onClick={()=>deleteCompany(c.id)}>
//           Delete
//         </button>
//       </td>

//      </tr>
//    ))}

//   </tbody>

//  </table>

//  )
// }
"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function CompanyTable(){

 const [companies,setCompanies] = useState<any[]>([])

 const fetchCompanies = async () => {

 const { data:userData } = await supabase.auth.getUser()
 const userId = userData.user?.id

 const { data } = await supabase
 .from("companies")
 .select("*")
 .eq("user_id",userId)
 .order("created_at",{ascending:false})

 setCompanies(data || [])
 }

 useEffect(()=>{
   fetchCompanies()
 },[])

 const deleteCompany = async(id:string)=>{

  await supabase
  .from("companies")
  .delete()
  .eq("id",id)

  fetchCompanies()
 }

 const toggleFollow = async(id:string,current:boolean)=>{

  await supabase
  .from("companies")
  .update({follow_up: !current})
  .eq("id",id)

  fetchCompanies()
 }

 return(

 <div>

 {/* -------- Desktop Table -------- */}

 <div className="hidden md:block bg-white shadow rounded-lg p-4 overflow-x-auto">

 <table className="w-full text-sm">

  <thead className="border-b bg-gray-50">

   <tr className="text-left">

    <th className="p-3">Company</th>
    <th className="p-3">Email</th>
    <th className="p-3">Description</th>
    <th className="p-3">Priority</th>
    <th className="p-3">Phone</th>
    <th className="p-3">Follow</th>
    <th className="p-3">Action</th>

   </tr>

  </thead>

  <tbody>

   {companies.map((c:any)=>{

    const priorityColor =
      c.priority === "high"
        ? "bg-red-100 text-red-600"
        : c.priority === "medium"
        ? "bg-yellow-100 text-yellow-600"
        : "bg-gray-100 text-gray-600"

    return(

     <tr key={c.id} className="border-b hover:bg-gray-50">

      <td className="p-3 font-medium">{c.company_name}</td>
      <td className="p-3 text-gray-600">{c.email}</td>
      <td className="p-3 text-gray-600">{c.description}</td>

      <td className="p-3">
        <span className={`px-2 py-1 rounded text-xs ${priorityColor}`}>
          {c.priority}
        </span>
      </td>

      <td className="p-3">{c.phone}</td>

      <td className="p-3">
        <button
        onClick={()=>toggleFollow(c.id,c.follow_up)}
        className={`px-3 py-1 text-xs rounded ${
          c.follow_up
          ? "bg-green-100 text-green-600"
          : "bg-gray-200 text-gray-700"
        }`}
        >
        {c.follow_up ? "Done" : "Pending"}
        </button>
      </td>

      <td className="p-3">
        <button
        onClick={()=>deleteCompany(c.id)}
        className="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>
      </td>

     </tr>

    )

   })}

  </tbody>

 </table>

 </div>


 {/* -------- Mobile Cards -------- */}

 <div className="md:hidden flex flex-col gap-4">

 {companies.map((c:any)=>{

  const priorityColor =
      c.priority === "high"
        ? "bg-red-100 text-red-600"
        : c.priority === "medium"
        ? "bg-yellow-100 text-yellow-600"
        : "bg-gray-100 text-gray-600"

  return(

   <div key={c.id} className="bg-white shadow rounded-lg p-4">

    <div className="flex justify-between items-center mb-2">

      <h3 className="font-semibold">
        {c.company_name}
      </h3>

      <span className={`px-2 py-1 rounded text-xs ${priorityColor}`}>
        {c.priority}
      </span>

    </div>

    <p className="text-sm text-gray-600">
      {c.email}
    </p>

    <p className="text-sm text-gray-500 mt-1">
      {c.description}
    </p>

    <p className="text-sm mt-2">
      📞 {c.phone}
    </p>

    <div className="flex justify-between items-center mt-3">

      <button
      onClick={()=>toggleFollow(c.id,c.follow_up)}
      className={`px-3 py-1 text-xs rounded ${
        c.follow_up
        ? "bg-green-100 text-green-600"
        : "bg-gray-200 text-gray-700"
      }`}
      >
      {c.follow_up ? "Done" : "Pending"}
      </button>

      <button
      onClick={()=>deleteCompany(c.id)}
      className="text-red-500 text-sm"
      >
      Delete
      </button>

    </div>

   </div>

  )

 })}

 </div>

 </div>

 )
}