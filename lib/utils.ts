import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { capitalize } from "lodash"
import seedrandom from "seedrandom"
import { Builder } from "@/app/_types"
type PlatformGrowth = { date: string; total: number }[];

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

export function calculateGrowth(builder: Builder): { totalGrowth: number; percentGrowth: number } {
  let twitterGrowth = 0;
  let twitterFollowers = 0;
  if (
    builder.twitter &&
    builder.twitter.followerGrowth &&
    builder.twitter.followerGrowth.length > 0
  ) {
    const growthData = builder.twitter.followerGrowth;
    twitterGrowth = growthData[growthData.length - 1].count - growthData[0].count;
    twitterFollowers = growthData[0].count;
  }

  let blueskyGrowth = 0;
  let blueskyFollowers = 0;
  if (
    builder.bluesky &&
    builder.bluesky.followerGrowth &&
    builder.bluesky.followerGrowth.length > 0
  ) {
    const growthData = builder.bluesky.followerGrowth;
    blueskyGrowth = growthData[growthData.length - 1].count - growthData[0].count;
    blueskyFollowers = growthData[0].count;
  }

  const totalGrowth = twitterGrowth + blueskyGrowth;
  const initialFollowers = twitterFollowers + blueskyFollowers;
  const percentGrowth = initialFollowers > 0 ? (totalGrowth / initialFollowers) * 100 : 0;

  return { totalGrowth, percentGrowth };
}

export function calculatePlatformGrowth(builders: Builder[]): {
  twitterGrowth: PlatformGrowth;
  blueskyGrowth: PlatformGrowth;
} {
  // Store daily growth for each platform
  const dailyGrowthMap: { [date: string]: { twitter: number; bluesky: number } } = {};

  builders.forEach((builder) => {
    const twitterGrowth = builder.twitter?.followerGrowth || [];
    const blueskyGrowth = builder.bluesky?.followerGrowth || [];

    // Calculate daily growth for Twitter
    twitterGrowth.forEach(({ date, count }, index) => {
      const prevCount = index > 0 ? twitterGrowth[index - 1].count : 0;
      const growth = index === 0 ? 0 : count - prevCount; // First entry has no growth

      if (!dailyGrowthMap[date]) dailyGrowthMap[date] = { twitter: 0, bluesky: 0 };
      dailyGrowthMap[date].twitter += growth;
    });

    // Calculate daily growth for Bluesky
    blueskyGrowth.forEach(({ date, count }, index) => {
      const prevCount = index > 0 ? blueskyGrowth[index - 1].count : 0;
      const growth = index === 0 ? 0 : count - prevCount; // First entry has no growth

      if (!dailyGrowthMap[date]) dailyGrowthMap[date] = { twitter: 0, bluesky: 0 };
      dailyGrowthMap[date].bluesky += growth;
    });
  });

  // Convert the map to arrays and calculate cumulative totals
  const sortedDates = Object.keys(dailyGrowthMap).sort();
  let twitterCumulative = 0;
  let blueskyCumulative = 0;

  const twitterGrowth: PlatformGrowth = [];
  const blueskyGrowth: PlatformGrowth = [];

  sortedDates.forEach((date) => {
    const dailyTwitterGrowth = dailyGrowthMap[date].twitter;
    const dailyBlueskyGrowth = dailyGrowthMap[date].bluesky;

    twitterCumulative += dailyTwitterGrowth;
    blueskyCumulative += dailyBlueskyGrowth;

    twitterGrowth.push({ date, total: twitterCumulative });
    blueskyGrowth.push({ date, total: blueskyCumulative });
  });

  return { twitterGrowth, blueskyGrowth };
}

export function calculateWeightedGrowth(builder: Builder): {
  totalGrowth: number;
  percentGrowth: number;
  weightedScore: number;
} {
  const { totalGrowth, percentGrowth } = calculateGrowth(builder);

  // Normalize the growth metrics to prevent either from dominating
  // These weights can be adjusted to fine-tune the balance
  const percentWeight = 0.5;  // 50% weight to percentage growth
  const totalWeight = 0.5;    // 50% weight to total growth

  // Calculate weighted score
  // We use Math.log to prevent large numbers from dominating
  // Add 1 to handle cases where growth is 0
  const normalizedTotal = Math.log(Math.abs(totalGrowth) + 1);
  const normalizedPercent = Math.log(percentGrowth + 1);

  const weightedScore = (normalizedPercent * percentWeight) + (normalizedTotal * totalWeight);

  return { totalGrowth, percentGrowth, weightedScore };
}
