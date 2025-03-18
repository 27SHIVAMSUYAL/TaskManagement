
# **Task Management Application** 🚀  

A **Task Management Application** built with **MERN Stack (MongoDB, Express.js, React, Node.js)**. It supports user authentication, task creation, editing, deletion, and task priority management. The project also uses **Redis** for caching and **JWT (JSON Web Token)** for authentication.

---

## **Features** ✨  

✅ **User Authentication** (JWT-based)  
✅ **Task Management** (Create, Edit, Delete, Mark as Complete)  
✅ **Priority Levels** (Low, Medium, High)  
✅ **Deadline Support** for tasks  
✅ **Secure API Routes** with authentication  
✅ **Redis Caching** for improved performance  
✅ **Real-time Updates**  
✅ **Role-Based Access Control**  

---

## **Tech Stack** 🛠️  

**Frontend:**  
- React.js  
- TypeScript  
- React Context API  
- React Router  
- Toastify for notifications  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB with Mongoose  
- JWT for authentication  
- Redis for caching  

---

## **Installation & Setup** ⚡  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### **2️⃣ Set Up the Backend**  
```sh
cd backend
npm install
```
#### **Configure Environment Variables:**  
Create a `.env` file in the `backend` folder with the following values:  
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
```
#### **Run the Backend Server:**  
```sh
npm run dev
```
Your backend should now be running on **http://localhost:5000** 🚀  

---

### **3️⃣ Set Up the Frontend**  
```sh
cd ../frontend
npm install
```
#### **Run the Frontend:**  
```sh
npm start
```
The frontend should now be running on **http://localhost:3000** 🌐  

---

## **API Endpoints** 🔗  

### **🔐 Authentication**  
- `POST /api/auth/register` → Register a new user  
- `POST /api/auth/login` → Login & receive JWT  

### **📝 Tasks**  
- `POST /api/task/add` → Add a new task  
- `GET /api/task/get-all` → Get all tasks (cached with Redis)  
- `PUT /api/task/edit/:id` → Edit a task  
- `DELETE /api/task/delete/:id` → Delete a task  

---

## **How Redis is Used** 🏎️  
Redis is implemented for caching frequently accessed data, such as **tasks**. When a user requests all tasks, Redis checks if they are cached. If yes, it serves them instantly, reducing database load.  

---

## **How JWT Authentication Works** 🔐  
- When a user logs in, a **JWT token** is issued.  
- This token must be sent in the `Authorization` header for protected API requests.  
- The backend verifies the token before granting access.  

---

## **Contributing** 🤝  
Feel free to fork this repository, raise issues, or submit pull requests!  

---

## **License** 📜  
This project is open-source and available under the **MIT License**.  

