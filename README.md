# Task Manager

Task Manager is a full-stack web application built using the NX Monorepo architecture. The frontend is developed using ReactJS, and the backend is powered by ExpressJS. This app allows users to manage tasks with basic CRUD (Create, Read, Update, Delete) operations.

## Features

- **Create**: Add new tasks with a title and description.
- **Read**: View a list of all tasks, with filtering and sorting options.
- **Update**: Modify the details of an existing task, including status, title, and description.
- **Delete**: Remove tasks from the system.

## Tech Stack

- **Frontend**: ReactJS
- **Backend**: ExpressJS
- **Database**: In-memory array (Tasks are stored in an array during runtime)
- **Monorepo Management**: NX Monorepo
- **Utilities**:
  - `uuid`: Generates unique identifiers for tasks.
  - `cors`: Enables Cross-Origin Resource Sharing (CORS) for API requests.

## SETUP USING DOCKER COMPOSE

### Step 1

```sh
docker build -t task-manager .
```

### Step 2

```sh
docker-compose up
```

### Step 3

```sh
Run URL: http://localhost:4200/
```

### Step 4

```sh
docker-compose down
```

## SETUP ON LOCAL INSTALLATION

### Step 1
```sh
git clone https://github.com/Hardanish-Singh/task-manager.git
```

### Step 2

```sh
npm i
```

### Step 2

```sh
npx nx run-many -t serve
```

### Step 3

```sh
Run URL: http://localhost:4200/
```

### Optional steps

```sh
# ONLY RUN FRONTEND
npx nx serve frontend
# RUN FRONTEND TESTS
npx nx test frontend

# ONLY RUN BACKEND
npx nx serve backend
# RUN BACKEND TESTS
npx nx test backend
# SERVER URL
http://localhost:3000/
```
