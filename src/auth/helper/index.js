import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../backend";
import { setToken } from "../../tools/CartSlice";

export const signup = async (user) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(`${API}user/`, user, config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (user) => {
  try {
    const formData = new FormData();
    for (const name in user) {
      formData.append(name, user[name]);
    }
    const response = await axios.post(`${API}user/login/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const Authenticate = (data) => {
  const dispatch = useDispatch();
  dispatch(setToken(data));
};

export const IsAuthenticated = () => {
  const data = useSelector((state) => state.cart.auth);
  if (data.token) {
    return true;
  } else {
    return false;
  }
};
