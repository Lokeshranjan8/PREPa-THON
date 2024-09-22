import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: any[]) {
    return twMerge(clsx(inputs));
}

export function tn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }