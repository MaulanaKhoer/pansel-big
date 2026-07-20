# Stage 1: Build React static files
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Override config.json with production API URL
ARG API_URL=http://10.10.170.124:8080/api
RUN echo "{\"logo\": \"logo_big.png\", \"nama_sj\": \"Badan Informasi Geospasial\", \"api_domain\": \"${API_URL}\"}" > src/config.json

RUN npm run build

# Stage 2: Serve the build folder using Nginx
FROM nginx:1.25-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
