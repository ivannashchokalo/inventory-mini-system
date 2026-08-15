# 📦 Inventory Mini System

A full-stack inventory management application for managing products and their stock status.

## ✨ Features

- 📋 View products
- ➕ Create products
- ✏️ Edit products
- 🗑️ Delete products
- 📊 Automatic stock status calculation
- ✅ Client- and server-side validation
- ⏳ Loading, error and empty states
- 🐘 PostgreSQL + Prisma
- 🐳 Docker Compose

## 🛠️ Technologies

### Frontend
- React
- TypeScript
- Vite
- React Router
- TanStack React Query
- React Hook Form
- Axios
- CSS Modules

### Backend
- Node.js
- Express
- Prisma
- PostgreSQL
- Celebrate / Joi
- CORS

### DevOps
- Docker
- Docker Compose

## 🚀 How to Run

Make sure Docker Desktop is installed and running.

Clone the repository:

```bash
git clone https://github.com/ivannashchokalo/inventory-mini-system
cd inventory-mini-system
```

Start all services:

```bash
docker compose up
```

The application will be available at:

* Frontend: `http://localhost:3000`
* Backend API: `http://localhost:4000`

Check running containers:

```bash
docker compose ps
```

Stop the application:

```bash
docker compose down
```

## 🔌 API Endpoints

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | `/products`     | Get all products  |
| GET    | `/products/:id` | Get product by ID |
| POST   | `/products`     | Create product    |
| PATCH  | `/products/:id` | Update product    |
| DELETE | `/products/:id` | Delete product    |

## 📊 Stock Status

The backend calculates the product status automatically based on quantity:

| Quantity | Status         |
| -------- | -------------- |
| `0`      | `out_of_stock` |
| `1–5`    | `low_stock`    |
| `> 5`    | `in_stock`     |

The status is recalculated when the product quantity is changed.

## 🗄️ Database

The project uses PostgreSQL with Prisma ORM.

The main `Product` model contains:

* `id`
* `name`
* `quantity`
* `price`
* `status`
* `description`
* `createdAt`
* `updatedAt`

Prisma migrations are included in the project.

## 🐳 Docker

The application consists of three services:

* `frontend` — React/Vite application
* `backend` — Express REST API
* `postgres` — PostgreSQL database

All services are started together using Docker Compose.

## ✅ Completed

* Product CRUD
* React Router navigation
* TanStack React Query data fetching and mutations
* Form validation with React Hook Form
* API validation with Celebrate/Joi
* Prisma + PostgreSQL
* Docker Compose setup
* Loading, error and empty states

## 🔮 Not Completed

* Authentication
* Search and filtering
* Pagination
* Production deployment
* Responsive UI


## 🤖 AI Usage Report

* **AI tool used:** ChatGPT
* **Used for:** Learning unfamiliar technologies, debugging, code review, UI suggestions and documentation.
* **Example prompts:**
  * "Help me set up Docker and Prisma with PostgreSQL."
  * "Check my frontend and backend for critical errors."
  * "Help me diagnose this Docker error without deleting my database."
* **Manual work:** I implemented the application, database, API, Docker setup, UI and validation, and fixed issues during testing.
* **Most difficult:** Setting up Docker and PostgreSQL because I had never used them before.

