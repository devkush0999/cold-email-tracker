"use client"

import { useEffect,useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function CompanyTable(){

 const [companies,setCompanies] = useState([])

 const fetchCompanies = async () => {

  const { data } = await supabase
  .from("companies")
  .select("*")
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

 return(

 <table className="w-full border">

  <thead>
   <tr>
    <th>Company</th>
    <th>Email</th>
    <th>Description</th>
    <th>Priority</th>
    <th>Phone</th>
    <th>Follow</th>
    <th>Action</th>
   </tr>
  </thead>

  <tbody>

   {companies.map((c:any)=>(
     <tr key={c.id}>

      <td>{c.company_name}</td>
      <td>{c.email}</td>
      <td>{c.description}</td>
      <td>{c.priority}</td>
      <td>{c.phone}</td>
      <td>{c.follow_up ? "Yes":"No"}</td>

      <td>
        <button onClick={()=>deleteCompany(c.id)}>
          Delete
        </button>
      </td>

     </tr>
   ))}

  </tbody>

 </table>

 )
}