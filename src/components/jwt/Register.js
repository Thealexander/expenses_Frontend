import React, { useEffect, useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";


const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        password: "",
        password2: ""
    });
    const { username, email, first_name, last_name, phone_number, password, password2 } = user;

    // Remove avatar related code as it's not used

    const { errorx, isAuthenticated, loading } = useSelector(state => state.security);
    const alert = useAlert();
    const dispatch = useDispatch();
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }

        if (errorx) {
            errorx.map(error => alert.error(error));
        }
    }, [dispatch, alert, isAuthenticated, errorx, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("username", username);
        formData.set("email", email);
        formData.set("first_name", first_name);
        formData.set("last_name", last_name);
        formData.set("phone_number", phone_number);
        formData.set("password", password);
        formData.set("password2", password2);

        dispatch(register(formData));
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (
        <Fragment>
            <MetaData title={"Registration"} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" encType="multipart/form-data" onSubmit={submitHandler}>
                        <h1 className="mb-3">Register User</h1>

                        <div className="form-group">
                            <label htmlFor="first_name_field">Name</label>
                            <input
                                type="text"
                                id="first_name_field"
                                className="form-control"
                                value={first_name}
                                name="first_name"
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="last_name_field">Last Name</label>
                            <input
                                type="text"
                                id="last_name_field"
                                className="form-control"
                                value={last_name}
                                name="last_name"
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_number_field">Phone Number</label>
                            <input
                                type="text"
                                id="phone_number_field"
                                className="form-control"
                                value={phone_number}
                                name="phone_number"
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username_field">Username</label>
                            <input
                                type="text"
                                id="username_field"
                                className="form-control"
                                value={username}
                                name="username"
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                name="email"
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                name="password"
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password2_field">Repeat your Password Again</label>
                            <input
                                type="password"
                                id="password2_field"
                                className="form-control"
                                value={password2}
                                name="password2"
                                onChange={onChange}
                            />
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Register;