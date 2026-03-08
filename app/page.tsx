import AddCompanyForm from "./components/AddForm"
import CompanyTable from "./components/Table"
import Filters from "./components/Filters"

export default function Home(){

 return(

  <div className="p-10">

   <h1 className="text-2xl font-bold mb-5">
     Cold Email Job Tracker
   </h1>

   <Filters/>

   <AddCompanyForm/>

   <CompanyTable/>

  </div>

 )
}