# 🌍 Travel Agency Client

A modern, full-stack travel agency web application built with React Router, TypeScript, and TailwindCSS. This project delivers a seamless, interactive experience for travelers and admins, featuring robust authentication, real-time dashboards, and beautiful UI/UX.

---

## ✨ Features

- **User Authentication**: Secure sign up, sign in, and Google OAuth integration
- **Admin Dashboard**: Real-time stats, user management, and trip analytics
- **Trip Management**: Create, view, and explore curated trips by style and destination
- **Interactive Charts**: Visualize user growth and travel trends
- **Responsive Design**: Mobile-first, accessible, and pixel-perfect layouts
- **Modern Stack**: React Router, TypeScript, Vite, TailwindCSS, React Query, Firebase, MongoDB
- **Production Ready**: Dockerized, SSR, HMR, and optimized for deployment

---

## 🚀 Quick Start

### 1. Installation

```bash
npm install
```

### 2. Development

```bash
npm run dev
```
Visit: [http://localhost:5173](http://localhost:5173)

### 3. Production Build

```bash
npm run build
```

---

## 🛠️ Project Structure

```
├── app/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Route-based pages
│   ├── routes/             # Nested route logic
│   ├── signup.css          # Custom styles
│   └── ...
├── public/                 # Static assets
├── src/                    # Providers, hooks, and libraries
├── Dockerfile              # Docker configuration
├── package.json            # Project metadata
└── README.md               # This file
```

---

## 🌐 Deployment

### Docker

```bash
docker build -t travel-agency-client .
docker run -p 3000:3000 travel-agency-client
```

### Cloud Platforms
- AWS ECS / Fargate
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Railway, Fly.io, Vercel, Netlify

---

## 🔒 Environment Variables

Create a `.env` file for your secrets:

```
VITE_APIKEY=your_firebase_key
VITE_AUTHDOMAIN=your_auth_domain
VITE_PROJECTID=your_project_id
VITE_STORAGEBUCKET=your_bucket
VITE_MESSAGINGSENDERID=your_sender_id
VITE_APPID=your_app_id
```

---

## 🧑‍💻 Tech Stack
- **Frontend**: React, React Router, TypeScript, TailwindCSS, Vite
- **State/Data**: React Query, Context API
- **Auth**: Firebase Auth, Google OAuth
- **Backend**: MongoDB (API endpoints assumed)
- **CI/CD**: Docker, modern cloud platforms

---

## 📸 Screenshots

![Home Page](public/assets/images/hero-img.png)
![Dashboard](public/assets/images/readme.png)

---

## 🤝 Contributing

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

MIT

---

Built with passion by the Travel Agency Client team. Happy travels! 🌏
