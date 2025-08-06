// In-memory storage for rate limiting (consider using Redis for production)
const requestCounts = new Map();

const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 20, // 20 requests per minute per IP
  blockDurationMs: 5 * 60 * 1000, // Block for 5 minutes if exceeded
};

function getRateLimitKey(req) {
  return (
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.connection.remoteAddress ||
    "unknown"
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const userRequests = requestCounts.get(ip) || {
    count: 0,
    resetTime: now,
    blockedUntil: 0,
  };

  // Check if user is currently blocked
  if (userRequests.blockedUntil > now) {
    return {
      limited: true,
      resetTime: userRequests.blockedUntil,
      remaining: 0,
    };
  }

  // Reset count if window has passed
  if (now > userRequests.resetTime) {
    userRequests.count = 0;
    userRequests.resetTime = now + RATE_LIMIT.windowMs;
    userRequests.blockedUntil = 0;
  }

  // Increment request count
  userRequests.count++;

  // Check if limit exceeded
  if (userRequests.count > RATE_LIMIT.maxRequests) {
    userRequests.blockedUntil = now + RATE_LIMIT.blockDurationMs;
    requestCounts.set(ip, userRequests);
    return {
      limited: true,
      resetTime: userRequests.blockedUntil,
      remaining: 0,
    };
  }

  requestCounts.set(ip, userRequests);
  return {
    limited: false,
    remaining: RATE_LIMIT.maxRequests - userRequests.count,
    resetTime: userRequests.resetTime,
  };
}

// Clean up old entries periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now > data.resetTime && data.blockedUntil < now) {
      requestCounts.delete(ip);
    }
  }
}, 5 * 60 * 1000); // Clean up every 5 minutes

export default async function handler(req, res) {
  const ip = getRateLimitKey(req);
  const rateLimitResult = isRateLimited(ip);

  // Set rate limit headers
  res.setHeader("X-RateLimit-Limit", RATE_LIMIT.maxRequests);
  res.setHeader("X-RateLimit-Remaining", rateLimitResult.remaining);
  res.setHeader("X-RateLimit-Reset", rateLimitResult.resetTime);

  if (rateLimitResult.limited) {
    return res.status(429).json({
      error: "Rate limit exceeded",
      message: `Too many requests. Try again after ${new Date(
        rateLimitResult.resetTime
      ).toLocaleTimeString()}.`,
      resetTime: rateLimitResult.resetTime,
    });
  }

  const { path } = req.query; // Capture API path from query params
  const API_URL = `https://swarfarm.com/api/v2/${path}`;

  try {
    const response = await fetch(API_URL, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
