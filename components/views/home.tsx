import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Builder } from "@/app/_types"
import { BuilderDirectory } from "../builder-directory"
import { Blocks } from "lucide-react"

export default function Home({ builders }: { builders: Builder[] }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <Blocks className="inline-block mr-2 text-fuchsia-600 relative -top-0.5 scale-110" />
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
                <Link href="/join" className="hover:underline">
                  Join
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
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
              <Link href="/join">Join the Directory</Link>
            </Button>
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
