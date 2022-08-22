# OgaRepair Core  Backend
This is the core backend service for OgaRepair.

**NB:** This project's dependencies are solely managed with [Yarn](https://yarnpkg.com/) so ensure you have both [Yarn](https://yarnpkg.com/getting-started/install) and Node.js installed. If you have [Node.js](https://nodejs.org/en/download) installed.

## Getting started

### Setting up this project on your local machine

* Move into your preferred projects directory: 

    ```bash
    cd ~/projects_directory
    ```

* Clone this repository:

    ```bash
    [HTTPS] - git clone https://github.com/OgaRepair/ogarepair-core-backend.git
    [SSH] - git clone git@github.com:OgaRepair/ogarepair-core-backend.git
    ```

* Move into the project directory:

    ```bash
    cd ogarepair-core-backend
    ```

* Install the dependencies:

    ```bash
    yarn install
    ```

### Working on this project

- Create a contribution branch:

  ```bash
  git checkout -b [branch-name]
  ```

  **Branch name format**

  Features: `ft-[yourname]-[term]` Eg. `ft-johndoe-payment-gateway`

  Fixes: `fx-[yourname]-[term]` Eg. `fx-johndoe-payment-gateway`

- Create a `.env` file in the root directory and copy the contents of the `.env.example` file into it.

- Update `DB_CONNECTION_URL` info in `.env` with the MySQL RDBMS user, password, host and port:

  ```diff
  - DB_CONNECTION_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
  
  + DB_CONNECTION_URL=mysql://root:@127.0.0.1:3306/ogarepair_core_backend_db
  ```

* Run database migration:

    ```bash
    npx prisma migrate dev
    ```

* Run the development server:

    ```bash
    yarn server:dev
    ```

    * Starts a server running at http://localhost:8080
    * Automatically restarts when any of your files change

* Run documentation server for generated Prisma docs:

    ```bash
    yarn server:docs
    ```

## Databases

By default, the project is configured to connect to a MySQL database using [Prisma](https://prima.io). The ERD for this project's database is given below:

![ERD](./prisma/diagrams/ERD-auto.svg)

## Engineering Guidelines

1. Create a new migration using:

   ```bash
   npx prisma migrate dev --name [migration-name]
   ```

2. Run the below after every valid update made to the Prisma schema file:

   ```bash
   yarn generate:prisma
   ```

   This will run all generators connected to Prisma.

3. All tests should be written inside the `tests` folder in the root directory.

4. Run the below after every valid update made to the GraphQL schema files:

   ```bash
   yarn generate:types
   ```

   This will regenerate TypeScript types for the GraphQL resolvers.

5. Tests and linting checks run before any change is committed. Kindly ensure you follow the defined rules and properly write tests for all your contributions.
6. Do not alter any configuration files without contacting team members.
7. Do not install or manage any dependency with `npm` use `yarn` instead.
8. Write meaningful commit messages.
9. Do not push changes directly to the master branch. Push to remote branch of your local branch instead.

## Useful Tips

- Install the Prisma, GraphQL, and ESLint extension to help with syntax highlighting and more.

~ Enjoy 😊

