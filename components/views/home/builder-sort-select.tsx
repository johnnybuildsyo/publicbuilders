"use client"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BuilderSortSelect({ sort }: { sort?: string }) {
  const router = useRouter()

  // Set "trending" as the default sort option
  const currentSort = sort || "trending"

  return (
    <>
      <Select
        value={currentSort}
        onValueChange={(sortOption) => {
          router.push(`/${sortOption}`, { scroll: false })
        }}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="trending">Sort by Trending</SelectItem>
          <SelectItem value="percentGrowth">Sort by % Growth</SelectItem>
          <SelectItem value="totalGrowth">Sort by Total Growth</SelectItem>
          <SelectItem value="name">Sort by First Name</SelectItem>
          <SelectItem value="lastName">Sort by Last Name</SelectItem>
          <SelectItem value="recent">Sort by Recently Added</SelectItem>
          <SelectItem value="bluesky">Sort by Bluesky</SelectItem>
          <SelectItem value="twitter">Sort by Twitter</SelectItem>
          <SelectItem value="youtube">Sort by YouTube</SelectItem>
          <SelectItem value="github">Sort by GitHub</SelectItem>
          <SelectItem value="producthunt">Sort by Product Hunt</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}
