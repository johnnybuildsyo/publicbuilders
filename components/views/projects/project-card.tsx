import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { Builder } from "@/app/_types"
import SocialMediaLinks from "../home/social-media-links"
import { cn } from "@/lib/utils"
import slugify from "slugify"

export function ProjectCard({ builder, variant = "card" }: { builder: Builder; variant?: "card" | "page" }) {
  const project = builder.currentProject

  return (
    <Card key={builder.name} className={cn("flex flex-col", variant === "page" && "rounded-none sm:rounded-lg w-full max-w-6xl mx-auto -mt-16 mb-24 py-12")}>
      {project && (
        <>
          <CardHeader className={cn("relative pb-2", variant === "page" && "flex items-center")}>
            <Link
              href={variant === "page" ? project.link : `/projects/${slugify(project.name, { lower: true })}`}
              className={cn("relative -mx-6 -mt-6 mb-4 bg-gray-200 overflow-hidden", variant === "page" ? "w-full max-w-3xl rounded-lg aspect-video border shadow-lg" : "h-48 rounded-t-lg border-b")}
            >
              {project.image ? (
                <Image
                  fill={true}
                  src={project.image.replace("publicbuilders.s3.us-east-2.amazonaws.com", "d11q8iqsbffqvr.cloudfront.net")}
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
            </Link>
            <CardTitle className={cn("text-center tracking-wide text-balance", variant === "card" ? "text-2xl font-extrabold" : "text-4xl font-black pt-4")}>
              {variant === "card" ? <Link href={`/projects/${slugify(project.name, { lower: true })}`}>{project.name}</Link> : project.name}
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
              <div className="flex flex-col items-center gap-4 justify-center mt-8">
                <div>
                  <a href={project.link} target="_blank" className="text-xl text-blue-600">
                    {project.link.replace("https://", "").replace(/\/$/, "")}
                  </a>{" "}
                </div>
                <Link href={project.link} target="_blank" className="flex items-center">
                  <Button size="sm" className="px-3 py-1 text-xs">
                    Open Project
                    <ExternalLink className="ml-1 h-3 w-3 opacity-50" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className={cn("pt-4 border-t", variant === "page" && "mt-8")}>
              <h3 className="text-center font-thin">#builtinpublic by…</h3>
              <Link href={`/profile/${slugify(builder.name, { lower: true })}`}>
                <div className="flex items-center justify-center mt-2">
                  {builder.image ? (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border border-foreground/20 shadow">
                      <Image src={builder.image.replace("publicbuilders.s3.us-east-2.amazonaws.com", "d11q8iqsbffqvr.cloudfront.net")} alt={`Profile picture of ${builder.name}`} fill={true} className="object-cover" />
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
                <p className="text-center mt-2 text-lg tracking-wide font-extrabold">{builder.name}</p>
              </Link>
              <p className="text-center text-sm text-gray-500 text-balance pb-4">{builder.description}</p>
              <SocialMediaLinks builder={builder} />
            </div>
          </CardContent>
        </>
      )}
    </Card>
  )
}
