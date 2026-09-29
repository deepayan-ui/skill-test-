# Library Management System - Backend API

A Node.js & Express REST API for managing library books with MongoDB.

## Features

- Add new books to the library database (`POST /api/books`) with ISBN uniqueness validation
- Health check / test endpoint (`GET /`)
- MongoDB connection using Mongoose
- Environment configuration support with `dotenv`
- CORS enabled

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** / **Mongoose**
- **dotenv**, **cors**
- **nodemon** (development)

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and adjust the variables if needed:
```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/libraryDB
```

### 3. Run Server
Development mode (auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```
The server will run on `http://localhost:5000`.

## API Endpoints

### Test Route
- **URL:** `GET /`
- **Response:**
  ```json
  {
    "message": "Library Book Management API is running"
  }
  ```

### Add Book
- **URL:** `POST /api/books`
- **Body (JSON):**
  ```json
  {
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "9780132350884",
    "category": "Programming",
    "publicationYear": 2008
  }
  ```
- **Success Response (201):**
  ```json
  {
    "message": "Book added successfully",
    "book": { ... }
  }
  ```
