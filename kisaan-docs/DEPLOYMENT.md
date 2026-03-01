# KisaanKonnect - Deployment Instructions

## Repository Structure
Your structure is separated into two parts:
1. **kisaan-frontend**: A React app powered by Vite and `vite-plugin-pwa` for offline-first capabilities.
2. **kisaan-backend**: A Node.js + Express backend using SQLite for lightweight local storage.

---

## 🚀 Running Locally (for Hackathon Demo)

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd kisaan-backend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   > The backend will start on `http://localhost:5000`. SQLite database (`kisaan.db`) will auto-generate.

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd kisaan-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development engine:
   ```bash
   npm run dev
   ```
   > The frontend will be accessible typically at `http://localhost:5173`.

---

## 🌍 PWA Offline Mode Demo

To demonstrate the "Offline-First" capability during a hackathon:
1. Build the frontend for production:
   ```bash
   cd kisaan-frontend
   npm run build
   ```
2. Serve the built PWA using a local server (e.g., `serve`):
   ```bash
   npx serve dist
   ```
3. Open the app in Chrome, press `F12` to open DevTools.
4. Go to **Network** > Check **Offline**.
5. The application will continue to work! Data is persisted via Zustand with `localforage` (IndexedDB).

---

## ⛅ Cloud Deployment (Render / Vercel)

### Frontend (Vercel)
Vercel is the best place to host your Vite React app.
1. Link your GitHub repo to Vercel.
2. Select the `kisaan-frontend` directory.
3. Framework preset: `Vite`.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.

### Backend (Render or Railway)
For Node.js + SQLite, Railway is great because it allows persistent storage volumes easily (so your SQLite DB isn't wiped on restart).
1. Connect GitHub repo to Railway.
2. Select `kisaan-backend` folder.
3. Attach a Persistent Volume to `/data` and change your `db.js` path to point there.
4. Add environment variable `PORT=5000`.

## 🎉 Hackathon Tip
Don't worry about complete AI integration; the UI mocks the AI behavior correctly with a 2-second delay to show the judges the "feel" of analyzing leaves and processing voice chat. Focus on the Offline PWA aspect and the smooth UI experience. Good luck!
