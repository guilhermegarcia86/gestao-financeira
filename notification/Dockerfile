# Get NPM packages
FROM node:16.14.2-alpine3.14 as dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i

# Rebuild the source code only when needed
FROM node:16.14.2-alpine3.14 as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run the app
FROM node:16.14.2-alpine3.14 as runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package.json ./package.json
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]
