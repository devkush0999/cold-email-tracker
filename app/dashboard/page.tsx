"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useRouter } from "next/navigation"
import CompanyTable from "../components/Table"
import StatsCards from "../components/StatsCards"

export default function Dashboard(){

 const router = useRouter()

 const [user,setUser] = useState<any>(null)
 const [companies,setCompanies] = useState<any[]>([])

 useEffect(()=>{

  const checkUser = async () => {

   const { data } = await supabase.auth.getUser()

   if(!data.user){
     router.push("/login")
   } else {
     setUser(data.user)
     fetchCompanies(data.user.id)
   }

  }

  checkUser()

 },[])

 const fetchCompanies = async (userId:string)=>{

  const { data } = await supabase
  .from("companies")
  .select("*")
  .eq("user_id",userId)

  setCompanies(data || [])
 }

 if(!user){
   return <p className="p-6">Loading...</p>
 }

 /* ---------- Stats Calculation ---------- */

 const total = companies.length

 const responses = companies.filter(
  (c:any)=>c.response === true
 ).length

 const followUps = companies.filter(
  (c:any)=>c.follow_up === false
 ).length

 const rate = total
  ? ((responses / total) * 100).toFixed(1)
  : 0

 return(

  <div className="px-4 sm:px-6 lg:px-10 py-6">

   {/* Header */}

   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

    <h1 className="text-xl sm:text-2xl font-bold">
     Cold Email Dashboard
    </h1>

   </div>

   {/* Stats */}

   <StatsCards
    stats={{
     total,
     responses,
     followUps,
     rate
    }}
   />

   {/* Table */}

   <div className="overflow-x-auto mt-6">

     <CompanyTable userId={user.id} />

   </div>

  </div>

 )
}