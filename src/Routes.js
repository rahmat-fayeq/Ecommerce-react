import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, Store } from "./tools/Store";
import Home from "./core/Home";
import Signin from "./user/Signin";
import UserDashboard from "./user/UserDashboard";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Signup from "./user/Signup";
import Cart from "./core/Cart";
import Product from "./core/Product";

const AppRoutes = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
            <Route element={<PrivateRoutes />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default AppRoutes;
