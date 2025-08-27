import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { validateUsername, validatePassword } from "../../utils/validations";
import './Login.scss'

const Login = () => {
  const [userDetail, setUserDetail] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));

    // here checking validation 
    if (name === "username") {
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, username: "Username is required" }));
      } else if (!validateUsername(value)) {
        setErrors((prev) => ({ ...prev, username: "Invalid username format" }));
      } else {
        setErrors((prev) => ({ ...prev, username: "" }));
      }
    }

    if (name === "password") {
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, password: "Password is required" }));
      } else if (!validatePassword(value, userDetail.username)) {
        setErrors((prev) => ({ ...prev, password: "Invalid password" }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!userDetail.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!validateUsername(userDetail.username)) {
      newErrors.username = "Invalid username format";
    }

    if (!userDetail.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(userDetail.password, userDetail.username)) {
      newErrors.password = "Invalid password";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login success", userDetail);
    }
  };

  return (
    <div className="login-page">
      <div className="Login-form">

        <div className="header">
          <h2>Login</h2>
          <p>Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label="USERNAME"
            type="text"
            name="username"
            value={userDetail.username}
            onChange={handleInputChange}
            error={errors.username}
          />

          <InputField
            label="PASSWORD"
            type="password"
            name="password"
            value={userDetail.password}
            onChange={handleInputChange}
            error={errors.password}
          />

          <div className="button-block">
            <Button className="primary-btn" type="submit">
              Login
            </Button>

            <p>
              Don’t have an Account? <Link to="/signup">SignUp</Link>
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Login;
