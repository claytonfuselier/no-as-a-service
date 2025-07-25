# Use Node.js LTS base image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose the app port (adjust if needed)
EXPOSE 3000

# Run the app
CMD ["node", "index.js"]
