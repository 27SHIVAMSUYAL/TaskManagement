import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useTask } from "../../../context/Task.context";

const AddTask = () => {
    const { addTask } = useTask();

    const validationSchema = yup.object().shape({
        title: yup.string().required("Title is required"),
        desc: yup.string().required("Description is Required"),
        priority: yup
            .string()
            .oneOf(["low", "medium", "high"], "Invalid priority")
            .required("Priority is required"),
        deadline: yup.date().required("Deadline is required"),
    });

    const initialValues = {
        title: "",
        desc: "",
        priority: "medium",
        deadline: "",
    };

    const onSubmitHandler = async (values, { resetForm }) => {
        try {
            await addTask(values.title, values.desc, values.priority, values.deadline);
            toast.success("Task added successfully!");
        } catch (error) {
            toast.error(error.message);
        }
        resetForm();
    };

    return (
        <>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmitHandler}>
                <Form className="col-sm-12 mx-auto">
                    <div className="mb-3">
                        <h1>Add Task</h1>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="title">Title <span className="text-danger">*</span></label>
                        <Field name="title" id="title" type="text" className="form-control" />
                        <ErrorMessage name="title" component="p" className="text-sm text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="desc">Desc <span className="text-danger">*</span></label>
                        <Field as="textarea" rows="3" className="form-control" name="desc" id="desc" />
                        <ErrorMessage name="desc" component="p" className="text-sm text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="priority">Priority <span className="text-danger">*</span></label>
                        <Field as="select" name="priority" className="form-control">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </Field>
                        <ErrorMessage name="priority" component="p" className="text-sm text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="deadline">Deadline <span className="text-danger">*</span></label>
                        <Field name="deadline" type="date" className="form-control" />
                        <ErrorMessage name="deadline" component="p" className="text-sm text-danger" />
                    </div>

                    <div className="mb-3">
                        <button className="btn btn-dark">Add Task</button>
                    </div>
                </Form>
            </Formik>
        </>
    );
};

export default AddTask;
