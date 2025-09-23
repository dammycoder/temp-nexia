/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStrapiUrl() {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
}

export function getStrapiMedia(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http")) {
    return url;
  }
  return `${getStrapiUrl()}${url}`;
}

export function flattenAttributes(data: any): any {
  if (!data) return null;

  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item));
  }

  if (data.data) {
    if (Array.isArray(data.data)) {
      return data.data.map((item:any) => ({
        id: item.id,
        ...flattenAttributes(item.attributes),
      }));
    }
    return {
      id: data.data.id,
      ...flattenAttributes(data.data.attributes),
    };
  }

  if (data.attributes) {
    return {
      id: data.id,
      ...flattenAttributes(data.attributes),
    };
  }

  if (typeof data === "object" && data !== null) {
    const result: any = {};
    for (const key in data) {
      result[key] = flattenAttributes(data[key]);
    }
    return result;
  }

  return data;
}
