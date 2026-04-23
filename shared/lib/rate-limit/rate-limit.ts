import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type Unit = "ms" | "s" | "m" | "h" | "d";
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

export function createRateLimiter(requests: number, duration: Duration) {
  if (process.env.NODE_ENV === "development") {
    return {
      limit: () => {
        return {
          success: true,
          pending: Promise.resolve(),
          limit: requests,
          remaining: requests,
          reset: Date.now() + 1000,
        };
      },
    };
  }

  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(requests, duration),
    analytics: true,
    prefix: "ratelimit",
  });
}