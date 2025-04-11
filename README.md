# TshirtDesigner

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

## SETUP ON LOCAL INSTALLATION

### Step 1

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
```
