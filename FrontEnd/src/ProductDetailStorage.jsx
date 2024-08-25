import { useOutletContext } from "react-router-dom";

export default function ProductDetailStorage() {
  const {product} = useOutletContext();

  
   // Check if storage data is present
   if (!product || !product.storage) {
    return <div>No storage information available</div>;
  }

  const storage = product.storage;

  return (
    <p>
      <strong>Storage instructions:</strong> {storage}
    </p>
  );
}
