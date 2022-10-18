import { useDispatch, useSelector } from "react-redux";
import ImageHelper from "./helper/ImageHelper";
import { addProductToCart } from "../tools/CartSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart);
  const authToken = data.auth.token;
  const handleAddToCart = (product) => {
    if (authToken) {
      dispatch(addProductToCart(product));
      toast.success("Product added to cart");
    } else {
      setMessage(true);
    }
  };

  return (
    <>
      {message && <p className="text-danger">Please login !</p>}

      <div className="card text-black bg-light border border-danger ">
        <div className="card-header lead d-flex justify-content-center fw-bold">
          {product?.name}
        </div>
        <div className="card-body">
          <Link
            to={`product/${product.id}`}
            className="text-decoration-none text-black"
          >
            <ImageHelper product={product} />
            <p className="lead font-weight-normal text-wrap mt-1">
              {product?.description.slice(0, 34)} ...
            </p>
            <p className="btn btn-success btn-sm px-3">${product?.price}</p>
          </Link>
          <div className="row">
            <div className="col-12">
              <button
                onClick={() => handleAddToCart(product)}
                className="btn btn-primary w-100 mt-2 mb-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Card;
