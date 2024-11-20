import * as z from "zod";

// Define socialMediaSchema and infer the type
export const socialMediaSchema = z.object({
  handle: z.string().optional(),
  url: z.string().url("Invalid URL").optional(),
  followers: z.number().optional(),
});

export type SocialMedia = z.infer<typeof socialMediaSchema>;

export type SocialMediaHandles = {
  [key in SocialMediaPlatform]?: {
    handle: string
    url: string
  }
}

// Define projectSchema and infer the type
export const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
  link: z.preprocess((value) => {
    if (typeof value === "string" && !value.startsWith("http")) {
      return `https://${value}`;
    }
    return value;
  }, z.string().url("Invalid URL")),
  tags: z.preprocess((value) => (typeof value === "string" ? value.split(",").map((tag) => tag.trim()) : value), z.array(z.string()).min(1, "At least one tag is required")),
});

export type Project = z.infer<typeof projectSchema>;

export const socialMediaFieldsSchema = z.object({
  twitter: socialMediaSchema.optional(),
  youtube: socialMediaSchema.optional(),
  twitch: socialMediaSchema.optional(),
  github: socialMediaSchema.optional(),
  bluesky: socialMediaSchema.optional(),
  reddit: socialMediaSchema.optional(),
  producthunt: socialMediaSchema.optional(),
});

export type SocialMediaFields = z.infer<typeof socialMediaFieldsSchema>;

// Define builderSchema and infer the type
export const builderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
  imageOffset: z.string().optional(),
  ...socialMediaFieldsSchema.shape,
  website: z.preprocess((value) => {
    if (typeof value === "string" && !value.startsWith("http")) {
      return `https://${value}`;
    }
    return value;
  }, z.string().url("Invalid URL")),
  newsletter: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().url("Please provide a valid URL for the newsletter").optional()
  ),
  podcast: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().url("Please provide a valid URL for the podcast").optional()
  ),
  revenue: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().url("Please provide a valid URL for revenue data").optional()
  ),
  writing: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().url("Please provide a valid URL for written content").optional()
  ),
  tags: z.preprocess((value) => (typeof value === "string" ? value.split(",").map((tag) => tag.trim()) : value), z.array(z.string()).min(1, "At least one tag is required")),
  currentProject: projectSchema.optional(),
  created: z.string().datetime().optional(),
}).refine(
  (data) => {
    
    return socialPlatforms.every((platform) => {
      const account = data[platform];
      if (account?.handle && !account?.followers) return false;
      return true;
    });
  },
  {
    message: "Follower/subscriber count is required when social media account is provided",
    path: ["twitter.followers"],
  }
);

export type Builder = z.infer<typeof builderSchema>;
export type BuilderSubmission = Builder & { id: string };

// Use builderSchema in formSchema
export const formSchema = builderSchema;

// Define FormData type based on formSchema
export type FormData = z.infer<typeof formSchema>;
export type SocialMediaPlatform = "twitter" | "twitch" | "youtube" | "github" | "bluesky" | "producthunt" | "reddit";

export const socialPlatforms: SocialMediaPlatform[] = [
  "twitter",
  "twitch",
  "youtube",
  "github",
  "bluesky",
  "producthunt",
  "reddit",
] as const;
