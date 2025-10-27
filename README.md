# Covid Monitor Proxy

Covid Monitor Proxy delivers a small patient-monitoring dashboard backed by a lightweight
Express proxy. The React interface periodically polls a remote API for the sickest
patients, renders their vital signs, and lets clinicians focus on one patient at a time.
The Node/Express server serves the production build and forwards API calls when the app is
deployed behind a single origin.

## Features
- **Live polling dashboard** – Start and stop continuous polling of the `/users/sickest/:limit`
  endpoint with a one-second interval.
- **Patient severity list** – Display incoming patients ranked by severity, colour-coded by
  score, and choose a patient to inspect.
- **Vital sign cards** – Show temperature, heart rate, blood pressure, and respiratory rate
  for the selected patient with iconography and unit labels.
- **Configurable proxy** – Express proxy forwards `/api` requests to the configured backend
  target, automatically binding to the detected interface if none is supplied.
- **Container-ready** – Multi-stage Dockerfile builds the React bundle and ships a minimal
  runtime image that runs the proxy server.

## Project structure
```
.
├── public/           # Static assets consumed by Create React App
├── src/              # React application, contexts, widgets, and API service
├── server.js         # Express server that serves the build and proxies API calls
├── Dockerfile        # Multi-stage image that builds and runs the proxy server
├── package.json      # Dependencies and npm scripts
└── README.md         # Project documentation (this file)
```

## Prerequisites
- Node.js 16+ (Node 18 is used in the Docker image)
- npm 7+

## Installation
```bash
npm install
```

## Configuration
Create a `.env` file in the project root (or export the variables in your shell) with the
values appropriate for your environment.

### Frontend build-time variables
| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Base URL for the monitoring API queried by Axios. | `http://localhost:8000` |

### Proxy runtime variables
Set these when running `npm run server`, the Docker container, or any deployment of the
Express proxy.

| Variable | Description | Default |
|----------|-------------|---------|
| `API_TARGET` | Destination base URL for proxied `/api` requests. | `http://localhost:8000` |
| `BIND_IP` | Local interface IP used by the proxy's HTTP agent. Autodetects a non-internal IPv4 address. | first detected IPv4 / `0.0.0.0` |
| `PORT` | Port exposed by the Express server. | `80` |

The proxy rewrites paths so that `/api/users/sickest/:limit` reaches
`${API_TARGET}/users/sickest/:limit`. Configure the frontend build to point either directly
to the backend (via `REACT_APP_API_URL`) or to the proxy (`REACT_APP_API_URL=/api`).

## Running locally

### React development server
```bash
npm start
```
Runs `react-scripts` in development mode with hot reloading. Make sure
`REACT_APP_API_URL` is reachable from the browser.

### Tests
```bash
npm test
```
Launches the Jest test runner provided by Create React App in watch mode.

### Production build
```bash
npm run build
```
Generates static assets under `build/` that can be served by any static host or the bundled
Express proxy.

### Express proxy server
```bash
REACT_APP_API_URL=/api npm run build
API_TARGET=http://localhost:8000 PORT=8080 npm run server
```
The proxy serves the `build/` directory and forwards `/api` requests to the backend target.
`BIND_IP` is detected automatically and logged on startup.

## API expectations
The React app expects a backend endpoint at `/users/sickest/:limit` that returns JSON in
the following format:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Jane Doe",
      "score": 5,
      "temperature": 38.4,
      "heart_rate": 108,
      "blood_pressure": 120,
      "respiratory_rate": 24
    }
  ]
}
```
The polling limit is controlled by the numeric input on the dashboard and defaults to `0`
until changed.

## Docker workflow
Build and run the production image that bundles the compiled React app and proxy server.
```bash
docker build -t covid-monitor-proxy .
docker run --rm -p 8080:80 -e API_TARGET=http://backend:8000 covid-monitor-proxy
```
The runtime image installs common network troubleshooting tools (ping, curl, netstat) to aid
diagnostics in constrained environments.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-update`).
3. Commit your work (`git commit -am "Describe the change"`).
4. Push the branch (`git push origin feature/my-update`).
5. Open a Pull Request describing your changes.

## License
This project is distributed under the MIT License. Update the license text if your
organisation requires a different policy.
