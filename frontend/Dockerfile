# frontend/Dockerfile
# Build stage
FROM node:16 as build

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Set environment variables with default values for build time
ARG REACT_APP_API_URL=/api
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Copy the rest of the code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:stable

# Copy built assets from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Clear any existing entrypoint
ENTRYPOINT []

# Use a simple command that doesn't rely on a shell script
CMD ["nginx", "-g", "daemon off;"]
