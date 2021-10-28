import React from "react";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";

import {startLogin, startRegister} from "../../actions/auth";
import {useForm} from "../../hooks/useForm";
import "./login.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    loginEmail: "diego@gmail.com",
    loginPassword: "123456",
  });
  const [formRegisterValues, handleRegisterInputChange] = useForm({
    registerName: "Diego",
    registerEmail: "diego@gmail.com",
    registerPassword: "123456",
    registerRepeatedPassword: "123456",
  });

  const {loginEmail, loginPassword} = formLoginValues;
  const {registerName, registerEmail, registerPassword, registerRepeatedPassword} =
    formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(loginEmail, loginPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (registerPassword !== registerRepeatedPassword) {
      return Swal.fire("Error", "Passwords don't match", "error");
    } else {
      dispatch(startRegister(registerName, registerEmail, registerPassword));
    }
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                className="form-control"
                name="loginEmail"
                placeholder="Email"
                type="text"
                value={loginEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                name="loginPassword"
                placeholder="Password"
                type="password"
                value={loginPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group d-flex justify-content-center">
              <input className="btnSubmit" type="submit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                className="form-control"
                name="registerName"
                placeholder="Name"
                type="text"
                value={registerName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                name="registerEmail"
                placeholder="Email"
                type="email"
                value={registerEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                name="registerPassword"
                placeholder="Password"
                type="password"
                value={registerPassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                name="registerRepeatedPassword"
                placeholder="Repeat password"
                type="password"
                value={registerRepeatedPassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group d-flex justify-content-center">
              <input className="btnSubmit" type="submit" value="Create account" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
