    # Stage 1: Build the React application
    FROM node:20-alpine3.19 AS build

    WORKDIR /app

    COPY package*.json ./

    RUN npm install --cache=/tmp/.npm-cache

    COPY . .

    RUN npm run build

    # Stage 2: Serve the React application
    FROM nginx:1.27-alpine

    # Copy the built application from Stage 1
    COPY --from=build /app/dist /usr/share/nginx/html

    EXPOSE 80

    # Run nginx when container starts
    CMD ["nginx", "-g", "daemon off;"]