import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { capitalize } from "lodash"
import seedrandom from "seedrandom"

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
