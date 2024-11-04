import Link from "next/link"
import { Blocks } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <Blocks className="inline-block mr-2 text-fuchsia-600 relative -top-0.5 scale-110" />
          Public Builders
        </Link>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link href="#directory" className="transition-all ease-in-out duration-500 hover:border-b border-foreground/30 border-dotted">
                Directory
              </Link>
            </li>
            <li>
              <Link href="/join" className="transition-all ease-in-out duration-500 hover:border-b border-foreground/30 border-dotted">
                Join
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-all ease-in-out duration-500 hover:border-b border-foreground/30 border-dotted">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
