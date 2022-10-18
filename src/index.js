import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import AppRoutes from "./Routes";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppRoutes />);
