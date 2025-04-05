# qp-grocery

### We follow standard structure for this project

```
|--src
|   |--components
|       |--modules-name
|               |--module-name.controller.ts
|               |--module-name.error.ts // if neccesary
|               |--module-name.repository.ts
|               |--module-name.route.ts
|               |--module-name.schema.ts
|               |--module-name.token.ts
|               |--module-name.validate.ts
|       |++ new modules
|   |--config
|       |--application.config.ts
|   |--helpers
|       |--helper-file-name.helper.ts
|       |++ new helper files
|   |--migration
|   |--seed
|   |--services
|       |--service-name-with-large-assets
|               |--service-name.error.ts
|               |--service-name.route.ts
|               |--service-name.schema.ts
|               |--service-name.token.ts
|       |--service-name.ts // as normal single file service
|       |++ new service files
|--app.ts
|--config.ts
|--index.ts
|--types
|   |--types-module.d.ts
|.editorConfig
|.env
|.env-example
|.eslintrc
|.gitignore
|.prettierc
|Dockerfile
|.dockerignore
|package.json
|tsconfig.json
|++ new files here
```

-   Folder naming can be singular or plural, but should be standardized

### To start project:

-   Requirement :
    -   node version: 20.8.0
    -   typescript version: 5.2.2
-   Step-1 : npm i
-   Step-2 :
    -   npm run start:dev (development)
    -   npm run start:prod (production)

### Env Variables

##### You can check and copy/rename .env-example

```
APP_NAME=qp-grocery
APP_MODE=development
APP_TYPE=single
PORT=3900
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
AUTH_KEY=-----BEGIN PRIVATE KEY-----\n...
CORS_ORIGIN=http://localhost:3000
ENCRYPTION_SALT=your-salt-value
TZ=Asia/Kolkata
```

## Project File/Folder Descriptions

| file/folder                        | description                                                                                                                                                 |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app.ts`                           | initializes the express app instance. middleware setup like CORS, JSON parser, and request logging can go here. it's the main app configuration.            |
| `index.ts`                         | entry point for the node.js app. starts the server postmanand loads environment configurations.                                                             |
| `config.ts`                        | loads and validates environment variables from `.env` using `dotenv` and exposes them throughout the app.                                                   |
| `src/config/application.config.ts` | central route registry. all module routes (user, admin, order, etc.) are mounted here using `app.use(...)`. keeps route registration centralized and clean. |
| `src/components`                   | main business logic is divided here into modules (`user`, `admin`, `order`, etc.) following a consistent and clean architecture.                            |
| `src/helpers`                      | reusable logic helpers such as token generation, authentication middleware, error handling, etc. live outside module boundaries.                            |
| `src/services`                     | contains large business logic or integrations such as communication service, SMS/email services, file upload, etc.                                          |
| `src/types`                        | typescript type definitions and custom `.d.ts` declarations for request/response, JWT payloads, or extended interfaces.                                     |
| `src/migration`                    | used for prisma migration files (if version control is used). not always necessary unless explicitly versioned.                                             |
| `src/seed`                         | database seed files to populate initial data during development or staging environments.                                                                    |

## Route Descriptions (modular)

### 🔑 `WelcomeRoute`

**file:** `src/components/welcome/welcome.route.ts`

| Route    | Description                                                                                   |
| -------- | --------------------------------------------------------------------------------------------- |
| `POST /` | public endpoint that lists all available grocery items. acts like a homepage product listing. |

🔐 **middleware:** `listGroceryItems` validation is applied.

---

### 👤 `UserRoute`

**file:** `src/components/user/user.route.ts`

| Route            | Description                                                                     |
| ---------------- | ------------------------------------------------------------------------------- |
| `POST /register` | register a new user. validation handled with `create`.                          |
| `POST /login`    | authenticates a user and issues access/refresh tokens.                          |
| `GET /profile`   | fetches authenticated user's profile. protected route (can add `authValidate`). |

### 👨🏻‍💼 `AdminRoute`

| Route                      | Description                                            |
| -------------------------- | ------------------------------------------------------ |
| `POST /login`              | Admin login. Issues admin JWTs.                        |
| `POST /product`            | Add a new grocery product. Auth + validation required. |
| `PUT /product/:id`         | Update product by ID. Requires admin auth.             |
| `DELETE /product/:id`      | Delete a product.                                      |
| `POST /products`           | List all products. Uses the welcomeController.index.   |
| `PATCH /product/:id/stock` | Update the stock quantity of a product.                |

### 👨🏻‍💼 `OrderRoute`

| Route    | Description                                                                      |
| -------- | -------------------------------------------------------------------------------- |
| `POST /` | Create new order. Requires user authentication. Validates each item and quantity |
| `GET /`  | List all orders of the authenticated users                                       |

### 👨‍💻 DevRoute (optional)

**file:** `src/dev/dev.route.ts`

this can include internal tools, diagnostics, db tests, and health checks. **not meant for production.**

using `faker` library created dummy data to populate users, admin,...

### 📦 Package.json Scripts Explaination

| Script          | Command                                                                                               | Description                                                                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| build           | cross-env NODE_OPTIONS=--max-old-space-size=1700 tsc                                                  | Compiles the TypeScript source code (.ts) into JavaScript (.js) in the dist folder. Sets memory limit to 1700MB to avoid memory overflow on large projects.                                                           |
| start           | cross-env NODE_OPTIONS=--max-old-space-size=1700 node ./dist/index.js                                 | Runs the compiled application in production mode using the output from the dist folder. Memory cap is applied.                                                                                                        |
| start:prod      | cross-env NODE_OPTIONS=--max-old-space-size=1700 node ./dist/index.js                                 | Alias for start. Useful for clarity in environments where start:prod clearly indicates production launch.                                                                                                             |
| prod            | npm run build && npm run start                                                                        | Shortcut to first compile the project and then run the production server. Common for CI/CD pipelines.                                                                                                                 |
| start:dev       | cross-env NODE_OPTIONS=--max-old-space-size=2048 nodemon --legacy-watch --exec ts-node ./src/index.ts | Starts the app in development mode with live-reloading using nodemon. Uses ts-node to run TypeScript directly without compiling to JS. The --legacy-watch ensures proper file watching on Linux/Mac/WSL environments. |
| prisma:generate | prisma generate                                                                                       | Generates Prisma Client based on your current schema. Needed after modifying schema.prisma.                                                                                                                           |
| prisma:migrate  | prisma migrate dev                                                                                    | Applies a new migration to the database and generates corresponding Prisma Client updates. Best used in development environments.                                                                                     |
| prisma:push     | prisma db push                                                                                        | Pushes the schema to the database without creating a migration. Fast and useful for prototyping or syncing models quickly.                                                                                            |
| prisma:studio   | prisma studio                                                                                         | Opens Prisma Studio — a web-based GUI to view                                                                                                                                                                         |

| 📌 Notes:                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------- |
| cross-env ensures environment variables are set consistently across Windows/Linux/Mac.                                                |
| NODE_OPTIONS=--max-old-space-size=xxxx prevents out-of-memory errors in larger builds/runs by increasing memory available to Node.js. |
| Keep start, start:prod, and start:dev clearly defined for different environments (deployment vs dev testing).                         |
| Prisma scripts help streamline DB workflows during active development.                                                                |

Also added `postman` collection with examples which will be easy for understanding the flow and vallidations
