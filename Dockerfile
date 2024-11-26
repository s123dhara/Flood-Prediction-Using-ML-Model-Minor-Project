# Use the official Node.js image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies (add --production for production build)
RUN npm install

# Copy the rest of the application files
COPY . .

# Set environment variables
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Command to run the Node.js application
CMD ["node", "server.js"]
