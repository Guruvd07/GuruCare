#!/bin/bash

# Medical Application Deployment Script
# This script helps you deploy all services to Render

echo "🏥 Medical Application Deployment Helper"
echo "========================================"

echo ""
echo "📋 Pre-deployment Checklist:"
echo "✓ GitHub repository created and pushed"
echo "✓ Render account created"
echo "✓ All service folders ready (auth-service, disease-service, precaution-service, frontend)"

echo ""
echo "🚀 Deployment Order:"
echo "1. Deploy Authentication Service first"
echo "2. Deploy Precaution Service second" 
echo "3. Deploy Disease Prediction Service third"
echo "4. Deploy Frontend last"

echo ""
echo "⚙️  Service Configuration:"

echo ""
echo "1️⃣  AUTHENTICATION SERVICE"
echo "   Service Name: medical-auth-service"
echo "   Runtime: Node"
echo "   Build Command: cd auth-service && npm install"
echo "   Start Command: cd auth-service && npm start"
echo "   Environment Variables:"
echo "     NODE_ENV=production"
echo "     FRONTEND_URL=https://medical-frontend.onrender.com"

echo ""
echo "2️⃣  PRECAUTION SERVICE"
echo "   Service Name: medical-precaution-service"
echo "   Runtime: Python"
echo "   Build Command: cd precaution-service && pip install -r requirements.txt"
echo "   Start Command: cd precaution-service && gunicorn app:app"
echo "   Environment Variables:"
echo "     FLASK_ENV=production"
echo "     FRONTEND_URL=https://medical-frontend.onrender.com"

echo ""
echo "3️⃣  DISEASE PREDICTION SERVICE"
echo "   Service Name: medical-disease-service"
echo "   Runtime: Python"
echo "   Build Command: cd disease-service && pip install -r requirements.txt"
echo "   Start Command: cd disease-service && streamlit run app.py --server.port=\$PORT --server.address=0.0.0.0"
echo "   Environment Variables:"
echo "     PRECAUTION_SERVICE_URL=https://medical-precaution-service.onrender.com"

echo ""
echo "4️⃣  FRONTEND"
echo "   Service Name: medical-frontend"
echo "   Type: Static Site"
echo "   Build Command: echo 'Static site - no build required'"
echo "   Publish Directory: frontend"

echo ""
echo "🔧 Post-Deployment Steps:"
echo "1. Update frontend URLs in login.html, register.html, patient_dashboard.html"
echo "2. Update backend environment variables with actual service URLs"
echo "3. Test all services individually"
echo "4. Test complete user flow"

echo ""
echo "✅ Testing URLs:"
echo "Frontend: https://medical-frontend.onrender.com"
echo "Auth API: https://medical-auth-service.onrender.com/health"
echo "Disease Prediction: https://medical-disease-service.onrender.com"
echo "Precaution API: https://medical-precaution-service.onrender.com/health"

echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_INSTRUCTIONS.md"
