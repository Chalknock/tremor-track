# Use Node.js to build the frontend
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source files
COPY . .

# Build the frontend
RUN npm run build
