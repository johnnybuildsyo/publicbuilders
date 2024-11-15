import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Main({ children, headerClassName }: { children: ReactNode; headerClassName?: string }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className={cn("bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20", headerClassName)}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl sm:pt-12 lg:pt-0 md:text-6xl font-bold mb-4 text-balance">Discover Who’s Who in the Build in Public Community</h1>
            <p className="text-xl md:text-2xl mb-8 text-balance">Find indie makers, startup founders and ambitious entrepreneurs doing #buildinpublic</p>
            <Button size="lg" asChild className="text-xl h-auto py-3 hover:scale-105 transition-all ease-in-out duration-300">
              <Link href="/join">Join the Directory</Link>
            </Button>
          </div>
        </section>

        {children}

        <section id="join" className="py-16 bg-gradient-to-tl from-foreground/10 to-background border-t border-foreground/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Public Builders Directory</h2>
            <p className="text-xl mb-8">Showcase your work, connect with other makers, and be part of the #buildinpublic movement</p>
            <Button size="lg" asChild className="text-xl h-auto py-3 bg-fuchsia-600 hover:bg-fuchsia-700 hover:scale-105 transition-all ease-in-out duration-300">
              <Link href="/join">Join the Directory</Link>
            </Button>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 items-center gap-8 mt-12 mb-4 w-full max-w-2xl md:max-w-5xl mx-auto">
              <Link href="/recent#directory" className="border rounded-lg p-4 bg-white text-blue-600 hover:underline hover:scale-105 transition-all ease-in-out duration-300 text-lg">
                Recently Added
              </Link>
              <Link href="/twitter#directory" className="border rounded-lg p-4 bg-white text-blue-600 hover:underline hover:scale-105 transition-all ease-in-out duration-300 text-lg">
                Top Builders on Twitter
              </Link>
              <Link href="/bluesky#directory" className="border rounded-lg p-4 bg-white text-blue-600 hover:underline hover:scale-105 transition-all ease-in-out duration-300 text-lg">
                Top Builders on Bluesky
              </Link>
              <Link href="/github#directory" className="border rounded-lg p-4 bg-white text-blue-600 hover:underline hover:scale-105 transition-all ease-in-out duration-300 text-lg">
                Top Builders on GitHub
              </Link>
              <Link href="/youtube#directory" className="border rounded-lg p-4 bg-white text-blue-600 hover:underline hover:scale-105 transition-all ease-in-out duration-300 text-lg">
                Top Builders on YouTube
              </Link>
              <Link href="/producthunt#directory" className="border rounded-lg p-4 bg-white text-blue-600 hover:underline hover:scale-105 transition-all ease-in-out duration-300 text-lg">
                Top Builders on Product Hunt
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
