import Main from "@/components/layout/main"
import { Builder } from "@/app/_types"
import { reverseSlugify } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "../projects/project-card"

export default function Project({ builder, slug }: { builder?: Builder; slug: string }) {
  return (
    <Main variant="projects" headerClassName={builder ? "pb-36" : ""}>
      {builder ? (
        <ProjectCard builder={builder} variant="page" />
      ) : (
        <div className="py-16">
          <div className="w-full max-w-lg mx-auto rounded-xl border-2 border-dashed text-xl py-24 mb-8 italic text-foreground/50">Profile not found{slug ? ` for ${reverseSlugify(slug)}` : ""}</div>
          <p className="pb-2">Are we missing someone from our list?</p>
          <Link href="https://github.com/johnnybuildsyo/publicbuilders/discussions">
            <Button size="lg" className="text-lg">
              Let Us Know
            </Button>
          </Link>
        </div>
      )}
    </Main>
  )
}
