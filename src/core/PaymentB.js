import DropIn from "braintree-web-drop-in-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { makeEmptyCart } from "../tools/CartSlice";
import { createOrder } from "./helper/orderHelper";
import { getMeToken, processPayment } from "./helper/paymentHelper";

const PaymentB = ({ products }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    error: false,
    clientToken: null,
    instance: {},
  });
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);
  const { cartItems, auth } = state;
  const userId = auth.user.id;
  const token = auth.token;

  const getToken = async () => {
    try {
      const { data, status } = await getMeToken(userId, token);
      if (status === 200) {
        const clientToken = data.clientToken;
        setInfo({ clientToken: clientToken });
      } else {
        setInfo({ ...info, error: true });
      }
    } catch (err) {
      setInfo({ ...info, error: true });
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const getAmount = () => {
    let amount = 0;

    products.map(
      (product) =>
        (amount = amount + parseFloat(product.price * product.quantity))
    );
    return amount;
  };

  const onPurchase = async () => {
    try {
      setInfo({ loading: true });
      const getNonce = await info.instance.requestPaymentMethod();
      const nonce = getNonce.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };

      const { data, status } = await processPayment(userId, token, paymentData);

      if (status === 200) {
        toast.success("paid successfully");
        let product_names = "";
        products.forEach((item) => {
          product_names += item.name + ", ";
        });

        const orderData = {
          products: product_names,
          transaction_id: data.transaction.id,
          amount: data.transaction.amount,
        };

        const res = await createOrder(userId, token, orderData);
        if (res.status === 200) {
          dispatch(makeEmptyCart());
          setInfo({ ...info, success: true, loading: false });
          toast.success("Order Palaced successfully");
        } else {
          toast.warn("Order Faild");
        }
      } else {
        toast.error("Payment faild");
      }
    } catch (err) {
      console.log("Nonce error:  ", err);
      toast.error("Something went wrong please try again");
    }
  };

  const showDropInButton = () => (
    <div>
      {info.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <button
            disabled={info.loading}
            className="btn btn-success  w-100"
            onClick={onPurchase}
          >
            Buy Now
          </button>
        </div>
      ) : (
        <h4>Loading payment gateway...</h4>
      )}
    </div>
  );

  return (
    <div className="shadow rounded p-4">
      <h4 className="text-success">Total Amount: ${getAmount()}</h4>
      {showDropInButton()}
    </div>
  );
};

export default PaymentB;
