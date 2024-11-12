import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Public Builders</h3>
            <p>Connecting the #buildinpublic community</p>
            <p>
              <span className="block text-sm">
                Built and maintained by{" "}
                <a className="text-fuchsia-400" href="https://johnnybuilds.com">
                  Johnny Builds
                </a>
              </span>
              <a className="block text-sm text-fuchsia-400" href="https://github.com/johnnybuildsyo/publicbuilders">
                View Source on Github
              </a>
              <a className="block text-sm text-fuchsia-400" href="https://github.com/johnnybuildsyo/publicbuilders/blob/main/README.md">
                Read Build Log
              </a>
            </p>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="https://github.com/johnnybuildsyo/publicbuilders/discussions" className="hover:underline">
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
  )
}
