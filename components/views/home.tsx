"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Twitter, Github, Star, Users } from "lucide-react"
import Link from "next/link"

// Updated mock data for builders
const builders = [
  { id: 1, name: "Alice Johnson", role: "Indie Hacker", avatar: "/placeholder.svg?height=100&width=100", twitter: "alice_builds", github: "alicecodes", githubStars: 1200, twitterFollowers: 5000 },
  { id: 2, name: "Bob Smith", role: "Startup Founder", avatar: "/placeholder.svg?height=100&width=100", twitter: "bobbuilds", github: "bobdev", githubStars: 800, twitterFollowers: 3500 },
  { id: 3, name: "Carol Williams", role: "Maker", avatar: "/placeholder.svg?height=100&width=100", twitter: "carol_makes", github: "carolcreates", githubStars: 1500, twitterFollowers: 7000 },
  { id: 4, name: "David Brown", role: "Indie Hacker", avatar: "/placeholder.svg?height=100&width=100", twitter: "david_hacks", github: "davidbuilds", githubStars: 2000, twitterFollowers: 10000 },
  { id: 5, name: "Eva Garcia", role: "Startup Founder", avatar: "/placeholder.svg?height=100&width=100", twitter: "eva_launches", github: "evadev", githubStars: 600, twitterFollowers: 2500 },
  { id: 6, name: "Frank Lee", role: "Maker", avatar: "/placeholder.svg?height=100&width=100", twitter: "frank_creates", github: "frankbuilds", githubStars: 950, twitterFollowers: 4200 },
]

export function Home() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBuilders = builders.filter((builder) => builder.name.toLowerCase().includes(searchTerm.toLowerCase()) || builder.role.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Public Builders
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="#directory" className="hover:underline">
                  Directory
                </Link>
              </li>
              <li>
                <Link href="#join" className="hover:underline">
                  Join
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:underline">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Who’s Building in Public</h1>
            <p className="text-xl md:text-2xl mb-8">Connect with indie hackers, startup founders, and ambitious makers</p>
            <Button size="lg" asChild>
              <Link href="#join">Join the Directory</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Builders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {builders.slice(0, 3).map((builder) => (
                <Card key={builder.id}>
                  <CardHeader>
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={builder.avatar} alt={builder.name} />
                      <AvatarFallback>
                        {builder.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>{builder.name}</CardTitle>
                    <CardDescription>{builder.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-center space-x-4">
                      <div className="flex items-center">
                        <Github className="h-4 w-4 mr-2" />
                        <span>{builder.githubStars.toLocaleString()} stars</span>
                      </div>
                      <div className="flex items-center">
                        <Twitter className="h-4 w-4 mr-2" />
                        <span>{builder.twitterFollowers.toLocaleString()} followers</span>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <Link href={`https://twitter.com/${builder.twitter}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <Twitter className="h-4 w-4 mr-2" />
                          Twitter
                        </Button>
                      </Link>
                      <Link href={`https://github.com/${builder.github}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="directory" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Builder Directory</h2>
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input type="text" placeholder="Search builders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBuilders.map((builder) => (
                <Card key={builder.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={builder.avatar} alt={builder.name} />
                        <AvatarFallback>
                          {builder.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{builder.name}</CardTitle>
                        <CardDescription>{builder.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary">{builder.role}</Badge>
                        <div className="flex space-x-4">
                          <div className="flex items-center" title="GitHub Stars">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            <span>{builder.githubStars.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center" title="Twitter Followers">
                            <Users className="h-4 w-4 mr-1 text-blue-500" />
                            <span>{builder.twitterFollowers.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Link href={`https://twitter.com/${builder.twitter}`} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Twitter className="h-4 w-4 mr-2" />
                            Twitter
                          </Button>
                        </Link>
                        <Link href={`https://github.com/${builder.github}`} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Github className="h-4 w-4 mr-2" />
                            GitHub
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="join" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Public Builders Directory</h2>
            <p className="text-xl mb-8">Showcase your work, connect with others, and be part of the #buildinpublic movement</p>
            <Button size="lg">Apply to Join</Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Public Builders</h3>
              <p>Connecting the #buildinpublic community</p>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Public Builders. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
