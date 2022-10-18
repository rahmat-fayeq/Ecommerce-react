import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Base from "../core/Base";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });
  const { name, email, password, error, success } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const successMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-md-3 text-left ">
        <div
          className="alert alert-success"
          role="alert"
          style={{ display: success ? "" : "none" }}
        >
          Your account created sucessfully,please
          <Link to="/signin"> login now!</Link>
        </div>
      </div>
    </div>
  );
  const errorMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-md-3 text-left ">
        <div
          className="alert alert-danger"
          role="alert"
          style={{ display: error ? "" : "none" }}
        >
          Something went wrong, please check your entered data !
        </div>
      </div>
    </div>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await signup({ name, email, password });

      if (res.status === 201) {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: false,
          success: true,
        });
      }
    } catch (error) {
      setValues({ ...values, error: true, success: false });
    }
  };

  const signupForm = () => (
    <div className="row">
      <div className="col-md-6 offset-md-3 text-left">
        <form>
          <div className="form-group">
            <label htmlFor="name" className="form-label text-black">
              Name
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              value={name}
              onChange={handleChange("name")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label text-black">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              value={email}
              onChange={handleChange("email")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label text-black">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              value={password}
              onChange={handleChange("password")}
            />
          </div>
          <button className="btn btn-primary mt-4 w-100" onClick={handleSubmit}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <Base title="Sign up" description="Create account">
      {successMessage()}
      {errorMessage()}
      {signupForm()}
      <p className="text-dark text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
