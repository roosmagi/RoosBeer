# RoosBeer

A full-stack beer shop app with user authentication, a beer catalog, image uploads, and a shopping cart.

## Tech Stack

**Frontend**
- React + Vite
- React Router
- Axios

**Backend**
- Node.js + Express
- Sequelize ORM
- SQLite database
- JWT authentication
- Multer for image uploads

## Project Structure

```
RoosBeer/
  Backend/
  Frontend/
```

## Getting Started

### Prerequisites
- Node.js 18+ recommended
- npm

### Backend Setup

```bash
cd Backend
npm install
node index.js
```

The API runs on http://localhost:3002 and uses a local SQLite database file at Backend/database.db.

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The app runs on the Vite dev server.

## API Overview

Base URL: http://localhost:3002

### Auth
- POST /register
- POST /login

### Beers
- GET /beers
- GET /beer/:beerId
- POST /add-beer (protected, multipart/form-data)

### Cart
- GET /carts/user/:userId
- POST /carts
- POST /carts/:id/items
- PUT /carts/:id/items/:itemId
- DELETE /carts/:id/items/:itemId
- PUT /carts/:id

## Notes

- JWT secret is currently stored in Backend/util/SECRET.js. Change this for production use.
- Uploaded images are stored in Backend/uploads and served from /uploads.

## Scripts

### Frontend
- npm run dev
- npm run build
- npm run preview
- npm run lint

```bash
node index.js
```
