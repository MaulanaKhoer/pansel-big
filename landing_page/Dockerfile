# Stage 1: Build React static files
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Override config.json with production API URL
ARG API_URL=https://pansel.big.go.id/api
RUN echo "{\"base_domain\": \"https://pansel.big.go.id/\", \"api_domain\": \"${API_URL}\", \"url_pelamar\": \"https://pansel.big.go.id/pelamar/\"}" > src/config.json

RUN npm run build

# Stage 2: Serve the build folder using Nginx
FROM nginx:1.25-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
