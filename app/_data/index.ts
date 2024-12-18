import { Builder, FormData, SocialMediaPlatform, SocialMediaFields } from "../_types";
import buildersJSON from './builders.json' with { type: 'json' };

export const builders = (buildersJSON as Builder[]).map(builder => ({
  ...builder,
  twitter: builder.twitter && {
    ...builder.twitter,
    followerGrowth: builder.twitter.followerGrowth?.map(g => ({
      date: g.date,
      count: Number(g.count)
    }))
  },
  bluesky: builder.bluesky && {
    ...builder.bluesky,
    followerGrowth: builder.bluesky.followerGrowth?.map(g => ({
      date: g.date,
      count: Number(g.count)
    }))
  }
}));

export const APP_ICON = "/icon.svg";
export const SHARE_IMAGE = "https://publicbuilders.org/screenshot.png"
export const SHARE_IMAGE_RESOURCES = "https://publicbuilders.org/screenshot-resources.png"

// Social media URL mappings
export const socialPlatforms: { platform: SocialMediaPlatform; urlPrefix: string }[] = [
  { platform: "twitter", urlPrefix: "https://twitter.com/" },
  { platform: "twitch", urlPrefix: "https://twitch.tv/" },
  { platform: "youtube", urlPrefix: "https://youtube.com/@" },
  { platform: "github", urlPrefix: "https://github.com/" },
  { platform: "bluesky", urlPrefix: "https://bsky.app/profile/" },
  { platform: "reddit", urlPrefix: "https://www.reddit.com/user/" },
  { platform: "producthunt", urlPrefix: "https://www.producthunt.com/@" },
]

export const mapSocialMediaData = (data: FormData): SocialMediaFields => {
  // Initialize socialMediaData with the SocialMediaFields type
  const socialMediaData: Partial<SocialMediaFields> = {};

  socialPlatforms.forEach(({ platform, urlPrefix }) => {
    const handle = data[platform]?.handle;
    const followers = data[platform]?.followers || 0;
    if (handle && followers) {
      socialMediaData[platform] = {
        url: handle.startsWith("http") ? handle : `${urlPrefix}${handle}`,
        followers,
      };
    }
  });

  return socialMediaData as SocialMediaFields;
};