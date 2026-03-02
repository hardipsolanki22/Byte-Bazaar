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


## Getting Started

Follow these steps to run the complete ByteBazaar application (backend + frontend) on your local machine.

1. **Clone the repository:**
    ```bash
    git clone https://github.com/hardipsolanki22/Byte-Bazaar.git
    cd Byte-Bazaar
    ```

2. **Install dependencies:**
    ```bash
    # Backend dependencies
    cd Backend && npm install

    # Frontend dependencies (open a new terminal or return to project root first)
    cd ../Frontend && npm install
    ```

3. **Configure environment variables:**
    Create a `.env` file inside the `Backend` directory with the following variables (copy `.env.sample` for reference):
    ```env
    PORT=8000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

    > ⚠️ The frontend does not require a `.env` file; all configuration is handled via `src/config/constants.ts`.

4. **Start the development servers:**
    ```bash
    # Backend (in one terminal)
    cd Backend && npm run dev

    # Frontend (in a second terminal)
    cd Frontend && npm run dev
    ```

    The backend listens on `http://localhost:8000` by default; the frontend is served by Vite (typically `http://localhost:5173`).

5. **Access the app:**
    - Open the frontend URL in your browser to begin using the ByteBazaar shopping platform.
    - Use Postman or similar to hit API endpoints prefixed with `/api` for backend testing.

### Project Structure

```
ByteBazaar/
├── Backend/                    # Node.js/Express API server
│   ├── .env                    # environment variables (ignored)
│   ├── .env.sample
│   ├── package.json
│   ├── public/                 # static uploads and resources
│   │   └── temp/.gitkeep
│   └── src/
│       ├── app.js
│       ├── index.js
│       ├── constant.js
│       ├── db/                # database configuration
│       │   └── index.js
│       ├── passport/          # passport strategies
│       │   └── index.js
│       ├── controllers/       # request handlers
│       │   ├── address.controller.js
│       │   ├── cart.controller.js
│       │   ├── category.controller.js
│       │   ├── coupon.controller.js
│       │   ├── healthcheck.controller.js
│       │   ├── hiroBanner.controller.js
│       │   ├── order.controller.js
│       │   ├── product.controller.js
│       │   ├── rating.controller.js
│       │   └── user.controller.js
│       ├── models/            # mongoose schemas
│       │   ├── address.model.js
│       │   ├── cart.model.js
│       │   ├── category.model.js
│       │   ├── coupon.model.js
│       │   ├── heroBanner.model.js
│       │   ├── order.model.js
│       │   ├── product.model.js
│       │   ├── rating.modle.js
│       │   └── user.model.js
│       ├── routes/            # express router definitions
│       │   ├── address.routes.js
│       │   ├── cart.routes.js
│       │   ├── category.routes.js
│       │   ├── coupon.routes.js
│       │   ├── healthcheck.routes.js
│       │   ├── heroBanner.routes.js
│       │   ├── order.routes.js
│       │   ├── product.routes.js
│       │   ├── rating.routes.js
│       │   └── user.routes.js
│       ├── middlewares/       # custom middleware functions
│       │   ├── auth.middleware.js
│       │   ├── error.middleware.js
│       │   ├── multer.middleware.js
│       │   └── passportFailed.middleware.js
│       ├── utils/             # helper utilities
│       │   ├── APIError.js
│       │   ├── APIResponse.js
│       │   ├── asyncHandler.js
│       │   ├── cloudinary.js
│       │   ├── helpers.js
│       │   ├── mail.js
│       │   └── slugGenerator.js
│       └── validators/        # validation logic
│           ├── validate.js
│           ├── address/
│           │   └── address.validators.js
│           ├── coupon/
│           │   └── coupon.validators.js
│           ├── order/
│           │   └── order.validators.js
│           ├── product/
│           │   └── product.validators.js
│           ├── rating/
│           │   └── rating.validators.js
│           └── user/
│               └── user.validators.js
└── Frontend/                   # React/TypeScript client (Vite)
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── public/                 # static public assets
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── index.css
        ├── App.css
        ├── lightswind.css
        ├── vite-env.d.ts
        ├── app/
        │   ├── hooks.ts
        │   └── store.ts
        ├── assets/
        │   ├── EmptyCart.tsx
        │   └── svg/
        ├── components/
        │   ├── lightswind.css
        │   ├── address/Address.tsx
        │   ├── admin/
        │   │   ├── CategoryForm.tsx
        │   │   ├── CouponForm.tsx
        │   │   ├── HeroBannerForm.tsx
        │   │   ├── ProductForm.tsx
        │   │   └── UpdatePaymentAndOrderStatus.tsx
        │   ├── auth/
        │   │   ├── ChangePassword.tsx
        │   │   ├── ForgotPassowrd.tsx
        │   │   ├── ForgotPasswordReq.tsx
        │   │   ├── Signin.tsx
        │   │   ├── Signup.tsx
        │   │   └── VerifyEmail.tsx
        │   ├── cart/Cart.tsx
        │   ├── checkout/
        │   │   ├── Address.tsx
        │   │   └── Payment.tsx
        │   ├── home/
        │   │   ├── Hero.tsx
        │   │   └── Products.tsx
        │   ├── hooks/
        │   │   ├── use-mobile.tsx
        │   │   └── use-toast.tsx
        │   ├── layout/
        │   │   ├── AuthLayout.tsx
        │   │   ├── Footer.tsx
        │   │   ├── Navbar.tsx
        │   │   ├── PageLayout.tsx
        │   │   └── admin/
        │   ├── lib/
        │   │   ├── utils.d.ts
        │   │   ├── utils.js
        │   │   └── utils.ts
        │   ├── lightswind/         # custom UI primitives
        │   │   ├── avatar.tsx
        │   │   ├── badge.tsx
        │   │   ├── button.tsx
        │   │   ├── checkbox.tsx
        │   │   ├── command.tsx
        │   │   ├── dialog.tsx
        │   │   ├── hamburger-menu-overlay.tsx
        │   │   ├── hover-card.tsx
        │   │   ├── input.tsx
        │   │   ├── label.tsx
        │   │   ├── popover.tsx
        │   │   ├── select.tsx
        │   │   ├── sidebar.tsx
        │   │   ├── table.tsx
        │   │   ├── tabs.tsx
        │   │   └── textarea.tsx
        │   ├── order/SingleOrder.tsx
        │   ├── products/Product.tsx
        │   ├── profile/Profile.tsx
        │   └── ui/                # smaller UI components
        │       ├── button.tsx
        │       ├── input.tsx
        │       ├── select.tsx
        │       ├── separator.tsx
        │       ├── sheet.tsx
        │       ├── sidebar.tsx
        │       ├── skeleton.tsx
        │       ├── sonner.tsx
        │       ├── spinner.tsx
        │       └── tooltip.tsx
        ├── config/
        │   ├── configAxios.ts
        │   └── constants.ts
        ├── features/           # Redux slices
        │   ├── address/addressSlice.ts
        │   ├── auth/...
        │   ├── cart/
        │   ├── category/
        │   ├── checkout/
        │   ├── coupon/
        │   ├── heroBanner/
        │   ├── order/
        │   ├── product/
        │   ├── rating/
        │   └── user/
        ├── helpers/
        │   └── calRatingPercentage.ts
        ├── hooks/
        │   ├── use-mobile.ts
        │   ├── use-mobile.tsx
        │   └── use-toast.tsx
        ├── lib/
        │   ├── utils.d.ts
        │   ├── utils.js
        │   └── utils.ts
        ├── pages/
        │   ├── Account.tsx
        │   ├── Cart.tsx
        │   ├── Index.tsx
        │   ├── Order.tsx
        │   ├── OrderFailed.tsx
        │   ├── OrderSuccess.tsx
        │   ├── Product.tsx
        │   ├── ProductsByCategory.tsx
        │   ├── Rating.tsx
        │   └── admin/
        └── types/                # TypeScript definitions
            ├── addressTypes.ts
            ├── authTypes.ts
            ├── cartTypes.ts
            ├── categoryTypes.ts
            ├── couponTypes.ts
            ├── heroBannerTypes.ts
            ├── orderTypes.ts
            ├── productTypes.ts
            ├── ratingType.ts
            └── userTypes.ts
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
