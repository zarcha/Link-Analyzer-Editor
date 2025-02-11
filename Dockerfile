FROM node:22 AS build

ENV BUILD_ENV="production"

COPY . /opt/build

WORKDIR /opt/build

RUN npm install; npm run build

FROM nginx:stable

COPY --from=build /opt/build/dist /usr/share/nginx/html