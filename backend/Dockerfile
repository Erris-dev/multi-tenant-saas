# --- Stage 1: Build the application ---

FROM node:20-alpine AS builder

WORKDIR /backend

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# --- Stage 2: Run the application ---

FROM node:20-alpine

WORKDIR /backend

COPY --from=builder /backend/dist ./dist
COPY --from=builder /backend/package.json ./
COPY --from=builder /backend/package-lock.json ./

EXPOSE 6969

CMD ["npm","run","start"]