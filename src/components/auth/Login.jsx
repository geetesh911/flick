import React, { useContext, useState, useEffect } from "react";
import AuthContext from "./../../context/auth/authContext";
import AlertContext from "./../../context/alert/alertContext";
import { Link } from "react-router-dom";

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) props.history.push("/mylist");
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <div className="form-container form login">
      <h3 className="heading">Login</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          className="form-control"
          placeholder="Email"
          columns={[0, 12]}
          label="Email:"
          required={true}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          label="Passoword:"
          columns={[0, 12]}
          required={true}
          minLength="6"
        />

        <input
          type="submit"
          value="Login"
          className="btn btn-outline-light submitButton btn-block"
        />
      </form>
      <div className="signup mt-3">
        <Link to="/register" style={{ color: "white" }}>
          Don't Have an account, Sign UP
        </Link>
      </div>
    </div>
  );
};

export default Login;
