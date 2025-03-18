import React, { useState, useEffect } from "react";
import api from "../utils/api";

const Dashboard = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks");
            setTasks(res.data.tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        await api.post("/tasks", { title, description });
        setTitle("");
        setDescription("");
        fetchTasks();
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-4">Dashboard</h2>
            
            <form onSubmit={addTask} className="space-y-4 bg-gray-100 p-6 rounded-md shadow-md">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded-md" />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded-md"></textarea>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Add Task</button>
            </form>

            <h3 className="text-2xl mt-6">My Tasks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {tasks.map(task => (
                    <div key={task._id} className="p-4 bg-white shadow rounded-md">
                        <h4 className="font-bold">{task.title}</h4>
                        <p>{task.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
