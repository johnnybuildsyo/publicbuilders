import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { Builder } from "@/app/_types"
import SocialMediaLinks from "../home/social-media-links"
import { cn } from "@/lib/utils"

export function ProjectCard({ builder, variant = "card" }: { builder: Builder; variant?: "card" | "page" }) {
  const project = builder.currentProject

  return (
    <Card key={builder.name} className={cn("flex flex-col", variant === "page" && "rounded-none border-none shadow-none mb-24")}>
      {project && (
        <>
          <CardHeader className={cn("relative pb-2", variant === "page" && "flex items-center -mt-24")}>
            <div className={cn("relative -mx-6 -mt-6 mb-4 bg-gray-200 overflow-hidden", variant === "page" ? "rounded-lg aspect-video border" : "h-48 rounded-t-lg border-b")}>
              {project.image ? (
                <Image
                  fill={true}
                  src={project.image}
                  style={{
                    objectPosition: `center 0%`,
                  }}
                  alt={`Screenshot of ${project.name}`}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-foreground/50">
                  {project.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
            </div>
            <CardTitle className={cn("text-center tracking-wide text-balance", variant === "card" ? "text-2xl font-extrabold" : "text-4xl font-black")}>
              {variant === "card" ? (
                <Link href={project.link} target="_blank">
                  {project.name}
                </Link>
              ) : (
                project.name
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow flex flex-col">
            <div className="text-center grow pb-4">
              <p className={cn("mb-4 text-balance", variant === "page" && "text-lg")}>{project.description}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} className={cn("bg-foreground/10", variant === "page" && "text-lg font-normal px-4")} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <Button size="sm" className="px-3 py-1 text-xs">
                  View Project
                  <ExternalLink className="ml-1 h-3 w-3 opacity-50" />
                </Button>
              </div>
            </div>

            <div className={cn("pt-4 border-t", variant === "page" && "mt-8")}>
              <h3 className="text-lg font-semibold text-center">Builder</h3>
              <div className="flex items-center justify-center mt-4">
                {builder.image ? (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border">
                    <Image src={builder.image} alt={`Profile picture of ${builder.name}`} fill={true} className="object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
                    {builder.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
              </div>
              <p className="text-center mt-2 text-base font-medium">{builder.name}</p>
              <p className="text-center text-sm text-gray-500 text-balance pb-4">{builder.description}</p>
              <SocialMediaLinks builder={builder} />
            </div>
          </CardContent>
        </>
      )}
    </Card>
  )
}
