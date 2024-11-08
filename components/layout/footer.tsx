import Link from "next/link"

export default function Footer() {
  return (
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
  )
}
