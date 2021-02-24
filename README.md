# Simple Node.js microservices for K8s applications

This repository contains two microservices written in Node.js using the Express framework. The `frontend` application displays hostname and current datetime information on the home page, together with a message received from the `backend` service. If communication between the two service can not be established, an error message is displayed instead.

The `backend` service is a very simple REST API service, serving a randomised message on the `/message` endpoint. Response is JSON and include hostname, timestamp and the message itself.

---

## Installation, startup and tests

For **development and testing environments**, node.js dependencies need to be installed for each service:

```bash
cd frontend
npm install

cd ../backend
npm install
```

Once all dependencies are successfully installed, the following commands are available for each service:

- `npm start` start the service and reports the listening port number
- `npm run lint` runs static code analysis with eslint
- `npm run test` performs integration tests for all exposed endpoints

For **production environments**, testing and linting modules should be omitted by using the `--production` flag. This will minimize the attack surface and reduce the overall image size.

```bash
cd frontend
npm install --production

cd ../backend
npm install --production
```

---

## `frontend` service

### Configuration

Service is configures using the following environment variables:

```text
SERVICE_PORT    The port on which the service is listening to requests. Defaults to 8080
BACKEND_HOST    The hostname of the backend messaging service. Defaults to localhost
BACKEND_PORT    The porn number of the backend messaging service. Defaults to 8081
```

### End points

```text
/           Displays hostname, current time and message from the backend service
/healthz    Returns 200 "OK" if the service is operational

200         Returns 200 for successful requests
404         Returns 404 "Not Found" for any other routes
500         Returns 500 "Internal Server Error" for internal errors
```

---

## `backend` service

### Configuration

Service is configures using the following environment variables:

```text
SERVICE_PORT    The port on which the service is listening to requests. Defaults to 8081
```

### End points

```text
/           Returns simple description message
/message    Returns random JSON encoded message
/healthz    Returns 200 "OK" if the service is operational

200         Returns 200 for successful requests
404         Returns 404 "Not Found" for any other routes
500         Returns 500 "Internal Server Error" for internal errors
```
