import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IsAuthenticated } from "../auth/helper";
import { API } from "../backend";
import { removeToken } from "../tools/CartSlice";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.cart.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const { data } = await axios.get(`${API}category/`);
      setCategories(data);
    };
    getCategory();
  }, []);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      const userId = token && user.id;
      dispatch(removeToken());
      await axios.get(`${API}user/logout/${userId}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("Please login !");
    } else {
      navigate("/cart");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fs-5 py-3">
        <div className="container-fluid">
          <div className="navbar-brand">
            <NavLink to="/">
              <img
                alt="logo"
                src="/logo.png"
                width="50"
                height="50"
                style={{ borderRadius: "50%" }}
              />
            </NavLink>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <div className="nav-link">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-info text-decoration-none text-center"
                        : ""
                    }
                  >
                    Home
                  </NavLink>
                </div>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  to="#"
                  className="nav-link dropdown-toggle text-light"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </NavLink>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        to="/"
                        className="dropdown-item bg-white text-dark border-bottom"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <NavLink
                    to="/cart"
                    onClick={handleCartClick}
                    className={({ isActive }) =>
                      isActive
                        ? " text-warning rounded text-decoration-none text-center"
                        : "text-white text-decoration-none text-center"
                    }
                  >
                    <span className="position-relative">
                      Cart
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                        {cartItems?.length}
                      </span>
                    </span>
                  </NavLink>
                </div>
              </li>

              {!IsAuthenticated() && (
                <>
                  <li className="nav-item">
                    <div className="nav-link">
                      <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                          isActive
                            ? " text-warning rounded text-decoration-none text-center"
                            : "text-white text-decoration-none text-center"
                        }
                      >
                        SignUp
                      </NavLink>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link">
                      <NavLink
                        to="/signin"
                        className={({ isActive }) =>
                          isActive
                            ? " text-warning rounded text-decoration-none text-center"
                            : "text-white text-decoration-none text-center"
                        }
                      >
                        Login
                      </NavLink>
                    </div>
                  </li>
                </>
              )}

              {IsAuthenticated() && (
                <>
                  <li className="nav-item">
                    <div className="nav-link">
                      <NavLink
                        to="/user/dashboard"
                        className={({ isActive }) =>
                          isActive
                            ? "text-warning rounded p-2 text-decoration-none text-center"
                            : "text-white text-decoration-none text-center"
                        }
                      >
                        Dashboard
                      </NavLink>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link">
                      <NavLink
                        to="/signout"
                        onClick={handleSignOut}
                        className={({ isActive }) =>
                          isActive
                            ? "text-warning rounded p-2 text-decoration-none text-center"
                            : "text-danger text-decoration-none text-center"
                        }
                      >
                        SignOut
                      </NavLink>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {message && <p className="text-danger fs-4">{message}</p>}
    </>
  );
};

export default Menu;
