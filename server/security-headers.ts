/**
 * Security Headers Configuration
 * 
 * These headers protect the website from various security threats:
 * - XSS (Cross-Site Scripting) attacks
 * - Clickjacking attacks
 * - MIME type sniffing
 * - Insecure protocol downgrades
 * - Credential leaks
 */

export const securityHeaders = {
  // Content Security Policy - prevents XSS attacks
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://fonts.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '),

  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',

  // Enable XSS protection in older browsers
  'X-XSS-Protection': '1; mode=block',

  // Prevent clickjacking attacks
  'X-Frame-Options': 'DENY',

  // Control referrer information
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Enforce HTTPS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

  // Permissions Policy (formerly Feature Policy)
  'Permissions-Policy': [
    'geolocation=()',
    'microphone=()',
    'camera=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()'
  ].join(', '),

  // Prevent sensitive data leakage
  'X-Permitted-Cross-Domain-Policies': 'none',

  // Additional security headers
  'X-UA-Compatible': 'IE=edge',
};

/**
 * Apply security headers to Express response
 */
export const applySecurityHeaders = (res: any) => {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
};
