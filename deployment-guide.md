# Medical Application Deployment Guide

## Render Deployment Steps

### 1. Authentication Service
1. Create new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `cd auth-service && npm install`
4. Set start command: `cd auth-service && npm start`
5. Set environment variables:
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-frontend-url.com`

### 2. Disease Prediction Service (Streamlit)
1. Create new Web Service on Render
2. Set build command: `cd disease-service && pip install -r requirements.txt`
3. Set start command: `cd disease-service && streamlit run app.py --server.port=$PORT --server.address=0.0.0.0`
4. Set environment variables:
   - `PRECAUTION_SERVICE_URL=https://your-precaution-service.onrender.com`

### 3. Precaution Service (Flask)
1. Create new Web Service on Render
2. Set build command: `cd precaution-service && pip install -r requirements.txt`
3. Set start command: `cd precaution-service && gunicorn app:app`
4. Set environment variables:
   - `FLASK_ENV=production`
   - `FRONTEND_URL=https://your-frontend-url.com`

### 4. Frontend (Static Site)
1. Create new Static Site on Render
2. Set build command: `echo "No build required"`
3. Set publish directory: `frontend`
4. Update all service URLs in HTML files

## Service URLs Configuration
After deployment, update these URLs in your frontend:
- Authentication: `https://your-auth-service.onrender.com`
- Disease Prediction: `https://your-disease-service.onrender.com`
- Precaution: `https://your-precaution-service.onrender.com`

## Important Notes
- All services will have different URLs on Render
- Update CORS settings with actual frontend URL
- Test each service individually before integration
- Monitor logs for any deployment issues
