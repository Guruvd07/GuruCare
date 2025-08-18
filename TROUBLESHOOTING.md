# Troubleshooting Guide

## Common Deployment Issues

### 1. Build Failures

#### Node.js Authentication Service
**Error:** `npm install failed`
**Solution:**
- Ensure `package.json` is in `auth-service/` folder
- Check Node.js version compatibility
- Verify all dependencies are listed correctly

#### Python Services (Disease/Precaution)
**Error:** `pip install failed`
**Solution:**
- Ensure `requirements.txt` is in service folder
- Check Python version compatibility (use Python 3.8+)
- Verify package names are correct

### 2. Runtime Errors

#### Authentication Service
**Error:** `Cannot find module 'express'`
**Solution:**
- Check that `npm install` completed successfully
- Verify `node_modules` folder was created
- Ensure `package.json` includes all dependencies

#### Streamlit Service
**Error:** `streamlit: command not found`
**Solution:**
- Add `streamlit==1.28.1` to `requirements.txt`
- Use correct start command: `streamlit run app.py --server.port=$PORT --server.address=0.0.0.0`

#### Flask Service
**Error:** `gunicorn: command not found`
**Solution:**
- Add `gunicorn==21.2.0` to `requirements.txt`
- Use correct start command: `gunicorn app:app`

### 3. CORS Issues

**Error:** `Access to fetch at '...' from origin '...' has been blocked by CORS policy`
**Solution:**
- Update `FRONTEND_URL` environment variable in backend services
- Ensure URL matches exactly (no trailing slash)
- Restart services after updating environment variables

### 4. Service Communication

**Error:** `Failed to fetch` or `Network error`
**Solution:**
- Check that all services are running (not sleeping)
- Verify service URLs are updated in frontend files
- Test individual service health endpoints

### 5. Login/Registration Issues

**Error:** `Invalid email or password` (when credentials are correct)
**Solution:**
- Check authentication service logs
- Verify `users.json` file exists and is writable
- Test `/api/register` endpoint directly

## Performance Issues

### Slow Initial Load
**Cause:** Render free tier services sleep after 15 minutes of inactivity
**Solution:**
- First request after sleep takes 30+ seconds (normal)
- Consider upgrading to paid plan for production
- Implement service warming if needed

### Database Performance
**Cause:** JSON file storage is not optimized for production
**Solution:**
- Consider upgrading to PostgreSQL for production
- Implement proper database indexing
- Add caching layer (Redis)

## Security Considerations

### Password Storage
- Passwords are hashed with bcrypt ✅
- Salt rounds set to 10 ✅

### HTTPS
- All Render services use HTTPS by default ✅
- No mixed content issues ✅

### CORS Configuration
- Properly configured for cross-origin requests ✅
- Restricted to specific frontend domain ✅

## Monitoring and Logs

### Accessing Logs
1. Go to Render Dashboard
2. Select your service
3. Click "Logs" tab
4. Monitor real-time logs for errors

### Health Check Endpoints
- Auth Service: `GET /health`
- Precaution Service: `GET /health`
- Disease Service: Visit root URL for Streamlit interface

## Getting Additional Help

### Render Support
- Check Render documentation: https://render.com/docs
- Contact Render support for platform-specific issues

### Application Issues
- Check service logs for detailed error messages
- Use browser developer tools for frontend debugging
- Test API endpoints with curl or Postman

### Community Support
- Stack Overflow for technical questions
- GitHub Issues for code-related problems
