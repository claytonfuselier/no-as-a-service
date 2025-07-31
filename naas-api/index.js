const express = require('express');
const rateLimit = require('express-rate-limit');
const fs = require('fs');

const app = express();
app.set('trust proxy', true);
const PORT = process.env.PORT || 3000; // Fallback to port 3000

// Load reasons from JSON
const reasons = JSON.parse(fs.readFileSync('./reasons.json', 'utf-8'));

// Rate limiter: 120 requests per 60sec per IP
const RATE_LIMIT_MAX = 120;
const RATE_LIMIT_WINDOW_SEC = 60;
const limiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_SEC * 1000, // Convert to ms
  max: RATE_LIMIT_MAX,
  keyGenerator: (req, res) => {
    return req.headers['cf-connecting-ip'] || req.ip; // Fallback if CF header is missing (or for non-CloudFlare connections)
  },
  standardHeaders: true, // Includes standardized RateLimit-* headers (RFC-compliant)
  legacyHeaders: false, // Removes outdated headers like X-RateLimit-*
  handler: (req, res) => {
    res.json({
      error: `Too many requests. (${RATE_LIMIT_MAX}/${RATE_LIMIT_WINDOW_SEC}sec/ip)`
    });
  }
});



app.use(limiter);

// Redirect root path to GitHub
app.get('/', (req, res) => {
  res.redirect('https://github.com/claytonfuselier/no-as-a-service/tree/main?tab=readme-ov-file#no-as-a-service');
});

// Random rejection reason endpoint
app.get('/no', (req, res) => {
  const reason = reasons[Math.floor(Math.random() * reasons.length)];
  res.json({ reason });
});

// Start server
app.listen(PORT, () => {
  console.log(`No-as-a-Service is running on port ${PORT}`);
});
