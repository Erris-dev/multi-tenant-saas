import rateLimit from "express-rate-limit";

// Authentication Limiter for my auth routes
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 6,
  message:
    "Too many authentication attempts from this IP, please try again after an hour.",
});

//  Rate Limiter for my Create Operations
export const createLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  message:
    "Too many creation requests from this IP, please try again after 5 minutes.",
});

// Rate Limite for general API
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes.",
});
