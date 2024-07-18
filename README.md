# Technical test for Geeks Castle

This project is an implementation of a hexagonal architecture using NestJS and Firebase Firestore. The goal is to maintain a clear separation between the different layers of the application and to facilitate the maintenance and scalability of the code.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Run the Project](#run-the-project)
- [Firebase Emulators](#firebase-emulators)
- [Endpoints Available](#endpoints-available)

## Requirements

- Node.js (version 18 or higher)
- Firebase CLIc

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/juancalderonx/geeks-castle-tech-test
   cd your-repository
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

## Configuration

1. Copy the `env.template` file and rename it to `.env`:

   ```sh
   cp env.template .env
   ```

2. Edit the `.env` file to include the required environment variables. Be sure to add Firebase credentials and any other required settings.

## Running the Project

To run the project in development mode:

```sh
npm run start:dev
```

To run the project in production mode:

```sh
npm run start:prod
```

## To run the tests

```sh
npm run test
```

## To run test and generate coverage report

```sh
npm run test:cov
```

## Firebase emulators

> **Note**: Note that you must log in to Firebase CLI to be able to use the emulators and configure the project in the environment variables

To use Firebase emulators locally:

1. Install Firebase CLI:

   ```sh
   npm install -g firebase-tools
   ```

2. Start the Firebase emulators:
   ```sh
   firebase emulators:start
   ```

## Available Endpoints

### Users

- **Create User**

  - **URL**: `/users`
  - **Method**: `POST`
  - **Description**: Create a new user.
  - **Body**:
    ```json
    {
      "name": "Juan",
      "username": "juancalderonx",
      "password": "Secret123." // Optional, it is automatically generated if not provided.
    }
    ```

- **Find user by id**
  - **URL**: `/users/:id`
  - **Method**: `GET`
  - **Description**: Gets a user by its ID.s
  - **URL Parameters**:
    - `id`: The ID of the user.

### Customers

- **Create Customer**

  - **URL**: `/customers`
  - **Method**: `POST`
  - **Description**: Create a new customer.
  - **Body**:
    ```json
    {
      "name": "Juan",
      "lastName": "Esteban",
      "birthday": "2002-11-23T11:00:00.000Z" // Format ISO 8601
    }
    ```

- **Find customer by ID**
  - **URL**: `/customers/:id`
  - **Method**: `GET`
  - **Description**: Gets a customer by its ID.
  - **URL Parameters**:
    - `id`: The ID of the customer.

## Project Explanation

This project implements a hexagonal architecture with NestJS and Firebase Firestore. Hexagonal architecture, also known as port and adapter architecture, aims to maintain a clear separation between the application domain and external technology concerns, such as databases and frameworks.

### Project Structure

- **App**: It contains the AppModule of the application, which is in charge of configuring the modules and drivers of the application.

- **Contexts**: It contains the different contexts of the application (for example Users or Customers), which represent the different areas of the application. Each context contains the following folders:

- **Domain**: Contains the entities, repositories and exceptions of the domain.
- **Application**: Contains the use cases and services of the application.
- **Infrastructure**: It contains the implementation of Firebase repositories, drivers and configuration.

### Main Featuress

- Implementation of a hexagonal architecture.
- Use of Firebase Firestore for data storage.
- Use of Firebase Functions for calculations and automatic updates in the database.
- Custom Logger configuration for the application.
- Custom configuration of environment variables for the application.
- Implementation of design patterns, clean code and good programming practices.s

I hope this README has been helpful for you to configure and understand the project. If you have any questions or problems, feel free to open an issue in the repository.
