import { Builder, FormData, SocialMediaPlatform, SocialMediaHandles } from "../_types";
import buildersJSON from './builders.json' assert { type: 'json' };

export const builders: Builder[] = buildersJSON;

// Social media URL mappings
export const socialPlatforms: { platform: SocialMediaPlatform; urlPrefix: string }[] = [
    { platform: "twitter", urlPrefix: "https://twitter.com/" },
    { platform: "twitch", urlPrefix: "https://twitch.tv/" },
    { platform: "youtube", urlPrefix: "https://youtube.com/@" },
    { platform: "github", urlPrefix: "https://github.com/" },
    { platform: "bluesky", urlPrefix: "https://bsky.app/profile/" },
]

export const mapSocialMediaData = (data: FormData) => {
    // Construct social media URLs if handles are present
    const socialMediaData: SocialMediaHandles = {}
    socialPlatforms.forEach(({ platform, urlPrefix }) => {
      const handle = data[platform]?.handle
      if (handle) {
        socialMediaData[platform] = {
          handle,
          url: handle.startsWith("http") ? handle : `${urlPrefix}${handle}`,
        }
      }
    })
    return socialMediaData;
}