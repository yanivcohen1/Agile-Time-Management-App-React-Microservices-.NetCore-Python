# React + FastAPI Full Stack Application

A modern full-stack web application built with React (Vite) for the frontend and FastAPI for the backend, using MongoDB as the database.

## 🏗 Architecture

- **Frontend**: React, TypeScript, Vite, Material UI
- **Backend**: Python, FastAPI, Motor (Async MongoDB), Beanie ODM
- **Database**: MongoDB

## 🚀 Getting Started

### Prerequisites

- Node.js & pnpm
- Python 3.10+
- MongoDB running locally (default: `mongodb://localhost:27017`)

### Installation

1. **Clone the repository**

2. **Backend Setup**
   Navigate to the `server` directory and set up your Python environment.
   ```bash
   cd server
   python -m venv venv
   # Activate venv
   # Windows: .\venv\Scripts\activate
   # Unix: source venv/bin/activate
   
   # Install dependencies
   # Note: Ensure you have the necessary packages installed (fastapi, uvicorn, motor, beanie, pydantic, pyyaml, pytest)
   # pip install -r requirements.txt # (If requirements.txt is present)
   ```

3. **Frontend Setup**
   Navigate to the `client` directory and install dependencies.
   ```bash
   cd client
   pnpm install
   ```

## 🛠 Development

The project is designed to be run primarily from the `client` directory using `pnpm` scripts that orchestrate both frontend and backend tasks.

### Start the Application

1. **Start the Backend Server**
   ```bash
   cd client
   pnpm server
   ```
   Runs on `http://localhost:5000`.

2. **Start the Frontend Development Server**
   ```bash
   cd client
   pnpm dev
   ```
   Runs on `http://localhost:5173`.

### Database Seeding

To populate the database with initial data:
```bash
cd client
pnpm seed
```

## 🧪 Testing

- **Frontend Unit Tests**: `pnpm test`
- **Frontend E2E Tests**: `pnpm test:e2e` (Cypress)
- **Backend Tests**: `pnpm test:py`

## 📁 Project Structure

```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── api/           # Axios setup & API calls
│   │   ├── components/    # React components
│   │   ├── context/       # Global state (Auth, Theme)
│   │   ├── pages/         # Route components
│   │   └── ...
│   └── ...
├── server/                 # Backend application
│   ├── app/
│   │   ├── routes/        # API endpoints
│   │   ├── models.py      # Beanie/Pydantic models
│   │   ├── database.py    # DB connection
│   │   └── main.py        # App entry point
│   ├── config.*.yaml      # Configuration files
│   └── ...
└── ...
```

## 📝 Configuration

- **Backend**: Configured via `server/config.dev.yaml` and `server/config.prod.yaml`.
- **Frontend**: Environment variables in `.env` (if applicable) and `vite.config.ts`.
