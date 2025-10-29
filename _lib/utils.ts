/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStrapiUrl() {
  return process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
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



export const renderDescription = (description: any[]) => {
  const renderChildren = (children: any[]) => {
    return children
      .map((child) => {
        let text = child.text || "";

        if (child.bold) text = `<strong>${text}</strong>`;
        if (child.italic) text = `<em>${text}</em>`;
        if (child.underline) text = `<u>${text}</u>`;
        if (child.strikethrough) text = `<s>${text}</s>`;
        if (child.code) text = `<code>${text}</code>`;
        if (child.type === "link" && child.url) {
          text = `<a href="${child.url}" class="text-nexia-light-teal-100 underline">${text}</a>`;
        }

        return text;
      })
      .join("");
  };

  const renderBlock = (block: any) => {
    switch (block.type) {
      case "paragraph":
        return `<p class="description-paragraph text-nexia-gray text-lg mb-4">${renderChildren(block.children)}</p>`;
      case "heading":
        return `<h3 class="text-nexia-dark-teal-100 font-bold text-2xl mb-3">${renderChildren(block.children)}</h3>`;
      case "quote":
        return `<blockquote class="border-l-4 border-nexia-light-teal-100 pl-4 italic">${renderChildren(block.children)}</blockquote>`;
      case "bulleted-list":
        return `<ul class="list-disc ml-8 space-y-2">${block.children
          .map((li: any) => `<li>${renderChildren(li.children)}</li>`)
          .join("")}</ul>`;
      case "numbered-list":
        return `<ol class="list-decimal ml-8 space-y-2">${block.children
          .map((li: any) => `<li>${renderChildren(li.children)}</li>`)
          .join("")}</ol>`;
      default:
        return "";
    }
  };

  return description
    .map(renderBlock)
    .filter(Boolean)
    .join("");
};
