import Home from "@/components/views/home"
import { builders } from "./_data"
import { shuffleWithDateSeed } from "@/lib/utils"

export default function HomePage() {
  const shuffledBuilders = shuffleWithDateSeed(builders)

  return (
    <div className="w-full text-center flex flex-col gap-8">
      <Home builders={shuffledBuilders} />
    </div>
  )
}
