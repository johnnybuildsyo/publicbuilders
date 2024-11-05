'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Github, Globe, Briefcase, X, ExternalLink, Youtube, Twitch } from 'lucide-react'
import Link from 'next/link'

type Project = {
  name: string
  description: string
  link: string
  tags: string[]
}

type SocialMedia = {
  platform: string
  username: string
  followers: number
}

type Builder = {
  name: string
  knownFor: string
  twitter: string
  github: string
  website: string
  description: string
  tags: string[]
  currentProject?: Project
  socialMedia: SocialMedia[]
}

// Updated mock data for builders with more entries
const builders: Builder[] = [
  {
    name: "Alice Johnson",
    knownFor: "AI-powered productivity tools",
    twitter: "alice_builds",
    github: "alicecodes",
    website: "https://alicejohnson.dev",
    description: "Indie hacker focused on creating AI-powered productivity tools for remote teams.",
    tags: ["AI", "Productivity", "Remote Work"],
    currentProject: {
      name: "FocusFlow",
      description: "An AI assistant that helps manage your daily tasks and boost productivity.",
      link: "https://focusflow.app",
      tags: ["AI", "Productivity", "SaaS"]
    },
    socialMedia: [
      { platform: "twitter", username: "alice_builds", followers: 5000 },
      { platform: "github", username: "alicecodes", followers: 2000 },
      { platform: "youtube", username: "AliceBuilds", followers: 10000 },
      { platform: "twitch", username: "alice_codes_live", followers: 3000 },
      { platform: "bluesky", username: "alice.bsky.social", followers: 1500 }
    ]
  },
  {
    name: "Bob Smith",
    knownFor: "Open-source developer tools",
    twitter: "bobbuilds",
    github: "bobdev",
    website: "https://bobsmith.io",
    description: "Passionate about creating open-source tools that make developers' lives easier.",
    tags: ["Open Source", "Developer Tools", "JavaScript"],
    currentProject: {
      name: "DevLinter",
      description: "A powerful, customizable linter for modern JavaScript projects.",
      link: "https://devlinter.dev",
      tags: ["Linter", "JavaScript", "Open Source"]
    },
    socialMedia: [
      { platform: "twitter", username: "bobbuilds", followers: 8000 },
      { platform: "github", username: "bobdev", followers: 5000 },
      { platform: "youtube", username: "BobBuilds", followers: 20000 },
      { platform: "twitch", username: "bob_codes_live", followers: 2000 },
      { platform: "bluesky", username: "bob.bsky.social", followers: 1000 }
    ]
  },
  {
    name: "Carol Williams",
    knownFor: "Sustainable tech solutions",
    twitter: "carol_makes",
    github: "carolcreates",
    website: "https://carolwilliams.eco",
    description: "Entrepreneur building technology solutions for a more sustainable future.",
    tags: ["Sustainability", "GreenTech", "IoT"],
    currentProject: {
      name: "EcoTrack",
      description: "An IoT platform for monitoring and reducing energy consumption in smart homes.",
      link: "https://ecotrack.app",
      tags: ["IoT", "Energy", "Sustainability"]
    },
    socialMedia: [
      { platform: "twitter", username: "carol_makes", followers: 12000 },
      { platform: "github", username: "carolcreates", followers: 3000 },
      { platform: "youtube", username: "CarolCreates", followers: 15000 },
      { platform: "twitch", username: "carol_codes_green", followers: 5000 },
      { platform: "bluesky", username: "carol.bsky.social", followers: 2000 }
    ]
  },
  {
    name: "David Brown",
    knownFor: "Fintech innovations",
    twitter: "david_hacks",
    github: "davidbuilds",
    website: "https://davidbrown.finance",
    description: "Fintech enthusiast creating innovative solutions for personal finance management.",
    tags: ["Fintech", "Personal Finance", "Blockchain"],
    currentProject: {
      name: "CryptoSave",
      description: "A blockchain-based savings account with high-yield interest rates.",
      link: "https://cryptosave.io",
      tags: ["Crypto", "Savings", "Blockchain"]
    },
    socialMedia: [
      { platform: "twitter", username: "david_hacks", followers: 15000 },
      { platform: "github", username: "davidbuilds", followers: 7000 },
      { platform: "youtube", username: "DavidOnFintech", followers: 25000 },
      { platform: "twitch", username: "david_codes_money", followers: 4000 },
      { platform: "bluesky", username: "david.bsky.social", followers: 3000 }
    ]
  },
  {
    name: "Eva Garcia",
    knownFor: "EdTech platforms",
    twitter: "eva_launches",
    github: "evadev",
    website: "https://evagarcia.edu",
    description: "Dedicated to making education more accessible through innovative EdTech solutions.",
    tags: ["EdTech", "E-learning", "Accessibility"],
    currentProject: {
      name: "LearnLink",
      description: "An AI-powered platform connecting students with personalized learning resources.",
      link: "https://learnlink.edu",
      tags: ["EdTech", "AI", "Personalization"]
    },
    socialMedia: [
      { platform: "twitter", username: "eva_launches", followers: 10000 },
      { platform: "github", username: "evadev", followers: 4000 },
      { platform: "youtube", username: "EvaTeach", followers: 30000 },
      { platform: "twitch", username: "eva_codes_edu", followers: 6000 },
      { platform: "bluesky", username: "eva.bsky.social", followers: 2500 }
    ]
  },
  {
    name: "Frank Lee",
    knownFor: "Health and fitness apps",
    twitter: "frank_creates",
    github: "frankbuilds",
    website: "https://franklee.health",
    description: "Combining technology and fitness to create apps that promote healthier lifestyles.",
    tags: ["HealthTech", "Fitness", "Mobile Apps"],
    currentProject: {
      name: "FitTrack Pro",
      description: "An AI-powered fitness tracking app that provides personalized workout plans.",
      link: "https://fittrackpro.app",
      tags: ["Fitness", "AI", "Mobile"]
    },
    socialMedia: [
      { platform: "twitter", username: "frank_creates", followers: 20000 },
      { platform: "github", username: "frankbuilds", followers: 6000 },
      { platform: "youtube", username: "FrankFitTech", followers: 50000 },
      { platform: "twitch", username: "frank_codes_fit", followers: 8000 },
      { platform: "bluesky", username: "frank.bsky.social", followers: 4000 }
    ]
  },
  {
    name: "Grace Chen",
    knownFor: "AR/VR experiences",
    twitter: "grace_ar_vr",
    github: "gracevr",
    website: "https://gracechen.tech",
    description: "Pushing the boundaries of augmented and virtual reality for immersive learning and entertainment.",
    tags: ["AR", "VR", "Immersive Tech"],
    currentProject: {
      name: "HistoryLens",
      description: "An AR app that brings historical sites to life with interactive 3D reconstructions.",
      link: "https://historylens.app",
      tags: ["AR", "Education", "History"]
    },
    socialMedia: [
      { platform: "twitter", username: "grace_ar_vr", followers: 18000 },
      { platform: "github", username: "gracevr", followers: 5500 },
      { platform: "youtube", username: "GraceVRWorld", followers: 40000 },
      { platform: "twitch", username: "grace_codes_reality", followers: 7000 },
      { platform: "bluesky", username: "grace.bsky.social", followers: 3500 }
    ]
  },
  {
    name: "Henry Wilson",
    knownFor: "Cybersecurity tools",
    twitter: "henry_secures",
    github: "henrysec",
    website: "https://henrywilson.security",
    description: "Developing cutting-edge cybersecurity tools to protect individuals and businesses from digital threats.",
    tags: ["Cybersecurity", "Privacy", "Encryption"],
    currentProject: {
      name: "GuardianShield",
      description: "An all-in-one cybersecurity suite for small businesses with AI-powered threat detection.",
      link: "https://guardianshield.io",
      tags: ["Cybersecurity", "AI", "SaaS"]
    },
    socialMedia: [
      { platform: "twitter", username: "henry_secures", followers: 25000 },
      { platform: "github", username: "henrysec", followers: 9000 },
      { platform: "youtube", username: "HenryHacks", followers: 60000 },
      { platform: "twitch", username: "henry_codes_secure", followers: 5000 },
      { platform: "bluesky", username: "henry.bsky.social", followers: 4500 }
    ]
  }
]

function JoinDirectoryForm() {
  // ... (form component code remains unchanged)
}

export function PublicBuildersLandingComponent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")

  const filteredBuilders = builders.filter(builder =>
    builder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    builder.knownFor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    builder.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const sortedBuilders = [...filteredBuilders].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    } else if (sortBy === "followers") {
      const aFollowers = a.socialMedia.reduce((sum, social) => sum + social.followers, 0)
      const bFollowers = b.socialMedia.reduce((sum, social) => sum + social.followers, 0)
      return bFollowers - aFollowers
    }
    return 0
  })

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Public Builders</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#directory" className="hover:underline">Directory</Link></li>
              <li><Link href="#join" className="hover:underline">Join</Link></li>
              <li><Link href="#about" className="hover:underline">About</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Who's Building in Public</h1>
            <p className="text-xl md:text-2xl mb-8">Connect with indie hackers, startup founders, and ambitious makers</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg">Join the Directory</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Join the Public Builders Directory</DialogTitle>
                  <DialogDescription>
                    Fill out this form to apply to join the directory. We'll review your application and get back to you soon.
                  </DialogDescription>
                </DialogHeader>
                <JoinDirectoryForm />
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <section id="directory" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Builder Directory</h2>
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search builders by name, expertise, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex justify-end mb-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="followers">Sort by Followers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedBuilders.map(builder => (
                <Card key={builder.name} className="flex flex-col">
                  <CardHeader>
                    <div className="-mx-6 -mt-6 mb-6 h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-500">
                        {builder.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    
                    </div>
                    <CardTitle className="text-center">{builder.name}</CardTitle>
                    <CardDescription className="text-center">{builder.knownFor}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow flex flex-col">
                    <div className="flex-grow flex flex-col justify-start">
                      <p className="text-sm text-center">{builder.description}</p>
                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {builder.tags.map(tag => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex flex-col items-center gap-2 mt-4">
                        <Link href={builder.website} target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-blue-600 hover:underline">
                          {new URL(builder.website).hostname}
                        </Link>
                        <div className="flex flex-wrap justify-center gap-2">
                          {builder.socialMedia.map(social => (
                            <Link key={social.platform} href={`https://${social.platform}.com/${social.username}`} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                                {social.platform === 'twitter' && <X className="h-4 w-4" />}
                                {social.platform === 'github' && <Github className="h-4 w-4" />}
                                {social.platform === 'youtube' && <Youtube className="h-4 w-4" />}
                                {social.platform === 'twitch' && <Twitch className="h-4 w-4" />}
                                {social.platform === 'bluesky' && <Globe className="h-4 w-4" />}
                                <span>{social.followers.toLocaleString()}</span>
                              </Button>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    {builder.currentProject && (
                      <Link href={builder.currentProject.link} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="mt-4 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                          <div className="flex flex-col items-center mb-2">
                            <h3 className="font-semibold text-center">{builder.currentProject.name}</h3>
                            <Badge variant="secondary" className="text-xs font-normal mt-1 bg-transparent text-muted-foreground">Current Project</Badge>
                          </div>
                          <p className="text-sm mb-2 text-center">{builder.currentProject.description}</p>
                          <div className="flex justify-center mt-4">
                            <span className="text-sm text-blue-600 flex items-center">
                              View Project
                              <ExternalLink className="ml-1 h-3 w-3 opacity-50" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    )}
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
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg">Apply to Join</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Join the Public Builders Directory</DialogTitle>
                  <DialogDescription>
                    Fill out this form to apply to join the directory. We'll review your application and get back to you soon.
                  </DialogDescription>
                </DialogHeader>
                <JoinDirectoryForm />
              </DialogContent>
            </Dialog>
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
                <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:underline">Terms of Service</Link></li>
                <li><Link href="#" className="hover:underline">Contact</Link></li>
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