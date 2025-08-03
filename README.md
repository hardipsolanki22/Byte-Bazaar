# ByteBazaar - E-Commerce Platform

ByteBazaar is a modern e-commerce platform built with MERN stack (MongoDB, Express.js, React, Node.js) that offers a comprehensive shopping experience with features like secure payments, user authentication, and product management.

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

## Project Structure

```
ByteBazaar/
├── Backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── validators/     # Input validation
│   │   ├── utils/          # Helper functions
│   │   └── db/             # Database configuration
│   └── public/             # Static files
└── Frontend/
    ├── src/
    │   ├── assets/         # Static assets
    │   ├── components/     # React components
    │   └── pages/          # Application pages
    └── public/             # Public assets
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/hardipsolanki22/Byte-Bazaar.git
cd Byte-Bazaar
```

2. Install dependencies:
```bash
# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
```

3. Set up environment variables:
Create a .env file in the Backend directory with the following variables:
```env
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Run the application:
```bash
# Start backend server
cd Backend
npm run dev

# Start frontend development server
cd Frontend
npm run dev
```

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Author

Created by Hardip Solanki

---

Feel free to contact me for any queries or suggestions!
