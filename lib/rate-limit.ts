// Lightweight in-memory limiter for demo protection. Each server instance keeps
// its own counts, so it is not a substitute for a shared production limiter.
export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export function createRateLimiter({
  limit,
  windowMs,
  maxKeys = 5000,
}: {
  limit: number;
  windowMs: number;
  maxKeys?: number;
}) {
  const hits = new Map<string, number[]>();
  let lastSweep = Date.now();

  function sweep(now: number) {
    for (const [key, times] of hits) {
      const recent = times.filter((t) => now - t < windowMs);
      if (recent.length === 0) hits.delete(key);
      else hits.set(key, recent);
    }
    lastSweep = now;
  }

  return {
    check(key: string): RateLimitResult {
      const now = Date.now();
      if (now - lastSweep > windowMs) sweep(now);

      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= limit) {
        const oldest = recent[0];
        return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)) };
      }

      recent.push(now);
      hits.delete(key);
      hits.set(key, recent);
      while (hits.size > maxKeys) {
        const oldestKey = hits.keys().next().value;
        if (oldestKey === undefined) break;
        hits.delete(oldestKey);
      }
      return { allowed: true, retryAfterSeconds: 0 };
    },
  };
}

export function clientKey(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}
