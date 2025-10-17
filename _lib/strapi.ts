import qs from "qs";

export interface StrapiErrorPayload {
  error?: {
    status?: number;
    name?: string;
    message?: string;
    details?: unknown;
  };
  message?: string;
}

export interface StrapiCollectionResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
  meta?: unknown;
}

export interface StrapiSingleResponse<T> {
  data: {
    id: number;
    attributes: T;
  } | null;
  meta?: unknown;
}

export type StrapiQuery = Record<string, unknown> | undefined;

function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  if (!envUrl) {
    throw new Error("NEXT_PUBLIC_STRAPI_URL is not set");
  }
  return envUrl.replace(/\/$/, "");
}

function getAuthToken(): string | undefined {
  return process.env.NEXT_PUBLIC_STRAPI_TOKEN || process.env.STRAPI_TOKEN || undefined;
}

export type StrapiFetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  headers?: Record<string, string>;
  authToken?: string | null;
  query?: StrapiQuery;
  next?: RequestInit["next"];
  cache?: RequestInit["cache"];
};

export async function strapiFetch<TResponse = unknown>(
  path: string,
  options: StrapiFetchOptions = {}
): Promise<TResponse> {
  const baseUrl = getBaseUrl();
  const {
    method = "GET",
    body,
    headers = {},
    authToken = getAuthToken() ?? null,
    query,
    next,
    cache,
  } = options;

  const queryString = query ? `?${qs.stringify(query, { encodeValuesOnly: true })}` : "";
  const url = `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}${queryString}`;

  const finalHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  // if (authToken) {
  //   if (!("Authorization" in finalHeaders)) {
  //     (finalHeaders as Record<string, string>)["Authorization"] = `Bearer ${authToken}`;
  //   }
  // }

  const response = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
    next,
    cache,
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let payload: any = null;
  try {
    payload = isJson ? await response.json() : await response.text();
  } catch {
    // ignore parse errors; payload remains null
  }

  if (!response.ok) {
    const errPayload: StrapiErrorPayload | undefined = isJson ? payload : undefined;
    const message = errPayload?.error?.message || errPayload?.message || response.statusText;
    const error = new Error(`Strapi request failed: ${message}`);
    // @ts-expect-error augment error object with details for debugging
    error.details = { status: response.status, payload: errPayload ?? payload };
  }

  return payload as TResponse;
}

export function buildPopulateAll(depth = 2) {
  return { populate: `deep,${depth}` } as const;
}

export function addPagination(query: StrapiQuery, page = 1, pageSize = 25) {
  return {
    ...(query || {}),
    pagination: { page, pageSize },
  };
}


