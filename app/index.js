// Core
const express = require('express');
const rawRateLimit = require('express-rate-limit');
const rateLimit = rawRateLimit.default || rawRateLimit;  // Used because limit is applied globally, not per route as v5 would expect.
const ipKeyGenerator = rawRateLimit.ipKeyGenerator || (rawRateLimit.default && rawRateLimit.default.ipKeyGenerator);  // Needed to normalize IPs to satisfy Express v5 security validation
const fs = require('fs');


// Get app version
const { version } = require('./package.json');
// Get environment variables
const LISTEN_PORT = process.env.LISTEN_PORT || 3000;  // Fallback to port 3000
const API_ENDPOINT = process.env.API_ENDPOINT || '/no';  // Fallback to '/no'
const RATE_LIMIT_REQUESTS = parseInt(process.env.RATE_LIMIT_REQUESTS || '120', 10);  // Fallback to 120 requests
const RATE_LIMIT_SECONDS = parseInt(process.env.RATE_LIMIT_SECONDS || '60', 10);  // Fallback to 60 seconds
const RATE_LIMIT_OVERRIDES = (() => {
  try {
    return JSON.parse(process.env.RATE_LIMIT_OVERRIDES || '{"127.0.0.1":500}');  // Fallback to empty JSON object, if overrides is undefined/empty
  } catch (err) {  // Catch error if invalid JSON, and fallback to empty JSON object
    console.error('Invalid JSON in \'RATE_LIMIT_OVERRIDES\'. Ignoring.');
    return {"127.0.0.1":500};
  }
})();
const REDIRECT_ROOT_ENABLED = process.env.REDIRECT_ROOT_ENABLED !== 'false';  // Fallback to true
const REDIRECT_ROOT_DEST = process.env.REDIRECT_ROOT_DEST || 'https://github.com/claytonfuselier/no-as-a-service'; // Fallback to my github repo


const app = express();
app.set('trust proxy', true);


// Read reasons.json
let reasons = [];
try {
  reasons = JSON.parse(fs.readFileSync('./reasons.json', 'utf-8'));  // Load reasons from JSON
} catch (err) {                                                      // Catch error if invalid JSON in reasons.json
  console.error('❌ Failed to load or parse reasons.json:', err.message);
  //reasons = [{ reason: 'Error: Something went wrong trying to read the list of reasons... but I’m still avoiding responsibility.' }];
  process.exit(1);
}


// Log requests to the console
function logRequest(req, res, logMsg = '') {
  const ip = req.headers['cf-connecting-ip'] || req.ip || 'unknown';
  //const now = new Date().toISOString().replace('T', ' ').split('.')[0];
  const now = new Date().toLocaleString('sv-SE', {  // Using 'sc-SE' uses ISO format for datetime
    timeZone: process.env.TZ || 'UTC',  // Fallback to UTC if TZ environment parameter is not provided
    hour12: false
  });
  const status = res.statusCode;
  console.log(`[${now}] ${status} ${req.method} ${req.originalUrl} — IP: ${ip} ${logMsg}`);
}


// Rate limiter
const limiter = rateLimit({
  windowMs: RATE_LIMIT_SECONDS * 1000,  // Convert RATE_LIMIT_SECONDS (seconds) to ms
  max: (req, res) => {
    const ip = req.headers['cf-connecting-ip'] || ipKeyGenerator(req);  
    return RATE_LIMIT_OVERRIDES[ip] || RATE_LIMIT_REQUESTS;  // Fallback to global rate limit if IP has no override
  },
  keyGenerator: (req, res) => {
    req.headers['cf-connecting-ip'] || ipKeyGenerator(req);  // Fallback if CF header is missing (or for non-CloudFlare connections)
  },  
  standardHeaders: true,  // Includes standardized RateLimit-* headers (RFC-compliant)
  legacyHeaders: false,  // Removes outdated headers like X-RateLimit-*
  handler: (req, res) => {
    res.json({
      error: `Too many requests. (${RATE_LIMIT_REQUESTS}/${RATE_LIMIT_SECONDS}sec/IP)`
    });
  }
});
app.use(limiter);


// Root route
app.get('/', (req, res) => {
  if (REDIRECT_ROOT_ENABLED) {
    res.redirect(REDIRECT_ROOT_DEST);  // Redirect root path
    logRequest(req, res, ` - Redirected: ${REDIRECT_ROOT_DEST}`);
  } else {
    res.send("No-as-a-Service (NaaS) - created by [claytonfuselier](https://github.com/claytonfuselier/no-as-a-service)");
    logRequest(req, res);
  }
});


// NaaS endpoint
app.get(API_ENDPOINT, (req, res) => {
  const reason = reasons[Math.floor(Math.random() * reasons.length)];
  res.json({ reason });
  logRequest(req, res, ` - Reason: ${reason}`);
});


// Global error handler for Express 5
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});


// Start server
app.listen(LISTEN_PORT, () => {
  console.log(`Application:
  ▸ No-as-a-Service (NaaS) - v${version}
  ▸ Devleoped by claytonfuselier
  ▸ https://github.com/claytonfuselier/no-as-a-service
  `);
  console.log(`Configuration:
  ▸ Port:                 ${LISTEN_PORT}
  ▸ API Endpoint:         ${API_ENDPOINT}
  ▸ Root Redirect:        ${REDIRECT_ROOT_ENABLED ? 'Enabled' : 'Disabled'}
  ▸ Redirect Destination: ${REDIRECT_ROOT_DEST}
  ▸ Rate Limit:           ${RATE_LIMIT_REQUESTS} requests / ${RATE_LIMIT_SECONDS} seconds
  ▸ Rate Limit Overrides: ${JSON.stringify(RATE_LIMIT_OVERRIDES)}
  `);
  console.log(`Running on port ${LISTEN_PORT}...`);
});
