# 📝 Changelog

## v3.0.0 - Introducing /nohello
- Added new endpoint for `/nohello` to provide responses for chat messages that start with "hello" and then wait till you respond to state what they need or want. Inspired by https://nohello.org/.
- **Breaking Changes**
   - Environment parameter `API_ENDPOINT` has been renamed to `API_ENDPOINT_NO`. Be sure to update your docker run/compose accordingly.

## v2.0.2
- Added route for `/info` to return details from the `package.json` file for debugging

## v2.0.1
- `README.md`
   - Added dynamic badges for API satus, project version, license, and fun "NaaS" badge.
   - Added steps on using dynamic badge from shields.io to display a NaaS reason
- Added `/app/.env.example` as a sample for local installations
- Added a fallback override for `127.0.0.1` of 500 request vs the global/default 120

## v2.0.0
- Renamed `/naas` to `/app`
- Upgraded dependencies:
   - **Node.js** from v18 to **v22**
   - **Express** from 4.18.2 to **5.1.0**
   - **express-rate-limit** from 7.0.0 to **8.0.1**
- Switched to environment-based configuration with internal fallbacks (stateless runtime)
- Added simple logging to console output
- Improved error handling:
   - App exits on malformed `reasons.json`
   - Global error middleware added for Express 5
- Docker:
   - Dockerfile now uses `npm ci` for reproducible builds
   - Dockerfile relocated to `/app`
   - Build context minimized by targeting `/app` directly
- Updated README.md to include additional details and deployment options.

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
