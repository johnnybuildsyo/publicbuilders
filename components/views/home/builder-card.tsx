import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { Builder } from "@/app/_types"
import SocialMediaLinks from "./social-media-links"

export function BuilderCard({ builder }: { builder: Builder }) {
  return (
    <Card key={builder.name} className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="relative -mx-6 -mt-6 mb-4 h-48 bg-gray-200 rounded-t-lg overflow-hidden">
          {builder.image ? (
            <Image
              fill={true}
              src={builder.image}
              alt={builder.name}
              className="w-full h-full object-cover"
              style={{
                objectPosition: `center ${builder.imageOffset || "50%"}`,
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-500">
              {builder.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}
        </div>
        <CardTitle className="text-center font-extrabold text-2xl mb-4 tracking-wide text-balance">{builder.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow flex flex-col">
        <div className="flex-grow flex flex-col justify-start">
          <p className="text-sm text-center text-balance">{builder.description}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4 mb-2">
            {builder.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <SocialMediaLinks builder={builder} />
        </div>
        {builder.currentProject && (
          <Link href={builder.currentProject.link} target="_blank" rel="noopener noreferrer" className="w-full mt-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex flex-col items-center mb-2">
              <h3 className="font-semibold text-center">{builder.currentProject.name}</h3>
              <Badge variant="secondary" className="text-xs font-normal mt-1 bg-foreground/10 text-foreground/70 scale-90">
                Current Project
              </Badge>
            </div>
            <p className="text-sm mb-2 text-center text-balance">{builder.currentProject.description}</p>
            <div className="flex justify-center mt-4">
              <Button size="sm" className="px-3 py-1 text-xs">
                View Project
                <ExternalLink className="ml-1 h-3 w-3 opacity-50" />
              </Button>
            </div>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
