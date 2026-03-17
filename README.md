# THE OUTRAGE - Premium Export Leftover Fashion Store

A full-stack e-commerce application built with Next.js 14, Node.js, Express, and MongoDB.

## Features

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, Framer Motion, Three.js (React Three Fiber)
- **Backend**: Node.js, Express, MongoDB with Mongoose
- **Authentication**: JWT with bcrypt password hashing
- **Admin Panel**: Complete dashboard with stats, product/order/user management
- **Payment**: Support for JazzCash, EasyPaisa, Bank Transfer, and Cash on Delivery
- **Cart System**: Context API with localStorage persistence
- **Image Upload**: Cloudinary integration
- **Responsive Design**: Mobile-first approach with premium UI

## Project Structure

```
/frontend          - Next.js 14 frontend
/backend           - Node.js/Express backend
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with your API URL
npm run dev
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `CLOUDINARY_*` - Cloudinary credentials
- `JAZZCASH_*` - JazzCash API credentials
- `EASYPAISA_*` - EasyPaisa API credentials

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Backend API URL

## Admin Access
To create an admin user, promote a user through the admin panel or directly modify the user role in the database.

## Deployment
Both frontend and backend are ready for deployment to platforms like Vercel, Netlify, Railway, or Render.