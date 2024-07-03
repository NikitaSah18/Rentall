FROM node:18-alpine as build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.15.8-alpine
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
