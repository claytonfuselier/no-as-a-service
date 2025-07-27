# Use Node.js LTS base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY naas/package*.json ./
RUN npm install --production

# Copy app source code
COPY naas/ ./

# Expose the app port (adjust if needed)
EXPOSE 3000

# Run the app
CMD ["node", "index.js"]
