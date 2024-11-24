import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { capitalize } from "lodash"
import seedrandom from "seedrandom"
import { Builder } from "@/app/_types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNum(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getTitleCaseSocial(social: string) {
  return social === "youtube" ? "YouTube" : social === "github" ? "GitHub" : capitalize(social)
}

export function reverseSlugify(slug: string): string {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function shuffleWithDateSeed<T>(array: T[]): T[] {
  const date = new Date()
  date.setUTCHours(0, 0, 0, 0)
  const rng = seedrandom(date.getTime().toString())
  return array
    .map((value) => ({ value, sort: rng() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export function formatUrlFromHandle(platform: string, handle: string | undefined): string {
  if (!handle) return "";

  if (handle.startsWith("http")) return handle;

  let baseUrl = `https://${platform}`;
  switch (platform) {
    case "twitch":
      baseUrl += ".tv/";
      break;
    case "reddit":
      baseUrl += ".com/user/";
      break;
    case "producthunt":
      baseUrl += ".com/@";
      break;
    case "youtube":
      baseUrl += ".com/@";
      break;
    default:
      baseUrl += ".com/";
  }

  return `${baseUrl}${handle}`;
}

export function calculateTotalGrowth(builder: Builder): number {
  let twitterGrowth = 0;
  if (
    builder.twitter &&
    builder.twitter.followerGrowth &&
    builder.twitter.followerGrowth.length > 0
  ) {
    const growthData = builder.twitter.followerGrowth;
    twitterGrowth =
      growthData[growthData.length - 1].count - growthData[0].count;
  }

  let blueskyGrowth = 0;
  if (
    builder.bluesky &&
    builder.bluesky.followerGrowth &&
    builder.bluesky.followerGrowth.length > 0
  ) {
    const growthData = builder.bluesky.followerGrowth;
    blueskyGrowth =
      growthData[growthData.length - 1].count - growthData[0].count;
  }

  return twitterGrowth + blueskyGrowth;
}
