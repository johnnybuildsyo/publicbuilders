"use client"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Builder } from "@/app/_types"
import { ProjectCard } from "./project-card"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export function ProjectList({ builders, page, numPages }: { builders: Builder[]; page: number; numPages: number }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBuilders = builders.filter((builder) => {
    const fullNameIncludes = builder.name.toLowerCase().includes(searchTerm.toLowerCase())
    const tagIncludes = builder.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const projectIncludes =
      builder.currentProject && (builder.currentProject.name.toLowerCase().includes(searchTerm.toLowerCase()) || builder.currentProject.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const websiteIncludes = builder.website && builder.website.toLowerCase().includes(searchTerm.toLowerCase())
    return fullNameIncludes || tagIncludes || projectIncludes || websiteIncludes
  })

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-end sm:items-center gap-2 mb-12">
        <div className="relative w-full sm:w-[480px]">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input type="text" placeholder="Search builders by name, expertise, tags, project, or website..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
      </div>

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
          filteredBuilders.length === 1 && "md:grid-cols-1 lg:grid-cols-1 max-w-[640px] mx-auto",
          filteredBuilders.length === 2 && "md:grid-cols-2 lg:grid-cols-2"
        )}
      >
        {filteredBuilders.map((builder, index) => (
          <ProjectCard key={builder.name + index} builder={builder} />
        ))}
      </div>

      {numPages > 1 && (
        <div className="w-full max-w-full overflow-hidden">
          <div className="py-12 scale-125 sm:scale-150">
            <Pagination>
              <PaginationContent>
                <PaginationItem className={page === 1 ? "opacity-0 pointer-events-none" : ""}>
                  <PaginationPrevious href={page > 1 ? `/projects/page/${page - 1}#directory` : "#directory"} />
                </PaginationItem>
                {Array.from({ length: numPages }, (_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink href={`/projects/page/${i + 1}#directory`}>{i + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem className={page === numPages ? "opacity-0 pointer-events-none" : ""}>
                  <PaginationNext href={page < numPages ? `/projects/page/${page + 1}#directory` : "#directory"} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </>
  )
}
