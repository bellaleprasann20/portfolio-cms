---

### `docs/DEPLOYMENT.md`
```markdown
# Deployment Guide

This project uses a decoupled deployment strategy: **Vercel** for the React frontends and **Render** for the Python backend.

## 1. Backend (Render.com)
1. Create a new **Web Service** on Render connected to this repository.
2. Set the **Root Directory** to `backend`.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables:**
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random string for signing tokens.
   - `CORS_ORIGINS`: Add your Vercel frontend and admin URLs once generated (comma-separated).

## 2. Frontend (Vercel.com)
1. Create a new project on Vercel connected to this repository.
2. Set the **Root Directory** to `frontend`.
3. Framework Preset: **Vite**.
4. **Environment Variables:**
   - `VITE_API_BASE_URL`: The live URL provided by Render (e.g., `https://my-backend.onrender.com`).
5. Deploy.

## 3. Admin CMS (Vercel.com)
1. Create *another* new project on Vercel using the exact same repository.
2. Set the **Root Directory** to `admin`.
3. Framework Preset: **Vite**.
4. **Environment Variables:**
   - `VITE_API_BASE_URL`: The live URL provided by Render.
5. Deploy.

*Note: After deploying the frontends, remember to update the `CORS_ORIGINS` in your Render backend settings so the API accepts requests from your new Vercel domains.*