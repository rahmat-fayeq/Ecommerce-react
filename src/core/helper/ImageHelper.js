import React from "react";

const ImageHelper = ({ product }) => {
  const imgurl = product ? product.image : null;
  return (
    <div className="rounded border border-warning p-2 d-flex justify-content-center">
      <img
        src={imgurl}
        alt=""
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
