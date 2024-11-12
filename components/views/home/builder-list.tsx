"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ChevronsDownIcon, Search } from "lucide-react"
import { Builder } from "@/app/_types"
import { BuilderCard } from "./builder-card"
import { BuilderSortSelect } from "./builder-sort-select"
import { Button } from "@/components/ui/button"

export function BuilderList({ builders, sort }: { builders: Builder[]; sort?: string }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1) // New state for pagination
  const PER_PAGE = 24 // Number of builders to display per page
  const filteredBuilders = builders.filter((builder) => {
    const fullNameIncludes = builder.name.toLowerCase().includes(searchTerm.toLowerCase())
    const tagIncludes = builder.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const projectIncludes =
      builder.currentProject && (builder.currentProject.name.toLowerCase().includes(searchTerm.toLowerCase()) || builder.currentProject.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const websiteIncludes = builder.website && builder.website.toLowerCase().includes(searchTerm.toLowerCase())
    return fullNameIncludes || tagIncludes || projectIncludes || websiteIncludes
  })

  const sortedBuilders = [...filteredBuilders].sort((a, b) => {
    if (sort === "name") {
      return a.name.localeCompare(b.name)
    } else if (sort === "lastName") {
      const aLastName = a.name.split(" ").slice(-1)[0]
      const bLastName = b.name.split(" ").slice(-1)[0]
      return aLastName.localeCompare(bLastName)
    } else if (sort === "twitter") {
      return (b.twitter?.followers || 0) - (a.twitter?.followers || 0)
    } else if (sort === "github") {
      return (b.github?.followers || 0) - (a.github?.followers || 0)
    } else if (sort === "youtube") {
      return (b.youtube?.followers || 0) - (a.youtube?.followers || 0)
    } else if (sort === "twitch") {
      return (b.twitch?.followers || 0) - (a.twitch?.followers || 0)
    } else if (sort === "bluesky") {
      return (b.bluesky?.followers || 0) - (a.bluesky?.followers || 0)
    } else {
      return 0
    }
  })

  const displayedBuilders = sortedBuilders.slice(0, page * PER_PAGE)

  const showMore = () => setPage(page + 1)

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-end sm:items-center gap-2 mb-12">
        <div className="relative w-full sm:w-[480px]">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input type="text" placeholder="Search builders by name, expertise, tags, project, or website..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <div className="flex justify-end">
          <BuilderSortSelect sort={sort} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedBuilders.map((builder, index) => (
          <BuilderCard builder={builder} key={builder.name + index} />
        ))}
      </div>

      {displayedBuilders.length < sortedBuilders.length && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={showMore} className="text-lg py-2 px-8 h-auto opacity-70 border-foreground/20 hover:scale-105 hover:opacity-100 transition-all duration-300">
            <ChevronsDownIcon className="scale-125 opacity-50" />
            View More
          </Button>
        </div>
      )}
    </>
  )
}
