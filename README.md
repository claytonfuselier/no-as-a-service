# No-as-a-Service
Ever get tired of saying "no"?  
Wish you could reject requests with more flair, creativity, or sarcasm?

**No-as-a-Service** delivers random, witty, and often hilarious ways to reject requests—perfect for spicing up rejections in your applications, bots, or daily life. Just because you're declining, doesn't mean it has to be boring!

<br>

## 🌐 Public API Endpoint
### 🧪 Try it Live
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
This shortcut calls the API and gives you the rejection reason in an alert popup.

1. From your iPhone, get the shortcut at [/assets/ios-shortcut/NaaS-v1.shortcut](assets/ios-shortcut/NaaS-v1.shortcut).
2. Tap "Add Shortcut"
   - After adding, you can edit the bookmark to review it or "Add to Home Screen".
  
*Note:*
- *[Shortcuts](https://support.apple.com/guide/shortcuts/welcome/ios) is an Apple app that lets you automate tasks across apps and system functions using custom or prebuilt workflows.*
- *Available for iOS 12+ (Installed by default on iOS 13+)*

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

You can also run locally using:
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
- [claytonfuselier](https://github.com/claytonfuselier)

<br>

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
