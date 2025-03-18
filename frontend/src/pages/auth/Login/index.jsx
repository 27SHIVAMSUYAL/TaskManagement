import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useAuth } from '../../../context/Auth.context';

const Login = () => {
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const validationSchema = yup.object().shape({
        email: yup.string().email("Email must be valid").required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const initialValues = {
        email: '',
        password: ''
    };

    const onSubmitHandler = async (values, { resetForm }) => {
        try {
            const data = await loginUser(values.email, values.password);
            localStorage.setItem("token", data.token);
            toast.success((data && data.msg) || "Login Successful");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
        resetForm();
    };

    return (
        <>
            <div className="container">
                <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmitHandler}>
                    <Form className='col-sm-12 col-md-6 col-lg-4 mx-auto border px-4 py-4 my-5 rounded'>
                        <div className="mb-3 py-4">
                            <h1>Login</h1>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email <span className="text-danger">*</span> </label>
                            <Field name="email" id="email" type="text" className="form-control" placeholder="john@gmail.com" />
                            <ErrorMessage name='email' component='p' className='text-sm text-danger' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password <span className="text-danger">*</span> </label>
                            <Field name="password" id="password" type="password" className="form-control" placeholder="******" />
                            <ErrorMessage name='password' component='p' className='text-sm text-danger' />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-dark">Login</button>
                        </div>
                        <div className="mb-3">
                            <p className='text-secondary text-end'>Don't have an account? <Link to={'/auth/register'}>Register</Link> </p>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
};

export default Login;
