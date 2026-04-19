FROM node:22-alpine AS build
LABEL "language"="nodejs"
LABEL "framework"="vite"

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM zeabur/caddy-static:latest
COPY --from=build /src/dist /usr/share/caddy
EXPOSE 8080
