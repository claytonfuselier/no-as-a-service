# 📝 Changelog

## v2.0.0
- Renamed `/naas` to `/app`
- Upgraded dependencies:
   - **Node.js** from v18 to **v22**
   - **Express** from 4.18.2 to **5.1.0**
   - **express-rate-limit** from 7.0.0 to **8.0.1**
- Switched to environment-based configuration with internal fallbacks (stateless runtime)
- Improved error handling:
   - App exits on malformed `reasons.json`
   - Global error middleware added for Express 5
- Docker:
   - Dockerfile now uses `npm ci` for reproducible builds
   - Dockerfile relocated to `/app`
   - Build context minimized by targeting `/app` directly

## v1.2.1
- Reorganized repository contents. Main package/app related files are now in `naas/`.
- `README.md:`
   - Added details about using the API with iOS Shortcuts
   - Added Use Cases, Tech Stack Overview, Deploy It Yourself, 
- Added `LICENSE.md`
- Added `assets/ios/NaaS.shortcut`

## v1.2
- Introduction of Dev docker image
- GitHub Action for docker publishing
   - Branch "main" auto-publishes to "tag=latest"
   - Other branches can be manually published to "tag=dev"
- Rate Limiter
   - Enabled standardHeaders for RFC compliance
   - Disbled legacyHeaders

## v1.1
- Containerization of project for Docker
- GitHub Action to publish to ghcr.io

## v1.0.1
- Personalization of project
   - Edit of author name(s)
   - Removal of unwanted assets
   - Reformat of README

## v1.0.0
Initial fork of https://github.com/hotheadhacker/no-as-a-service
