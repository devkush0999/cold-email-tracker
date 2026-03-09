"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function Filters({ onFilter }: any) {

  const [search, setSearch] = useState("")
  const [priority, setPriority] = useState("all")

  const handleSearch = (value: string) => {

    setSearch(value)

    if (onFilter) {
      onFilter({
        search: value,
        priority
      })
    }
  }

  const handlePriority = (value: string) => {

    setPriority(value)

    if (onFilter) {
      onFilter({
        search,
        priority: value
      })
    }
  }

  const reset = () => {

    setSearch("")
    setPriority("all")

    if (onFilter) {
      onFilter({
        search: "",
        priority: "all"
      })
    }
  }

  return (
    <div className="bg-white border rounded-lg p-4 mb-6 flex flex-wrap items-center gap-4">

      <div className="relative">

        <Search
          size={16}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          placeholder="Search company..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="border rounded pl-9 pr-3 py-2 w-64"
        />

      </div>

      <select
        value={priority}
        onChange={(e) => handlePriority(e.target.value)}
        className="border rounded px-3 py-2"
      >

        <option value="all">All Priority</option>
        <option value="high">🔴 High</option>
        <option value="medium">🟡 Medium</option>
        <option value="low">⚪ Low</option>

      </select>

      <button
        onClick={reset}
        className="border px-4 py-2 rounded"
      >
        Reset
      </button>

    </div>
  )
}