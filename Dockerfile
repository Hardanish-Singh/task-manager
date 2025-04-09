# Use an official Node.js image as the base image
FROM node:20.19-alpine3.20

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies using Nx
RUN npm install -g nx
RUN npm install

# Copy the entire frontend project files to the container
COPY . .

EXPOSE 4200
EXPOSE 3000
