# Table of Contents

- [Installation](#installation)
  - [Docker Compose](#docker-compose)
- [Usage](#usage)
- [Configuration](#configuration)

## Installation

### Docker Compose

[Docker Compose](https://docs.docker.com/compose/) is a tool for defining and running multi-container Docker applications. To install Docker Compose, follow these steps:

**Linux:**

```
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

**macOS:**

```
brew install docker-compose
```

**Windows:**

```
Download the installer from the Docker Compose GitHub releases page and follow the installation instructions.
```

## Verify the installation by running

```

docker-compose --version
```

## Usage
Clone the repository containing your Docker Compose configuration:

```
git clone <https://github.com/MathLevi20/Fac-Juridico.git>
cd Fac-Juridico
```

## Run the following command to start the application:

```
docker-compose up -d
```

This will build and start the containers in the background.

**Access your application in a web browser:**
``

Frontend: <http://localhost:3000>
Backend: <http://localhost:5000>
Database: <http://localhost:6000>

```
To stop the application, run:
```

docker-compose down

```

## Configuration

### Docker Compose File

The docker-compose.yml file in your project defines the services, networks, and configurations for your application. The example configuration includes three services: frontend, backend, and database.

frontend: Build and run the frontend application, exposed on port 3000.
backend: Build and run the backend application, exposed on port 5000.
database: Use the official PostgreSQL image, exposed on port 6000.
Adjust the configuration according to your project's requirements.

## Environment Variables

Environment variables are stored in the .env file. Customize the variables based on your application needs. In the example, the PostgreSQL credentials are set in the .env file.

## Networks

A custom bridge network named my-network is defined to facilitate communication between services. Adjust the network settings if needed .
