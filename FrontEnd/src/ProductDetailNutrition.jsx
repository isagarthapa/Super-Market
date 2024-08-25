import { useOutletContext } from "react-router-dom";

export default function ProductDetailNutrition() {
  const {product} = useOutletContext();

  // Check if nutrition data is present
  if (!product || !product.nutrition) {
    return <div>No nutrition information available</div>;
  }

  const { protein, carbs, fat, salt } = product.nutrition;

  return (
    <table className="table table-nutrition">
      <thead>
        <tr>
          <th>Nutrient</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {protein && (
          <tr>
            <td>Protein</td>
            <td>{protein}g</td>
          </tr>
        )}
        {carbs && (
          <tr>
            <td>Carbohydrates</td>
            <td>{carbs}g</td>
          </tr>
        )}
        {fat && (
          <tr>
            <td>Fat</td>
            <td>{fat}g</td>
          </tr>
        )}
        {salt && (
          <tr>
            <td>Salt</td>
            <td>{salt}g</td>
          </tr>
        )}
        {/* Optionally handle missing values gracefully */}
        {(!protein && !carbs && !fat && !salt) && (
          <tr>
            <td colSpan="2">No detailed nutrition data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
