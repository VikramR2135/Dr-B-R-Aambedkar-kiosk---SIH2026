// services/api.ts
//
// Central place for backend configuration and a thin fetch wrapper.
// Every other service module (ai.ts, archive.ts, websocket.ts) should
// route real network calls through here so that swapping mock data for
// a live backend later means editing this file plus the individual
// service functions — not the UI components.

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8000/ws";

// Flip this off once a real backend is deployed and reachable.
// Individual services fall back to mock data when this is true or when
// a real request fails, so the UI never breaks during the prototype phase.
export const MOCK_MODE =
  (process.env.NEXT_PUBLIC_MOCK_MODE ?? "true") === "true";

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestOptions extends RequestInit {
  timeoutMs?: number;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { timeoutMs = 8000, ...init } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
    });

    if (!res.ok) {
      throw new ApiError(`Request failed with status ${res.status}`, res.status);
    }

    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

// Small helper used across services to simulate realistic network/processing
// latency for mock data, so loading states are visible in the demo.
export function mockDelay(ms = 900): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
