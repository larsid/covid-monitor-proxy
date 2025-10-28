FROM ubuntu:focal

RUN apt-get update \
    # Install dependencies
    && apt-get install -y \
    net-tools \
    iputils-ping \
    iproute2 \
    curl \
    wget \
    # Install NodeJS
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    # Install Application
    && wget https://github.com/larsid/covid-monitor-proxy/archive/main.tar.gz \
    && tar -xvzf main.tar.gz \
    && cp -a covid-monitor-proxy-main/  app/ \
    && rm -rf main.tar.gz \
    && rm -rf covid-monitor-proxy-main \
    && apt-get autoremove -y


WORKDIR /app

# Garantir npm v10.8.2 no runtime stage
RUN npm install -g npm@10.8.2


COPY package*.json ./
RUN npm ci
COPY . .
# React Scripts 4 usa Webpack 4, que precisa da flag legacy provider com OpenSSL 3 (Node >=17)
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server.js ./

RUN npm ci --omit=dev 

EXPOSE 80
CMD ["node", "server.js"]
