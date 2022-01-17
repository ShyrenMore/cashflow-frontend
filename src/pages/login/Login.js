import React, { useState } from "react";
import '../signup/Signup.css'
import { useLoginMutation } from "../../Hooks/react-query/auth-hooks";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { useFormik } from "formik";
import { useMessages } from '../../context/message.context';
import authsvg  from '../../assets/authImage.svg'

const Login = () => {
    const { actions } = useMessages();
    const errorMessage = actions.getMessages("errorMessage");
    const { mutate, isLoading } = useLoginMutation();
    const navigate = useNavigate();
    const auth = useAuth();
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: { username: "", password: "" },
        onSubmit: (values, { resetForm }) => {
            mutate(
                { ...values },
                {
                    onSuccess: (data) => {
                        auth.actions.login(data.access);
                        navigate("/");
                        resetForm({});
                    },
                }
            );
        },
    });

    return (
        <div className="mega_wrapper">
            <div className="contact_wrapper">
                <div className="left_side">
                    <img src={authsvg} width="92%" height="120%" alt="svg" />
                </div>
                <div className="right_side">
                    <form method="POST" autoComplete="off" onSubmit={handleSubmit}>
                        {errorMessage ? <p>{errorMessage}</p> : null}
                        <div className="form_row">
                            <input
                                type="text"
                                name="username"
                                id="email"
                                required
                                onChange={(e) => {
                                    actions.removeMessages("errorMessage");
                                    handleChange(e);
                                }}
                                autoComplete="off"
                                aria-autocomplete="none"
                                value={values.email}
                            />
                            <span>Username or Email</span>
                        </div>
                        <div className="form_row">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={(e) => {
                                    actions.removeMessages("errorMessage");
                                    handleChange(e);
                                }}
                                required
                                autoComplete="off"
                                aria-autocomplete="none"
                                value={values.password}
                            />
                            <span>Password</span>
                        </div>
                        <div className="form_row"></div>
                        <div className="form_row">
                            <button type="submit">
                                {isLoading ? "loading..." : "log in"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
