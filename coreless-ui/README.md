# Prerequisites

This project depends on the existance of a running local Minikube cluster
with a kafka cluster and a customer-offer BIAN service deployed on the minikube cluster.
cusomer-offer BIAN service URL must be exposed.

# Local runtime

NOTE: 
In directory ./server/index.js lines 22-24 you can find default values for PORT, SERVICE_PORT and SERVICE_HOST.
These variables can be modified if required for local runtime.

In this project directory, run:

## `npm install`

## `npm --prefix ./frontend/ install`

## `npm --prefix ./frontend/ run build`

## `npm start`

Runs the app in development mode.
Open [http://localhost:${PORT}](http://localhost:8080 by default) to view it in the browser.

To exit runtime type [Ctrl-C] in CLI

# Containerized runtime

Start by running:

## `minikube start --memory=4096`

Starts local Minikube cluster

In this project directory, run:

## `kubectl apply -f deploy/00_deployment.yaml`

Deploys project to minikube cluster using 00_deployment.yaml file in ./deploy/ directory

run:

## `kubectl get pods`

To view coreless-ui pod created by deployment

run:

## `kubectl get svc`

To view coreless-ui service created by deployment

To expose coreless-ui URL, run:

## `minikube service coreless-ui --url=true`

Exposes URL to the app in development mode.
Hold CNTR and click on URL (or copy link to browser) to view it in the browser.

Stop by running:

## `minikube stop`

Stops local Minikube cluster

---

*** Frontend Documentation ***

From this project directory, run:

### `cd frontend/`

Navigates to React App directory

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
