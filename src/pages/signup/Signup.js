import React from 'react'
import './Signup.css'
import { useFormik } from 'formik';
import { useMessages } from '../../context/message.context';
import { useSignupMutation } from '../../Hooks/react-query/auth-hooks'
import { useAuth } from '../../context/auth.context';
import { useNavigate } from "react-router-dom";
import authsvg from '../../assets/authImage.svg'

const Signup = () => {

    const navigate = useNavigate();
    const auth = useAuth();
    // getting msg actions 
    const { actions } = useMessages();
    const successMessage = actions.getMessages("successMessage");
    const errorMessage = actions.getMessages("errorMessage");
    const { mutate, isLoading, data } = useSignupMutation();
    // // console.log("data:", data);
    const { handleChange, handleSubmit, errors, values } = useFormik({
        initialValues: { email: "", password: "", username: "", firstname: "" },
        onSubmit: (values, { resetForm }) => {

            mutate(
                { ...values },
                {
                    onSuccess: (data) => {
                        auth.actions.login(data.tokens.access);
                        navigate("/dashboard");
                        resetForm({});
                    },

                }
            );
            // // console.log(temp)
        }
    });

    const customHandleChange = (e) => {
        actions.removeMessages("successMessage");
        actions.removeMessages("errorMessages");
        handleChange(e);
    };


    return (
        <div className="mega_wrapper">
            <div className="contact_wrapper">
                <div className="left_side">
                    <img src={authsvg} width="92%" height="120%" alt="svg" />
                </div>
                <div className="right_side">
                    <h2>Create Account</h2>
                    {/* <div> */}
                    <form method="POST" autoComplete="off" onSubmit={handleSubmit}>
                        {successMessage ? <p>{successMessage}</p> : null}
                        {errorMessage ? <p>{errorMessage}</p> : null}
                        <div className="form_row">
                            <input
                                type="text"
                                required
                                autoComplete="off"
                                name="username"
                                id="firstName"
                                onChange={customHandleChange}
                                value={values.username}
                                aria-autocomplete="none"
                            />
                            <span>Username</span>
                        </div>

                        <div className="form_row">
                            <input
                                type="text"
                                required
                                autoComplete="off"
                                aria-autocomplete="none"
                                name="firstname"
                                id="FirstName"
                                onChange={customHandleChange}
                                value={values.firstname}
                            />
                            <span>Name</span>
                        </div>

                        <div className="form_row">
                            <input
                                type="email"
                                required
                                autoComplete="off"
                                aria-autocomplete="none"
                                name="email"
                                id="email"
                                onChange={customHandleChange}
                                value={values.email}
                            />
                            <span>Email</span>
                        </div>

                        <div className="form_row">
                            <input
                                type="password"
                                required
                                autoComplete="off"
                                aria-autocomplete="none"
                                name="password"
                                id="password"
                                onChange={customHandleChange}
                                value={values.password}
                            />
                            <span>Password</span>
                        </div>
                        <div className="form_row"></div>
                        <div className="form_row">
                            <button type="submit">
                                {isLoading ? "Signing up..." : "Signup"}
                            </button>
                        </div>
                    </form>
                    <div className="socials-wrapper">
                        <h4>
                            Have an account? login <a href="/login">here</a>
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
