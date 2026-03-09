"use client"

import { useState } from "react"

export default function Filters({ onFilter }: any) {

 const [search,setSearch] = useState("")
 const [priority,setPriority] = useState("all")
 const [status,setStatus] = useState("all")
 const [date,setDate] = useState("")
 const [important,setImportant] = useState(false)

 const triggerFilter = (newValues:any) => {

  const values = {
   search,
   priority,
   status,
   date,
   important,
   ...newValues
  }

  onFilter(values)
 }

 const reset = () => {

  setSearch("")
  setPriority("all")
  setStatus("all")
  setDate("")
  setImportant(false)

  onFilter({
   search:"",
   priority:"all",
   status:"all",
   date:"",
   important:false
  })

 }

 return(

 <div className="bg-white border rounded-lg p-4 mb-6 flex flex-col md:flex-row md:flex-wrap gap-3">

  {/* Search */}

  <input
   placeholder="Search company"
   value={search}
   onChange={(e)=>{
    setSearch(e.target.value)
    triggerFilter({search:e.target.value})
   }}
   className="border p-2 rounded w-full md:w-52"
  />

  {/* Priority */}

  <select
   value={priority}
   onChange={(e)=>{
    setPriority(e.target.value)
    triggerFilter({priority:e.target.value})
   }}
   className="border p-2 rounded"
  >

   <option value="all">Priority</option>
   <option value="high">High</option>
   <option value="medium">Medium</option>
   <option value="low">Low</option>

  </select>

  {/* Status */}

  <select
   value={status}
   onChange={(e)=>{
    setStatus(e.target.value)
    triggerFilter({status:e.target.value})
   }}
   className="border p-2 rounded"
  >

   <option value="all">Status</option>
   <option value="applied">Applied</option>
   <option value="follow-up">Follow Up</option>
   <option value="responded">Responded</option>
   <option value="rejected">Rejected</option>

  </select>

  {/* Date */}

  <input
   type="date"
   value={date}
   onChange={(e)=>{
    setDate(e.target.value)
    triggerFilter({date:e.target.value})
   }}
   className="border p-2 rounded"
  />

  {/* Important ⭐ */}

  <button
   onClick={()=>{
    const newValue = !important
    setImportant(newValue)
    triggerFilter({important:newValue})
   }}
   className={`px-3 py-2 rounded border ${
    important ? "bg-yellow-200" : ""
   }`}
  >
   ⭐ Important
  </button>

  {/* Reset */}

  <button
   onClick={reset}
   className="border px-4 py-2 rounded"
  >
   Reset
  </button>

 </div>

 )
}