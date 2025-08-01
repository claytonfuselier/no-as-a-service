# Use Node.js LTS base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY naas-api/package*.json ./
RUN npm ci --production

# Copy app source code
COPY app/ ./

# Expose the app port (adjust if needed)
EXPOSE 3000

# Run the app
CMD ["node", "index.js"]
