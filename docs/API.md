# API Documentation

The backend is built with Python and FastAPI, serving a RESTful API for the frontend and admin panels.

## Base URL
- **Local:** `http://localhost:8000`
- **Production:** `https://your-backend.onrender.com`

## Authentication
Admin routes are protected using JWT (JSON Web Tokens). The token must be passed in the Authorization header:
`Authorization: Bearer <your_jwt_token>`

## Endpoints

### Auth
* **`POST /api/auth/login`**
  * Authenticates the admin user.
  * **Body:** `{ "username": "admin", "password": "yourpassword" }`
  * **Response:** `{ "access_token": "eyJhb...", "token_type": "bearer" }`

### Projects (Public)
* **`GET /api/projects`**
  * Retrieves a list of all portfolio projects.
  * **Response:** Array of Project objects.
* **`GET /api/projects/{slug}`**
  * Retrieves a single project by its URL slug.

### Projects (Protected / Admin)
* **`POST /api/projects`**
  * Creates a new project.
  * **Headers:** `Authorization: Bearer <token>`
* **`PUT /api/projects/{id}`**
  * Updates an existing project.
  * **Headers:** `Authorization: Bearer <token>`
* **`DELETE /api/projects/{id}`**
  * Deletes a project.
  * **Headers:** `Authorization: Bearer <token>`