"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Search, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Builder } from "@/app/_types"
import { GithubIcon } from "./icons/github"
import { TwitterXIcon } from "./icons/x"
import { BlueskyIcon } from "./icons/bluesky"

export function BuilderDirectory({ builders }: { builders: Builder[] }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBuilders = builders.filter(
    (builder) =>
      builder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      builder.knownFor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      builder.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <section id="directory" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl tracking-wide font-black text-center mb-8">Builder Directory</h2>
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="Search builders by name, expertise, or tags..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBuilders.map((builder) => (
            <Card key={builder.name} className="flex flex-col">
              <CardHeader>
                <div className="-mx-6 -mt-6 mb-4 h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-500">
                    {builder.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <CardTitle className="text-center font-extrabold text-2xl mb-4 tracking-wide">{builder.name}</CardTitle>
                <CardDescription className="text-center">{builder.knownFor}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow flex flex-col">
                <div className="flex-grow flex flex-col justify-start">
                  <p className="text-sm text-center">{builder.description}</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {builder.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col items-center gap-2 mt-4">
                    <Link href={builder.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                      {new URL(builder.website).hostname}
                    </Link>
                    <div className="flex gap-2">
                      {builder.twitter && (
                        <Link href={builder.twitter} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <TwitterXIcon className="scale-75" />
                            <span className="sr-only">X (formerly Twitter)</span>
                          </Button>
                        </Link>
                      )}
                      {builder.github && (
                        <Link href={builder.github} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <GithubIcon />
                            <span className="sr-only">GitHub</span>
                          </Button>
                        </Link>
                      )}
                      {builder.bluesky && (
                        <Link href={builder.bluesky} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <BlueskyIcon />
                            <span className="sr-only">Bluesky</span>
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                {builder.currentProject && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <div className="flex flex-col items-center mb-2">
                      <h3 className="font-semibold text-center">{builder.currentProject.name}</h3>
                      <Badge variant="secondary" className="text-xs font-normal mt-1 bg-transparent text-muted-foreground">
                        Current Project
                      </Badge>
                    </div>
                    <p className="text-sm mb-2 text-center">{builder.currentProject.description}</p>
                    <div className="flex justify-center mt-4">
                      <Button asChild size="sm" className="px-3 py-1 text-xs">
                        <Link href={builder.currentProject.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          View Project
                          <ExternalLink className="ml-1 h-3 w-3 opacity-50" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
