


"use client"

import Link from "next/link"
import AddCompanyForm from "./components/AddForm"
import Filters from "./components/Filters"
import CompanyTable from "./components/Table"
import { useEffect, useState } from "react"
import { supabase } from "./lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function Home(){

 const [filter,setFilter] = useState({
  search:"",
  priority:"all"
 })
  const router = useRouter()
 
   const [user,setUser] = useState<any>(null)
 const [companies,setCompanies] = useState<any[]>([])

 const handleFilter = (data:any)=>{
  setFilter(data)
 }

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

 return(

  <div className="p-10">

   
       <Link href="/dashboard" className="flex gap-2">
     <h1 className="text-2xl font-bold mb-6">
    Dashboard
   </h1>
    </Link>

   <Filters onFilter={handleFilter} />

    <AddCompanyForm/>

   <CompanyTable filter={filter} />

  </div>

 )
}