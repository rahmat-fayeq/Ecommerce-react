import axios from "axios";
import { API } from "../../backend";

export const getMeToken = async (userId, token) => {
  try {
    const response = await axios.get(
      `${API}payment/gettoken/${userId}/${token}`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const processPayment = async (userId, token, paymentInfo) => {
  try {
    const formData = new FormData();
    for (const name in paymentInfo) {
      formData.append(name, paymentInfo[name]);
    }
    const response = await axios.post(
      `${API}payment/process/${userId}/${token}/`,
      formData
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
