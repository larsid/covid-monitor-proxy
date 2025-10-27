// server.js
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const http = require('http');
const os = require('os');

const API_TARGET = process.env.API_TARGET || 'http://localhost:8000';
let BIND_IP = process.env.BIND_IP || null;
const PORT = process.env.PORT || 80;

// Detecta automaticamente o IP local, se não informado
if (!BIND_IP) {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        BIND_IP = iface.address;
        break;
      }
    }
    if (BIND_IP) break;
  }
  if (!BIND_IP) BIND_IP = '0.0.0.0'; // fallback
}

const app = express();

// Servir os arquivos estáticos do build React
app.use(express.static(path.join(__dirname, 'build')));

// Configuração do proxy para a API backend
const proxyOptions = {
  target: API_TARGET,
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  logLevel: 'warn'
};

// Se houver um IP de bind definido, usa-o como origem local
if (BIND_IP) {
  proxyOptions.agent = new http.Agent({ localAddress: BIND_IP });
  console.log(`Usando localAddress ${BIND_IP}`);
}

app.use('/api', createProxyMiddleware(proxyOptions));

// Roteamento padrão para o frontend React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Inicializa o servidor Express
app.listen(PORT, () => {
  console.log(`Monitor (Express) rodando em http://${BIND_IP}:${PORT}, proxy -> ${API_TARGET}`);
});

