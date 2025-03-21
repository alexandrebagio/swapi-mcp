# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (skip install scripts if any, but nothing to skip)
RUN npm install --ignore-scripts

# Copy the rest of the files
COPY . .

# Build the project
RUN npm run build

# Expose port if needed, but our server runs via stdio by default; however, we run the tool via command

# Set entrypoint command as per smithery.yaml
CMD ["node", "build/index.js"]
