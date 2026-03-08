import { supabase } from "../../lib/db"

export async function GET() {

  const { data } = await supabase
    .from("companies")
    .select("*")

  return Response.json(data)
}