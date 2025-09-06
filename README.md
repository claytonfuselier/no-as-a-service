# No-as-a-Service
[![API Status](https://img.shields.io/uptimerobot/status/m801078452-8da69dcd3dbe9b952e490982.svg)](#)
[![Version](https://img.shields.io/github/package-json/v/claytonfuselier/no-as-a-service?filename=%2Fapp%2Fpackage.json)](#)
[![License](https://img.shields.io/github/license/claytonfuselier/no-as-a-service)](#)  
[![NaaS](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fnaas.debugme.dev%2Fno&query=%24.reason&label=NaaS&color=orange)](https://naas.debugme.dev)

Ever get tired of saying "no"?  
Wish you could reject requests with more flair, creativity, or sarcasm?

**No-as-a-Service** delivers random, witty, and often hilarious ways to reject requests—perfect for spicing up rejections in your applications, bots, or daily life. Just because you're declining, doesn't mean it has to be boring!

Version 3 introduces the `/nohello` endpoint!  
Similar to the original `/no` endpoint, and inspired by [nohello.org](https://nohello.org), it provides you with random and witty responses for greeting-only messages (or just ignore them, like I do).

<br>

## 🛠️ Use Cases
- Chatbots that want a bit more personality
- Dev tools rejecting invalid inputs
- Slack integrations for automated sass
- Everyday digital boundaries

<br>

## 🌐 Public API Endpoint

### 📡 Try It Live
- Original "no" endpoint:
   - https://naas.debugme.dev/no
   - `GET https://naas.debugme.dev/no`
- New "nohello" endpoint:
   - https://naas.debugme.dev/nohello
   - `GET https://naas.debugme.dev/nohello`

The API returns a JSON with your random rejection reason. That’s it—simple, fast, and ready to help you reject anything.

#### Example Response
For `/no`:
```
{
   "reason": "I ran this request through my internal compliance, and it failed."
}
```
For `/nohello`:
```
{
   "greeting": "Congratulations, you just wasted your time and mine for not stating what you need or want."
}
```
*Rate limited: 120 requests per minute per IP*
<!--
<br>

### 📱 Use an iOS/Apple "Shortcut"
[Shortcuts](https://support.apple.com/guide/shortcuts/welcome/ios) is an Apple app that lets you automate tasks across apps and system functions using custom or prebuilt workflows.

Build your own or use my prebuilt workflow below:
1. From your iOS device or Mac, download [NaaS.shortcut](https://github.com/claytonfuselier/no-as-a-service/raw/refs/heads/main/assets/ios/NaaS.shortcut).
2. Open the file and select "Add Shortcut" when prompoted.
   - After adding, you can edit the workflow to review it or "Add to Home Screen".
-->
<br>

### 🏷️ Put a Badge on Your Project
Copy/paste the following into your own readme.md (or other .md file) to add a fun badge with a dynamic rejection:
```
[![NaaS](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fnaas.debugme.dev%2Fno&query=%24.reason&label=NaaS&color=orange)](https://naas.debugme.dev)
```

<br>

## 🚀 Deploy It Yourself

### 🐳📥 Docker Pull
Pull and run the container from GitHub Container Registry:
```
docker pull ghcr.io/claytonfuselier/no-as-a-service:latest
docker run -p 8080:3000 ghcr.io/claytonfuselier/no-as-a-service:latest
```

### 🐳🧩 Docker Compose
Use this sample `docker-compose.yml` to pull a pre-built image from ghcr.io:
```
services:
  no-as-a-service:
    image: ghcr.io/claytonfuselier/no-as-a-service:latest
    container_name: no-as-a-service
    ports:
      - "8080:3000"
    restart: unless-stopped
```

### 📦🖥️ Run Locally as NPM Package
Run the service without Docker, using NPM
```
git clone https://github.com/claytonfuselier/no-as-a-service.git
cd no-as-a-service/app
npm install
npm start
```
By default it listens on port 3000, or override with `PORT=8080 npm start`.

<br>

## 🧰 Customize Environment
You can configure No-as-a-Service by passing environment variables to the container.

| Variable               | Default Value                               | Description                                                                |
|------------------------|---------------------------------------------|----------------------------------------------------------------------------|
| `TZ`                   | `UTC`                                       | Timezone for all time-based operations and logs.                           |
| `LISTEN_PORT`          | `3000`                                      | Port the app listens on inside the container.                              |
| `API_ENDPOINT_NO`      | `/no`                                       | Path for the rejection API endpoint.                                       |
| `API_ENDPOINT_NOHELLO` | `/nohello`                                  | Path for the nohello greeting API endpoint.                                |
| `RATE_LIMIT_REQUESTS`  | `120`                                       | Max number of requests allowed per IP.                                     |
| `RATE_LIMIT_SECONDS`   | `60`                                        | Time window (in seconds) for rate limiting.                                |
| `RATE_LIMIT_OVERRIDES` | `{ "127.0.0.1": 500 }`                      | JSON object to override rate limits for specific IPs.                      |

<br>

## 🧠 Tech Stack Overview
Powered by a simple yet effective full-stack architecture to deliver a stateless and portable service:
| Component                 | Description                                                          |
| ------------------------- | -------------------------------------------------------------------- |
| **Node.js** + **Express** | Core of the API server, routing incoming requests to `/no` endpoint  |
| **express-rate-limit**    | Enforces rate limiting to prevent abuse (120 req/min/IP)             |
| **reasons.json**          | Stores 1,000+ curated rejection phrases served randomly              |
| **Docker**                | Containerizes the application for consistent deployment environments |

<br>

## ✍️ Contribute
Got a better way to say "no"?

Pull requests are welcome!  
Add your own rejections to keep the API fresh and fun.

<br>

## 👤 Authors
- [hotheadhacker](https://github.com/hotheadhacker) - Original concept and implementation
- [claytonfuselier](https://github.com/claytonfuselier) - Docker containerization, personal styling, and addition of `/nohello`

<br>

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
