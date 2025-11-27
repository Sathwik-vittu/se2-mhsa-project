# Mental Health Support Application

A comprehensive web application for mental health support featuring medication management, appointment scheduling, and community forum.

## 🌟 Features

- **User Authentication**: Secure sign-up and sign-in functionality
- **Dashboard**: Overview of medications, appointments, and quick actions
- **Medication Management**: Track medications with reminders and refill alerts
- **Appointment Scheduling**: Calendar for healthcare appointments with notifications
- **Community Forum**: Moderated peer support forum with categories
- **Health Profile**: Secure storage of personal and medical history

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

### Backend
- Flask (Python)
- SQLite database
- Flask-JWT-Extended for authentication
- Flask-Bcrypt for password hashing

## 📁 Project Structure

```
TICI01680008/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   └── mental_health.db    # SQLite database (auto-created)
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── api.js          # API service
│   │   ├── AuthContext.jsx # Auth state management
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🚀 Running Locally

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs on: http://localhost:5000

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

## 📱 Pages

1. **Login/Signup** - User authentication
2. **Dashboard** - Overview and quick actions
3. **Medications** - Add, edit, delete medications with reminders
4. **Appointments** - Schedule and manage healthcare appointments
5. **Forum** - Community support with moderated posts/replies
6. **Profile** - Health profile with medical/psychiatric history

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Content moderation for forum posts
- Encrypted sensitive data

## 🌐 Deployment Options

### Option 1: Render (Free Tier)

**Backend Deployment:**
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn app:app`
5. Add environment variables

**Frontend Deployment:**
1. Create a new Static Site on Render
2. Connect your repository
3. Set build command: `npm install && npm run build`
4. Set publish directory: `dist`
5. Update API URL in `api.js`

### Option 2: Vercel + Railway

**Frontend (Vercel):**
1. Import project from GitHub
2. Select frontend folder
3. Deploy

**Backend (Railway):**
1. Create new project
2. Add from GitHub
3. Select backend folder
4. Deploy

### Option 3: Local with ngrok

```bash
# Terminal 1 - Backend
cd backend && python app.py

# Terminal 2 - Frontend
cd frontend && npm run dev

# Terminal 3 - Expose with ngrok
ngrok http 5173
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Profile
- `PUT /api/profile` - Update user profile

### Medications
- `GET /api/medications` - List all medications
- `POST /api/medications` - Add medication
- `PUT /api/medications/:id` - Update medication
- `DELETE /api/medications/:id` - Delete medication

### Appointments
- `GET /api/appointments` - List all appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Forum
- `GET /api/forum/posts` - List all posts
- `GET /api/forum/posts/:id` - Get single post with replies
- `POST /api/forum/posts` - Create post
- `POST /api/forum/posts/:id/replies` - Add reply

## 📄 License

This project is for educational purposes only.

---

**Note**: This is a demonstration project and should not be used for production healthcare purposes without proper security audits and compliance with healthcare regulations (HIPAA, etc.).
