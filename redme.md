# Full-Stack E-Commerce Application

A full-stack e-commerce web application built with **React.js, Node.js, Express.js, MongoDB, Redux Toolkit, and TanStack React Query**.

The application supports two different roles:

* **Buyer/User** — browse available products and interact with product listings
* **Seller** — create, view, update, and delete own products

The project implements authentication using **JWT access tokens and refresh tokens**, role-based authorization, protected routes, product management, image uploads using ImageKit, form validation, and API integration.

The application is deployed using **Vercel**.

---

## 🚀 Features

### Authentication

* User registration
* User login
* User logout
* JWT-based authentication
* Short-lived access token
* Refresh token stored in an HTTP-only cookie
* Refresh token hashing before storing in the database
* Refresh token rotation
* Automatic access token refresh using Axios interceptors
* Get currently authenticated user
* Protected routes
* Public routes
* Role-based route protection
* Access token stored in application memory instead of localStorage

### Buyer Features

* View all available products
* Product image carousel
* Product image navigation
* Product size selection
* Stock availability display
* Add-to-cart UI

> Cart persistence and complete order functionality are currently under development.

### Seller Features

* Seller dashboard
* View own products
* Create products
* Upload multiple product images
* Product title and description validation
* Product price and currency
* Add multiple sizes and stock
* Update own products
* Delete own products
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
* CORS

### Image Storage

* ImageKit

### Deployment

* Vercel

---

## 📁 Project Structure

```text
full/

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
│   └── vite.config.js
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

The application uses two JWT tokens.

### Access Token

* Used to authenticate API requests
* Sent through the `Authorization` header
* Expires after a short period
* Stored in application memory instead of localStorage

Example:

```text
Authorization: Bearer <access_token>
```

### Refresh Token

* Used to generate a new access token
* Stored in an HTTP-only cookie
* Hashed before being stored in MongoDB
* Rotated when a new access token is generated
* Used to maintain the authenticated session

The refresh cookie uses secure production settings for the deployed frontend and backend.

### Automatic Token Refresh

The frontend Axios instance uses interceptors.

When an API request receives a `401` response:

1. Frontend calls the refresh-token API.
2. Backend verifies the refresh token.
3. Backend checks the stored hashed refresh token.
4. Backend generates a new access token and refresh token.
5. Frontend updates the in-memory access token.
6. The failed request is retried with the new access token.

---

## 👥 Role-Based Authorization

The application supports two roles:

```text
user
seller
```

### User

A user can access buyer-related routes such as:

```text
/main/products
/main/cart
/main/orders
```

### Seller

A seller can access seller-related routes such as:

```text
/main/seller/dashboard
/main/seller/products
/main/seller/products/create
```

Backend APIs also verify the user's role before allowing seller-specific product operations.

Authorization is implemented at both levels:

* Frontend routes
* Backend APIs

---

## 🔗 API Endpoints

### Authentication APIs

| Method | Endpoint                  | Description               |
| ------ | ------------------------- | ------------------------- |
| POST   | `/api/auth/register`      | Register a new user       |
| POST   | `/api/auth/login`         | Login user                |
| POST   | `/api/auth/refresh-token` | Generate new access token |
| GET    | `/api/auth/me`            | Get authenticated user    |
| GET    | `/api/auth/logout`        | Logout user               |

### Product APIs

| Method | Endpoint                    | Access             | Description           |
| ------ | --------------------------- | ------------------ | --------------------- |
| POST   | `/api/products/`            | Seller             | Create product        |
| GET    | `/api/products/`            | Authenticated User | Get all products      |
| GET    | `/api/products/my-products` | Seller             | Get seller's products |
| PUT    | `/api/products/:id`         | Seller             | Update own product    |
| DELETE | `/api/products/:id`         | Seller             | Delete own product    |

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

Uploaded ImageKit URLs are stored in MongoDB with the product document.

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

Product creation and update validate:

* Title
* Description
* Price
* Currency
* Sizes
* Stock
* Allowed size values

Backend validation is handled using **express-validator**.

Frontend forms use **React Hook Form**.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

Move into the project:

```bash
cd full
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

The backend runs locally on:

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

For local development, the frontend uses the Vite proxy to communicate with the backend.

Start the frontend:

```bash
npm run dev
```

The Vite development server will provide the local frontend URL.

---

## 🔄 Frontend State Management

The project uses different tools depending on the type of data.

### Redux Toolkit

Redux Toolkit is used for **authentication state**.

Authentication state includes:

```text
user
accessToken
isAuthenticate
isLoading
error
```

Async authentication operations are handled using:

```text
createAsyncThunk
```

---

### TanStack React Query

TanStack React Query is used for **server-side product data**.

It handles:

* Fetching products
* Fetching seller's products
* Creating products
* Updating products
* Deleting products
* Cache invalidation
* Loading states
* Mutation states

After seller product mutations, the relevant product queries are invalidated so the latest data can be fetched.

---

## 🌐 Axios Configuration

A centralized Axios instance is used for API communication.

It handles:

* Base API configuration
* Cookies
* Authorization header
* Access token
* Automatic token refresh

The frontend uses an **in-memory access token** rather than storing the access token in localStorage.

For local development:

```env
VITE_API_URL=/api
```

The Vite development server proxies API requests to the local Express server.

For production:

```text
https://full-kohl.vercel.app/api
```

---

## 🛡️ Route Protection

The application has three route protection components:

### ProtectedRoute

Prevents unauthenticated users from accessing protected application routes.

### PublicRoute

Prevents authenticated users from accessing login/register pages.

### RoleBasedRoute

Checks the authenticated user's role before allowing access to role-specific routes.

Unauthorized users are redirected to:

```text
/unauthorized
```

---

## 🌍 Live Deployment

### Frontend

```text
https://client-black-three-24.vercel.app/
```

### Backend

```text
https://full-kohl.vercel.app/
```

The frontend communicates with the deployed Express backend using the production API URL.

The production configuration includes:

* CORS configuration
* Credential-based requests
* HTTP-only refresh cookie
* Secure production cookie
* Cross-site cookie configuration
* MongoDB Atlas
* ImageKit cloud storage

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
* User logout
* JWT authentication
* Access token and refresh token flow
* Refresh token rotation
* HTTP-only refresh cookie
* Protected routes
* Public routes
* Role-based authorization
* Seller product creation
* Seller product listing
* Product update
* Product deletion
* Seller-only product APIs
* Product image upload using ImageKit
* Product validation
* Buyer product listing
* Product image carousel
* Product size selection
* Stock availability
* React Query integration
* Redux Toolkit authentication state
* Axios interceptors
* Automatic access token refresh
* MongoDB Atlas integration
* Production deployment using Vercel

### In Progress

* Persistent cart functionality
* Complete order functionality
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
* Loading skeletons
* Additional responsive UI improvements

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
* TanStack React Query
* File uploads
* API integration
* Role-based application architecture
* Full-stack deployment
