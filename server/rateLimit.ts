/**
 * Rate Limiting Module
 * Prevents form abuse by tracking submissions per IP address
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting (in production, use Redis)
const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_SUBMISSIONS_PER_HOUR = 3; // Allow 3 submissions per hour per IP

/**
 * Check if an IP address has exceeded rate limit
 */
export function checkRateLimit(ipAddress: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ipAddress);

  // If no entry exists, create one
  if (!entry) {
    rateLimitStore.set(ipAddress, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  // If window has expired, reset
  if (now > entry.resetTime) {
    rateLimitStore.set(ipAddress, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  // Check if limit exceeded
  if (entry.count >= MAX_SUBMISSIONS_PER_HOUR) {
    return false;
  }

  // Increment count
  entry.count++;
  return true;
}

/**
 * Get remaining submissions for an IP address
 */
export function getRemainingSubmissions(ipAddress: string): number {
  const now = Date.now();
  const entry = rateLimitStore.get(ipAddress);

  if (!entry || now > entry.resetTime) {
    return MAX_SUBMISSIONS_PER_HOUR;
  }

  return Math.max(0, MAX_SUBMISSIONS_PER_HOUR - entry.count);
}

/**
 * Get reset time for an IP address (in seconds)
 */
export function getResetTime(ipAddress: string): number {
  const entry = rateLimitStore.get(ipAddress);

  if (!entry) {
    return 0;
  }

  const now = Date.now();
  const remaining = entry.resetTime - now;

  return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
}

/**
 * Clean up expired entries (call periodically)
 */
export function cleanupExpiredEntries(): void {
  const now = Date.now();
  const entriesToDelete: string[] = [];

  rateLimitStore.forEach((entry, ip) => {
    if (now > entry.resetTime) {
      entriesToDelete.push(ip);
    }
  });

  entriesToDelete.forEach((ip) => rateLimitStore.delete(ip));
}

// Clean up expired entries every 10 minutes
setInterval(cleanupExpiredEntries, 10 * 60 * 1000);
