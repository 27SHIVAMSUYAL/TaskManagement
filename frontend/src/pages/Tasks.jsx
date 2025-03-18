import { useEffect, useState } from "react";
import { fetchTasks } from "../utils/api";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getTasks = async () => {
            const data = await fetchTasks(token);
            setTasks(data.tasks);
        };
        getTasks();
    }, []);

    return (
        <div>
            <h2>My Tasks</h2>
            {tasks.length === 0 ? <p>No tasks found</p> : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task._id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Status: {task.isComplete ? "Completed" : "Pending"}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Tasks;
