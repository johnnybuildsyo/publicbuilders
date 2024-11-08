import * as z from "zod"

export type Builder = {
  name: string
  description: string
  image?: string
  imageOffset?: string
  twitter?: string
  twitterFollowers?: number
  youtube?: string
  youtubeSubscribers?: number
  twitch?: string
  twitchSubscribers?: number
  github?: string
  githubFollowers?: number
  bluesky?: string
  blueskyFollowers?: number
  website: string
  tags: string[]
  currentProject?: Project
}

export type Project = {
  name: string
  description: string
  link: string
  tags: string[]
}

export const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    twitterHandle: z.string().optional(),
    twitter: z.string().url("Invalid URL").optional(),
    twitterFollowers: z.number().optional(),
    twitchHandle: z.string().optional(),
    twitch: z.string().url("Invalid URL").optional(),
    twitchSubscribers: z.number().optional(),
    youtubeHandle: z.string().optional(),
    youtube: z.string().url("Invalid URL").optional(),
    youtubeSubscribers: z.number().optional(),
    githubHandle: z.string().optional(),
    github: z.string().url("Invalid URL").optional(),
    githubFollowers: z.number().optional(),
    blueskyHandle: z.string().optional(),
    bluesky: z.string().url("Invalid URL").optional(),
    blueskyFollowers: z.number().optional(),
    website: z.preprocess((value) => {
      if (typeof value === "string" && !value.startsWith("http")) {
        return `https://${value}`
      }
      return value
    }, z.string().url("Invalid URL")),
    description: z.string().min(1, "Description is required"),
    tags: z.preprocess((value) => (typeof value === "string" ? value.split(",").map((tag) => tag.trim()) : value), z.array(z.string()).min(1, "At least one tag is required")),
    currentProject: z.object({
      name: z.string().min(1, "Name is required"),
      description: z.string().min(1, "Description is required"),
      link: z.preprocess((value) => {
        if (typeof value === "string" && !value.startsWith("http")) {
          return `https://${value}`
        }
        return value
      }, z.string().url("Invalid URL")),
      tags: z.preprocess((value) => (typeof value === "string" ? value.split(",").map((tag) => tag.trim()) : value), z.array(z.string()).min(1, "At least one tag is required")),
    }),
  })
  .refine(
    (data) => {
      if (data.twitterHandle && !data.twitterFollowers) return false
      if (data.twitchHandle && !data.twitchSubscribers) return false
      if (data.youtubeHandle && !data.youtubeSubscribers) return false
      if (data.githubHandle && !data.githubFollowers) return false
      if (data.blueskyHandle && !data.blueskyFollowers) return false
      return true
    },
    {
      message: "Follower/subscriber count is required when social media account is provided",
      path: ["twitterFollowers"],
    }
  )

export type FormData = z.infer<typeof formSchema>
export type SocialMediaPlatform = "twitter" | "twitch" | "youtube" | "github" | "bluesky"