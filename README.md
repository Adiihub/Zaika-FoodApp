# 🍽️ ZaikaBite - Full Stack Food Ordering App

## 🚀 Overview
FoodEase is a full-stack food ordering web application that allows users to browse menus, add items to their cart, place orders using **Stripe payment gateway**, and track order status in real-time. The platform includes a **frontend website**, **admin panel**, and **backend server**, making it a complete solution for online food ordering.

## 🛠️ Tech Stack
- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Payment Integration:** Stripe
- **Hosting:** (Add Hosting Details - e.g., Vercel, Heroku, Render)

## 🔗 Live Demo
- **Frontend:** [Live App](#)  
- **Admin Panel:** [Admin Dashboard](#)  
- **Backend API:** [API Docs](#) (if available)

## 🎯 Features
✅ User Authentication (Signup/Login)  
✅ Browse Food Items & Add to Cart  
✅ Secure Online Payments via Stripe  
✅ Real-Time Order Status Updates  
✅ Admin Panel for Managing Orders & Food Items  

## ⚡ Installation & Setup
Clone the repository:
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 📌 Backend Setup
1. Navigate to the `backend` folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Set up environment variables in a `.env` file:
   ```plaintext
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

### 📌 Frontend Setup
1. Navigate to the `frontend` folder and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Set up environment variables in a `.env` file:
   ```plaintext
   REACT_APP_API_URL=http://localhost:5000
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```

## 🤝 Contributing
Feel free to fork this repository, open issues, and submit pull requests to improve the project!

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
