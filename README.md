# 📦 Inventora - MERN Stack Inventory & Order Management

Inventora is a full-stack inventory management and e-commerce platform built with the **MERN stack** (MongoDB, Express, React, Node.js) featuring:
- User & Admin roles
- Product management
- Orders & cart functionality
- Role-based protected routes
- CSV export & email notifications
- Responsive UI

---

## 🚀 Features

### 👤 **User**
- Register & login
- Browse products
- Search & filter products
- Add to cart, update quantity, remove items
- Place orders
- View order history
- Update profile details

### 🛠 **Admin**
- Manage products (Add/Edit/Delete)
- Manage orders (Update status)
- Manage users (View/Edit/Delete roles)
- View sales & inventory stats
- Export order reports to CSV
- Receive email notifications for orders

---

## 🛠 Tech Stack

- **Frontend:** React, Redux Toolkit, TailwindCSS, Axios
- **Backend:** Node.js, Express, Mongoose, JWT, Bcrypt
- **Database:** MongoDB (via Docker or MongoDB Atlas)
- **Email:** Nodemailer
- **File Handling:** Multer (optional for product images)
- **Charts:** Chart.js / Recharts (optional)

---

## ⚙️ Installation & Setup

### 1️⃣ **Clone the repository**
```bash
    git clone https://github.com/Darshana-Khedkar/Inventora.git
    cd inventora
```


### 2️⃣ Backend Setup
```bash
    cd backend
    npm install
```
Create .env in /backend
```bash 
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/inventora
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password_or_app_password
```
Initial Backend Data
- MongoDB seed script so anyone setting up the project can instantly create a default admin, a normal user, and products.
```bash
  cd backend
  node seed.js  
```

### 3️⃣ Frontend Setup
```bash
    cd ../frontend
    npm install
```

Create .env in /frontend
```bash
    REACT_APP_API_BASE_URL=http://localhost:5000/api
```
---

### 🐳 Running MongoDB in Docker Desktop
Ensure Docker Desktop is running.
```bash
    docker run --name inventora-mongo -d -p 27017:27017 mongo
```
This will:
- Pull the latest MongoDB image
- Run it in the background on port 27017
- You can manage it in Docker Desktop GUI

##### Additional Commands
```bash
    docker exec -it mongodb mongosh
    use inventoradb
    show collections
    db.users.find().pretty()
```

---

### ▶️ Running the App Locally
Start Backend
```bash
    cd backend
    node server.js
```
Start Frontend
```bash
    cd frontend
    npm start
```

---

### 📁 Folder Structure
```bash
    inventora/
    │
    ├── backend/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   ├── utils/
    │   ├── server.js
    │   └── .env
    │
    ├── frontend/
    │   ├── src/
    │   ├── public/
    │   └── .env
    │
    └── README.md
```

---

### 📤 Deployment
#### Backend (Render / Railway)
- Push code to GitHub
- Create new service on Render or Railway
- Add backend .env variables in the dashboard
- Deploy — note the public backend URL
#### Frontend (Vercel / Netlify)
- Push code to GitHub
- Create project on Vercel or Netlify
- Add frontend .env with REACT_APP_API_BASE_URL set to your deployed backend URL
- Deploy

---

### 🧪 Testing
- Manual Testing: Verify login, product CRUD, cart, orders, CSV export, email notifications.
- Protected Routes: Ensure admin pages can’t be accessed by normal users.
- API Validation: Ensure inputs are validated before saving.