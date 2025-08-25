# --- Stage 1: Build the application ---

FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# --- Stage 2: Run the application ---

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /application/package.json ./
COPY --from=builder /application/package-lock.json ./

EXPOSE 6969

CMD ["npm","run","start"]