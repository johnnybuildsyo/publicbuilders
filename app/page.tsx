import Home from "@/components/views/home"
import { builders } from "./_data"

export default function HomePage() {
  return (
    <div className="w-full text-center flex flex-col gap-8">
      <Home builders={builders} />
    </div>
  )
}
