# React Frontend Client

This is the frontend application for the Time Management App, built with React, TypeScript, and Vite.

## 🚀 Technologies

*   **Framework**: React 18 + TypeScript + Vite
*   **UI Libraries**: Material UI (MUI) v5 + PrimeReact v10
*   **State Management**: React Context API
*   **Routing**: React Router v6
*   **Testing**: Vitest (Unit), Cypress (E2E)
*   **HTTP Client**: Axios

## 🛠 Setup & Installation

### Prerequisites
*   Node.js (v18+)
*   pnpm (recommended) or npm/yarn

### Installation

`ash
cd client
pnpm install
`

## 🏃‍♂️ Running the App

### Development Server
Starts the development server at http://localhost:5173.

`ash
pnpm dev
`

### Production Build
Builds the application for production.

`ash
pnpm build
`

### Preview Production Build
Previews the built application.

`ash
pnpm preview
`

## 🧪 Testing

### Unit Tests
Runs unit tests using Vitest.

`ash
pnpm test
`

### E2E Tests
Runs end-to-end tests using Cypress.

`ash
pnpm test:e2e
`

## ⚙️ Configuration

The application uses environment variables for configuration.

*   .env.development: Used during development.
*   .env.production: Used during production build.

**Key Variables:**
*   VITE_API_URL: URL of the backend API.

## 📂 Project Structure

*   src/api: Axios setup and API calls.
*   src/components: Reusable UI components.
*   src/context: Global state (Auth, Theme).
*   src/pages: Application pages (Login, Dashboard, etc.).
*   src/theme.ts: MUI theme configuration.
