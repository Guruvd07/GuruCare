# Complete Render Deployment Guide for Medical Application

## Overview
Your medical application consists of 4 services that need to be deployed separately on Render:

1. **Authentication Service** (Node.js/Express)
2. **Disease Prediction Service** (Streamlit/Python)  
3. **Precaution Service** (Flask/Python)
4. **Frontend** (Static HTML/CSS/JS)

## Step-by-Step Deployment

### 1. Deploy Authentication Service

1. **Create Web Service on Render**
   - Service Name: `medical-auth-service`
   - Runtime: `Node`
   - Build Command: `cd auth-service && npm install`
   - Start Command: `cd auth-service && npm start`

2. **Environment Variables:**
   \`\`\`
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.onrender.com
   \`\`\`

3. **Note the deployed URL:** `https://medical-auth-service.onrender.com`

### 2. Deploy Disease Prediction Service

1. **Create Web Service on Render**
   - Service Name: `medical-disease-service`
   - Runtime: `Python`
   - Build Command: `cd disease-service && pip install -r requirements.txt`
   - Start Command: `cd disease-service && streamlit run app.py --server.port=$PORT --server.address=0.0.0.0`

2. **Environment Variables:**
   \`\`\`
   PRECAUTION_SERVICE_URL=https://medical-precaution-service.onrender.com
   \`\`\`

3. **Note the deployed URL:** `https://medical-disease-service.onrender.com`

### 3. Deploy Precaution Service

1. **Create Web Service on Render**
   - Service Name: `medical-precaution-service`
   - Runtime: `Python`
   - Build Command: `cd precaution-service && pip install -r requirements.txt`
   - Start Command: `cd precaution-service && gunicorn app:app`

2. **Environment Variables:**
   \`\`\`
   FLASK_ENV=production
   FRONTEND_URL=https://your-frontend-url.onrender.com
   \`\`\`

3. **Note the deployed URL:** `https://medical-precaution-service.onrender.com`

### 4. Deploy Frontend

1. **Create Static Site on Render**
   - Service Name: `medical-frontend`
   - Build Command: `echo "Static site - no build required"`
   - Publish Directory: `frontend`

2. **Note the deployed URL:** `https://medical-frontend.onrender.com`

## Post-Deployment Configuration

### Update Frontend URLs

After all services are deployed, update these files in your frontend:

#### 1. Update `frontend/login.html`
\`\`\`javascript
// Replace line 120
const API_BASE_URL = 'https://medical-auth-service.onrender.com';
\`\`\`

#### 2. Update `frontend/register.html`  
\`\`\`javascript
// Replace line 120
const API_BASE_URL = 'https://medical-auth-service.onrender.com';
\`\`\`

#### 3. Update `frontend/patient_dashboard.html`
\`\`\`javascript
// Replace line 400
function openDiseasePredictor() {
    const diseaseServiceUrl = 'https://medical-disease-service.onrender.com';
    window.open(diseaseServiceUrl, '_blank');
}
\`\`\`

### Update Backend CORS Settings

#### 1. Update Authentication Service Environment Variables
\`\`\`
FRONTEND_URL=https://medical-frontend.onrender.com
\`\`\`

#### 2. Update Disease Service Environment Variables  
\`\`\`
PRECAUTION_SERVICE_URL=https://medical-precaution-service.onrender.com
\`\`\`

#### 3. Update Precaution Service Environment Variables
\`\`\`
FRONTEND_URL=https://medical-frontend.onrender.com
\`\`\`

## Testing Your Deployment

### 1. Test Authentication Service
\`\`\`bash
curl https://medical-auth-service.onrender.com/health
# Should return: {"status":"OK","service":"Authentication Service"}
\`\`\`

### 2. Test Disease Prediction Service
- Visit: `https://medical-disease-service.onrender.com`
- Should show Streamlit interface

### 3. Test Precaution Service
\`\`\`bash
curl https://medical-precaution-service.onrender.com/health
# Should return: {"status":"OK","service":"Precaution Service"}
\`\`\`

### 4. Test Frontend
- Visit: `https://medical-frontend.onrender.com`
- Should show hospital homepage
- Test login/register functionality
- Test disease prediction from dashboard

## Important Notes

### Service Communication
- All services communicate via HTTPS URLs
- CORS is configured to allow cross-origin requests
- Environment variables handle service discovery

### Data Persistence
- User data is stored in JSON files (not recommended for production)
- Consider upgrading to a proper database for production use

### Performance
- Render free tier services may sleep after inactivity
- First request after sleep may take 30+ seconds
- Consider upgrading to paid plans for production

### Security
- All passwords are hashed with bcrypt
- HTTPS is enforced on all services
- CORS is properly configured

## Troubleshooting

### Common Issues

1. **Service Won't Start**
   - Check build logs in Render dashboard
   - Verify all dependencies are in requirements.txt/package.json
   - Check start command syntax

2. **CORS Errors**
   - Verify FRONTEND_URL environment variable is set correctly
   - Check that frontend URL matches exactly (no trailing slash)

3. **Service Communication Fails**
   - Verify all service URLs are updated in frontend
   - Check that services are running (not sleeping)
   - Test individual service health endpoints

4. **Login/Register Not Working**
   - Check authentication service logs
   - Verify API_BASE_URL in frontend files
   - Test authentication endpoints directly

### Getting Help
- Check Render service logs for detailed error messages
- Use browser developer tools to debug frontend issues
- Test API endpoints individually using curl or Postman

## Production Recommendations

1. **Database**: Replace JSON file storage with PostgreSQL or MongoDB
2. **Authentication**: Implement JWT tokens for better security
3. **Monitoring**: Add logging and monitoring services
4. **Caching**: Implement Redis for better performance
5. **CDN**: Use CDN for static assets
6. **SSL**: Ensure all communications use HTTPS
7. **Backup**: Implement regular data backups
