# Digital Citizen - Government Digital Services & Welfare Schemes Platform

A premium, production-ready full-stack web application for creating awareness about government digital services and welfare schemes among Indian citizens.

## Features

### Frontend
- **Modern UI/UX** - Glassmorphism cards, soft gradients, smooth animations
- **Responsive Design** - Mobile-first approach, works on all devices
- **Interactive Pages** - Home, About, Services, Schemes, Quiz, Feedback, Login
- **Admin Dashboard** - Full CRUD operations for schemes, services, feedback, and users
- **Search & Filter** - Find services and schemes by category or keyword
- **Quiz Section** - Test your knowledge about digital services and welfare schemes
- **Animations** - Framer Motion powered smooth transitions

### Backend
- **RESTful API** - Well-structured endpoints for all operations
- **Authentication** - JWT-based auth with role-based access control
- **Database** - MongoDB with Mongoose ODM
- **Validation** - Input validation using express-validator
- **Security** - CORS, helmet-ready, error handling middleware
- **Seed Data** - Comprehensive sample data included

## Tech Stack

### Frontend
- React 19 + TypeScript + Vite
- Tailwind CSS + shadcn/ui components
- Framer Motion for animations
- Lucide React Icons
- React Router v7

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing
- express-validator for validation
- CORS enabled

## Project Structure

```
digital-citizen/
├── app/                    # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context (Auth)
│   │   ├── lib/            # API service, utilities
│   │   ├── pages/          # Page components
│   │   ├── App.tsx         # Main app with routing
│   │   └── main.tsx        # Entry point
│   ├── dist/               # Production build
│   └── package.json
├── server/                 # Backend Node.js Application
│   ├── config/             # Database configuration
│   ├── middleware/         # Auth, validation, error handling
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── server.js           # Entry point
│   ├── seed.js             # Database seeder
│   └── package.json
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone and Setup

```bash
# Navigate to project
cd digital-citizen
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file (update with your credentials)
cp .env.example .env

# Update MONGODB_URI with your MongoDB connection string
# Update JWT_SECRET with a secure random string

# Seed the database with sample data
node seed.js

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../app

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `GET /api/auth/users` - Get all users (admin)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Schemes
- `GET /api/schemes` - Get all schemes
- `GET /api/schemes/:id` - Get single scheme
- `POST /api/schemes` - Create scheme (admin)
- `PUT /api/schemes/:id` - Update scheme (admin)
- `DELETE /api/schemes/:id` - Delete scheme (admin)

### Quiz
- `GET /api/quiz` - Get quiz questions
- `POST /api/quiz/validate` - Validate answers
- `POST /api/quiz` - Create question (admin)
- `PUT /api/quiz/:id` - Update question (admin)
- `DELETE /api/quiz/:id` - Delete question (admin)

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback (admin)
- `PUT /api/feedback/:id` - Update feedback status (admin)
- `DELETE /api/feedback/:id` - Delete feedback (admin)

## Demo Credentials

### Admin User
- Email: `admin@digitalcitizen.gov.in`
- Password: `admin123`

### Regular User
- Email: `rahul@example.com`
- Password: `user123`

## Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your repository
3. Set root directory to `server/`
4. Add environment variables from `.env.example`
5. Deploy

### Frontend (Vercel)
1. Import your repository on Vercel
2. Set framework preset to Vite
3. Set root directory to `app/`
4. Add `VITE_API_URL` environment variable
5. Deploy

### Database (MongoDB Atlas)
1. Create a free cluster on MongoDB Atlas
2. Create a database user
3. Whitelist IP addresses (0.0.0.0/0 for all)
4. Copy connection string to `MONGODB_URI`

## Testing Checklist

### Frontend
- [ ] All pages load correctly
- [ ] Navigation works smoothly
- [ ] Search and filters work
- [ ] Quiz functionality works end-to-end
- [ ] Feedback form submits correctly
- [ ] Login and registration work
- [ ] Admin dashboard is accessible
- [ ] CRUD operations work in admin
- [ ] Responsive design on mobile

### Backend
- [ ] All API endpoints respond correctly
- [ ] Authentication middleware works
- [ ] Admin routes are protected
- [ ] Validation errors are handled
- [ ] Database connection is stable
- [ ] CORS is configured properly

## Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT tokens |
| JWT_EXPIRE | Token expiration time |
| NODE_ENV | Environment (development/production) |
| CORS_ORIGIN | Allowed frontend origin |

### Frontend (.env)
| Variable | Description |
|----------|-------------|
| VITE_API_URL | Backend API base URL |

## License

This project is built for educational purposes.

## Acknowledgments

- Government of India for the digital services and welfare schemes
- All citizens who inspire us to build for digital India
