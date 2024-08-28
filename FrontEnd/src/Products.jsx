/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Product from "./Product";
import useFetch from "./useFetch";
import Loader from "./Loader";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const { get, loading } = useFetch("http://localhost:5000/api/");

  useEffect(() => {
    get("products")
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.log("Could not load products", error));
  }, []);

  return (
    <div className="products-layout">
      <h1>Products</h1>
      <p>Take a look at our products</p>
      <div className="products-grid">
        {loading && <Loader />}
        {products.map((product) => {
          return (
            <Product
              key={product._id}
              details={product}
              cart={props.cart}
              onProductAdd={props.onProductAdd}
              onProductDelete={props.onProductDelete}
            ></Product>
          );
        })}
      </div>
    </div>
  );
}
