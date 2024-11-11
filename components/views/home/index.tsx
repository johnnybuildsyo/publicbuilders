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
            <p className="text-xl md:text-2xl mb-8 text-balance">Find indie makers, startup founders and ambitious doing #buildinpublic</p>
            <Button size="lg" asChild>
              <Link href="/join">Join the Directory</Link>
            </Button>
          </div>
        </section>

        <BuilderDirectory builders={builders} />

        <section id="join" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Public Builders Directory</h2>
            <p className="text-xl mb-8">Showcase your work, connect with other makers, and be part of the #buildinpublic movement</p>
            <Button size="lg" asChild>
              <Link href="/join">Join the Directory</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
