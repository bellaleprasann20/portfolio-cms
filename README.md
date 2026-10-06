# Full-Stack Portfolio CMS

A dynamic, production-ready portfolio website and Content Management System (CMS) built to showcase projects, experience, and skills. The project features a React/Vite frontend for visitors, a secure Admin dashboard for content updates, and a high-performance Python FastAPI backend.

## 🚀 Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, Lucide Icons
- **Admin Panel:** React.js, Vite, JWT Authentication
- **Backend:** Python, FastAPI, Uvicorn
- **Database:** MongoDB, Mongoose (Motor/PyMongo)
- **Deployment:** Vercel (Frontend/Admin), Render (Backend)

## 📁 Project Structure
- `/frontend` - The public-facing portfolio UI.
- `/admin` - The CMS dashboard for managing projects and experience.
- `/backend` - The FastAPI server and MongoDB connection logic.

## 🛠️ Local Setup Instructions

### 1. Backend Setup
\`\`\`bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
\`\`\`

### 2. Frontend Setup
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### 3. Admin Setup
\`\`\`bash
cd admin
npm install
npm run dev
\`\`\`

## 🌍 Environment Variables
Create a `.env` file in your `backend` folder:
\`\`\`env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
\`\`\`
Create a `.env` file in your `frontend` and `admin` folders:
\`\`\`env
VITE_API_BASE_URL=http://localhost:8000
\`\`\`