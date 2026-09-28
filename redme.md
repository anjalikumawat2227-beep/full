# Full-Stack E-Commerce Application

A full-stack e-commerce web application built with **React.js, Node.js, Express.js, MongoDB, Redux Toolkit, and React Query**.

The application supports two different roles:

* **Buyer/User** — browse available products
* **Seller** — create, view, update, and delete own products

The project also implements authentication using **JWT access tokens and refresh tokens**, role-based authorization, image uploads using ImageKit, form validation, and protected routes.

---

## 🚀 Features

### Authentication

* User registration
* User login
* Logout
* JWT-based authentication
* Short-lived access token
* Refresh token stored in an HTTP-only cookie
* Refresh token hashing before storing in the database
* Automatic access token refresh using Axios interceptors
* Get currently authenticated user
* Protected routes
* Public routes
* Role-based route protection

### Buyer Features

* View all available products
* Product image carousel
* Product image navigation
* Product size selection
* Stock availability display
* Add-to-cart UI

> Cart persistence and order functionality are currently under development.

### Seller Features

* Seller dashboard
* View own products
* Create products
* Upload multiple product images
* Product title and description validation
* Product price and currency
* Add multiple sizes and stock
* Update own products
* Delete products
* Seller-only product APIs

### Product Management

Each product supports:

* Title
* Description
* Multiple images
* Price
* Currency
* Available sizes
* Stock per size
* Seller reference

Maximum **5 images** can be uploaded for a product.

---

## 🛠️ Tech Stack

### Frontend

* React 19
* React Router
* Redux Toolkit
* React Redux
* TanStack React Query
* Axios
* React Hook Form
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Express Validator
* Multer
* Cookie Parser
* Dotenv

### Image Storage

* ImageKit

---

## 📁 Project Structure

```text
anjalikumawat2227-beep-full/
│
├── client/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout/
│   │   │   │   ├── AuthLayout.jsx
│   │   │   │   └── MainLayout.jsx
│   │   │   │
│   │   │   ├── protectedRoutes/
│   │   │   │   ├── ProtectedRoute.jsx
│   │   │   │   ├── PublicRoute.jsx
│   │   │   │   └── RoleBasedRoute.jsx
│   │   │   │
│   │   │   ├── routes/
│   │   │   │   ├── AppRoutes.jsx
│   │   │   │   ├── buyerRoutes.jsx
│   │   │   │   └── sellerRoutes.jsx
│   │   │   │
│   │   │   └── store.jsx
│   │   │
│   │   ├── config/
│   │   │   └── axiosinstens.js
│   │   │
│   │   └── feature/
│   │       ├── auth/
│   │       ├── dashBoard/
│   │       ├── sellerBoard/
│   │       └── userBoard/
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
└── server/
    ├── src/
    │   ├── app/
    │   │   └── app.js
    │   ├── config/
    │   │   ├── db.config.js
    │   │   └── env.config.js
    │   ├── controller/
    │   │   ├── auth.controller.js
    │   │   └── products.controller.js
    │   ├── middelware/
    │   │   └── authenticat.js
    │   ├── model/
    │   │   ├── products.module.js
    │   │   └── user.model.js
    │   ├── routers/
    │   │   ├── auth.route.js
    │   │   └── product.route.js
    │   ├── services/
    │   │   └── storage.service.js
    │   ├── utils/
    │   │   └── auth.token.js
    │   └── validator/
    │       ├── auth.validators.js
    │       └── product.validators.js
    │
    └── package.json
```

---

## 🔐 Authentication Flow

The application uses two JWT tokens:

### Access Token

* Used to authenticate API requests
* Sent through the `Authorization` header
* Expires after 15 minutes
* Stored in application memory instead of localStorage

Example:

```text
Authorization: Bearer <access_token>
```

### Refresh Token

* Used to generate a new access token
* Stored in an HTTP-only cookie
* Expires after 7 days
* Hashed before being stored in MongoDB
* Rotated when a new access token is generated

### Automatic Token Refresh

The frontend Axios instance uses interceptors.

When an API request receives a `401` response:

1. Frontend calls the refresh-token API.
2. Backend verifies the refresh token.
3. Backend generates a new access token.
4. Frontend updates the in-memory access token.
5. The failed request is retried with the new token.

---

## 👥 Role-Based Authorization

The application supports two roles:

```text
user
seller
```

### User

A user can access buyer routes:

```text
/main/buyer
/main/buyer/cart
/main/buyer/orders
```

### Seller

A seller can access seller routes:

```text
/main/seller
/main/seller/products
/main/seller/products/create
```

Backend APIs also verify the user's role before allowing seller or buyer-specific operations.

This means authorization is implemented on both:

* Frontend routes
* Backend APIs

---

## 🔗 API Endpoints

Base API:

```text
/api
```

### Authentication APIs

| Method | Endpoint                  | Description                 |
| ------ | ------------------------- | --------------------------- |
| POST   | `/api/auth/register`      | Register a new user         |
| POST   | `/api/auth/login`         | Login user                  |
| POST   | `/api/auth/refresh-token` | Generate a new access token |
| GET    | `/api/auth/me`            | Get authenticated user      |
| GET    | `/api/auth/logout`        | Logout user                 |

---

### Product APIs

| Method | Endpoint                    | Access | Description           |
| ------ | --------------------------- | ------ | --------------------- |
| POST   | `/api/products/`            | Seller | Create product        |
| GET    | `/api/products/`            | User   | Get all products      |
| GET    | `/api/products/my-products` | Seller | Get seller's products |
| PUT    | `/api/products/:id`         | Seller | Update product        |
| DELETE | `/api/products/:id`         | Seller | Delete product        |

---

## 📦 Product Data

A product contains information such as:

```json
{
  "title": "Formal Shirt",
  "description": "A comfortable formal shirt for everyday use.",
  "price": {
    "amount": 1499,
    "currency": "INR"
  },
  "sizes": [
    {
      "size": "M",
      "stock": 20
    },
    {
      "size": "L",
      "stock": 15
    }
  ],
  "images": [
    "image-url-1",
    "image-url-2"
  ]
}
```

Supported sizes:

```text
XS
S
M
L
XL
XXL
```

Supported currencies:

```text
INR
USD
```

---

## 🖼️ Image Upload

Product images are uploaded using:

* Multer for receiving files
* ImageKit for cloud storage

Configuration:

```text
Maximum images: 5
Maximum file size: 1 MB per file
```

Uploaded image URLs are stored in MongoDB with the product document.

---

## ✅ Validation

### Authentication Validation

Registration validates:

* Name
* Email
* Password
* Confirm password
* Role

Login validates:

* Email
* Password

### Product Validation

Product creation/update validates:

* Title length
* Description length
* Price
* Currency
* Sizes
* Stock
* Allowed size values

Validation is handled using **express-validator** on the backend.

Frontend forms use **React Hook Form**.

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

Move into the project:

```bash
cd anjalikumawat2227-beep-full
```

---

# Backend Setup

Go to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` folder:

```text
server/
└── .env
```

Add the required environment variables:

```env
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

> Never commit your `.env` file to GitHub.

Start the backend:

```bash
npm run dev
```

The backend server runs on:

```text
http://localhost:3000
```

---

# Frontend Setup

Open a new terminal and go to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The Vite development server will provide the local frontend URL.

---

## 🔄 Frontend State Management

The project uses two different approaches depending on the type of data.

### Redux Toolkit

Redux Toolkit is used for **authentication state**.

Authentication state includes:

```text
user
accessToken
isAuthenticat
isloading
error
```

Async authentication operations are handled using:

```text
createAsyncThunk
```

---

### TanStack React Query

React Query is used for **server-side product data**.

It handles:

* Fetching products
* Seller's products
* Creating products
* Updating products
* Deleting products
* Cache invalidation
* Loading states

After seller product mutations, the product query is invalidated so the latest data can be fetched.

---

## 🌐 Axios Configuration

A centralized Axios instance is used for API communication.

It handles:

* Base API configuration
* Cookies
* Authorization header
* Access token
* Automatic token refresh

The frontend uses an in-memory access token rather than storing the access token in localStorage.

---

## 🛡️ Route Protection

The application has three route protection components:

### ProtectedRoute

Prevents unauthenticated users from accessing protected application routes.

### PublicRoute

Prevents authenticated users from accessing login/register pages.

### RoleBasedRoute

Checks the authenticated user's role before allowing access to:

* Buyer routes
* Seller routes

Unauthorized users are redirected to:

```text
/unauthorized
```

---

## 🧪 Available Scripts

### Client

```bash
npm run dev
```

Start Vite development server.

```bash
npm run build
```

Create production build.

```bash
npm run lint
```

Run ESLint.

```bash
npm run preview
```

Preview the production build.

---

### Server

```bash
npm run dev
```

Start the backend using Nodemon.

---

## 📌 Current Project Status

### Implemented

* User registration
* User login
* Logout
* JWT authentication
* Refresh token flow
* Protected routes
* Role-based authorization
* Seller product creation
* Seller product listing
* Product update
* Product deletion
* Product image upload
* Product validation
* Buyer product listing
* Product size selection
* React Query integration
* Redux Toolkit authentication state

### In Progress

* Cart functionality
* Order functionality
* Buyer checkout flow
* Seller dashboard statistics
* Additional UI improvements

---

## 🔮 Future Improvements

* Persistent shopping cart
* Complete checkout flow
* Order creation and order history
* Payment integration
* Product search
* Product filtering
* Product categories
* Pagination
* Seller dashboard analytics
* Better error handling
* Loading skeletons
* Responsive UI improvements
* Production deployment configuration

---

## 👩‍💻 Author

**Anjali Kumawat**

Built as a full-stack learning project to practice:

* React
* Node.js
* Express
* MongoDB
* REST APIs
* Authentication
* Authorization
* Redux Toolkit
* React Query
* File uploads
* API integration
* Role-based application architecture
