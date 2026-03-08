



"use client"

export default function Filters(){

 return(

  <div className="flex gap-4 mb-5">

   <input
   placeholder="Search company"
   className="border p-2"
   />

   <select className="border p-2">

     <option>All</option>
     <option>High</option>
     <option>Medium</option>
     <option>Low</option>

   </select>

  </div>

 )
}