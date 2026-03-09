import { Home, Building2, BarChart } from "lucide-react"
import Link from "next/link"

export default function Sidebar(){

 return(

  <div className="w-60 bg-white border-r p-6">

   <h2 className="font-bold text-xl mb-10">
    ColdTracker
   </h2>

   <nav className="flex flex-col gap-4">

    <Link href="/dashboard" className="flex gap-2">
      <Home size={18}/> Dashboard
    </Link>

    <Link href="/dashboard/add" className="flex gap-2">
      <Building2 size={18}/> Add
    </Link>

    <Link href="/dashboard/analytics" className="flex gap-2">
      <BarChart size={18}/> Analytics
    </Link>

   </nav>

  </div>

 )
}