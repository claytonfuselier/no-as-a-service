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

