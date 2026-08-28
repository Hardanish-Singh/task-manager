# Use an official Node.js image as the base image
FROM node:20-alpine

# Update Alpine packages to reduce vulnerabilities
RUN apk update && apk upgrade

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to install the dependencies
COPY package*.json ./

# Install dependencies using NX
RUN npm install -g nx
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Expose the ports for the frontend and backend applications
EXPOSE 4200
EXPOSE 3000
