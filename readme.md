# Real time chat app

This is the frontend of a real-time chat application built using React, Vite, WebSocket, and Tailwind CSS.

It connects to a backend WebSocket server and renders a responsive, real-time messaging interface.
Currently, two official plugins are available:

# 🛠 Tech Stack
## React (UI library)

- Vite (Build tool for lightning-fast dev experience)

- Tailwind CSS (Utility-first CSS framework)

- WebSocket (ws:// via native browser support)

- Environment Config via .env


# 🚀 Getting Started
## Prerequisites
- Node.js (v18+ recommended)

- Backend running on localhost:3000 or hosted elsewhere


# Setup
```
cd frontend
npm install

```

# Environment Variables
## Create a .env file in the frontend/ directory:

```
VITE_WS_URL=ws://localhost:3000
VITE_API_URL=http://localhost:3000/api
```

✅ All env variables in Vite must begin with VITE_ to be exposed to the client.

# Run in Development
```npm run dev```

Open http://localhost:5173 in your browser to start chatting.

# 📁 Project Structure

```
frontend/
├── components/
│   └── Chat.jsx       # Main chat UI and WebSocket logic
├── App.jsx            # App entry with join form
├── main.jsx           # Vite bootstrap
├── index.css          # Tailwind config
├── .env               # WS & API URL configuration
└── ...                # other files and folders
```

# ✨ Features
- 🔄 Real-time WebSocket chat

- 👥 System messages when users join

- 💬 Message timestamps

- ✅ Join with a username

- 🌗 Responsive UI with Tailwind CSS


# 📦 Build for Production
```npm run build```

# To preview the production build locally:
```npm run preview```


# 🌍 Deployment
Deploy the frontend using platforms like Vercel, Netlify, or Surge.

Make sure to:

- Update VITE_WS_URL and VITE_API_URL in .env with your production backend URLs.

- Rebuild the project before deploying.


# 🔧 Expanding ESLint Rules (Optional)
This setup includes basic linting. For more robust development, consider:

- Adding TypeScript: npm create vite@latest my-app --template react-ts

- Integrating typescript-eslint and enabling type-aware rules

- Using Prettier for consistent formatting

## More info:

- Vite React Template

- Tailwind Docs
