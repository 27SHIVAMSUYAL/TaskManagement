const API_URL = "http://localhost:5000/api"; // Change if backend URL differs

export const registerUser = async (userData) => {
    console.log("Registering user:", userData);
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    const data = await res.json();
    console.log("Register Response:", data);
    return data;
};

export const loginUser = async (credentials) => {
    console.log("Logging in with:", credentials);
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    const data = await res.json();
    console.log("Login Response:", data);
    return data;
};

export const fetchProfile = async (token) => {
    console.log("Fetching profile...");
    const res = await fetch(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log("Profile Data:", data);
    return data;
};

export const fetchTasks = async (token) => {
    console.log("Fetching tasks...");
    const res = await fetch(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log("Tasks:", data);
    return data;
};

export const addTask = async (taskData, token) => {
    console.log("Adding task:", taskData);
    const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(taskData),
    });
    const data = await res.json();
    console.log("Task Added Response:", data);
    return data;
};
