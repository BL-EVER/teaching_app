# ECHO SERVER 
### for use in tests and benchmarks

#### Run locally
- ` npm install`
- `node index.js`

#### Run in a docker container
- `docker build . -t echo-server`
- `docker-compose up`

### Available endpoints
- GET `/` : Hello world message
- POST `/` : parses and returns returns request body (text or json) back as the response body
- GET `/fibonacci/10` : calculates using recursion (CPU intensive) the requested fibonacci number and returns it as the response body. Replace `10` with any number greater than 1. Numbers below 45 are fast to calculate and above 45 are intensive to calculate