# ByteBazaar - E-Commerce Platform

ByteBazaar is a modern e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js) that offers a comprehensive shopping experience with secure payments, user authentication, and complete product management.

🌐 **Live Demo:** [https://byte-bazaar-frontend.vercel.app/](https://byte-bazaar-frontend.vercel.app/)

---

## Features

- 🛍️ **Product Management**
  - Browse products by categories
  - Product search and filtering
  - Product ratings and reviews
  - Product image management with Cloudinary

- 🛒 **Shopping Cart**
  - Add/remove items
  - Adjust quantities
  - Apply discount coupons
  - Cart total calculation

- 💳 **Payment Integration**
  - Secure payments via Stripe
  - Cash on Delivery option
  - Order tracking
  - Payment status monitoring

- 👤 **User Management**
  - User registration and authentication
  - Social login (Google, Facebook)
  - JWT-based authorization
  - User profile management
  - Address management

- 📱 **Admin Dashboard**
  - Product management
  - Order management
  - User management
  - Coupon management
  - Hero banner management

---

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- Authentication: JWT, Passport.js
- File Upload: Multer
- Image Storage: Cloudinary
- Email Service: Nodemailer with Mailgen
- Input Validation: Express Validator
- Payment Processing: Stripe

### Frontend
- React with TypeScript
- Vite as build tool
- Modern ES6+ JavaScript
- Tailwind CSS Responsive Design

---

## Getting Started

Follow these steps to run ByteBazaar locally (backend + frontend).

1. **Clone the repository:**
    ```bash
    git clone https://github.com/hardipsolanki22/Byte-Bazaar.git
    cd Byte-Bazaar
    ```

2. **Install dependencies:**
    ```bash
    # Backend dependencies
    cd Backend && npm install

    # Frontend dependencies
    cd ../Frontend && npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file inside the `Backend` directory (copy `.env.sample` for reference):
    ```env
    PORT=8000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

    > ⚠️ The frontend does not require a `.env` file — all configuration is handled via `src/config/constants.ts`.

4. **Start the development servers:**
    ```bash
    # Backend (in one terminal)
    cd Backend && npm run dev

    # Frontend (in a second terminal)
    cd Frontend && npm run dev
    ```

    The backend listens on `http://localhost:8000` by default; the frontend is served by Vite at `http://localhost:5173`.

5. **Access the app:**
    - Open the frontend URL in your browser to start using ByteBazaar.
    - Use Postman or similar tools to test API endpoints prefixed with `/api`.

---

## API Documentation

The API includes endpoints for:
- User authentication and management
- Product operations
- Cart management
- Order processing
- Payment handling
- Category management
- Coupon management
- Rating and review system

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a Pull Request.

---

## License

This project is licensed under the ISC License.

---

## Author

Created by **Hardip Solanki**

Feel free to contact me for any queries or suggestions!