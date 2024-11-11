import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { capitalize } from "lodash"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNum(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getTitleCaseSocial(social: string) {
  return social === "youtube" ? "YouTube" : social === "github" ? "GitHub" : capitalize(social)
}
