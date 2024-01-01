# Backend Microservices

This repository contains the backend services for our microservices architecture. The backend is divided into three main services: `account.services`, `api_gateway`, and `profile.services`.

## Table of Contents
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Folder Structure

- **account.services**
  - `dist/`: Compiled JavaScript files.
  - `node_modules/`: Node.js modules.
  - `prisma/`: Prisma configuration and migrations.
  - `src/`: Source code.
  - `test/`: Unit tests.
  - `.env`: Environment variables.

- **api_gateway**
  - `dist/`: Compiled JavaScript files.
  - `node_modules/`: Node.js modules.
  - `src/`: Source code.
  - `test/`: Unit tests.

- **profile.services**
  - `dist/`: Compiled JavaScript files.
  - `node_modules/`: Node.js modules.
  - `prisma/`: Prisma configuration and migrations.
  - `src/`: Source code.
  - `test/`: Unit tests.
  - `.env`: Environment variables.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.18.2 recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (if using Docker for deployment)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devlik404/Backend-Microservices.git
2.Install dependencies:

cd Backend-Microservices/account.services
npm install

cd ../api_gateway
npm install

cd ../profile.services
npm install

3.Start the services:

# Inside account.services folder
npm start 

# Inside api_gateway folder
npm start

# Inside profile.services folder
npm start
