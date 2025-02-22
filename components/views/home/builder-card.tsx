import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronsLeft, ExternalLink, UserIcon, TrendingUp, Users } from "lucide-react"
import { Builder } from "@/app/_types"
import SocialMediaLinks from "./social-media-links"
import slugify from "slugify"
import CopyNotifyButton from "../admin/copy-notify-button"
import { cn, formatNum } from "@/lib/utils"
import { FollowerGrowthChart } from "./follower-growth-chart"
import { calculateGrowth } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function BuilderCard({ builder, variant = "card" }: { builder: Builder; variant?: "card" | "page" }) {
  const { percentGrowth, totalGrowth } = calculateGrowth(builder, "14")
  const showPercentGrowth = percentGrowth > 0
  const showTotalGrowth = totalGrowth >= 100

  return (
    <Card key={builder.name} className={cn("flex flex-col", variant === "page" && "rounded-none border-none shadow-none mb-24")}>
      <CardHeader className={cn("relative pb-2", variant === "page" && "flex items-center -mt-24")}>
        <div
          className={cn(
            "relative -mx-6 -mt-6 mb-4 bg-gray-200 overflow-hidden",
            variant === "page" ? "rounded-full w-72 h-72 border-8 border-background shadow-lg ring-1 ring-fuchsia-400/70" : "h-48 rounded-t-lg border-b"
          )}
        >
          <Link href={`/profile/${slugify(builder.name, { lower: true })}`}>
            {builder.image ? (
              <Image
                fill={true}
                src={builder.image.replace("publicbuilders.s3.us-east-2.amazonaws.com", "d11q8iqsbffqvr.cloudfront.net")}
                alt={`Profile picture of ${builder.name}`}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: `center ${builder.imageOffset || "50%"}`,
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-foreground/50">
                {builder.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
          </Link>
        </div>
        {variant === "page" && (
          <div className="absolute top-24 right-8 hidden lg:block">
            <Link className="flex text-blue-700/80 hover:text-blue-600 font-light py-2 transition-all ease-in-out duration-300" href="/">
              <ChevronsLeft className="scale-75" />
              Back to Public Builders Directory
            </Link>
          </div>
        )}
        {(showPercentGrowth || showTotalGrowth) && (
          <div className={cn("flex justify-center gap-2 -mb-1", variant === "page" && "py-4 scale-150")}>
            {showPercentGrowth && (
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs font-normal flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {percentGrowth.toFixed(1)}%
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Follower growth in the last 10 days</TooltipContent>
              </Tooltip>
            )}
            {showTotalGrowth && (
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs font-normal flex items-center gap-1">
                    <Users className="w-3 h-3" />+{formatNum(totalGrowth)}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Total new followers in the last 10 days</TooltipContent>
              </Tooltip>
            )}
          </div>
        )}
        <CardTitle className={cn("text-center tracking-wide text-balance", variant === "card" ? "text-2xl font-extrabold" : "text-6xl font-black")}>
          {variant === "card" ? <Link href={`/profile/${slugify(builder.name, { lower: true })}`}>{builder.name}</Link> : builder.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow flex flex-col">
        <div className={cn("flex-grow flex flex-col justify-start", variant === "page" && "pb-8")}>
          {variant === "card" && (
            <div className="flex justify-center -mt-2 mb-2">
              <Link href={`/profile/${slugify(builder.name, { lower: true })}`}>
                <Button size="sm" className="mb-2 h-auto py-1 pr-2 scale-90 bg-fuchsia-700 hover:bg-fuchsia-600 transition-all ease-in-out duration-300">
                  view profile <UserIcon className="scale-90 -ml-1" />
                </Button>
              </Link>
            </div>
          )}
          <p className={cn("text-sm text-center text-balance px-4 w-full max-w-5xl mx-auto", variant === "page" && "py-4 text-xl")}>{builder.description}</p>
          <a href={builder.website} target="_blank" className="text-blue-700/80 hover:text-blue-600 text-xl line-clamp-1 py-4 transition-all ease-in-out duration-300 h-12 mb-4">
            {builder.website.replace("https://", "").replace(/\/+$/, "")}
          </a>
          <FollowerGrowthChart hideIfNoGrowth={variant === "page"} bskyFollowerGrowth={builder.bluesky?.followerGrowth} xFollowerGrowth={builder.twitter?.followerGrowth} />
          <div className="pt-4">
            <SocialMediaLinks builder={builder} />
          </div>
          <div className={cn("flex flex-wrap justify-center gap-2 mt-4", variant === "page" ? "mb-6" : "mb-2")}>
            {builder.tags.map((tag) => (
              <Badge className={cn("", variant === "page" && "text-lg font-normal px-4 bg-foreground/10")} key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className={cn("flex flex-col", variant === "page" && "gap-12")}>
          {builder.currentProject && (
            <Link
              href={variant === "page" ? builder.currentProject.link : `/projects/${slugify(builder.currentProject.name, { lower: true })}`}
              target={variant === "page" ? "_blank" : "_self"}
              className={cn("w-full max-w-2xl mx-auto bg-gradient-to-t from-foreground/5 to-background border-foreground/5 border rounded-lg", variant === "page" ? "px-4 pb-8" : "p-4")}
            >
              {variant === "page" && (
                <Badge
                  variant="secondary"
                  className="text-sm bg-gradient-to-t from-foreground/5 via-background to-background font-semibold relative -top-4 bg-background border-2 border-slate-200 px-6 py-1 text-foreground/80 uppercase scale-90 -mb-2"
                >
                  Current Project
                </Badge>
              )}
              <div className="flex flex-col items-center mb-2">
                {variant === "page" && builder.currentProject.image && (
                  <div className="relative w-3/4 my-2 aspect-video overflow-hidden rounded-lg border">
                    <Image
                      src={builder.currentProject.image.replace("publicbuilders.s3.us-east-2.amazonaws.com", "d11q8iqsbffqvr.cloudfront.net")}
                      fill={true}
                      alt={"Screenshot of " + builder.currentProject.name}
                      className="w-full h-auto max-w-2xl rounded-lg"
                    />
                  </div>
                )}
                <h3 className={cn("font-semibold text-center", variant === "page" && "font-normal text-2xl text-blue-700/80 hover:text-blue-600")}>{builder.currentProject.name}</h3>
                {variant === "card" && (
                  <Badge variant="secondary" className="text-xs font-normal mt-1 bg-foreground/10 text-foreground/70 scale-90">
                    Current Project
                  </Badge>
                )}
              </div>
              <p className={cn("mb-2 text-center text-balance", variant === "card" && "text-sm")}>{builder.currentProject.description}</p>
              {variant === "page" && (
                <div className="flex flex-wrap justify-center gap-4 py-2">
                  {builder.currentProject.tags.map((tag) => (
                    <Badge className="text-lg font-normal px-4 bg-foreground/10" key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex justify-center mt-4">
                <Button size="sm" className="px-3 py-1 text-xs">
                  Open Project
                  <ExternalLink className="ml-1 h-3 w-3 opacity-50" />
                </Button>
              </div>
            </Link>
          )}
          <div className="flex flex-col gap-6">
            {variant === "page" && builder.newsletter && (
              <Link href={builder.newsletter} target="_blank" className={cn("w-full max-w-2xl mx-auto border-t", variant === "page" ? "px-4 pb-8" : "p-4")}>
                {variant === "page" && (
                  <Badge
                    variant="secondary"
                    className="text-sm bg-gradient-to-t from-foreground/5 via-background to-background font-semibold relative -top-4 bg-background border-2 border-slate-200 px-6 py-1 text-foreground/80 uppercase scale-90 -mb-2"
                  >
                    Newsletter
                  </Badge>
                )}
                <div className="flex flex-col items-center">
                  <h3 className={cn("text-center sm:text-xl tracking-wide text-blue-700/80 hover:text-blue-600")}>{builder.newsletter.split("//")[1].replace(/\/$/, "")}</h3>
                </div>
                <div className="flex justify-center mt-2 scale-90">
                  <Button size="sm" className="px-3 py-1 text-xs">
                    Subscribe
                    <ExternalLink className="ml-1 h-3 w-3 opacity-50" />
                  </Button>
                </div>
              </Link>
            )}

            {variant === "page" && builder.podcast && (
              <Link href={builder.podcast} target="_blank" className={cn("mb-8 w-full max-w-2xl mx-auto border-t", variant === "page" ? "px-4 pb-8" : "p-4")}>
                {variant === "page" && (
                  <Badge
                    variant="secondary"
                    className="text-sm bg-gradient-to-t from-foreground/5 via-background to-background font-semibold relative -top-4 bg-background border-2 border-slate-200 px-6 py-1 text-foreground/80 uppercase scale-90 -mb-2"
                  >
                    Podcast
                  </Badge>
                )}
                <div className="flex flex-col items-center">
                  <h3 className={cn("text-center sm:text-xl tracking-wide text-blue-700/80 hover:text-blue-600")}>{builder.podcast.split("//")[1].replace(/\/$/, "")}</h3>
                </div>
                <div className="flex justify-center mt-2 scale-90">
                  <Button size="sm" className="px-3 py-1 text-xs">
                    Listen
                    <ExternalLink className="ml-1 h-3 w-3 opacity-50" />
                  </Button>
                </div>
              </Link>
            )}
          </div>
        </div>
        {variant === "page" && process.env.NODE_ENV === "development" && builder.twitter?.url && (
          <div className="flex justify-center">
            <CopyNotifyButton />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
