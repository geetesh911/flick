import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) props.history.push("/mylist");
    if (error === "User already exist") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || password2 === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className="form-container login form">
      <h3 className="heading">Register</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={onChange}
          className="form-control"
          label="Name:"
          required={true}
        />
        <input
          type="text"
          name="email"
          className="form-control"
          value={email}
          placeholder="Email"
          onChange={onChange}
          label="Email:"
          required={true}
        />
        <input
          type="password"
          name="password"
          className="form-control"
          value={password}
          placeholder="Password"
          onChange={onChange}
          label="Passoword:"
          required={true}
          minLength="6"
        />
        <input
          type="password"
          name="password2"
          className="form-control"
          value={password2}
          placeholder="Confirm Password"
          onChange={onChange}
          label="Confirm Passoword:"
          required={true}
          minLength="6"
        />
        <input
          type="submit"
          value="Register"
          className="btn btn-outline-light submitButton btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
