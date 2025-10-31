FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app

# Build the app with build-time environment variables
ARG VITE_TITLE
ARG VITE_DATA_SERVER_URL
ARG VITE_BACKEND_URL
RUN VITE_TITLE=$VITE_TITLE VITE_DATA_SERVER_URL=$VITE_DATA_SERVER_URL VITE_BACKEND_URL=$VITE_BACKEND_URL npm run build

FROM node:20-alpine
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]
