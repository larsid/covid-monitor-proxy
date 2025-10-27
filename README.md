# Covid Monitor

Covid Monitor is a React-based web application for tracking data related to the COVID-19 pandemic. This repository contains the user interface generated with Create React App and can be connected to real-time data collection and visualization services. This project was bootstrapped with  [Create React App](https://github.com/facebook/create-react-app). To learn more about React, check out the [React documentation](https://reactjs.org/) and the tutorial [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Overview
- **Primary stack:** React, JavaScript, Create React App.
- **Purpose:** Deliver a customizable dashboard of COVID-19 indicators.
- **Current status:** Initial project setup with development, testing, and production build scripts configured.

## Features
- Development environment with hot module reloading.
- Unit test runner powered by `react-scripts`.
- Production-ready build pipeline optimized by Create React App.

## Prerequisites
- Node.js >= 14
- npm >= 6

## Installation
```bash
npm install
```

## Running the Project

In the project directory, you can run the following commands.

### Development server
```bash
npm start
```
This command runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) in your browser with hot reload enabled. The page will reload if you make edits. You will also see any lint errors in the console.

### Tests
```bash
npm test
```
Launches the test runner in interactive watch mode, reporting errors and suggested fixes. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Production build
```bash
npm run build
```
Generates the optimized production bundle in the `build` directory, ready for deployment. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed! See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project. Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own. You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Project Structure
```
.
├── public/          # Static assets and root HTML file
├── src/             # React components, styles, and utilities
├── package.json     # Project metadata, dependencies, and npm scripts
└── README.md        # Project documentation
```

## Available Scripts
| Script           | Description |
|-----------------|-------------|
| `npm start`     | Launches the development server with hot reload. |
| `npm test`      | Runs unit tests in interactive watch mode. |
| `npm run build` | Produces the optimized production build. |
| `npm run eject` | Exposes Create React App configuration. *Irreversible action.* |

## Environment Variables
Store secrets and configuration values in a `.env` file following the Create React App naming convention (`REACT_APP_*`).

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Base URL for the COVID-19 data API consumed by the frontend service layer. | `https://api.example.com` |
| `REACT_APP_MAPBOX_TOKEN` | Access token for map visualizations, if enabled. | `pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2...` |

> **Note:** Never commit `.env` files or other secrets to version control. Use environment-specific configuration during deployment.

## Building a Docker Container Image
The repository includes a `Dockerfile` that builds a production-ready image containing the compiled React application served by a lightweight web server.

```bash
docker build --tag covid-monitor:latest .
```

The command builds the image using the current directory as the build context and tags it as `covid-monitor:latest` for easy reference.

## Creating and Running a Docker Container
After building the image, create a container that serves the application on port `3000` and optionally loads environment variables from a file.

```bash
docker run --rm -p 3000:3000 --env-file .env covid-monitor:latest
```

- `--rm` removes the container when it stops.
- `-p 3000:3000` publishes the container's port 3000 to the host.
- `--env-file .env` passes environment variables defined in `.env` to the container. Omit this flag if no additional configuration is required.

> **Note:** The development server started by `react-scripts start` already listens on all interfaces inside the container.

## Contribution Guidelines
1. Fork this repository.
2. Create a feature branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push the branch to your fork (`git push origin feature/your-feature-name`).
5. Open a Pull Request describing the updates.

## License
This project is available under the MIT license. Provide a `LICENSE` file or adapt the text to match your organization's licensing policy.


