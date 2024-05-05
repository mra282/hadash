# Start with the official Node.js image.
FROM node:22.1.0-alpine3.19

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run npm start script
CMD ["npm", "start"]