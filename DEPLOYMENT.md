# Deployment Guide

## Frontend Deployment (Vercel)

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set framework preset to **Vite**
   - Set root directory to `app/`
   - Add environment variable: `VITE_API_URL=https://your-backend-url/api`
   - Click Deploy

## Backend Deployment (Render)

1. **Push code to GitHub**
   - Ensure your server code is in the repository

2. **Create Web Service on Render**
   - Go to [render.com](https://render.com)
   - Create New Web Service
   - Connect your GitHub repository
   - Set root directory to `server/`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables from `.env.example`
   - Click Create Web Service

## Database Setup (MongoDB Atlas)

1. **Create Cluster**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create a free M0 cluster
   - Create a database user with password
   - Whitelist IP: `0.0.0.0/0` (for all IPs)

2. **Get Connection String**
   - Click Connect > Drivers > Node.js
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Add to Render environment variables as `MONGODB_URI`

## Environment Variables

### Frontend (Vercel)
| Variable | Example Value |
|----------|--------------|
| VITE_API_URL | `https://your-backend.onrender.com/api` |

### Backend (Render)
| Variable | Example Value |
|----------|--------------|
| PORT | `5000` |
| MONGODB_URI | `mongodb+srv://user:pass@cluster.mongodb.net/digital-citizen` |
| JWT_SECRET | `your-secret-key-here` |
| JWT_EXPIRE | `30d` |
| NODE_ENV | `production` |
| CORS_ORIGIN | `https://your-frontend.vercel.app` |

## Post-Deployment

1. **Seed the Database**
   ```bash
   # Connect to your Render service via SSH
   # Or run locally pointing to production DB
   cd server
   MONGODB_URI=your-production-uri node seed.js
   ```

2. **Verify Deployment**
   - Visit your frontend URL
   - Test all features
   - Check browser console for errors
   - Verify API calls are successful

## Troubleshooting

### CORS Issues
- Ensure `CORS_ORIGIN` matches your frontend URL exactly
- Include `https://` prefix

### Database Connection
- Verify MongoDB Atlas IP whitelist
- Check database user credentials
- Ensure network access is allowed

### API Not Responding
- Check Render service logs
- Verify environment variables are set
- Ensure MongoDB connection is successful

## Testing Checklist

- [ ] Homepage loads with animations
- [ ] Services page displays and filters correctly
- [ ] Schemes page displays and filters correctly
- [ ] Service details page works
- [ ] Scheme details page works
- [ ] Quiz works end-to-end
- [ ] Feedback form submits
- [ ] Login and registration work
- [ ] Admin dashboard is accessible
- [ ] CRUD operations work in admin
- [ ] Mobile responsive design works
