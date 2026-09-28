CRUD Application

A full-stack CRUD application with user authentication and product management.

Features

Authentication

 Register
 Login
 Logout
 Access token & refresh token
 Get current user
 Protected routes
 Password hashing
 Form validation

 Products

 Create product
 Get all products
 Get single product
 Update product
 Delete product
 Get user's products
 Product validation
 Multiple product images
 Different price and stock for each size

Tech Stack

 Frontend

 React
 Redux Toolkit
 React Router
 React Hook Form
 Axios
Tailwind CSS

Backend

 Node.js
 Express.js
 MongoDB
 Mongoose
 JWT
 bcrypt
 Express Validator
 Multer
 ImageKit

 API Routes

Authentication

| Method | Route                | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Register a new user  |
| POST   | `/api/auth/login`    | Login user           |
| POST   | `/api/auth/refresh`  | Refresh access token |
| GET    | `/api/auth/me`       | Get current user     |
| POST   | `/api/auth/logout`   | Logout user          |

 Products

| Method | Route                           | Description          |
| ------ | ------------------------------- | -------------------- |
| POST   | `/api/product/create`           | Create a product     |
| GET    | `/api/product`                  | Get all products     |
| GET    | `/api/product/:id`              | Get a single product |
| PUT    | `/api/product/:id`              | Update a product     |
| DELETE | `/api/product/:id`              | Delete a product     |
| GET    | `/api/product/user/userProduct` | Get user's products  |

 
 Project Structure


crud/
├── README.md
├── frontend/
└── server/
    ├── config/
    ├── controller/
    ├── middleware/
    ├── model/
    ├── router/
    ├── validation/
    └── server.js


## Environment Variables

Create a `.env` file inside the `server` folder:

env
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

Run Locally

Backend

cd server
npm install
npm run dev


 Frontend

cd frontend
npm install
npm run dev


Live Project

Frontend:
https://curd-frontend-ten.vercel.app/

Backend:
https://crud-backend-roan.vercel.app/

GitHub

https://github.com/Muhammad-Hasnain-7860/crud
