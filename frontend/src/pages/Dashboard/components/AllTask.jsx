import React from "react";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useTask } from "../../../context/Task.context";

const AllTask = () => {
    const { tasks, deleteTaskById, editTaskById } = useTask();

    // Define priority order
    const priorityOrder = { high: 1, medium: 2, low: 3 };

    // Function to sort tasks by priority and deadline
    const sortedTasks = [...tasks].sort((a, b) => {
        const priorityA = priorityOrder[a.priority] || 4;
        const priorityB = priorityOrder[b.priority] || 4;

        const deadlineA = a.deadline ? new Date(a.deadline).getTime() : Number.MAX_VALUE;
        const deadlineB = b.deadline ? new Date(b.deadline).getTime() : Number.MAX_VALUE;

        return priorityA - priorityB || deadlineA - deadlineB;
    });

    // Function to get priority badge class
    const getPriorityClass = (priority) => {
        switch (priority) {
            case "high":
                return "bg-danger";
            case "medium":
                return "bg-warning text-dark";
            case "low":
                return "bg-success";
            default:
                return "bg-secondary";
        }
    };

    return (
        <>
            <div className="mb-3">
                <h1>All Tasks ({tasks.length})</h1>
            </div>
            <div className="flex-wrap d-flex justify-content-center align-items-center">
                {sortedTasks.length > 0 ? (
                    sortedTasks.map((cur, i) => (
                        <div
                            key={cur._id || i}
                            className="card border py-4 px-4 mx-2 my-2 col-sm-12 col-md-6 col-lg-3"
                        >
                            <h1 className={`card-heading ${cur.isComplete ? "text-decoration-line-through" : ""}`}>
                                {cur.title}
                            </h1>
                            <p className="card-body">{cur.desc || "No description available"}</p>

                            {/* Priority Badge */}
                            <p>
                                <strong>Priority: </strong>
                                <span className={`badge ${getPriorityClass(cur.priority)}`}>
                                    {cur.priority || "Not Set"}
                                </span>
                            </p>

                            {/* Deadline Display */}
                            <p>
                                <strong>Deadline: </strong>
                                {cur.deadline && !isNaN(new Date(cur.deadline).getTime()) 
                                    ? new Date(cur.deadline).toLocaleDateString() 
                                    : "No deadline set"}
                            </p>

                            <div className="d-flex">
                                <button
                                    onClick={() => deleteTaskById(cur._id)}
                                    title="Delete"
                                    className="btn btn-outline-danger rounded-pill mx-1"
                                >
                                    <RxCross2 />
                                </button>
                                {!cur.isComplete && (
                                    <button
                                        onClick={() => editTaskById(cur._id)}
                                        title="Mark as Complete"
                                        className="btn btn-outline-primary rounded-pill"
                                    >
                                        <MdOutlineDone />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="text-center text-decoration-underline">No Tasks Available</h1>
                )}
            </div>
        </>
    );
};

export default AllTask;
