/* eslint-disable @typescript-eslint/no-explicit-any */
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
            return null;
          }
      
        return flattenAttributes(data);
    } catch (error) {
        console.warn(`Fetch error at ${fullUrl}:`, error);
    }
}

export async function swrFetcher(url: string, authToken?: string, options?: { query?: Record<string, unknown> }) {
    const { query } = options || {};

    const baseUrl = url.startsWith("http") ? "" : (getBaseUrl() || "");
    const queryString = query ? `?${qs.stringify(query, { encodeValuesOnly: true })}` : "";
    const fullUrl = `${baseUrl}${url}${queryString}`;

    const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch');
    }

    const data = await response.json();
    return data; // Return raw Strapi response without flattening
}

export async function swrMutationFetcher(
    url: string, 
    { arg }: { arg: { 
        method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
        body?: any;
        authToken?: string;
        headers?: Record<string, string>;
    } }
) {
    const { method = 'POST', body, headers: customHeaders } = arg;

    const baseUrl = url.startsWith("http") ? "" : (getBaseUrl() || "");
    const fullUrl = `${baseUrl}${url}`;

    const response = await fetch(fullUrl, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(customHeaders || {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || 'Request failed');
    }

    return response.json();
}