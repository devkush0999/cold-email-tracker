"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

type Company = {
  id: string
  company_name: string
  email: string
  description: string
  priority: string
  phone: string
  follow_up: boolean
  status: string
  important: boolean
  applied_date: string
}

type Props = {
 filter:any
}

export default function CompanyTable({filter}:Props){

 const [companies,setCompanies] = useState<Company[]>([])
 const [loading,setLoading] = useState(true)
 

const fetchCompanies = async () => {

 setLoading(true)

 const { data:userData } = await supabase.auth.getUser()
 const userId = userData.user?.id

 if(!userId){
  setLoading(false)
  return
 }

 let query = supabase
 .from("companies")
 .select("*")
 .eq("user_id",userId)
 .order("created_at",{ascending:false})

 if(filter?.priority && filter.priority !== "all"){
  query = query.eq("priority",filter.priority)
 }

 if(filter?.status && filter.status !== "all"){
  query = query.eq("status",filter.status)
 }

 if(filter?.date){
  query = query.eq("applied_date",filter.date)
 }

 if(filter?.important){
  query = query.eq("important",true)
 }

 const { data,error } = await query

 if(error){
  console.error(error.message)
 }

 let result = data || []

 if(filter?.search){
  result = result.filter((c:any)=>
   c.company_name
   .toLowerCase()
   .includes(filter.search.toLowerCase())
  )
 }

 setCompanies(result)
 setLoading(false)
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
   .update({follow_up:!current})
   .eq("id",id)

  fetchCompanies()
 }

 const updateStatus = async(id:string,status:string)=>{

  await supabase
   .from("companies")
   .update({status})
   .eq("id",id)

  fetchCompanies()
 }

 const toggleImportant = async(id:string,current:boolean)=>{

  await supabase
   .from("companies")
   .update({important:!current})
   .eq("id",id)

  fetchCompanies()
 }

 if(loading){
  return <p className="p-6 text-gray-500">Loading companies...</p>
 }

 if(companies.length === 0){
  return(
   <div className="bg-white shadow rounded-lg p-8 text-center text-gray-500">
    No companies added yet
   </div>
  )
 }

 return(

 <div>

 {/* ================= DESKTOP TABLE ================= */}

 <div className="hidden md:block bg-white shadow rounded-lg p-4 overflow-x-auto">

 <table className="w-full text-sm">

 <thead className="border-b bg-gray-50">

 <tr className="text-left">

 <th className="p-3">⭐</th>
 <th className="p-3">Company</th>
 <th className="p-3">Email</th>
 <th className="p-3">Description</th>
 <th className="p-3">Priority</th>
 <th className="p-3">Phone</th>
 <th className="p-3">Date</th>
 <th className="p-3">Status</th>
 <th className="p-3">Follow</th>
 <th className="p-3">Action</th>

 </tr>

 </thead>

 <tbody>

 {companies.map((c)=>{

 const priorityColor =
  c.priority === "high"
   ? "bg-red-100 text-red-600"
   : c.priority === "medium"
   ? "bg-yellow-100 text-yellow-600"
   : "bg-gray-100 text-gray-600"

 return(

 <tr key={c.id} className="border-b hover:bg-gray-50">

 {/* Important */}

 <td className="p-3">
 <button onClick={()=>toggleImportant(c.id,c.important)}>
  {c.important ? "⭐" : "☆"}
 </button>
 </td>

 {/* Company */}

 <td className="p-3 font-medium">
  {c.company_name}
 </td>

 {/* Email */}

 <td className="p-3 text-gray-600">
  {c.email}
 </td>

 {/* Description */}

 <td className="p-3 text-gray-600">
  {c.description}
 </td>

 {/* Priority */}

 <td className="p-3">
 <span className={`px-2 py-1 rounded text-xs ${priorityColor}`}>
  {c.priority}
 </span>
 </td>

 {/* Phone */}

 <td className="p-3">
  {c.phone}
 </td>

 {/* Date */}

 <td className="p-3 text-xs">
  {new Date(c.applied_date).toLocaleDateString()}
 </td>

 {/* Status */}

 <td className="p-3">

 <select
  value={c.status}
  onChange={(e)=>updateStatus(c.id,e.target.value)}
  className="border rounded text-xs p-1"
 >

 <option value="applied">Applied</option>
 <option value="follow-up">Follow Up</option>
 <option value="responded">Responded</option>
 <option value="rejected">Rejected</option>

 </select>

 </td>

 {/* Follow */}

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

 {/* Delete */}

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


 {/* ================= MOBILE CARDS ================= */}

 <div className="md:hidden flex flex-col gap-4">

 {companies.map((c)=>{

 const priorityColor =
  c.priority === "high"
   ? "bg-red-100 text-red-600"
   : c.priority === "medium"
   ? "bg-yellow-100 text-yellow-600"
   : "bg-gray-100 text-gray-600"

 return(

 <div key={c.id} className="bg-white shadow rounded-lg p-4">

 <div className="flex justify-between items-center mb-2">

 <h3 className="font-semibold text-sm">
  {c.company_name}
 </h3>

 <div className="flex gap-2">

 <button onClick={()=>toggleImportant(c.id,c.important)}>
  {c.important ? "⭐" : "☆"}
 </button>

 <span className={`px-2 py-1 rounded text-xs ${priorityColor}`}>
  {c.priority}
 </span>

 </div>

 </div>

 <p className="text-sm text-gray-600">{c.email}</p>

 <p className="text-sm text-gray-500 mt-1">{c.description}</p>

 <p className="text-xs text-gray-500 mt-1">
 Applied: {new Date(c.applied_date).toLocaleDateString()}
 </p>

 <p className="text-sm mt-2">📞 {c.phone}</p>

 {/* Status */}

 <select
  value={c.status}
  onChange={(e)=>updateStatus(c.id,e.target.value)}
  className="border rounded text-xs p-1 mt-2"
 >

 <option value="applied">Applied</option>
 <option value="follow-up">Follow Up</option>
 <option value="responded">Responded</option>
 <option value="rejected">Rejected</option>

 </select>

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