import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge classNames safely (Tailwind-aware)
 * - clsx handles conditional classes
 * - twMerge removes Tailwind conflicts
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}