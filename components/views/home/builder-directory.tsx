"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ExternalLink } from "lucide-react"
import { Builder } from "@/app/_types"
import { GithubIcon } from "@/components/icons/github"
import { TwitterXIcon } from "@/components/icons/x"
import { BlueskyIcon } from "@/components/icons/bluesky"
import { TwitchIcon } from "@/components/icons/twitch"
import { YoutubeIcon } from "@/components/icons/youtube"
import { formatNum } from "@/lib/utils"

export function BuilderDirectory({ builders }: { builders: Builder[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")

  const filteredBuilders = builders.filter((builder) => {
    const fullNameIncludes = builder.name.toLowerCase().includes(searchTerm.toLowerCase())
    const tagIncludes = builder.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const projectIncludes =
      builder.currentProject && (builder.currentProject.name.toLowerCase().includes(searchTerm.toLowerCase()) || builder.currentProject.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const websiteIncludes = builder.website && builder.website.toLowerCase().includes(searchTerm.toLowerCase())
    return fullNameIncludes || tagIncludes || projectIncludes || websiteIncludes
  })

  const sortedBuilders = [...filteredBuilders].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    } else if (sortBy === "lastName") {
      const aLastName = a.name.split(" ").slice(-1)[0]
      const bLastName = b.name.split(" ").slice(-1)[0]
      return aLastName.localeCompare(bLastName)
    } else if (sortBy === "twitterFollowers") {
      return (b.twitterFollowers || 0) - (a.twitterFollowers || 0)
    } else if (sortBy === "githubFollowers") {
      return (b.githubFollowers || 0) - (a.githubFollowers || 0)
    } else if (sortBy === "youtubeSubscribers") {
      return (b.youtubeSubscribers || 0) - (a.youtubeSubscribers || 0)
    } else if (sortBy === "twitchSubscribers") {
      return (b.twitchSubscribers || 0) - (a.twitchSubscribers || 0)
    } else if (sortBy === "blueskyFollowers") {
      return (b.blueskyFollowers || 0) - (a.blueskyFollowers || 0)
    } else {
      return 0
    }
  })

  return (
    <section id="directory" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl tracking-wide font-black text-center mb-8">Builder Directory</h2>
        <div className="flex flex-col sm:flex-row justify-center items-end sm:items-center gap-2 mb-12">
          <div className="relative w-full sm:w-[480px]">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="Search builders by name, expertise, tags, project, or website..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <div className="flex justify-end">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by First Name</SelectItem>
                <SelectItem value="lastName">Sort by Last Name</SelectItem>
                <SelectItem value="twitterFollowers">Sort by Twitter</SelectItem>
                <SelectItem value="githubFollowers">Sort by GitHub</SelectItem>
                <SelectItem value="youtubeSubscribers">Sort by YouTube</SelectItem>
                <SelectItem value="twitchSubscribers">Sort by Twitch</SelectItem>
                <SelectItem value="blueskyFollowers">Sort by Bluesky</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedBuilders.map((builder) => (
            <Card key={builder.name} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="relative -mx-6 -mt-6 mb-4 h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                  {builder.image ? (
                    <Image
                      fill={true}
                      src={builder.image}
                      alt={builder.name}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: `center ${builder.imageOffset || "50%"}`,
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-500">
                      {builder.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                </div>
                <CardTitle className="text-center font-extrabold text-2xl mb-4 tracking-wide text-balance">{builder.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow flex flex-col">
                <div className="flex-grow flex flex-col justify-start">
                  <p className="text-sm text-center text-balance">{builder.description}</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {builder.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col items-center gap-2 mt-4">
                    <Link href={builder.website} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-blue-600 hover:underline mb-2">
                      {new URL(builder.website).hostname}
                    </Link>
                    <div className="flex gap-2 flex-wrap justify-center">
                      {/* Social Media Links with Follower Counts */}
                      {builder.twitter && (
                        <Link href={builder.twitter} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <TwitterXIcon className="scale-75" />
                            <span className="sr-only">X (formerly Twitter)</span>
                            {builder.twitterFollowers && <span>{formatNum(builder.twitterFollowers)}</span>}
                          </Button>
                        </Link>
                      )}
                      {builder.youtube && (
                        <Link href={builder.youtube} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <YoutubeIcon />
                            <span className="sr-only">YouTube</span>
                            {builder.youtubeSubscribers && <span>{formatNum(builder.youtubeSubscribers)}</span>}
                          </Button>
                        </Link>
                      )}
                      {builder.twitch && (
                        <Link href={builder.twitch} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <TwitchIcon />
                            <span className="sr-only">Twitch</span>
                            {builder.twitchSubscribers && <span>{formatNum(builder.twitchSubscribers)}</span>}
                          </Button>
                        </Link>
                      )}
                      {builder.github && (
                        <Link href={builder.github} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <GithubIcon />
                            <span className="sr-only">GitHub</span>
                            {builder.githubFollowers && <span>{formatNum(builder.githubFollowers)}</span>}
                          </Button>
                        </Link>
                      )}
                      {builder.bluesky && (
                        <Link href={builder.bluesky} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <BlueskyIcon />
                            <span className="sr-only">Bluesky</span>
                            {builder.blueskyFollowers && <span>{formatNum(builder.blueskyFollowers)}</span>}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                {builder.currentProject && (
                  <Link href={builder.currentProject.link} target="_blank" rel="noopener noreferrer" className="w-full mt-4 p-4 bg-gray-100 rounded-lg">
                    <div className="flex flex-col items-center mb-2">
                      <h3 className="font-semibold text-center">{builder.currentProject.name}</h3>
                      <Badge variant="secondary" className="text-xs font-normal mt-1 bg-foreground/10 text-foreground/70 scale-90">
                        Current Project
                      </Badge>
                    </div>
                    <p className="text-sm mb-2 text-center text-balance">{builder.currentProject.description}</p>
                    <div className="flex justify-center mt-4">
                      <Button size="sm" className="px-3 py-1 text-xs">
                        View Project
                        <ExternalLink className="ml-1 h-3 w-3 opacity-50" />
                      </Button>
                    </div>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
