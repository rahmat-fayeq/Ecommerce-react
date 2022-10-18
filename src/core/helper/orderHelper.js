import axios from "axios";
import { API } from "../../backend";

export const createOrder = async (userId, token, orderData) => {
  try {
    const formData = new FormData();
    for (const name in orderData) {
      formData.append(name, orderData[name]);
    }

    const response = await axios.post(
      `${API}order/add/${userId}/${token}/`,
      formData
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
