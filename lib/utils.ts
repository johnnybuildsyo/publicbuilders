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

export function calculateGrowth(
  builder: Builder, 
  range?: "3" | "7" | "14" | "30" | "all"
): { totalGrowth: number; percentGrowth: number } {
  const filterByRange = (growth: { date: string; count: number }[] | undefined) => {
    if (!growth) return []
    if (!range || range === "all") return growth
    const daysAgo = parseInt(range)
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo)

    return growth.filter(entry => {
      const [year, month, day] = entry.date.split("-")
      const entryDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      return entryDate >= cutoffDate
    })
  }

  let twitterGrowth = 0
  let twitterFollowers = 0
  const twitterGrowthData = builder.twitter?.followerGrowth
  if (twitterGrowthData?.length) {
    const filteredGrowth = filterByRange(twitterGrowthData)
    if (filteredGrowth.length > 0) {
      twitterGrowth = filteredGrowth[filteredGrowth.length - 1].count - filteredGrowth[0].count
      twitterFollowers = filteredGrowth[0].count
    }
  }
  if (twitterFollowers === 0) {
    twitterFollowers = builder.twitter?.followers || 0
  }

  let blueskyGrowth = 0
  let blueskyFollowers = 0
  const blueskyGrowthData = builder.bluesky?.followerGrowth
  if (blueskyGrowthData?.length) {
    const filteredGrowth = filterByRange(blueskyGrowthData)
    if (filteredGrowth.length > 0) {
      blueskyGrowth = filteredGrowth[filteredGrowth.length - 1].count - filteredGrowth[0].count
      blueskyFollowers = filteredGrowth[0].count
    }
  }

  const totalGrowth = twitterGrowth + blueskyGrowth
  const initialFollowers = twitterFollowers + blueskyFollowers
  const percentGrowth = initialFollowers > 0 ? (totalGrowth / initialFollowers) * 100 : 0

  return { totalGrowth, percentGrowth }
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

export function calculateWeightedGrowth(
  builder: Builder,
  range?: "3" | "7" | "14" | "30" | "all"
): {
  totalGrowth: number;
  percentGrowth: number;
  weightedScore: number;
} {
  const { totalGrowth, percentGrowth } = calculateGrowth(builder, range);

  // Get current follower counts
  const twitterFollowers = builder.twitter?.followers || 0;
  const blueskyFollowers = builder.bluesky?.followers || 0;
  const totalFollowers = twitterFollowers + blueskyFollowers;

  // Normalize the growth metrics to prevent either from dominating
  const percentWeight = 0.6666666666666666;  // 2/3 weight to percentage growth
  const totalWeight = 0.3333333333333333;    // 1/3 weight to total growth

  // Calculate weighted score
  const normalizedTotal = Math.log(Math.abs(totalGrowth) + 1);
  const normalizedPercent = Math.log(percentGrowth + 1);
  const baseScore = (normalizedPercent * percentWeight) + (normalizedTotal * totalWeight);

  // Apply follower count penalty for accounts with less than 100 followers
  const followerPenalty = totalFollowers < 200 ? 0.5 : 1;
  const weightedScore = baseScore * followerPenalty;

  return { totalGrowth, percentGrowth, weightedScore };
}
