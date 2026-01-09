# Medical Store User Panel - Frontend

A modern React.js user-facing application for the Medical Store with shopping cart, order management, and medicine browsing.

## Features

- **User Authentication**: Register and login functionality
- **Medicine Browsing**: Search and browse available medicines
- **Shopping Cart**: Add, update, and remove items from cart
- **Order Management**: Place orders and track order history
- **Medicine Reviews**: View and add reviews for medicines
- **Responsive Design**: Mobile-first responsive design
- **Real-time Updates**: Live cart and inventory updates

## Tech Stack

- **Frontend**: React.js 18
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to user-panel directory**
   ```bash
   cd user-panel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Update `.env` file if needed:
   ```env
   REACT_APP_API_URL=https://medical-store-admin-server.onrender.com/api
   PORT=3001
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
user-panel/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── styles/          # Global CSS
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   ├── auth/            # Auth components
│   │   ├── medicines/       # Medicine components
│   │   ├── cart/            # Cart components
│   │   └── orders/          # Order components
│   ├── pages/
│   │   ├── auth/            # Login/Register pages
│   │   ├── home/            # Home page
│   │   ├── medicines/       # Medicine browsing
│   │   ├── cart/            # Shopping cart
│   │   ├── orders/          # Order management
│   │   └── profile/         # User profile
│   ├── store/
│   │   ├── slices/          # Redux slices
│   │   └── index.js         # Store configuration
│   ├── services/            # API services
│   ├── utils/               # Helper functions
│   ├── routes/              # Route configuration
│   ├── App.jsx              # Main app component
│   └── index.js             # Entry point
├── .env                     # Environment variables
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Start development server (runs on port 3001)
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Key Features

### User Authentication
- User registration with validation
- Login with email/password
- JWT token management
- Auto-logout on token expiry

### Medicine Browsing
- Browse all available medicines
- Search functionality
- Medicine details with reviews
- Add to cart functionality

### Shopping Cart
- Add/remove items from cart
- Update quantities
- Real-time total calculation
- Persistent cart (logged-in users)

### Order Management
- Place orders with delivery address
- View order history
- Track order status
- Order details view

### Reviews System
- View medicine reviews and ratings
- Add reviews for purchased medicines
- Average rating display

## API Integration

The user panel integrates with the following backend APIs:

### User Authentication
- `POST /api/user/auth/register` - User registration
- `POST /api/user/auth/login` - User login
- `GET /api/user/auth/profile` - Get user profile

### Medicines
- `GET /api/public/medicines` - Get all medicines
- `GET /api/public/medicines/:id` - Get medicine details

### Cart Management
- `GET /api/user/cart` - Get user cart
- `POST /api/user/cart/add` - Add item to cart
- `PUT /api/user/cart/update` - Update cart item
- `DELETE /api/user/cart/remove/:id` - Remove from cart

### Orders
- `POST /api/user/orders` - Create order
- `GET /api/user/orders` - Get user orders
- `GET /api/user/orders/:id` - Get order details

### Reviews
- `POST /api/reviews/medicine/:id` - Add review
- `GET /api/reviews/medicine/:id` - Get medicine reviews

## Running Both Applications

To run both admin and user panels:

1. **Start Backend** (Terminal 1):
   ```bash
   cd server
   npm run dev
   ```

2. **Start Admin Panel** (Terminal 2):
   ```bash
   cd client
   npm start
   ```

3. **Start User Panel** (Terminal 3):
   ```bash
   cd user-panel
   npm start
   ```

- Backend: http://localhost:5000
- Admin Panel: http://localhost:3000
- User Panel: http://localhost:3001

## Deployment

The user panel can be deployed on:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

Make sure to:
1. Update `REACT_APP_API_URL` for production
2. Build the project with `npm run build`
3. Deploy the `build` folder

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request