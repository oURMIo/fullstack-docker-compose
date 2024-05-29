# Fullstack Web App Docker Compose

This repository contains a fullstack web application that uses React for the frontend and Spring Boot for the backend. Docker Compose is used to orchestrate the services and manage the dependencies.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

* Docker
* Docker Compose

## Project Structure

The project structure is as follows:

```text
.
├── back-end
│   ├── Dockerfile
│   ├── src
│   ├── pom.xml
│   └── ...
├── fron-end
│   ├── Dockerfile
│   ├── src
│   ├── package.json
│   └── ...
├── docker-compose.yml
└── README.md
```

## Getting Started

1) Clone the Repository

```sh
git clone https://github.com/oURMIo/fullstack-docker-compose.git
cd fullstack-docker-compose
```

2) Run the Application
   Use Docker Compose to build and start the application:

```sh
docker-compose up -d
```

Notes: Before starting, change the config file:

```text
fullstack-docker-compose/front-end/src/config/Config.js
```

## Cleanup

To stop the application and remove the containers, networks, and volumes created by Docker Compose, run:

```sh
docker-compose down
```
