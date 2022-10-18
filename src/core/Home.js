import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import "../../src/styles.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const loadAllProducts = async () => {
    const result = await getProducts();
    setProducts(result.data);
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  const itemsPerPage = 12;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <Base title="Home page" description="Welcome to Rahmat Store">
      <div className="row">
        {currentItems.map((product) => (
          <div
            key={product.id}
            className="col-xs-12 col-sm-6 col-md-4  col-lg-3 mb-4"
          >
            <Card product={product} />
          </div>
        ))}
      </div>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="pag-num "
          previousClassName="pag-num"
          nextClassName="pag-num"
          activeClassName="active"
        />
      </div>
    </Base>
  );
};

export default Home;
