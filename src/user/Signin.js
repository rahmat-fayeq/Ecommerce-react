import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { signin } from "../auth/helper";
import Base from "../core/Base";
import { setToken } from "../tools/CartSlice";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    success: false,
    loading: false,
  });
  const { email, password, error, success, loading } = values;

  const dispatch = useDispatch();

  const performRedirect = () => (
    <div>
      <Navigate to="/" replace />
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

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setValues({ ...values, loading: true });
      const res = await signin({ email, password });
      const sessionToken = res.data;
      if (res.status === 200) {
        if (sessionToken) {
          dispatch(setToken(sessionToken));
          setValues({ ...values, loading: false, success: true, error: false });
        } else {
          setValues({ ...values, loading: false, error: true, success: false });
        }
      } else {
        setValues({ ...values, error: true, loading: false, success: false });
      }
    } catch (err) {
      setValues({ ...values, error: true, loading: false, success: false });
      console.log(err);
    }
  };

  const signinForm = () => (
    <div className="row">
      <div className="col-md-6 offset-md-3 text-left">
        <form>
          <div className="form-group">
            <label htmlFor="email" className="form-label text-dark">
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
            <label htmlFor="password" className="form-label text-dark">
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
  return (
    <Base title="Login Page" description="Welcome to Rahmat Store">
      {errorMessage()}
      {loading && <p className="text-warning text-center">Loading...</p>}
      {success && performRedirect()}
      {signinForm()}
      <p className="text-center text-dark mt-5">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
