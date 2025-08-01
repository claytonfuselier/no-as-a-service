# No-as-a-Service
Ever get tired of saying "no"?  
Wish you could reject requests with more flair, creativity, or sarcasm?

**No-as-a-Service** delivers random, witty, and often hilarious ways to reject requests—perfect for spicing up rejections in your applications, bots, or daily life. Just because you're declining, doesn't mean it has to be boring!

<br>

## 🌐 Public API Endpoint
### 🧪 Try It Live
- https://naas.debugme.dev/no  
- `GET https://naas.debugme.dev/no`

The API returns a JSON with your random rejection reason. That’s it—simple, fast, and ready to help you reject anything.

#### Example Response
```
{
   "reason": "I ran this request through my internal compliance, and it failed."
}
```
*Rate limited: 120 requests per minute per IP*

<br>

### 📱 Use an iOS/Apple "Shortcut"
[Shortcuts](https://support.apple.com/guide/shortcuts/welcome/ios) is an Apple app that lets you automate tasks across apps and system functions using custom or prebuilt workflows.

Build your own or use my prebuilt workflow below:
1. From your iPhone or Mac, download [NaaS.shortcut](https://github.com/claytonfuselier/no-as-a-service/raw/refs/heads/main/assets/ios/NaaS.shortcut).
2. Open the file and select "Add Shortcut" when prompoted.
   - After adding, you can edit the workflow to review it or "Add to Home Screen".

<br>

## 🛠️ Use Cases
- Chatbots that want a bit more personality
- Dev tools rejecting invalid inputs
- Slack integrations for automated sass
- Everyday digital boundaries

<br>

## 🧠 Tech Stack Overview
Powered by a simple yet effective full-stack architecture:
| Component                 | Description                                                          |
| ------------------------- | -------------------------------------------------------------------- |
| **Node.js** + **Express** | Core of the API server, routing incoming requests to `/no` endpoint  |
| **express-rate-limit**    | Enforces rate limiting to prevent abuse (120 req/min/IP)             |
| **reasons.json**          | Stores 1,000+ curated rejection phrases served randomly              |
| **Docker**                | Containerizes the application for consistent deployment environments |

<br>

## 🐳 Deploy It Yourself
Pull and run the container from GitHub Container Registry:

```
docker pull ghcr.io/claytonfuselier/no-as-a-service:latest
docker run -p 8080:80 ghcr.io/claytonfuselier/no-as-a-service:latest
```
Then access the API at: `http://localhost:8080/no`.

You can also run it locally using:
```
git clone https://github.com/claytonfuselier/no-as-a-service.git
cd no-as-a-service
npm install
npm start
```
By default it listens on port 3000, or override with `PORT=5000` at npm start.

<br>

## 🧩 Contribute
Got a better way to say "no"?

Pull requests are welcome!  
Add your own rejections to keep the API fresh and fun.

<br>

## 👤 Authors
- [hotheadhacker](https://github.com/hotheadhacker) - Original concept and implementation
- [claytonfuselier](https://github.com/claytonfuselier) - Docker containerization and personal styling

<br>

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

---

## 🤖 Discord Bot (optional)

This project includes an optional [Discord bot](./naas-discord-bot) that responds with excuses from the API when @mentioned.

### 🔧 Configuration

All bot and API settings are managed through [`config/config.json`](./config/config.json). If the file doesn't exist, a default one is created automatically.

Example:

```json
{
  "enableDiscordBot": true,
  "discordBotToken": "YOUR_DISCORD_BOT_TOKEN_HERE",
  "discordBotName": "NoBot",
  "apiUrl": "https://naas.debugme.dev/no",
  "apiWebsite": "https://naas.debugme.dev",
  "rateLimit": {
    "requestsPerMinute": 10
  },
  "redirectRootToDocs": true
}
```

Set `"enableDiscordBot": false` to disable the bot entirely.

### 🐳 Running the Bot (Docker)

Build and run the bot container:

```bash
docker build -t naas-discord-bot ./naas-discord-bot
docker run --rm \
  -v $(pwd)/config:/app/config \
  naas-discord-bot
```

This mounts the shared `naas/config.json` into the bot container.
---

## 🛠 Environment Variables

This project is now fully **stateless**. All configuration is passed through environment variables.

### 📦 Discord Bot Variables

| Variable              | Description                         | Required | Default |
|-----------------------|-------------------------------------|----------|---------|
| `DISCORD_BOT_ENABLED` | Enable the Discord bot (`true/false`) | Yes      | —       |
| `DISCORD_BOT_TOKEN`   | Discord bot token                   | Yes      | —       |
| `DISCORD_BOT_NAME`    | Bot display name                    | No       | `NoBot` |
| `DISCORD_BOT_EMBED_URL` | Footer link in embeds              | No       | `https://naas.debugme.dev` |
| `NAAS_API_URL`        | Full URL to the NaaS API endpoint   | Yes      | —       |

### 🌐 API Service Variables

| Variable                  | Description                              | Required | Default |
|---------------------------|------------------------------------------|----------|---------|
| `PORT`                    | Port to run the API server on            | No       | `3000`  |
| `API_ENDPOINT`            | Path segment for the excuse API          | No       | `/no`   |
| `RATE_LIMIT_REQUESTS`     | Default max requests per IP              | No       | `120`   |
| `RATE_LIMIT_SECONDS`      | Time window for rate limiting (seconds)  | No       | `60`    |
| `RATE_LIMIT_OVERRIDES`    | JSON object of IP-to-limit overrides     | No       | `{}`    |
| `REDIRECT_ROOT_ENABLED`   | Redirect root path to a URL (`true/false`) | No     | `true`  |
| `REDIRECT_ROOT_DEST`      | URL to redirect `/` to                   | No       | GitHub README |

Example `RATE_LIMIT_OVERRIDES`:
```bash
RATE_LIMIT_OVERRIDES='{"127.0.0.1": 1000, "1.2.3.4": 500}'
```

---

## 🐳 Running with Docker

### Discord Bot:

```bash
docker build -t naas-discord-bot ./naas-discord-bot
docker run --rm \
  -e DISCORD_BOT_ENABLED=true \
  -e DISCORD_BOT_TOKEN=your-bot-token \
  -e DISCORD_BOT_NAME=NoBot \
  -e DISCORD_BOT_EMBED_URL=https://naas.debugme.dev \
  -e NAAS_API_URL=http://localhost:3000/no \
  naas-discord-bot
```

### API:

```bash
docker build -t naas-api ./naas-api
docker run --rm -p 3000:3000 \
  -e API_ENDPOINT=/no \
  -e RATE_LIMIT_REQUESTS=120 \
  -e RATE_LIMIT_SECONDS=60 \
  -e REDIRECT_ROOT_ENABLED=true \
  -e REDIRECT_ROOT_DEST=https://github.com/claytonfuselier/no-as-a-service \
  naas-api
```