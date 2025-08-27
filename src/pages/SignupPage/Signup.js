import React, { useState } from "react";
import "./Signup.scss";
import InputField from "../../components/InputField/InputField";
import {
  validateName,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
  validateEmail,
  validatePhone,
} from "../../utils/validations";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));

    let errorMsg = "";

    switch (name) {
      case "name":
        if (!value.trim()) errorMsg = "Name is required";
        else if (!validateName(value)) errorMsg = "Invalid name (letters only)";
        break;

      case "username":
        if (!value.trim()) errorMsg = "Username is required";
        else if (!validateUsername(value))
          errorMsg = "Invalid username format";
        break;

      case "email":
        if (!value.trim()) errorMsg = "Email is required";
        else if (!validateEmail(value)) errorMsg = "Only Gmail is allowed";
        break;

      case "phone":
        if (!value.trim()) errorMsg = "Phone number is required";
        else if (!validatePhone(value))
          errorMsg = "Invalid phone (use +countrycodeXXXXXXXXXX)";
        break;

      case "newPassword":
        if (!value.trim()) errorMsg = "Password is required";
        else if (!validatePassword(value, userDetail.username))
          errorMsg = "Invalid password";
        break;

      case "confirmNewPassword":
        if (!value.trim()) errorMsg = "Confirm password is required";
        else if (!validateConfirmPassword(userDetail.newPassword, value))
          errorMsg = "Passwords do not match";
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!userDetail.name.trim()) newErrors.name = "Name is required";
    else if (!validateName(userDetail.name)) newErrors.name = "Invalid name";

    if (!userDetail.username.trim())
      newErrors.username = "Username is required";
    else if (!validateUsername(userDetail.username))
      newErrors.username = "Invalid username";

    if (!userDetail.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(userDetail.email))
      newErrors.email = "Invalid email (must be Gmail)";

    if (!userDetail.phone.trim()) newErrors.phone = "Phone is required";
    else if (!validatePhone(userDetail.phone))
      newErrors.phone = "Invalid phone number";

    if (!userDetail.newPassword.trim())
      newErrors.newPassword = "Password is required";
    else if (!validatePassword(userDetail.newPassword, userDetail.username))
      newErrors.newPassword = "Invalid password";

    if (!userDetail.confirmNewPassword.trim())
      newErrors.confirmNewPassword = "Confirm password is required";
    else if (
      !validateConfirmPassword(
        userDetail.newPassword,
        userDetail.confirmNewPassword
      )
    )
      newErrors.confirmNewPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Signup success ✅", userDetail);
      navigate("/");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-form">
        <div className="header">
          <p>Create new Account</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="inputs-block">
            <InputField
              label="NAME"
              type="text"
              name="name"
              value={userDetail.name}
              onChange={handleInputChange}
              error={errors.name}
            />

            <InputField
              label="USERNAME"
              type="text"
              name="username"
              value={userDetail.username}
              onChange={handleInputChange}
              error={errors.username}
            />

            <InputField
              label="EMAIL"
              type="email"
              name="email"
              value={userDetail.email}
              onChange={handleInputChange}
              error={errors.email}
            />

            <InputField
              label="PHONE NO."
              type="text"
              name="phone"
              value={userDetail.phone}
              onChange={handleInputChange}
              error={errors.phone}
            />

            <InputField
              label="NEW PASSWORD"
              type="password"
              name="newPassword"
              value={userDetail.newPassword}
              onChange={handleInputChange}
              error={errors.newPassword}
            />

            <InputField
              label="CONFIRM NEW PASSWORD"
              type="password"
              name="confirmNewPassword"
              value={userDetail.confirmNewPassword}
              onChange={handleInputChange}
              error={errors.confirmNewPassword}
            />
          </div>


          <div className="button-block">
            <Button className="primary-btn" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
