import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addProductToCart } from "../tools/CartSlice";
import Base from "./Base";
import { getProduct } from "./helper/coreapicalls";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart);
  const authToken = data.auth.token;

  const getOneProduct = async () => {
    const { data } = await getProduct(id);
    setProduct(data);
  };
  useEffect(() => {
    getOneProduct();
  }, []);

  const handleAddToCart = (product) => {
    if (authToken) {
      dispatch(addProductToCart(product));
      toast.success("Product added to cart");
    } else {
      setMessage(true);
    }
  };

  console.log(product);

  return (
    <Base title={product.name} description={product.description}>
      <Link to="/" className="btn btn-warning text-white">
        {"<"} Back
      </Link>
      <div className="row p-5">
        <div className="col-md-5 shadow text-center p-3 rounded">
          <img
            src={product.image}
            style={{ width: "50%" }}
            className="rounded"
          />
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-5 text-start">
          <div className="fs-5">
            <p>Price: ${product.price}</p>
            <p>{product.stock > 0 ? "Avaliable" : "Not Avaliable"} in stock</p>
          </div>
          <div className="row">
            <div className="col-12">
              <button
                onClick={() => handleAddToCart(product)}
                className="btn btn-success text-white w-50 mt-2 mb-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Product;
