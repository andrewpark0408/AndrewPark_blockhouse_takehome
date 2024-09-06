# Dockerfile for Next.js Frontend
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the full app and run the build
COPY . .
RUN npm run build  # This compiles your app into production-ready code

# Expose port 3000
EXPOSE 3000

# Start the production server
CMD ["npm", "run", "start"]
