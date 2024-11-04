import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, X, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Builder } from "@/app/_types"
import { BuilderDirectory } from "../builder-directory"

export default function Home({ builders }: { builders: Builder[] }) {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Who's Building in Public</h1>
            <p className="text-xl md:text-2xl mb-8">Connect with indie hackers, startup founders, and ambitious makers</p>
            <Button size="lg" asChild>
              <Link href="/join">Join the Directory</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Top Builders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {builders.slice(0, 3).map((builder) => (
                <Card key={builder.name} className="flex flex-col">
                  <CardHeader>
                    <div className="-mx-6 -mt-6 mb-6 h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-500">
                        {builder.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </div>
                    <CardTitle className="text-center">{builder.name}</CardTitle>
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
                          <Link href={`https://x.com/${builder.twitter}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              <X className="h-4 w-4" />
                              <span className="sr-only">X (formerly Twitter)</span>
                            </Button>
                          </Link>
                          <Link href={`https://github.com/${builder.github}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              <Github className="h-4 w-4" />
                              <span className="sr-only">GitHub</span>
                            </Button>
                          </Link>
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

        <BuilderDirectory builders={builders} />

        <section id="join" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Public Builders Directory</h2>
            <p className="text-xl mb-8">Showcase your work, connect with others, and be part of the #buildinpublic movement</p>
            <Button size="lg" asChild>
              <Link href="/join">Join the Directory</Link>
            </Button>
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
