import axios from "axios";
import { API } from "../../backend";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API}product`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API}product/${id}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};
