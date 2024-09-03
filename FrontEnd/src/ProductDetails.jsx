import { useState, useEffect } from "react";
import { NavLink, useParams, Outlet } from "react-router-dom";
import useFetch from "./useFetch";

export default function ProductDetails({onProductAdd}) {
  const [product, setProduct] = useState({}); 
  const { get } = useFetch(`${import.meta.env.VITE_API_URL}/api/`);
  const { id } = useParams();

  useEffect(() => {
    if(id) {
      console.log("Product ID:", id);
      get(`products/${id}`)
        .then((data) => {
          console.log("Fetched Product data:", data);
          setProduct(data);
        })
        .catch((error) => console.log("Could not load product details", error));      
    }
  }, [id, get]);

  return (
    <div className="product-details-layout">
      <div>
        <h2>{product.name}</h2>
        <img
          src={product.image}
          width="125"
          height="125"
          className="product-details-image"
          alt={product.name}
        />
      </div>
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "tab-active" : "")} to="" end>
                Details
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "tab-active" : "")} to="nutrition">
                Nutrition
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? "tab-active" : "")} to="storage">
                Storage
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Pass product and onProductAdd to Outlet */}
        <Outlet context={{ product, onProductAdd }} />
      </div>
    </div>
  );
}
