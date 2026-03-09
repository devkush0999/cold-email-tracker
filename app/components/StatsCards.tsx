"use client"

import { Card } from "@/components/ui/card"
import { Briefcase, MailCheck, Clock, TrendingUp } from "lucide-react"

export default function StatsCards({ stats }: any) {

 return (

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

   {/* Total Applied */}
   <Card className="p-5 flex items-center justify-between hover:shadow-md transition">

    <div>
     <p className="text-sm text-gray-500">
      Total Applied
     </p>

     <h2 className="text-2xl font-bold">
      {stats.total}
     </h2>
    </div>

    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
     <Briefcase size={20}/>
    </div>

   </Card>

   {/* Responses */}
   <Card className="p-5 flex items-center justify-between hover:shadow-md transition">

    <div>
     <p className="text-sm text-gray-500">
      Responses
     </p>

     <h2 className="text-2xl font-bold">
      {stats.responses}
     </h2>
    </div>

    <div className="bg-green-100 text-green-600 p-3 rounded-lg">
     <MailCheck size={20}/>
    </div>

   </Card>

   {/* Follow Ups */}
   <Card className="p-5 flex items-center justify-between hover:shadow-md transition">

    <div>
     <p className="text-sm text-gray-500">
      Follow Ups Pending
     </p>

     <h2 className="text-2xl font-bold">
      {stats.followUps}
     </h2>
    </div>

    <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
     <Clock size={20}/>
    </div>

   </Card>

   {/* Response Rate */}
   <Card className="p-5 flex items-center justify-between hover:shadow-md transition">

    <div>
     <p className="text-sm text-gray-500">
      Response Rate
     </p>

     <h2 className="text-2xl font-bold">
      {stats.rate}%
     </h2>
    </div>

    <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
     <TrendingUp size={20}/>
    </div>

   </Card>

  </div>

 )
}