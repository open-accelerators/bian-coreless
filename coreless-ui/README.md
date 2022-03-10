# Prerequisites

In order to run this project, you will need:

    * A running Kubernetes cluster
    * A full [Mercury](https://github.com/open-accelerators/mercury) deployment on the cluster

# Local runtime

NOTE: 
In directory ./server/index.js lines 20-24 you can find default values for PORT and HOST variables.
These variables can be modified if required for local runtime.

## Installations

In the _coreless-ui_ project directory, run:

`npm install`

`npm --prefix ./frontend/ install`

`npm --prefix ./frontend/ run build`

## Runtime

To start runtime, run:

`npm start`

Runs the app in development mode.
Open [http://localhost:${PORT}](http://localhost:8080) to view it in the browser.

To exit runtime type [Ctrl-C] in CLI

# Containerized runtime

## Deployment to Minikube

Start local Minikube cluster by running:

`minikube start --memory=4096`

To deploy project resources to minikube cluster, in this project directory, run:

`kubectl apply -f deploy/00_deployment.yaml`

## Runtime

To expose coreless-ui URL, run:

`minikube service coreless-ui --url=true`

Exposes URL to the app in development mode.
Hold CNTR and click on URL (or copy link to browser) to view it in the browser.

Stop local Minikube cluster by running:

`minikube stop`

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
