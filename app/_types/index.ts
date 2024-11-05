export type Builder = {
  name: string
  description: string
  image?: string
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