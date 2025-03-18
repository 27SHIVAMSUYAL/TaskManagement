import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [deadline, setDeadline] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filterPriority, setFilterPriority] = useState("all");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetch("http://localhost:5000/api/auth/profile", {
            headers: { "Authorization": `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Unauthorized") {
                    localStorage.removeItem("token");
                    navigate("/login");
                } else {
                    setUser(data.user);
                    fetchTasks();
                }
            })
            .catch(err => setError(err.message));
    }, [navigate]);

    const fetchTasks = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch("http://localhost:5000/api/tasks/getall", {
                headers: { "Authorization": `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) {
                const sortedTasks = data.tasks.sort((a, b) => {
                    const priorityOrder = { high: 1, medium: 2, low: 3 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                });
                setTasks(sortedTasks);
                setFilteredTasks(sortedTasks);
            } else throw new Error(data.message);
        } catch (err) {
            console.error("Failed to fetch tasks:", err);
        }
    };

    const handleTaskSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("No token found. Please log in again.");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/tasks/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description, priority, deadline }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            alert("Task added successfully!");
            setTitle(""); setDescription(""); setPriority("medium"); setDeadline("");
            fetchTasks();
        } catch (err) {
            console.error("Error adding task:", err.message);
            alert(`Error: ${err.message}`);
        }
    };

    const handlePriorityFilter = (priority) => {
        setFilterPriority(priority);
        if (priority === "all") {
            setFilteredTasks(tasks);
        } else {
            const filtered = tasks.filter(task => task.priority === priority);
            setFilteredTasks(filtered);
        }
    };

    const handleSortByDeadline = () => {
        const sortedTasks = [...filteredTasks].sort((a, b) => {
            return new Date(a.deadline) - new Date(b.deadline);
        });
        setFilteredTasks(sortedTasks);
    };

    const handleMarkAsComplete = async (taskId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch(`http://localhost:5000/api/tasks/complete/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            // Modify the title by appending " - Done" and mark as completed
            const updatedTasks = tasks.map((task) =>
                task._id === taskId ? { ...task, title: task.title + " - Done", completed: true } : task
            );
            setTasks(updatedTasks);
            setFilteredTasks(updatedTasks);

            alert("Task marked as complete!");
        } catch (err) {
            console.error("Error marking task as complete:", err.message);
        }
    };

    const handleDeleteTask = async (taskId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            alert("Task deleted successfully!");
            fetchTasks();
        } catch (err) {
            console.error("Error deleting task:", err.message);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Sidebar (Task Form) */}
            <div className="w-1/4 bg-gray-800 text-white p-6 min-h-screen">
                <h2 className="text-2xl font-bold mb-4">Add Task</h2>
                <form onSubmit={handleTaskSubmit} className="space-y-4">
                    <input type="text" placeholder="Task Title"
                        className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={title} onChange={(e) => setTitle(e.target.value)} required />

                    <textarea placeholder="Task Description"
                        className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={description} onChange={(e) => setDescription(e.target.value)} required />

                    <select className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>

                    <input type="date"
                        className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={deadline} onChange={(e) => setDeadline(e.target.value)} />

                    <button type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Add Task
                    </button>
                </form>
            </div>

            {/* Right Side (Task List) */}
            <div className="w-3/4 p-6">
                <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
                {error && <p className="text-red-500">{error}</p>}

                {user && (
                    <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                )}

                {/* Priority Filter */}
                <div className="mb-4 flex items-center">
                    <label className="text-black mr-2 ">Filter by Priority: </label>
                    <select className="p-2 ml-5 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={filterPriority} onChange={(e) => handlePriorityFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                {/* Sort by Deadline Button */}
                <div className="mb-4 flex justify-start">
                    <button onClick={handleSortByDeadline}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Sort by Deadline
                    </button>
                </div>

                {/* Task Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTasks.length === 0 ? (
                        <p>No tasks available.</p>
                    ) : (
                        filteredTasks.map(task => (
                            <div key={task._id}
                                className={`p-4 rounded shadow-md text-white ${task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"}`}>
                                <p className={`text-lg font-bold ${task.completed ? "line-through" : ""}`}>{task.title}</p>
                                <p>{task.description}</p>
                                <p><strong>Priority:</strong> {task.priority}</p>
                                <p><strong>Deadline:</strong> {task.deadline ? new Date(task.deadline).toDateString() : "No Deadline"}</p>

                                {/* Action Buttons */}
                                <div className="mt-4 flex justify-between">
                                    {!task.completed && (
                                        <button onClick={() => handleMarkAsComplete(task._id)}
                                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
                                            Mark as Complete
                                        </button>
                                    )}
                                    <button onClick={() => handleDeleteTask(task._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
