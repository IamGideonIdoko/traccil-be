# Traccil Backend
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This is the core backend service for Traccil.

**NB:** This project's dependencies are solely managed with [Yarn](https://yarnpkg.com/) so ensure you have both [Yarn](https://yarnpkg.com/getting-started/install) and Node.js installed. If you have [Node.js](https://nodejs.org/en/download) installed.

## Getting started

### Setting up this project on your local machine

* Move into your preferred projects directory: 

    ```bash
    cd ~/projects_directory
    ```

* Clone this repository:

    ```bash
    [HTTPS] - git clone https://github.com/IamGideonIdoko/traccil-be.git
    [SSH] - git clone git@github.com:IamGideonIdoko/traccil-be.git
    ```

* Move into the project directory:

    ```bash
    cd traccil-be
    ```

* Install the dependencies:

    ```bash
    yarn install
    ```
    
    **NB:** Add the `--ignore-scripts` flag to ignore post-installation scripts.

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
  
  + DB_CONNECTION_URL=mysql://root:@127.0.0.1:3306/traccil_be_db
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

- Run Prisma Studio (Database data visual editor / management tool)

  ```bash
  yarn studio
  ```

- This repo is commitizen-friendly so commit your code with the below command:
  ```bash
  yarn commit
  ```

## Databases

By default, the project is configured to connect to a MySQL database using [Prisma](https://prima.io). The ERD for this project's database is given below:

![ERD](./prisma/diagrams/ERD-auto.svg)

## Engineering Guidelines

1. Create a new migration using:

   ```bash
   yarn migrate dev --name [migration-name]
   ```

2. Use the below command to seed the database

    ```bash
    yarn seed
    ```

3. Run the below after every valid update made to the Prisma schema file:

   ```bash
   yarn generate:prisma
   ```

   This will run all generators connected to Prisma.

4. All tests should be written inside the `tests` folder in the root directory.

5. Run the below after every valid update made to the GraphQL schema files:

   ```bash
   yarn generate:types
   ```

   This will regenerate TypeScript types for the GraphQL resolvers.

6. Tests and linting checks run before any change is committed. Kindly ensure you follow the defined rules and properly write tests for all your contributions.

7. Do not alter any configuration files without contacting team members.

8. Do not install or manage any dependency with `npm` use `yarn` instead.

9. Write meaningful commit messages.

10. Do not push changes directly to the master branch. Push to the remote branch of your local branch instead.

11. You can get GraphQL schema hints from the generated GraphQL schema located at `prisma/graphql/schema.graphql`.

12. You can get Joi schema hints from the generated Joi schemas located at `prisma/joi/schemas`

## Useful Tips

- Install the Prisma, GraphQL, and ESLint extensions to help with syntax highlighting and more.

## Useful References

- [Commit lint reference rules](https://commitlint.js.org/#/reference-rules)

~ Enjoy 😊

