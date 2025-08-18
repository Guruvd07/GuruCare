# Frontend Deployment

This frontend is configured for static site deployment on Render.

## Service URLs to Update

Before deploying, update these URLs in the respective files:

### login.html & register.html
- Replace `https://your-auth-service.onrender.com` with actual auth service URL

### patient_dashboard.html  
- Replace `https://your-disease-service.onrender.com` with actual disease service URL

## Deployment Steps

1. Create Static Site on Render
2. Connect GitHub repository
3. Set publish directory: `frontend`
4. Deploy and get the frontend URL
5. Update CORS settings in backend services with the frontend URL
