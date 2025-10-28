# Build React
FROM node:18-bullseye-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime
FROM node:18-bullseye-slim
WORKDIR /app
RUN apt-get update && apt-get install -y \
    net-tools \
    iputils-ping \
    iproute2 \
    curl \
    wget \
  && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server.js ./

RUN npm ci --only=production

EXPOSE 80
CMD ["node", "server.js"]

