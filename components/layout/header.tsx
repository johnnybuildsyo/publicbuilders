"use client"

import Link from "next/link"
import { useState } from "react"
import { Blocks } from "lucide-react"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Menu, X } from "lucide-react" // Import icons for the mobile menu

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-b fixed top-0 left-0 right-0 z-50 lg:relative bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <Blocks className="mr-2 text-fuchsia-600 scale-110 md:scale-100" />
          <span>Public Builders</span>
        </Link>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden focus:outline-none">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <nav className={`${menuOpen ? "block" : "hidden"} md:block`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 space-y-2 md:space-y-0">
            <li>
              <Link href="/" className="transition-all ease-in-out duration-500 hover:border-b border-foreground/50 border-dotted">
                Builders
              </Link>
            </li>
            <li>
              <Link href="/projects" className="transition-all ease-in-out duration-500 hover:border-b border-foreground/50 border-dotted">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/resources" className="transition-all ease-in-out duration-500 hover:border-b border-foreground/50 border-dotted">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/join" className="transition-all ease-in-out duration-500 hover:border-b border-foreground/50 border-dotted">
                Join
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-all ease-in-out duration-500 hover:border-b border-foreground/50 border-dotted">
                About
              </Link>
            </li>
            <li>
              <Link href="https://github.com/johnnybuildsyo/publicbuilders" className="transition-all ease-in-out duration-500 opacity-50 hover:opacity-70">
                <GitHubLogoIcon className="w-6 h-6" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
