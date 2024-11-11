import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Builder } from "@/app/_types"
import { BuilderDirectory } from "./builder-directory"

export default function Home({ builders }: { builders: Builder[] }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Discover Who’s Who in the Build in Public Community</h1>
            <p className="text-xl md:text-2xl mb-8 text-balance">Find indie makers, startup founders and ambitious entrepreneurs doing #buildinpublic</p>
            <Button size="lg" asChild className="text-xl h-auto py-3 hover:scale-105 transition-all ease-in-out duration-300">
              <Link href="/join">Join the Directory</Link>
            </Button>
          </div>
        </section>

        <BuilderDirectory builders={builders} />

        <section id="join" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Public Builders Directory</h2>
            <p className="text-xl mb-8">Showcase your work, connect with other makers, and be part of the #buildinpublic movement</p>
            <Button size="lg" asChild className="text-xl h-auto py-3 bg-fuchsia-600 hover:bg-fuchsia-700 hover:scale-105 transition-all ease-in-out duration-300">
              <Link href="/join">Join the Directory</Link>
            </Button>
            <div className="grid grid-cols-2 items-center gap-8 mt-12 mb-4 w-full max-w-2xl mx-auto">
              <Link href="/twitter" className="border rounded-lg p-4 bg-white text-blue-600 hover:underline hover:scale-105 transition-all ease-in-out duration-300 text-lg">
                Top Builders on Twitter
              </Link>
              <Link href="/bluesky" className="border rounded-lg p-4 bg-white text-blue-600 hover:underline hover:scale-105 transition-all ease-in-out duration-300 text-lg">
                Top Builders on Bluesky
              </Link>
              <Link href="/github" className="border rounded-lg p-4 bg-white text-blue-600 hover:underline hover:scale-105 transition-all ease-in-out duration-300 text-lg">
                Top Builders on GitHub
              </Link>
              <Link href="/youtube" className="border rounded-lg p-4 bg-white text-blue-600 hover:underline hover:scale-105 transition-all ease-in-out duration-300 text-lg">
                Top Builders on YouTube
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
