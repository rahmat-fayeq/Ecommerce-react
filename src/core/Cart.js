import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  decreaseProductFromCart,
  removeProductFromCart,
} from "../tools/CartSlice";
import Base from "./Base";
import PaymentB from "./PaymentB";

const Cart = () => {
  const products = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch(removeProductFromCart(product));
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(addProductToCart(product));
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseProductFromCart(product));
  };

  const loadProducts = () => (
    <>
      <div className="row ">
        <div className="col-md-12  shadow rounded">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Item</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={product?.image}
                      className="rounded"
                      width={70}
                      height={70}
                    />
                  </td>
                  <td>{product?.name}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm text-light"
                      onClick={() => handleDecreaseQuantity(product)}
                    >
                      -
                    </button>
                    <span className="mx-2">{product?.quantity}</span>
                    <button
                      className="btn btn-info btn-sm text-light"
                      onClick={() => handleIncreaseQuantity(product)}
                    >
                      +
                    </button>
                  </td>
                  <td>${product?.price * product?.quantity}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: "50%",
                      }}
                      onClick={() => handleRemoveFromCart(product)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const loadCheckout = () => (
    <>
      <PaymentB products={products} />
    </>
  );

  return (
    <Base title="Cart Page" description="Welcome to CheckOut">
      <div className="row text-center">
        <div className="col-sm-12 col-md-8">
          {products.length > 0 ? loadProducts() : "Cart is empty"}
        </div>
        <div className="col-sm-12 col-md-4">
          {products.length > 0
            ? loadCheckout()
            : "Please login or add product on cart"}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
