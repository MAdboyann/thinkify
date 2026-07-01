# ---- Build Stage ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

ARG VITE_SERVER_ENDPOINT
ARG VITE_TOKEN_KEY
ARG VITE_USER_ROLE
ARG VITE_COOKIE_EXPIRES

ENV VITE_SERVER_ENDPOINT=$VITE_SERVER_ENDPOINT
ENV VITE_TOKEN_KEY=$VITE_TOKEN_KEY
ENV VITE_USER_ROLE=$VITE_USER_ROLE
ENV VITE_COOKIE_EXPIRES=$VITE_COOKIE_EXPIRES

RUN npm run build

# ---- Serve Stage ----
FROM nginx:1.25-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
