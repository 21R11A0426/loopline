# 🌐 Loopline – Full-Stack Language Exchange Platform  




![Loopline Screenshot](./loopline.png)

---

## 🗣️ What is Loopline?

**Loopline** is a full-stack **language exchange web application** designed to connect users for mutual language learning.  
It offers friend requests, real-time chat, typing indicators, and both **1-on-1 and group video calls** powered by **Stream**.  
Built using the **MERN stack**, Loopline provides a seamless, interactive, and secure communication platform.

🔗 **Live Demo:** https://loopline-8i48.onrender.com/

---

## ✨ Key Features

### 🔐 Authentication & Security
- JWT-based authentication  
- Secure cookies  
- Protected routes  
- Safe messaging access  

### 👥 Social Features
- Send & accept friend requests  
- View online/offline status  
- Partner search system  

### 💬 Real-Time Chat
- Stream Chat SDK  
- Typing indicators  
- Message history  
- Reactions & attachments  
- Read receipts  

### 🎥 Video Calling (1-on-1 & Group)
- Stream Video SDK  
- High-quality video + audio  
- Screen sharing  
- Mute/camera toggle  
- Group room support  

### ⚡ Performance & State
- React Query caching  
- Zustand global store  
- Optimistic UI updates  
- Fast, cached friend list updates  

### 🎨 UI/UX
- TailwindCSS + DaisyUI  
- Responsive design  
- Modern messaging layout  

---

## 🛠 Tech Stack

### **Frontend**
- React 19  
- Vite  
- TailwindCSS  
- DaisyUI  
- Axios  
- Zustand  
- React Router  
- Stream Chat React SDK  
- Stream Video React SDK  
- React Query  

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Auth  
- BcryptJS  
- Stream Chat Server SDK  
- Cookie-parser  
- CORS  

### **Root**
- Monorepo structure  
- Unified build commands  

---

## 📁 Project Structure

```
loopline/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── utils/
│   └── package.json
│
└── package.json
```

---

## 🔧 Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/21R11A0426/loopline.git
cd loopline
```

### **2️⃣ Install Dependencies**
```bash
npm run build
```

### **3️⃣ Configure Environment Variables**
Create a **`.env`** inside `/backend`:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_secret
STREAM_APP_ID=your_stream_app_id

CORS_ORIGIN=http://localhost:5173
```

### **4️⃣ Start Backend**
```bash
npm run start --prefix backend
```

### **5️⃣ Start Frontend**
```bash
npm run dev --prefix frontend
```

Visit: http://localhost:5173

---

## 🧪 API Overview

### **Auth**
| Method | Route | Description |
|--------|--------|-------------|
| POST | /api/auth/register | Register |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get logged‑in user |

### **Friends**
| Method | Route | Description |
|--------|--------|-------------|
| POST | /api/friends/request/:id | Send request |
| POST | /api/friends/accept/:id | Accept |
| GET | /api/friends | Get list |

### **Messages**
Handled fully by Stream Chat backend + token generation routes.

---

## 🚀 Deployment

Loopline uses:

- Render for backend  
- Frontend (Vercel/Render compatible)  
- MongoDB Atlas  
- Stream Cloud for chat & video  

**Production Build:**

```bash
npm run build
npm start   # backend production
```

---

## 👤 Author

**Vikas Maldanngari**  

🔗 GitHub: https://github.com/21R11A0426  
🔗 LinkedIn: https://www.linkedin.com/in/maldannagari-vikas/  
🔗 Portfolio: https://vikas-portfolio-teal.vercel.app/

---

