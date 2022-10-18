import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles.css";
import Menu from "./Menu";
const Base = ({
  title = "My title",
  description = "My description",
  className = "bg-silver text-black p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <ToastContainer theme="colored" />
      <div className="container-fluid">
        <div className="jumbotron bg-silver text-black text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="pt-3">
        <div className="container-fluid bg-primary text-white text-center p-3 fs-7 fw-bold">
          <div className="container">
            <span className="text-white">
              Design and Developed by{" "}
              <a
                target="_blank"
                href="https://rahmat.vercel.app"
                className="text-warning text-decoration-none"
              >
                Rahmat Saeedi
              </a>{" "}
              @ 2022
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Base;
