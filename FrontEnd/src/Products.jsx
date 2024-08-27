/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import dotenv from 'dotenv';
dotenv.config();
import Product from "./Product";
import useFetch from "./useFetch";
import Loader from "./Loader";

export default function Products(props) {
  const [products, setProducts] = useState([]);  
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/";

  const { get, loading } = useFetch(API_BASE_URL);

  useEffect(() => {
    get("products")
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.log("Could not load products", error));
  }, [get]);

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
