# Build React
FROM ubuntu:24.04 AS builder

ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    gnupg \
    build-essential \
  && rm -rf /var/lib/apt/lists/*

# Instalar Node.js 20.x a partir do NodeSource
RUN mkdir -p /etc/apt/keyrings \
  && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
  && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" > /etc/apt/sources.list.d/nodesource.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends nodejs \
  && rm -rf /var/lib/apt/lists/*

# Garantir npm v10.8.2 no estágio de build
RUN npm install -g npm@10.8.2

COPY package*.json ./
RUN npm ci
COPY . .
# React Scripts 4 usa Webpack 4, que precisa da flag legacy provider com OpenSSL 3 (Node >=17)
RUN NODE_OPTIONS=--openssl-legacy-provider npm run build

# Runtime
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    gnupg \
    net-tools \
    iputils-ping \
    iproute2 \
    wget \
  && rm -rf /var/lib/apt/lists/*

# Instalar Node.js 20.x a partir do NodeSource
RUN mkdir -p /etc/apt/keyrings \
  && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
  && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" > /etc/apt/sources.list.d/nodesource.list \
  && apt-get update \
  && apt-get install -y --no-install-recommends nodejs \
  && rm -rf /var/lib/apt/lists/*

# Garantir npm v10.8.2 no runtime stage
RUN npm install -g npm@10.8.2

COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server.js ./

RUN npm ci --omit=dev

EXPOSE 80
CMD ["node", "server.js"]
