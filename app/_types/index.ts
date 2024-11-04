export type Builder = {
  name: string
  knownFor: string
  twitter: string
  github: string
  website: string
  description: string
  tags: string[]
  currentProject?: Project
}

export type Project = {
  name: string
  description: string
  link: string
  tags: string[]
}