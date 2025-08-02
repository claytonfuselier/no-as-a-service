# No-as-a-Service
Ever get tired of saying "no"?  
Wish you could reject requests with more flair, creativity, or sarcasm?

**No-as-a-Service** delivers random, witty, and often hilarious ways to reject requests—perfect for spicing up rejections in your applications, bots, or daily life. Just because you're declining, doesn't mean it has to be boring!

<br>

## 🛠️ Use Cases
- Chatbots that want a bit more personality
- Dev tools rejecting invalid inputs
- Slack integrations for automated sass
- Everyday digital boundaries

<br>

## 🌐 Public API Endpoint
### 📡 Try It Live
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
1. From your iOS device or Mac, download [NaaS.shortcut](https://github.com/claytonfuselier/no-as-a-service/raw/refs/heads/main/assets/ios/NaaS.shortcut).
2. Open the file and select "Add Shortcut" when prompoted.
   - After adding, you can edit the workflow to review it or "Add to Home Screen".

<br>

## 🚀 Deploy It Yourself

### 🐳📥 Docker Pull
Pull and run the container from GitHub Container Registry:
```
docker pull ghcr.io/claytonfuselier/no-as-a-service:latest
docker run -p 8080:3000 ghcr.io/claytonfuselier/no-as-a-service:latest
```
Then access the API at: `http://localhost:8080/no`

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
Then access the API at: `http://localhost:8080/no`

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
| `API_ENDPOINT`         | `/no`                                       | Path for the rejection API endpoint.                                       |
| `RATE_LIMIT_REQUESTS`  | `120`                                       | Max number of requests allowed per IP.                                     |
| `RATE_LIMIT_SECONDS`   | `60`                                        | Time window (in seconds) for rate limiting.                                |
| `RATE_LIMIT_OVERRIDES` | `{ "127.0.0.1": 1000 }`                     | JSON object to override rate limits for specific IPs.                      |

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
- [claytonfuselier](https://github.com/claytonfuselier) - Docker containerization and personal styling

<br>

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
