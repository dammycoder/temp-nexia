import { flattenAttributes } from "./utils";
import qs from "qs";


export type FetchDataOptions = {
    query?: Record<string, unknown>;
    authToken?: string;
    headers?: Record<string, string>;
};

function getBaseUrl(): string | undefined {
    const url = process.env.NEXT_PUBLIC_STRAPI_URL;
    return url ? url.replace(/\/$/, "") : undefined;
}

export async function fetchData(url: string, authToken?: string, options?: FetchDataOptions) {
    const { query, headers: customHeaders } = options || {};

    const baseUrl = url.startsWith("http") ? "" : (getBaseUrl() || "");
    const queryString = query ? `?${qs.stringify(query, { encodeValuesOnly: true })}` : "";
    const fullUrl = `${baseUrl}${url}${queryString}`;

    const requestInit: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
            ...(customHeaders || {}),
        },
    };

    try {
        const response = await fetch(fullUrl, requestInit);
        const data = await response.json();
        // if (!response.ok) {
        //     throw new Error(data?.message || 'Error fetching data');
        // }

        if (!response.ok) {
            const text = await response.text();
            console.warn(` [fetchData] Non-OK response from ${fullUrl}: ${response.status} - ${text}`);
            return null;
          }
      
        return flattenAttributes(data);
    } catch (error) {
        console.warn(`Fetch error at ${fullUrl}:`, error);
    }
}