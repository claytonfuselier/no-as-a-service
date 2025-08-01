# 📝 Changelog

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
