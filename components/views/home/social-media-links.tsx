import { TwitterXIcon } from "@/components/icons/x"
import { YoutubeIcon } from "@/components/icons/youtube"
import { TwitchIcon } from "@/components/icons/twitch"
import { GithubIcon } from "@/components/icons/github"
import { BlueskyIcon } from "@/components/icons/bluesky"
import { Builder } from "@/app/_types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatNum } from "@/lib/utils"

interface SocialMediaLinksProps {
  builder: Builder
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ builder }) => {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {builder.twitter && <SocialMediaLink url={builder.twitter.url || "#"} followers={builder.twitter.followers} label="X (formerly Twitter)" icon={<TwitterXIcon className="scale-75" />} />}
      {builder.youtube && <SocialMediaLink url={builder.youtube.url || "#"} followers={builder.youtube.followers} label="YouTube" icon={<YoutubeIcon />} />}
      {builder.twitch && <SocialMediaLink url={builder.twitch.url || "#"} followers={builder.twitch.followers} label="Twitch" icon={<TwitchIcon />} />}
      {builder.github && <SocialMediaLink url={builder.github.url || "#"} followers={builder.github.followers} label="GitHub" icon={<GithubIcon />} />}
      {builder.bluesky && <SocialMediaLink url={builder.bluesky.url || "#"} followers={builder.bluesky.followers} label="Bluesky" icon={<BlueskyIcon />} />}
    </div>
  )
}

interface SocialMediaLinkProps {
  url: string
  followers?: number
  label: string
  icon: React.ReactNode
}

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({ url, followers, label, icon }) => (
  <Link href={url || "#"} target="_blank" rel="noopener noreferrer">
    <Button variant="outline" size="sm">
      {icon}
      <span className="sr-only">{label}</span>
      {followers && <span>{formatNum(followers)}</span>}
    </Button>
  </Link>
)

export default SocialMediaLinks
